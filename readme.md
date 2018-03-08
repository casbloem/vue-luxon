# vue-luxon
!! note: this is just a setup - first release will be soon !!
Easy use of Luxon in Vue
Providing a filter for datetime parsing and formating.
###### version 0.2 will be released 06/03

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

### Vue v-datetime usage
```javascript
<span v-datetime="..."></span>
```


### Vue Filter usage
```javascript
{{ variable | filter }}
```

```javascript
{{ item.updated_at | diffForHumans }}
```

## Format

format | example | description
--- | --- | ---
sql | `2017-05-15 09:24:15` | SQL dates, times, and datetimes
iso | `2018-01-06T13:07:04.054` | ISO 8601 date time string
laravel | ```2018-01-08 18:35:21``` | Laravel / Carbon default format
http | ` ` | 
jsdate | ` ` | 
*custom* | `mm:yyyy hh-mm-ss` | tokens you can use: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens


## Functions / Filters
filter | arguments | description
--- | --- | ---
format() | (string) format | a string formatted according to the specified format string
locale |  | a localized string representing the date
diffForHumans |  | displaying humanized strings



