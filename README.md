# vue-luxon
Easy use of Luxon in Vue
Providing a filter for datetime parsing and formating.

## Install
```
npm install casbloem/vue-luxon --save
```

## Use
```javascript
import VueLuxon from 'vue-luxon';
Vue.use(VueLuxon);
```

### Vue Filter usage
```javascript
{{ variable | function }}
```

```javascript
{{ item.updated_at | diffForHumans }}
```


