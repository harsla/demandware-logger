# demandware-logger

Simple real time logging app for demandware. Currently starts watching for log updates (nodejs) and streams updates (rxjs / angular2) updates in a spartain bootstrap table.

First you will need to create a config.json file to hold your account info in the root directory:
```json
{
  "username": "uber",
  "password": "leet",
  "dwUrl": "https://dev32-web-instance.demandware.net"
}
```

1. run `npm install`
2. update config.json `username`, `password`, and `dwUrl` to not be so leet. 
3. run `node logger.js`

---

The [Taco bell](http://widgetsandshit.com/teddziuba/2010/10/taco-bell-programming.html) version probally looks something like this with [watch](https://linux.die.net/man/1/watch) and [multitail](https://linux.die.net/man/1/multitail)... But where is the fun in that?
```{r, engine='bash', count_lines}
#!/bin/bash
wget=/usr/bin/wget

BASE_URL="https://dev32-web-instance.demandware.net"
WGET_OPTS='--user=uber --password=leet'
DAY=`/bin/date +%Y%m%d`

$wget -Nc -r -nH -nd -np -e robots=off -A "*${DAY}*.log" ${WGET_OPTS} "${BASE_URL}/on/demandware.servlet/webdav/Sites/Logs" -P logs
```
