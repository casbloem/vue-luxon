# vue-luxon

https://packages.cblm.nl/vue-luxon

Easy use of Luxon in Vue, datetime parsing and formating. Plus additional features.

[![npm version](https://img.shields.io/npm/v/vue-luxon.svg)](https://npmjs.com/package/vue-luxon)
[![npm downloads](https://img.shields.io/npm/dt/vue-luxon.svg)](https://npmjs.com/package/vue-luxon)
[![GitHub last commit](https://img.shields.io/github/last-commit/casbloem/vue-luxon.svg)](#)
[![GitHub version](https://img.shields.io/github/package-json/v/casbloem/vue-luxon.svg)](https://github.com/casbloem/vue-luxon)
[![Build Status](https://travis-ci.org/casbloem/vue-luxon.svg?branch=master)](#)

> ### version 0.7.2

## Install

```
npm install vue-luxon --save
```

### Use

```javascript
import VueLuxon from "vue-luxon";
Vue.use(VueLuxon);
```

By default, vue-luxon expect the given datetime string to be timezone `utc` and format `iso` . The output will be based on the client's locale. Of course these defaults can be changed.
[Learn more about the options](#options)

# Usage

To get started just use the `luxon` filter, as shown below.

```javascript
{{ datetimeString | luxon }}
```

## Shorthands

There are some useful shorthand's/modifiers available.

### luxon:format

Change the clientFormat.

```
{{ luxon:format('dd-MM-YY') }}
```

### luxon:locale

sets the format to locale.

```html
{{ datetimestring | luxon:locale }}
{{ datetimestring | luxon:locale('short') }}
{{ datetimestring | luxon:locale('long') }}
```

If `localeLang` is `en`, the results would be:

```
April 20, 2017
4/20/2017
Thursday, April 20, 2017
```

### luxon:diffForHumans

```html
{{ datetimestring | luxon:diffForHumans }}
<span v-luxon:diffForHumans="datatimestring"></span>
```

The difference in readable format. (eg `10 days ago`)

( see [Difference for Humans](#difference-for-humans) )

### luxon:custom

Create your own output.

```javascript
luxon:custom((lxn => {
	return lxn.year;
})
```

## Options

| prop         | options (default)                   | description                        |
| ------------ | ----------------------------------- | ---------------------------------- |
| serverZone   | see zones (`utc`)                   | zone of the given datetimeString   |
| serverFormat | see formats (`iso`)                 | format of the given datetimeString |
| clientZone   | see zones (`locale`)                | zone of the given datetimeString   |
| clientFormat | see formats (`locale`)              | format of the given datetimeString |
| localeLang   | language tag (user's locale)        |
| localeFormat | [localeFormatObject](#localeFormat) |

## Change default options

You can change the default options with the second argument of the Vue.use function.

```javascript
Vue.use(VueLuxon, {
    serverZone: 'utc',
    serverFormat: 'iso',
    clientZone: 'locale',
    clientFormat: 'locale',
    localeLang: null,
    localeFormat: {} // see localeFormat below
    diffForHumans: {} // see diffForHumans below
    i18n: {} // see i18n below
});
```

## Override options

You can override the default options easily.

```javascript
{
  {
    datetimeString | luxon({ options });
  }
}

<span v-luxon="{ value: dateTimeString, options }" />;
```

#### when using filter shorthand's

When using filter shorthand's, the first argument will for the shorthand.
So if you need to override options, use the second.

```javascript
{{ datetimeString | luxon:format('dd-MM-yyyy', { serverFormat: 'sql' }) }}

// is short for:
{{ datetimeString | luxon({ clientFormat: 'dd-MM-yyyy', serverFormat: 'sql' }) }}
```

You can find [all the shorthand's here](#filter-shorthands).

## localeLang

`null` default value, this will use the client's language.

Or use a language tag to set a client location.

Examples:

`en`: English (primary language).  
`hi`: Hindi (primary language).  
`de-AT`: German as used in Austria (primary language with country code).  
`zh-Hans-CN`: Chinese written in simplified

## localeFormat

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

**weekday **  
The representation of the weekday. Possible values are `narrow`, `short`, `long`.

**era **  
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

##### Templates for localFormat

You can also use one of the templates, just set the `localFormat` to a string of the name of the template.

| localFormat | example _(with localeLang `en`)_ |
| ----------- | -------------------------------- |
| short       | 4/20/2017                        |
| med         | Apr 20, 2017                     |
| full        | April 20, 2017                   |
| huge        | Thursday, April 20, 2017         |
| timesimple  | 3:32 PM                          |

## Zones

eg: `UTC`, `America/New_York`, `Asia/Tokyo`, ...

For the systems local zone you use `locale`.

There is a [list on wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## Formats

| format   | description                                | example                           |
| -------- | ------------------------------------------ | --------------------------------- |
| sql      | SQL dates, times, and datetimes            | `2017-05-15 09:24:15`             |
| iso      | ISO 8601 date time string                  | `2018-01-06T13:07:04.054`         |
| rfc2822  | RFC 2822                                   | `Tue, 01 Nov 2016 13:23:12 +0630` |
| http     | HTTP header specs (RFC 850 and 1123)       | `Sun, 06 Nov 1994 08:49:37 GMT`   |
| _tokens_ | see: tokens                                |
| locale   | see: [localeFormat](#localeFormat-options) | Thursday, April 20, 2017          |

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

### Tokens

Tokens are useful for formatting and parsing.

You can use the following tokens:

| Standalone token | Format token | Description                                                    | Example                                                     |
| ---------------- | ------------ | -------------------------------------------------------------- | ----------------------------------------------------------- |
| S                |              | millisecond, no padding                                        | 54                                                          |
| SSS              |              | millisecond, padded to 3                                       | 054                                                         |
| u                |              | fractional seconds, functionally identical to SSS              | 054                                                         |
| s                |              | second, no padding                                             | 4                                                           |
| ss               |              | second, padded to 2 padding                                    | 04                                                          |
| m                |              | minute, no padding                                             | 7                                                           |
| mm               |              | minute, padded to 2                                            | 07                                                          |
| h                |              | hour in 12-hour time, no padding                               | 1                                                           |
| hh               |              | hour in 12-hour time, padded to 2                              | 01                                                          |
| H                |              | hour in 24-hour time, no padding                               | 9                                                           |
| HH               |              | hour in 24-hour time, padded to 2                              | 13                                                          |
| Z                |              | narrow offset                                                  | +5                                                          |
| ZZ               |              | short offset                                                   | +05:00                                                      |
| ZZZ              |              | techie offset                                                  | +0500                                                       |
| ZZZZ             |              | abbreviated named offset                                       | EST                                                         |
| ZZZZZ            |              | unabbreviated named offset                                     | Eastern Standard Time                                       |
| z                |              | IANA zone                                                      | America/New_York                                            |
| a                |              | meridiem                                                       | AM                                                          |
| d                |              | day of the month, no padding                                   | 6                                                           |
| dd               |              | day of the month, padded to 2                                  | 06                                                          |
| c                | E            | day of the week, as number from 1-7 (Monday is 1, Sunday is 7) | 3                                                           |
| ccc              | EEE          | day of the week, as an abbreviate localized string             | Wed                                                         |
| cccc             | EEEE         | day of the week, as an unabbreviated localized string          | Wednesday                                                   |
| ccccc            | EEEEE        | day of the week, as a single localized letter                  | W                                                           |
| L                | M            | month as an unpadded number                                    | 8                                                           |
| LL               | MM           | month as an padded number                                      | 08                                                          |
| LLL              | MMM          | month as an abbreviated localized string                       | Aug                                                         |
| LLLL             | MMMM         | month as an unabbreviated localized string                     | August                                                      |
| LLLLL            | MMMMM        | month as a single localized letter                             | A                                                           |
| y                |              | year, unpadded                                                 | 2014                                                        |
| yy               |              | two-digit year                                                 | 14                                                          |
| yyyy             |              | four- to six- digit year, pads to 4                            | 2014                                                        |
| G                |              | abbreviated localized era                                      | AD                                                          |
| GG               |              | unabbreviated localized era                                    | Anno Domini                                                 |
| GGGGG            |              | one-letter localized era                                       | A                                                           |
| kk               |              | ISO week year, unpadded                                        | 17                                                          |
| kkkk             |              | ISO week year, padded to 4                                     | 2014                                                        |
| W                |              | ISO week number, unpadded                                      | 32                                                          |
| WW               |              | ISO week number, padded to 2                                   | 32                                                          |
| o                |              | ordinal (day of year), unpadded                                | 218                                                         |
| ooo              |              | ordinal (day of year), padded to 3                             | 218                                                         |
| D                |              | localized numeric date                                         | 9/4/2017                                                    |
| DD               |              | localized date with abbreviated month                          | Aug 6, 2014                                                 |
| DDD              |              | localized date with full month                                 | August 6, 2014                                              |
| DDDD             |              | localized date with full month and weekday                     | Wednesday, August 6, 2014                                   |
| t                |              | localized time                                                 | 9:07 AM                                                     |
| tt               |              | localized time with seconds                                    | 1:07:04 PM                                                  |
| ttt              |              | localized time with seconds and abbreviated offset             | 1:07:04 PM EDT                                              |
| tttt             |              | localized time with seconds and full offset                    | 1:07:04 PM Eastern Daylight Time                            |
| T                |              | localized 24-hour time                                         | 13:07                                                       |
| TT               |              | localized 24-hour time with seconds                            | 13:07:04                                                    |
| TTT              |              | localized 24-hour time with seconds and abbreviated offset     | 13:07:04 EDT                                                |
| TTTT             |              | localized 24-hour time with seconds and full offset            | 13:07:04 Eastern Daylight Time                              |
| f                |              | short localized date and time                                  | 8/6/2014, 1:07 PM                                           |
| ff               |              | less short localized date and time                             | Aug 6, 2014, 1:07 PM                                        |
| fff              |              | verbose localized date and time                                | August 6, 2014, 1:07 PM EDT                                 |
| ffff             |              | extra verbose localized date and time                          | Wednesday, August 6, 2014, 1:07 PM Eastern Daylight Time    |
| F                |              | short localized date and time with seconds                     | 8/6/2014, 1:07:04 PM                                        |
| FF               |              | less short localized date and time with seconds                | Aug 6, 2014, 1:07:04 PM                                     |
| FFF              |              | verbose localized date and time with seconds                   | August 6, 2014, 1:07:04 PM EDT                              |
| FFFF             |              | extra verbose localized date and time with seconds             | Wednesday, August 6, 2014, 1:07:04 PM Eastern Daylight Time |
| q                |              | quarter, no padding                                            | 9                                                           |
| qq               |              | quarter, padded to 2                                           | 13                                                          |

## i18n

_(these settings do not affect datetime parsing and formatting)_

This language object is currently only used by `diffForHumans`.

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

### Tips

- Save and serve your datetimes from the server in the `utc` timezone and the `iso` or `sql` format. Then use the client's locale format.

### Changelog

...
