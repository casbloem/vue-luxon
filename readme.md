# vue-luxon
Easy use of Luxon in Vue
Providing a filter for datetime parsing and formating.
###### !! still in alpha !!

## Example
You can find an example at https://vue-luxon.cblm.nl/example/example.html

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
   clientZone: 'locale',
   clientFormat: 'locale',
   localeFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
   i18n: {...},
});
```

### Vue Filter usage
```javascript
{{ datetimeString | luxon }}

// Override options
{{ datetimeString | luxon({ clientFormat: 'format'}) }}
```

see [vue-luxon example](https://vue-luxon.cblm.nl/example/example.html) to see it live.





## Options
prop | options | description
--- | --- | ---
serverZone | see zones (default: `utc`) | zone of the given datetimeString
serverFormat | see formats (default: `iso`) | format of the given datetimeString
clientZone | see zones (default: `locale`) | zone of the given datetimeString
clientFormat | see formats (default: `locale`) | format of the given datetimeString


## Formats
format | server-/clientFormat | description | example
--- | --- | ---
sql | both | SQL dates, times, and datetimes | ``` 2017-05-15 09:24:15 ```
laravel | both | Laravel / Carbon default format | sql alias
iso | both | ISO 8601 date time string | ``` 2018-01-06T13:07:04.054 ```
rfc2822 | both | RFC 2822 | ``` Tue, 01 Nov 2016 13:23:12 +0630 ```
http | both | HTTP header specs (RFC 850 and 1123) | ``` Sun, 06 Nov 1994 08:49:37 GMT ```
*tokens* | both | supported tokens can be found [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens)
locale | both | locale format (see below)

### localeFormat options
You can easily change the locale formatting settings.
```javascript
// default:
{
  localeFormat: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
}

// make it longer:
{
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
}
```



## Zones
Can be any zone. eg: `UTC`, `America/New_York`, ...

For the system's local zone you just use 'locale'.

## Shorthand Filters

#### luxon:format
```javascript
{{ datetimeString | luxon:format('format') }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'format'}) }}
```

#### luxon:locale
```javascript
{{ datetimeString | luxon:locale }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'locale'}) }}

```

```javascript
// NEXT UPDATE
{{ datetimeString | luxon:locale(['d', 'm']) }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'locale', localeUse: { second: false, minute: false, hour: false, day: true, month: true, year: false }) }}
```

#### luxon:diffForHumans
```javascript
{{ datetimeString | luxon:diffForHumans }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'diffForHumans'}) }}
```







