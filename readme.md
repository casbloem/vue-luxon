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
import VueLuxon from 'vue-luxon';
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
{{ variable | filter }}
```

```javascript
{{ item.updated_at | format('yyyy-mm') }}
// result:  2018-02

{{ plan.expires | locale }}
// result: 23-04-2018   ( depends on clients locale )
```


### Vue v-datetime usage
```javascript
<span v-dt="..." v-dt:fromFormat=""></span>
```


## Formats
format | example | description
--- | --- | ---
sql | ```2017-05-15 09:24:15``` | SQL dates, times, and datetimes
iso | ```2018-01-06T13:07:04.054``` | ISO 8601 date time string
laravel | ```2018-01-08 18:35:21``` | Laravel / Carbon default format
rfc2822 | ``` Tue, 01 Nov 2016 13:23:12 +0630 ``` | RFC 2822
http | ``` Sun, 06 Nov 1994 08:49:37 GMT ``` | HTTP header specs (RFC 850 and 1123)
*custom* | ```` mm:yyyy hh-mm-ss ```` | tokens you can use: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens


## Functions / Filters
filter | arguments | description
--- | --- | ---
format() | (string) format | a string formatted according to the specified format string
locale |  | a localized string representing the date
diffForHumans |  | displaying humanized strings



