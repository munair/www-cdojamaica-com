var express = require('express');
var fs = require('fs');
var postmark = require("postmark")("db375280-7dd3-4240-89db-1e19ee9e939e")

var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/sounds", express.static(__dirname + '/sounds'));

app.get('/', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });

app.post('/inc_email.html', function(request, response) {
  var name = request.body.name;
  var email = request.body.email;
  var mobile = request.body.mobile;
  var message = request.body.message;
  var validation = request.body.validation;
  var out = 'contact name: ' + name 
          + '\ncontact email: ' + email 
          + '\nmobile: ' + mobile 
          + '\nmessage: ' + message
          + '\nvalidation: ' + validation 
          + '\n';

  postmark.send({
    "From" : "zumbi@cdojamaica.com",
    "To" : "zumbi@cdojamaica.com",
    "Subject" : "Contact from www.cdojamaica.com",
    "From" : "zumbi@cdojamaica.com",
    "To" : "zumbi@cdojamaica.com",
    "Subject" : "Contact from www.cdojamaica.com",
    "Tag" : "Inquiry",
    "TextBody" : out
  }, function(error, success) {
      if(error) {
          console.error("Unable to send via postmark: " + error.message);
         return;
      }
      console.info("Sent to postmark for delivery")
  });

  response.redirect('/inc_formconfirmation.html');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
