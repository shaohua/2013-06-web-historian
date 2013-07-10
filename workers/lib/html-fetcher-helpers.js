var fs = require('fs');
var _ = require('underscore');

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

exports.downloadUrls = function(urls){
  // fixme
};