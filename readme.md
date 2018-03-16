# vue-luxon

Easy use of Luxon in Vue, datetime parsing and formating.

[![GitHub last commit](https://img.shields.io/github/last-commit/casbloem/vue-luxon.svg)](#)
[![GitHub version](https://img.shields.io/github/package-json/v/casbloem/vue-luxon.svg)](https://github.com/casbloem/vue-luxon)


[![npm version](https://img.shields.io/npm/v/vue-luxon.svg)](https://npmjs.com/package/vue-luxon)
[![npm downloads](https://img.shields.io/npm/dt/vue-luxon.svg)](https://npmjs.com/package/vue-luxon)
[![Build Status](https://travis-ci.org/casbloem/vue-luxon.svg?branch=master)](#)



> **version 0.5.0 beta** 
>
> *03/16 17:54:01 CET*
> Almost done updating, will push 0.5.0 soon.
>
> *03/16 01:55:29 CET*
> Currently updating docs and files to the next version... hold on.





#### Example

You can find an example at https://packages.cblm.nl/examples/vue-luxon



## Install
```
npm install vue-luxon --save
```

#### Use

```javascript
const VueLuxon = require('vue-luxon');
Vue.use(VueLuxon);
```

By default, vue-luxon expect the given datetime string to be timezone `utc`  and format `iso` . The output will be based on the client's locale. Of course these defaults can be changed.
[Learn more about the options](#options)

#### Usage

There are many ways to use vue-luxon. To get started just use the `luxon` filter or `v-luxon` directive, as shown below.

as a filter

```javascript
{{ datetimeString | luxon }}
```

or using v-luxon

```vue
<span v-luxon>018-03-15T09:08:07+00:00</span>

<span v-luxon v-text="datetimeString"></span>
```

see [vue-luxon example](https://packages.cblm.nl/examples/vue-luxon) to see it live.

#### Shorthand's

There are some useful shorthand's available.

###### luxon:format

Change the clientFormat.

```
{{ luxon:format('dd-MM-YY') }}
```



###### luxon:locale

sets the format to locale.

```javascript
{{ luxon:locale }}
```

```vue
<span v-luxon:locale></span>
```

```vue
<div v-text="datetimeString" v-luxon></div>
<div v-text="datetimeString" v-luxon:locale></div>
<div v-text="datetimeString" v-luxon:locale.short></div>
<div v-text="datetimeString" v-luxon:locale.long></div>
```
If `localeLang` is `en`, the results would be:
```             
April 20, 2017
April 20, 2017
4/20/2017
Thursday, April 20, 2017
```



###### luxon:diffForHumans

The difference in readable format. (eg `10 days ago`)

(see [Difference for Humans](#difference for-humans))





## Options

prop | options (default) | description
--- | --- | ---
serverZone | see zones (`utc`) | zone of the given datetimeString
serverFormat | see formats (`iso`) | format of the given datetimeString
clientZone | see zones (`locale`) | zone of the given datetimeString
clientFormat | see formats (`locale`) | format of the given datetimeString
localeLang | language tag (user's locale) | 
localeFormat | [localeFormatObject](#localeFormat) | 



#### Change default options

You can change the default options with the second argument of the Vue.use functions.

```javascript
Vue.use(VueLuxon, {
    serverZone: 'utc',
    serverFormat: 'iso',
    clientZone: 'locale',
    clientFormat: 'locale',
    localeLang: null,
    // you can append more options
});
```



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

##### when using filter shorthand's

When using filter shorthand's, the first argument will for the shorthand.
So if you need to override options, use the second.

```javascript
{{ datetimeString | luxon:format('dd-MM-yyyy', { serverFormat: 'sql' }) }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'dd-MM-yyyy', serverFormat: 'sql' }) }}
```

You can find [all the shorthand's here](#filter-shorthands).

#### localeLang
`null` default value, will use the client's language.

Examples:

`en`: English (primary language).
`hi`: Hindi (primary language).
`de-AT`: German as used in Austria (primary language with country code).
`zh-Hans-CN`: Chinese written in simplified

#### localeFormat

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
The representation of the weekday. Possible values are `narrow`, `short`, `long`.

**era**
The representation of the era. Possible values are `narrow`, `short`, `long`.

**year**
The representation of the year. Possible values are `numeric`, `2-digit`.

**month**
The representation of the month. Possible values are `numeric`, `2-digit`, `narrow`, `short`, `long`.

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





### Zones

eg: `UTC`, `America/New_York`, `Asia/Tokyo`, ...

For the systems local zone you use `locale`.

There is a [list on wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)




### Formats
format | description | example
--- | --- | ---
sql | SQL dates, times, and datetimes | ``` 2017-05-15 09:24:15 ```
iso | ISO 8601 date time string | ``` 2018-01-06T13:07:04.054 ```
rfc2822 | RFC 2822 | ``` Tue, 01 Nov 2016 13:23:12 +0630 ```
http | HTTP header specs (RFC 850 and 1123) | ``` Sun, 06 Nov 1994 08:49:37 GMT ```
*tokens* | supported tokens can be found [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens) | 
locale | see: [localeFormat](#localeFormat-options) |Thursday, April 20, 2017







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





### Tips

Save and serve your datetimes from the server in the `utc` timezone and the `sql` or `iso` format. Then use the client's locale format.



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

