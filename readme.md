# vue-luxon
Easy use of Luxon in Vue
Providing a filter for datetime parsing and formating.
###### version 0.2 will be released 08/03

## Install
```
npm install vue-luxon --save
```

## Use
```javascript
const VueLuxon = require('vue-luxon');
Vue.use(VueLuxon,{
   serverZone: 'UTC',
   serverFormat: 'ISO',
   clientZone: 'local',
   clientFormat: 'local',
   beforeParse: () => {},
   i18n: {...},
});
```

### Vue Filter usage
```javascript
{{ datetimeString | luxon }}

// Override options
{{ datetimeString | luxon({ clientFormat: 'mm-yyyy'}) }}
```

see ()[vue-luxon example] to see it live.


## Formats
format | example | description
--- | --- | ---
sql | ```2017-05-15 09:24:15``` | SQL dates, times, and datetimes
iso | ```2018-01-06T13:07:04.054``` | ISO 8601 date time string
laravel | ```2018-01-08 18:35:21``` | Laravel / Carbon default format
rfc2822 | ``` Tue, 01 Nov 2016 13:23:12 +0630 ``` | RFC 2822
http | ``` Sun, 06 Nov 1994 08:49:37 GMT ``` | HTTP header specs (RFC 850 and 1123)
*custom* | ```` mm:yyyy hh-mm-ss ```` | tokens you can use: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens


## Shorthand Filters

###luxon:format
```javascript
{{ datetimeString | luxon:format('format') }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'format'}) }}
```

###luxon:locale
```javascript
{{ datetimeString | luxon:locale }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'locale'}) }}



{{ datetimeString | luxon:locale(['d', 'm']) }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'locale', localeUse: { second: false, minute: false, hour: false, day: true, month: true, year: false }) }}
```

###luxon:diffForHumans
```javascript
{{ datetimeString | luxon:diffForHumans }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'diffForHumans'}) }}
```


