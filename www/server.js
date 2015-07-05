
var express = require('express'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon'),
    fs = require('fs');

var httpApp = express();

httpApp.set('port', process.env.PORT || 8000);

httpApp.use(cookieParser());

httpApp.use(expressSession({
  secret: 'superdupersecretstring'
}));

httpApp.use(bodyParser());

httpApp.use(express.static(__dirname + '/public'));

// include all controllers
fs.readdirSync(__dirname + '/routes/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require(__dirname + '/routes/controllers/' + file);
      route.controller(httpApp);
  }
});

httpApp.listen(httpApp.get('port'), function(){
    console.log('Express server listening on port ' + httpApp.get('port'));
});
