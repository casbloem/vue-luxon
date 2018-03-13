# vue-luxon
Easy use of Luxon in Vue
Providing a filter for datetime parsing and formating.

[![GitHub version](https://img.shields.io/github/package-json/v/casbloem/vue-luxon.svg)](https://github.com/casbloem/vue-luxon)
[![npm version](https://img.shields.io/npm/v/vue-luxon.svg)](https://npmjs.com/package/vue-mny)
[![npm downloads](https://img.shields.io/npm/dt/vue-luxon.svg)](https://npmjs.com/package/vue-mny)


## Example
You can find an example at https://packages.cblm.nl/examples/vue-luxon

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
   i18n: { },
});
```

### Vue Filter usage
```javascript
{{ datetimeString | luxon }}

// Override options
{{ datetimeString | luxon({ options }) }}
```

see [vue-luxon example](https://packages.cblm.nl/examples/vue-luxon) to see it live.



## Options
prop | options | description
--- | --- | ---
serverZone | see zones (default: `utc`) | zone of the given datetimeString
serverFormat | see formats (default: `iso`) | format of the given datetimeString
clientZone | see zones (default: `locale`) | zone of the given datetimeString
clientFormat | see formats (default: `locale`) | format of the given datetimeString


## Formats
format | description | example
--- | --- | ---
sql | SQL dates, times, and datetimes | ``` 2017-05-15 09:24:15 ```
laravel | Laravel / Carbon default format | sql alias
iso | ISO 8601 date time string | ``` 2018-01-06T13:07:04.054 ```
rfc2822 | RFC 2822 | ``` Tue, 01 Nov 2016 13:23:12 +0630 ```
http | HTTP header specs (RFC 850 and 1123) | ``` Sun, 06 Nov 1994 08:49:37 GMT ```
*tokens* | supported tokens can be found [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens) | 
locale | see: [localeFormat](#localeFormat-options) (see below) |

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
  localeFormat: {
    weekday: 'long'
  }
}
```

## Zones
Can be any zone. eg: `UTC`, `America/New_York`, ...
America/New_York
America/Los_Angeles
Asia/Tokyo

For the system's local zone you just use `locale`.


## Shorthand Filters

#### luxon:format(clientFormat, options)
```javascript
{{ datetimeString | luxon:format('format') }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'format'}) }}
```

#### luxon:locale(localeFormat, options)
```javascript
{{ datetimeString | luxon:locale }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'locale'}) }}

```

```javascript
{{ datetimeString | luxon:locale({ month: 'long' }) }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'locale', localFormat: { month: 'long' } }) }}

```


#### luxon:diffForHumans
```javascript
{{ datetimeString | luxon:diffForHumans }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'diffForHumans'}) }}
```

see [vue-luxon example](https://packages.cblm.nl/examples/vue-luxon) to see all the shorthands live.






