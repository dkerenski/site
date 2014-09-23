var express = require('express')
  , http = require('http')
  , path = require('path')
  , emailjs = require('emailjs');

var app = express();

// all environments
app.set('port', process.env.PORT || 6123);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res)
{
	res.render('index', { title: 'Dodona', msg: '' });
});
app.post('/', function(req,res)
{
  // get posted vals
  var name = req.param('name');
  var desc = req.param('desc');
  var email = req.param('email');

  if(email != ''){
    // email
    var serv = emailjs.server.connect({
      user:     "ulpianmorina@gmail.com",
      password: "ulp1an1991",
      host:     "smtp.gmail.com",
      ssl:      true
    });
    // send email
    serv.send({
      text: "Name: "+name+"\nDesc: "+desc+"\nemail: "+email,
      from: "Dodona <ulpianmorina@gmail>",
      to: "ulpianmorina@gmail.com",
      subject: "DODONA - Project Request"
    }, function(err, message) {
      console.log(err || message);
    });
  }
  // response
  res.render('index', { title: 'Dodona', msg: '<div class="btn btn-success" style="cursor:none;">We have received your request and<br> we will get back to you.</div>' });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});