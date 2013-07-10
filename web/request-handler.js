exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.

exports.handleRequest = function (req, res) {
  console.log(exports.datadir);

  //list all routers
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
    res.end(''+req.url);
  },

  test: function(req, res){
    console.log('test, my url is: ', req.url);
    res.end(''+req.url);
  },

  catch_all: function(req, res){
    console.log('catch_all, my url is: ', req.url);
    res.end(''+req.url);
  }

};

