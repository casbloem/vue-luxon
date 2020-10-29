 const extend = function () {
     let out = {};
     for (let i = 0, len = arguments.length; i < len; ++i) {
         let obj = arguments[i];
         if (!obj) continue;
         for (let key in obj) {
             if (!obj.hasOwnProperty(key) || !obj[key]) continue;
             if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
                 out[key] = extend(out[key], obj[key]);
                 continue;
             }
             out[key] = obj[key];
         }
     }
     return out;
 };
 export default extend;