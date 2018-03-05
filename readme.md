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

## Functions / Filters
filter | arguments | description
--- | --- | ---
format | string | a string formatted according to the specified format string
locale |  | a localized string representing the date
diffForHumans |  | displaying humanized strings



