# vue-luxon
Easy use of Luxon in Vue
Providing a filter for datetime parsing and formating.

###### next update (05/01) will contain all functions

## Install
```
npm install vue-luxon --save
```

## Use
```javascript
import VueLuxon from 'vue-luxon';
Vue.use(VueLuxon,{
   serverZone: 'UTC',
   serverFormat: 'U',
   clientZone: 'local',
   clientFormat: 'local',
   beforeParse: () => {},
   
});
```

### Vue Filter usage
```javascript
{{ variable | filter }}
```

```javascript
{{ item.updated_at | diffForHumans }}
```

## Filters
filter | arguments | description
--- | --- | ---
format | string | a string formatted according to the specified format string
locale |  | a localized string representing the date
diffForHumans |  | displaying humanized strings



