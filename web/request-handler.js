var fs = require('fs');
var nodeUrl = require('url');
var sitespath = require('../sites_path.js');

exports.handleRequest = function (req, res) {

  var router = [
    ['/test', controller.test],
    [/^\/$/, controller.root], //match root
    [/.*/, controller.catch_all]
  ];

  //go over and map to the right method
  for(var i=0; i<router.length; i++){
    var pattern = router[i][0];
    var controller_func = router[i][1];
    if(req.url.match(pattern)){
      controller_func(req, res);
      break; //break on the first match
    }
  }

};

var controller = {
  root: function(req, res){
    console.log('root, my url is: ', req.url);

    if(req.method === 'GET') {
      var file_content = controller._read_html(sitespath._index);
      res.writeHead(200);
      res.end(''+file_content);

    } else if(req.method === 'POST') {
      var input = '';
      req.on('data', function(chunk){
        input += chunk;
      });
      req.on('end', function(){
        input = JSON.parse(input);
        input = input.url + '\n'; //spec expects a new line
        fs.appendFileSync(sitespath._txt, input, 'utf8');
        res.writeHead(201);
        res.end();
      });
    } else {
      controller._fof(res);
    }


  },

  test: function(req, res){
    console.log('test, my url is: ', req.url);
    res.end(''+req.url);
  },

  catch_all: function(req, res){
    console.log('catch_all, my url is: ', req.url);

    var filename = nodeUrl.parse(req.url).pathname;
    var filepath = sitespath._dir + filename;

    if( fs.existsSync(filepath) ){
      var file_content = controller._read_html(filepath);

      console.log('file content: ', file_content);

      res.writeHead(200);
      res.end(''+file_content);
    } else {
      controller._fof(res);
    }


  },

  _read_html:function(path){
    // console.log('reading/returning file: ', path);
    var output = fs.readFileSync(path, 'utf8');
    // console.log(output);
    return output;
  },

  _fof:function(res){
    res.writeHead(404);
    res.end();
  }

};

