//logger
var fs = require('fs');
var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var colors = require('colors');
var moment = require('moment');

// server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// logger things
var config = JSON.parse(fs.readFileSync('config.json'));
var baseUrl = config.dwUrl;
var httpOptions = ***REMOVED***
  'auth': ***REMOVED***
    'user': config.username,
    'pass': config.password,
    'sendImmediately': true
  ***REMOVED***,
  strictSSL: false
***REMOVED***;

app.get('/', function(req, res) ***REMOVED***
  res.sendfile('index.html');
***REMOVED***);

var theme = ***REMOVED***
  DEFAULT: 'grey',
  DEBUG: 'cyan',
  ERROR: 'red',
  WARN: 'yellow',
  Job: 'grey',
  // input: 'grey',
  // verbose: 'cyan',
  // prompt: 'grey',
  // info: 'green',
  // data: 'grey',
  // help: 'cyan',
  // warn: 'yellow',
  // debug: 'blue',
  // error: 'red'
***REMOVED***;
colors.setTheme(theme);

var logs = ***REMOVED******REMOVED***;
var diffLog = ***REMOVED******REMOVED***;

io.on('connection', function(socket) ***REMOVED***
  console.log('client connected');

  socket.on('disconnect', function() ***REMOVED***
    console.log('client disconnected');
  ***REMOVED***);

  //socket.on('chat message', function(msg) ***REMOVED***
  //io.emit('chat message', msg);
  //***REMOVED***);

  function checkLogs() ***REMOVED***
    request.get(baseUrl + 'on/demandware.servlet/webdav/Sites/Logs', httpOptions,
      function(error, response, body) ***REMOVED***
        if (error) ***REMOVED***
          return console.error(error);
        ***REMOVED***

        $ = cheerio.load(body);
        var logFiles = [];
        var rightNow = new Date();
        var searchDate = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

        // create a mapping of logs and timestamps
        $('tr').each(function(i, row) ***REMOVED***
          var logName = $(row).find('td:nth-child(1) > a > tt').text();
          var fileName = logName.split('.')[0];
          var timeStamp = $(row).find('td:nth-child(3) > tt').text();

          // if the timestamp changes, download it
          if (logs[fileName] && (logs[fileName].timeStamp !== timeStamp) && (config.watch.indexOf(logs[fileName].logName.slice(0, -13)) > -1)) ***REMOVED***

            // download the new log file...
            request(logs[fileName].logLink, httpOptions, function(error, response, body) ***REMOVED***
              if (error) ***REMOVED***
                return console.error(error);
              ***REMOVED***

              // if we have an exsisting linecount, show the diff
              if (!diffLog[fileName]) ***REMOVED***
                diffLog[fileName] = 1;

              ***REMOVED***

              _.each(body.trim().split('\n').slice(-Math.max(body.trim().split('\n').length - diffLog[fileName], 1)), function(line) ***REMOVED***
                var dateString = line.match(/\[(.*?)\]/);
                var message = line.split(']')[1];
                if (message && dateString) ***REMOVED***
                  var logType = (theme[message.split(' ')[1]]) ? message.split(' ')[1] : 'DEFAULT';
                  //console.log(logs[fileName].logName + ": " + colors.bgMagenta("  " + moment(new Date(dateString.toString().split(',')[0].replace(/[[\]]/g, ''))).format("h:mm:ss a") + "  "), colors[logType](line.split('GMT] ')[1]));
                  var event = ***REMOVED***
                    'name': logs[fileName].logName,
                    'time': moment(new Date(dateString.toString().split(',')[0].replace(/[[\]]/g, ''))).format("h:mm:ss a"),
                    'type': logType,
                    'message': message
                  ***REMOVED***;

                  io.emit('message', event);
                ***REMOVED***
              ***REMOVED***);

              diffLog[fileName] = body.trim().split('\n').length;
            ***REMOVED***);
          ***REMOVED***

          logs[fileName] = ***REMOVED***
            'logName': logName,
            'timeStamp': timeStamp,
            'logLink': baseUrl + $(row).find('td:nth-child(1) > a').attr('href')
          ***REMOVED***;

        ***REMOVED***);
      ***REMOVED***);
  ***REMOVED***

  setInterval(checkLogs, 1000);

***REMOVED***);

http.listen(3000, function() ***REMOVED***
  console.log('listening on *:3000');
***REMOVED***);

//// Server things
//io.on('connection', function (socket) ***REMOVED***
//console.log('user connected');

//socket.on('disconnect', function()***REMOVED***
//console.log('user disconnected');
//***REMOVED***);

//socket.on('add-message', function (message) ***REMOVED***
//io.emit('message', ***REMOVED***type:'new-message', text: message***REMOVED***);
//***REMOVED***);
//***REMOVED***);

//http.listen(5000, function () ***REMOVED***
//console.log('started on port 5000');
//***REMOVED***);
