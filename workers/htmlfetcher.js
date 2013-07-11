// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var hfh = require('./lib/html-fetcher-helpers.js');
var sitespath = require('../sites_path.js');

hfh.readUrls(sitespath._txt, function(url){
  hfh.downloadUrls(url);
});

console.log('fetched at: ', Date());