var http=require('http');

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/',
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();

http.get("http://www.google.com/", function(res) {
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