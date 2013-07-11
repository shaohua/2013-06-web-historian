var stubs = require("./helpers/stubs");
var htmlFetcherHelpers = require("../workers/lib/html-fetcher-helpers");
var fs = require("fs");

describe("html fetcher helpers", function(){

  it("should have a 'readUrls' function", function(){
    var urlArray = ["example1.com", "example2.com"];

    var filepath = __dirname + "/testdata/sites.txt";

    fs.writeFileSync(filepath, urlArray.join("\n"));

    var resultArray = [];
      // replaced the first argument from urlArray to filepath
      // which reflects how the function is supposed to work
    var result = htmlFetcherHelpers.readUrls(filepath, function(urls){
      resultArray.push(urls);
    });

    waits(200);
    runs(function(){
      expect(resultArray).toEqual(urlArray);
    });
  });

  it("should have a 'downloadUrls' function", function(){
    var result = htmlFetcherHelpers.downloadUrls();
    expect(result).toBeTruthy();
  });
});