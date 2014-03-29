var connect2 = require("./connect2.js")

var app = connect2.createServer();

app.use(function (req, res, next) {
  console.log('request received');
  next();
});

app.use(function (req, res, next) {
	console.log("This is a test!");
	next();
});

app.use(function (req, res, next) {
	console.log("This is not a test!");
	next();
});

app.use("/hello",function(req, res) {
  res.end('Hello!');}
);

app.use("/goodbye",function(req, res) {
  res.end('GoodBye!');}
);

app.listen(8000);

