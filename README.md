# demandware-logger

A simple cli logger for demandware. Currently looks at todays logs, and shows relevent ones that change. You can monitor logs by adding them to the config.json watch array. it currently looks for the log name minus the date part, and only watches todays logs.

1. `npm install`
2. update config.json `username`, `password`, and `dwUrl`
3. `node logger.js`


The [Taco bell](http://widgetsandshit.com/teddziuba/2010/10/taco-bell-programming.html) version probally looks something like this with [watch](https://linux.die.net/man/1/watch) and [multitail](https://linux.die.net/man/1/multitail)... But where is the fun in that?
```***REMOVED***r, engine='bash', count_lines***REMOVED***
#!/bin/bash
wget=/usr/bin/wget

BASE_URL="https://dev32-web-instance.demandware.net"
WGET_OPTS='--user=uber --password=leet'
DAY=`/bin/date +%Y%m%d`

$wget -Nc -r -nH -nd -np -e robots=off -A "*$***REMOVED***DAY***REMOVED****.log" $***REMOVED***WGET_OPTS***REMOVED*** "$***REMOVED***BASE_URL***REMOVED***/on/demandware.servlet/webdav/Sites/Logs" -P logs
```
