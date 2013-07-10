var fs = require('fs');
var _ = require('underscore');
var http = require('http');
var nodeUrl = require('url');
var sitespath = require('../../sites_path.js');

exports.readUrls = function(filePath, cb){

  fs.readFile(filePath, 'utf8', function(err, data){
    if(err){
      console.log('ERROR! -- ', err);
    } else {
      data = data.split('\n');
      _(data).each(function(line){
        cb.call(this,line);
      });
    }
  });
};

exports.downloadUrls = function(url){
  //url should NOT have protocol prefix
  url = url || 'www.facebook.com';
  var http_url = 'http://' + url;

  http.get(http_url, function(res) {
    var input = '';
    res.on('data', function(chunk){
      input += chunk;
    });
    res.on('end', function(){
      // console.log('input: ', input);
      fs.writeFileSync(sitespath._dir + url, input, 'utf8');
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  return true;
};

  // if(!nodeUrl.parse(url).protocol) {
  //   url = 'http://' + url;
  // }