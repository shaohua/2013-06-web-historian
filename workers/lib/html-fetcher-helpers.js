var fs = require('fs');
var _ = require('underscore');
var http = require('http');
var nodeUrl = require('url');

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

  url = url || 'http://www.facebook.com';
  if(!nodeUrl.parse(url).protocol) {
    url = 'http://' + url;
  }

  http.get(url, function(res) {
    var input = '';
    res.on('data', function(chunk){
      input += chunk;
    });
    res.on('end', function(){
      console.log('input: ', input);
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  return true;
};