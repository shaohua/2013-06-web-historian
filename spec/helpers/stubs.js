var nodeUrl = require('url');

exports.Request = function(url, method, postdata) {
  // with a real request
  // request.url does NOT include the domain name
  // hence, we've changed the line below to mimic that
  this.url = nodeUrl.parse(url).pathname;
  this.method = method;
  this._postData = postdata;
  this.setEncoding = function(type) {
    //ignore
  };
  var self = this;

  // the same change was implemented on the stub for
  // the chat server sprint.
  this.addListener = this.on = function(type, callback) {
    if (type == "data") {
      callback(JSON.stringify(self._postData));
    }
    if (type == "end") {
      callback();
    }
  };
};

exports.Response = function() {
  this._ended = false;
  this._responseCode = null;
  this._headers = null;
  this._data = null;
  var self = this;
  this.writeHead = function(responseCode, headers) {
    console.log("WriteHead called with " + responseCode);
    self._responseCode = responseCode;
    self._headers = headers;
  };
  this.end = function(data) {
    console.log("Response.end called.");
    self._ended = true;
    self._data = data;
  };
};
