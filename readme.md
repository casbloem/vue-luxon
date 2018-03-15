# vue-luxon
Easy use of Luxon in Vue, datetime parsing and formating.

[![GitHub version](https://img.shields.io/github/package-json/v/casbloem/vue-luxon.svg)](https://github.com/casbloem/vue-luxon)
[![npm version](https://img.shields.io/npm/v/vue-luxon.svg)](https://npmjs.com/package/vue-luxon)
[![npm downloads](https://img.shields.io/npm/dt/vue-luxon.svg)](https://npmjs.com/package/vue-luxon)
[![Build Status](https://travis-ci.org/casbloem/vue-luxon.svg?branch=master)](#)




#### Example
You can find an example at https://packages.cblm.nl/examples/vue-luxon



## Install
```
npm install vue-luxon --save
```

#### Use

```javascript
const VueLuxon = require('vue-luxon');
Vue.use(VueLuxon, {
    serverZone: 'utc',
    serverFormat: 'iso',
    clientZone: 'local',
    clientFormat: 'local',
});
```
The default settings expect the given datetime string to be an  `utc`  `iso`  datetime string, and will output the default locale format. [Learn more about the options here](#options).





#### Usage

as a filter
```javascript
{{ datetimeString | luxon }}
```

or using v-luxon
```vue
<span v-luxon>018-03-15T09:08:07+00:00</span>
<span v-text="datetimeString" v-luxon></span>
```

see [vue-luxon example](https://packages.cblm.nl/examples/vue-luxon) to see it live.



## Options

prop | options | description
--- | --- | ---
serverZone | see zones (default: `utc`) | zone of the given datetimeString
serverFormat | see formats (default: `iso`) | format of the given datetimeString
clientZone | see zones (default: `locale`) | zone of the given datetimeString
clientFormat | see formats (default: `locale`) | format of the given datetimeString

[click here to see all available options](#options-defaults)



#### Override options

You can override the default options easily.

##### with v-luxon

```vue
<span v-luxon="{ options }">
```

##### as filter

```javascript
{{ datetimeString | luxon({ options }) }}
```



##### Filter shorthand's

When using filter shorthand's, the first argument will be the option value where the shorthand is for.

```javascript
{{ datetimeString | luxon:format('dd-MM-yyyy') }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'dd-MM-yyyy'}) }}
```

You can still adjust other options via the second argument:

```javascript
{{ datetimeString | luxon:format('dd-MM-yyyy', { serverFormat: 'sql' }) }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'dd-MM-yyyy', serverFormat: 'sql' }) }}
```

You can find [all the shorthand's here](#filter-shorthands).



### Zones

eg: `UTC`, `America/New_York`, `Asia/Tokyo`, ...

For the systems local zone you use `locale`.

There is a [list on wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)




### Formats
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
The keys that can be set are in the table below.

```javascript
// example:
{
  localeFormat: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
}
```



**weekday**
The representation of the weekday. Possible values are `'narrow'`, `'short'`, `'long'`.

**era**
The representation of the era. Possible values are `'narrow'`, `'short'`, `'long'`.

**year**
The representation of the year. Possible values are `'numeric'`, `'2-digit'`.

**month**
The representation of the month. Possible values are `'numeric'`, `'2-digit'`, `'narrow'`, `'short'`, `'long'`.

**day**
The representation of the day. Possible values are `'numeric'`, `'2-digit'`.

**hour**
The representation of the hour. Possible values are `'numeric'`, `'2-digit'`.

**minute**
The representation of the minute. Possible values are `'numeric'`, `'2-digit'`.

**second**
The representation of the second. Possible values are `'numeric'`, `'2-digit'`.

**timeZoneName**
The representation of the time zone name. Possible values are `'short'`, `'long'`.





## Difference for Humans (diffForHumans)

```javascript
{
  diffForHumans: {
    past: ":a :w :ago",
    now: "just now",
    future: ":in :a :w",
    durations: ["years", "months", "days", "hours", "minutes", "seconds"]
  },
}
```
use `:a` to define where to place the amount, `:w` for the word (day, years, etc..), `:in` and `:ago` for the translation of 'in' and 'ago'.


```javascript
{
    durations: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
}
// RESULT:  " 32 seconds ago "

// Now remove the seconds...
{
    durations: ['years', 'months', 'days', 'hours', 'minutes'],
}
// RESULT:  " just now "
```



## i18n
```javascript
{
 i18n: {
    lang: "en-EN",
    year: "[one]year|[other]years",
    month: "[one]month|[other]months",
    week: "[one]week|[other]weeks",
    day: "[one]day|[other]days",
    hour: "[one]hour|[other]hours",
    minute: "[one]minute|[other]minutes",
    second: "[one]second|[other]seconds",
    ago: 'ago',
    in: 'in',
  },
}
```

#### more than two plural forms
The BCP 47 lang property is used for plural sensitive formatting when using diffForHumans.
Different languages can have different rules on how to change words, depending on the number qualifying the word.

`en-EN` only has 2 plural forms, so there are only 2 pluralCategories (`one` and `other`).
However, some languages can have more plural forms. ( `zero` `one` `two` `few` `many` `other` )







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

```javascript
{{ datetimeString | luxon:diffForHumans( diffForHumansOptions ) }}
```


see [vue-luxon example](https://packages.cblm.nl/examples/vue-luxon) to see all the shorthands live.





## default options
```javascript
 {
    serverZone: "UTC",
    serverFormat: "ISO",
    clientZone: "locale",
    clientFormat: "locale",
    localeFormat: {
      year: "numeric",
      month: "long",
      day: "numeric"
    },
    diffForHumans: {
      past: ":a :w :ago",
      now: "just now",
      future: ":in :a :w",
      durations: ["years", "months", "days", "hours", "minutes", "seconds"]
    },
    i18n: {
      lang: "en-EN",
      year: "[one]year|[other]years",
      month: "[one]month|[other]months",
      week: "[one]week|[other]weeks",
      day: "[one]day|[other]days",
      hour: "[one]hour|[other]hours",
      minute: "[one]minute|[other]minutes",
      second: "[one]second|[other]seconds",
      ago: "ago",
      in: "in"
    },
    invalid: reason => {
      return `invalid: ${reason}`;
    }
}
```

