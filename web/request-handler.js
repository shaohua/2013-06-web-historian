exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.

exports.handleRequest = function (req, res) {
  console.log(exports.datadir);

  //list all routers
  var router = [
    ['/', controller.root],
    ['/test', controller.test]
  ];

  //go over and map to the right method
  for(var i=0; i<router.length; i++){
    var pattern = router[i][0];
    var controller_func = router[i][1];
    if(req.url === pattern){
      controller_func();
    }
  }

};

var controller = {
  root: function(req, res){

  },

  test: function(req, rest){

  },

  getReq: function(req, res) {

  },

  postReq: function(req, res){

  }

};

