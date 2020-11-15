# vue-luxon

DateTime formatting & parsing in Vue using Luxon

[![npm version](https://img.shields.io/npm/v/vue-luxon.svg)](https://npmjs.com/package/vue-luxon) [![npm downloads](https://img.shields.io/npm/dt/vue-luxon.svg)](https://npmjs.com/package/vue-luxon) [![GitHub last commit](https://img.shields.io/github/last-commit/casbloem/vue-luxon.svg)](#) [![GitHub version](https://img.shields.io/github/package-json/v/casbloem/vue-luxon.svg)](https://github.com/casbloem/vue-luxon)

## https://packages.cblm.nl/vue-luxon

## Install

```shell
npm install vue-luxon
```

### Setup

```javascript
import VueLuxon from "vue-luxon";
Vue.use(VueLuxon);
```

By default, vue-luxon expect the given datetime string to be time zone `utc` and format `iso` . The output will be based on the client's locale. 

Change the default settings:

```javascript
Vue.use(VueLuxon, {
    input: {
        zone: "utc",
        format: "iso"
    },
    output: "short"
});
```

[Learn more about settings](#settings)



## Basic usage

You can use the `$luxon` method everywhere in your vue app:

```js
this.$luxon("2020-10-05T14:48:00.000Z")
// October 5, 2020
```

Or use the `luxon` filter, as shown below:

```javascript
{{ "2020-10-05T14:48:00.000Z" | luxon }}
// October 5, 2020
```

You can change the output format:

```js
this.$luxon("2020-10-05T14:48:00.000Z", "dd-MM-yyyy")
// 05-10-2020

this.$luxon("2020-10-05 22:36", "relative")
// 22 days ago
```

And other settings:

```js
this.$luxon("2020-10-05 22:36", {
    input: { format: "yyyy-MM-dd HH:mm", zone: "Asia/Tokyo" },
    output: "full",
})
// October 5, 2020, 3:36 PM GMT+2
```

These formats will be in the clients browser language, unless you set a [specific language].



## Settings

| prop      | options (default)                      | description                                                  |
| --------- | -------------------------------------- | ------------------------------------------------------------ |
| input     | see [settings.input](#settingsinput)   | The default input format and zone                            |
| output    | see [settings.output](#settingsoutput) | The default output format, zone, language, and relative settings |
| templates | see [ templates](#templates)           | Define objects to use as properties                          |

#### Default settings

You can change the default settings with the second argument of the `Vue.use` function.

```javascript
Vue.use(VueLuxon, {
  templates: {},
    input: {
        zone: "utc",
        format: "iso"
    },
    output: {
        zone: "local",
        format: {
            year: "numeric",
            month: "long",
            day: "numeric"
        },
        locale: null,
        relative: {
            round: true,
            unit: null
        }
    }
});
```

You can also override the default settings per method/filter easily:

```javascript
{{ datetimeString | luxon({ settings }) }}
this.$luxon({ settings })
```



### Zone

eg: `UTC`, `America/New_York`, `Asia/Tokyo`, ...

For the systems local zone you use `local`.

There is a [list on wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)



### Formats

#### Input and Output formats

These formats can be used as `input.format` and `output.format`

| format         | description                          | in- or output | example                           |
| -------------- | ------------------------------------ | ------------- | --------------------------------- |
| sql            | SQL dates, times, and datetimes      | both          | `2017-05-15 09:24:15`             |
| iso            | ISO 8601 date time string            | both          | `2018-01-06T13:07:04.054`         |
| rfc2822        | RFC 2822                             | both          | `Tue, 01 Nov 2016 13:23:12 +0630` |
| http           | HTTP header specs (RFC 850 and 1123) | both          | `Sun, 06 Nov 1994 08:49:37 GMT`   |
| seconds        | Unix timestamp                       | both          | `1542674993`                      |
| millis         | Unix timestamp milliseconds          | both          | `1542674993410`                   |
| _tokens_       | see: tokens                          | both          | `yyyy-MM-dd`                      |
| *templateName* | see: [Templates](#templates)         | both          |                                   |

#### Output formats

These formats can only be used as `output.format`

| format           | example _(with locale `en_US`)_                            |
| ---------------- | ---------------------------------------------------------- |
| relative         | see: [Relative](#relative)                                 |
| short            | 10/14/1983, 1:30 PM                                        |
| shorts           | 10/14/1983, 1:30:23 PM                                     |
| med              | Oct 14, 1983, 1:30 PM                                      |
| meds             | Oct 14, 1983, 9:30:33 AM                                   |
| full             | October 14, 1983, 9:30 AM EDT                              |
| fulls            | October 14, 1983, 9:30:33 AM EDT                           |
| huge             | Friday, October 14, 1983, 9:30 AM Eastern Daylight Time    |
| huges            | Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time |
| time             | 9:30 AM                                                    |
| times            | 09:30:23 AM                                                |
| time24           | 09:30                                                      |
| time24s          | 09:30:23                                                   |
| time24longoffset | 09:30:23 Eastern Daylight Time                             |
| date_full        | October 14, 1983                                           |
| date_huge        | Tuesday, October 14, 1983                                  |
| date_med         | Oct 14, 1983                                               |
| date_medd        | Fri, Oct 14, 1983                                          |
| date_short       | 10/14/1983                                                 |

`output.format` can also be an object:

```javascript
// using an object:
format: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
```

| Property     | Possible values                             | Description                              |
| ------------ | ------------------------------------------- | ---------------------------------------- |
| weekday      | `narrow` `short` `long`                     | The representation of the weekday        |
| era          | `narrow` `short` `long`                     | The representation of the era            |
| year         | `numeric` `2-digit`                         | The representation of the year           |
| month        | `numeric` `2-digit` `narrow` `short` `long` | The representation of the month          |
| day          | `numeric` `2-digit`                         | The representation of the day            |
| hour         | `numeric` `2-digit`                         | The representation of the hour           |
| minute       | `numeric` `2-digit`                         | The representation of the minute         |
| second       | `numeric` `2-digit`                         | The representation of the second         |
| timeZoneName | `short` `long`                              | The representation of the time zone name |



### settings.input

 `object` or `string`

An `object`containing a [zone](#zone) and [format](#format) or a `string` of a [template](#format-and-zone-templates) name.

```js
{
	zone: "utc",
	format: "iso"
}
```



### settings.output

 `object` or `string`

An `object`containing a [zone](#zone) and [format](#format) or a `string` of a [template](#format-and-zone-templates) name.

```js
{
    zone: "local",
    format: "short",
    locale: null,
    relative: {} // see settings.relative
}
```

`locale` set to `null` will use the client's locale.

`relative` Read about the [relative format below](#relativeFormat)



### settings.output.locale

`string`

**`null` default value, this will use the client's locale.**

Or use a locale tag to set a client location.

Examples:

`en`: English (primary language).  
`hi`: Hindi (primary language).  
`de-AT`: German as used in Austria (primary language with country code).  
`zh-Hans-CN`: Chinese written in simplified



### settings.output.relative

Set the `output.format` to `relative` to use the relative format. Or use the `luxonRelative` filter.

```
{{ datetime | luxonRelative }}
this.$luxon({ output: { format: "relative" } })

{{ datetime | luxonRelative({ style: "short" }) }}
this.$luxon({ output: { format: "relative", relative: { style: "short" } } })
```

You can change the behavior with the `relative settings object in the `output` .

```javascript
{
    output: {
        format: "relative"
        relative: {
            style: "long",
            unit: null,
            round: true,
            padding: 0
        },
    }
}
```

| property | description                                                  | default |
| -------- | ------------------------------------------------------------ | ------- |
| style    | the style of units, must be "long", "short", or "narrow"     | `long`  |
| unit     | use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds" | `null`  |
| round    | whether to round the numbers in the output.                  | `true`  |
| padding  | padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding. | `0`     |





#### Templates

You can predefine setting templates.

By default there is a `server`, `client` and a `inputdate` template, but you can add your own to the options object.

It's also possible to use a template in a template, as the `inputdate` uses the `client` template's zone for example.

```js
templates: {
    server: {
        zone: "utc",
        format: "iso"
    },
    client: {
        zone: "local",
        format: "short"
    },
    inputdate: {
        zone: "client",
        format: "yyyy-MM-dd"
    }
}
```

There are multiple ways to use a template:

```js
// This will use the templates zone and format
{{ "2020-10-05T14:48:00.000Z" | luxon({ input: "server" }) }}

// This will use the templates zone
{{ "2020-10-05T14:48:00.000Z" | luxon({ input: { zone: "client" } }) }}
```

Or you can set the default input and output in the `Vue.use` function to use these templates by default:

```js
Vue.use(VueLuxon, {
    input: "server",
    output: "client",
});
```

Or create custom templates to use everywhere:

```js
Vue.use(VueLuxon, {
	templates: {
		serverAMS: {
			zone: "Europe/Amsterdam",
			format: "dd-MM-yyyy HH:mm:ss"
		},
        serverUTC: {
			zone: "UTC",
			format: "yyyy-MM-dd HH:mm:ss"
		},
        clientAMS: {
            zone: "Europe/Amsterdam",
			format: "med"
        }
	},
    input: "serverUTC",
    output: "clientAMS",
});
```





----





### Tokens

Tokens are useful for formatting and parsing.

You can use the following tokens:

| Standalone token | Format token | Description                                                  | Example                                                     |
| ---------------- | ------------ | ------------------------------------------------------------ | ----------------------------------------------------------- |
| S                |              | millisecond, no padding                                      | 54                                                          |
| SSS              |              | millisecond, padded to 3                                     | 054                                                         |
| u                |              | fractional seconds, functionally identical to SSS            | 054                                                         |
| s                |              | second, no padding                                           | 4                                                           |
| ss               |              | second, padded to 2 padding                                  | 04                                                          |
| m                |              | minute, no padding                                           | 7                                                           |
| mm               |              | minute, padded to 2                                          | 07                                                          |
| h                |              | hour in 12-hour time, no padding                             | 1                                                           |
| hh               |              | hour in 12-hour time, padded to 2                            | 01                                                          |
| H                |              | hour in 24-hour time, no padding                             | 9                                                           |
| HH               |              | hour in 24-hour time, padded to 2                            | 13                                                          |
| Z                |              | narrow offset                                                | +5                                                          |
| ZZ               |              | short offset                                                 | +05:00                                                      |
| ZZZ              |              | techie offset                                                | +0500                                                       |
| ZZZZ             |              | abbreviated named offset                                     | EST                                                         |
| ZZZZZ            |              | unabbreviated named offset                                   | Eastern Standard Time                                       |
| z                |              | IANA zone                                                    | America/New_York                                            |
| a                |              | meridiem                                                     | AM                                                          |
| d                |              | day of the month, no padding                                 | 6                                                           |
| dd               |              | day of the month, padded to 2                                | 06                                                          |
| c                | E            | day of the week, as number from 1-7 (Monday is 1, Sunday is 7) | 3                                                           |
| ccc              | EEE          | day of the week, as an abbreviate localized string           | Wed                                                         |
| cccc             | EEEE         | day of the week, as an unabbreviated localized string        | Wednesday                                                   |
| ccccc            | EEEEE        | day of the week, as a single localized letter                | W                                                           |
| L                | M            | month as an unpadded number                                  | 8                                                           |
| LL               | MM           | month as an padded number                                    | 08                                                          |
| LLL              | MMM          | month as an abbreviated localized string                     | Aug                                                         |
| LLLL             | MMMM         | month as an unabbreviated localized string                   | August                                                      |
| LLLLL            | MMMMM        | month as a single localized letter                           | A                                                           |
| y                |              | year, unpadded                                               | 2014                                                        |
| yy               |              | two-digit year                                               | 14                                                          |
| yyyy             |              | four- to six- digit year, pads to 4                          | 2014                                                        |
| G                |              | abbreviated localized era                                    | AD                                                          |
| GG               |              | unabbreviated localized era                                  | Anno Domini                                                 |
| GGGGG            |              | one-letter localized era                                     | A                                                           |
| kk               |              | ISO week year, unpadded                                      | 17                                                          |
| kkkk             |              | ISO week year, padded to 4                                   | 2014                                                        |
| W                |              | ISO week number, unpadded                                    | 32                                                          |
| WW               |              | ISO week number, padded to 2                                 | 32                                                          |
| o                |              | ordinal (day of year), unpadded                              | 218                                                         |
| ooo              |              | ordinal (day of year), padded to 3                           | 218                                                         |
| D                |              | localized numeric date                                       | 9/4/2017                                                    |
| DD               |              | localized date with abbreviated month                        | Aug 6, 2014                                                 |
| DDD              |              | localized date with full month                               | August 6, 2014                                              |
| DDDD             |              | localized date with full month and weekday                   | Wednesday, August 6, 2014                                   |
| t                |              | localized time                                               | 9:07 AM                                                     |
| tt               |              | localized time with seconds                                  | 1:07:04 PM                                                  |
| ttt              |              | localized time with seconds and abbreviated offset           | 1:07:04 PM EDT                                              |
| tttt             |              | localized time with seconds and full offset                  | 1:07:04 PM Eastern Daylight Time                            |
| T                |              | localized 24-hour time                                       | 13:07                                                       |
| TT               |              | localized 24-hour time with seconds                          | 13:07:04                                                    |
| TTT              |              | localized 24-hour time with seconds and abbreviated offset   | 13:07:04 EDT                                                |
| TTTT             |              | localized 24-hour time with seconds and full offset          | 13:07:04 Eastern Daylight Time                              |
| f                |              | short localized date and time                                | 8/6/2014, 1:07 PM                                           |
| ff               |              | less short localized date and time                           | Aug 6, 2014, 1:07 PM                                        |
| fff              |              | verbose localized date and time                              | August 6, 2014, 1:07 PM EDT                                 |
| ffff             |              | extra verbose localized date and time                        | Wednesday, August 6, 2014, 1:07 PM Eastern Daylight Time    |
| F                |              | short localized date and time with seconds                   | 8/6/2014, 1:07:04 PM                                        |
| FF               |              | less short localized date and time with seconds              | Aug 6, 2014, 1:07:04 PM                                     |
| FFF              |              | verbose localized date and time with seconds                 | August 6, 2014, 1:07:04 PM EDT                              |
| FFFF             |              | extra verbose localized date and time with seconds           | Wednesday, August 6, 2014, 1:07:04 PM Eastern Daylight Time |
| q                |              | quarter, no padding                                          | 9                                                           |
| qq               |              | quarter, padded to 2                                         | 13                                                          |



------



#### Change the `$luxon` method name

Provide a `methodName` in the settings object.



--------



### Tips

- Save and serve your datetimes from the server in the `utc` time zone and the `iso` or `sql` format. Then use the client's locale format.



------




### Changelog

**0.10.0**

- `output.lang` is changed to `output.locale` and the locale is now always set.
- ESM version added

**0.9.0**

- New API