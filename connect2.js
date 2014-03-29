var http = require('http');
var connect2 = {};
connect2.createServer = function(fn){
	var routes = [];
	var returns = [];
	var middleware = [];
	var n;
	var req, res;
	this.use = function(url, fn){
		if((typeof url == "string" || url == undefined) && typeof fn == "function")
		{
			url = url || "/";

			if(routes.indexOf(url) == -1){
				routes.push(url);
				returns.push(fn);
			}			
			else{
				var i = routes.indexOf(url);
				returns[i] = fn;
			}

			
		}
		else if(typeof url == "function"){
			middleware.push(url);
		}
		else{
			console.log("Invalid Route");
		}
    };

    if(typeof fn == "undefined"){
      fn = function (request, response, fn) {

      	console.log(request.url);
      	
      	


      	if(routes.indexOf(request.url) != -1){
      		console.log("Valid Path");
      		var i = routes.indexOf(request.url);
      		req = request;
      		res = response;
      		var counter = 0;

  			function next(){
  				var cb = middleware[++counter];
  				
  				console.log(counter);	

  				if(middleware[counter+1]){
  					cb(req, res, next)
  				}
  				else
  					cb(req, res, n)

  			}

      		function n (){
  				returns[i](request,response);
  			};

  			middleware[0](req,res,next);
  			//n2();

      	}
      	else{
      		response.writeHead(404, {"Content-Type": "text/html"});	
      		response.end("Missing Page");
      	}
        
        
      }
    }

    this.listen = function(port){
    	port = port || 80;
    	http.createServer(fn).listen(port)
    	console.log("Server running at http://127.0.0.1:"+port+"/");
    };
    
    return this;
}

module.exports = connect2;