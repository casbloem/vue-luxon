import extend from "./extend";
import formatSettings from "./formatSettings.js";
import format from "./format";
export default {
    vueluxon: function (optionsUser) {
        return (str, optionsFilter, optionsForce) => {
            if (str && typeof str == "object") {
                optionsFilter = str;
                if (!str.value) throw "The first parameter should be a string, or the object should contain a `value` property"
                str = str.value;
            }

            if (typeof optionsFilter == "string") {
                optionsFilter = {
                    output: {
                        format: optionsFilter
                    }
                }
            }

            return format(str, formatSettings(extend(optionsUser, optionsFilter, optionsForce)));
        };
    },
    install: function (Vue, optionsUser) {
        const vueluxon = this.vueluxon(optionsUser);

        const method_name = optionsUser && optionsUser.methodName ? optionsUser.methodName : "$luxon";
        Vue.prototype[method_name] = vueluxon;

        Vue.filter("luxon", function () {
            if (typeof arguments[1] == 'string')
                return vueluxon(arguments[0], arguments[2], {
                    output: {
                        format: arguments[1]
                    }
                });
            return vueluxon(arguments[0], arguments[1]);
        });

        const RelativeFormat = function () {
            return vueluxon(arguments[0], arguments[2], {
                output: {
                    format: "relative",
                    relative: arguments[1]
                }
            });
        };
        
        Vue.filter("luxonRelative", RelativeFormat);
    }
};
