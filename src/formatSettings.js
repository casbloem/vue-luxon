import extend from "./extend";
import templates from "./templates";
import defaultSettings from "./settings";
export default (settings) => {
    if (typeof settings != 'object') throw "formatSettings.js: `settings` is not an object";
    //if (!settings.input || !settings.output) throw "formatSettings.js: `settings.input` or `settings.output` is undefined";

    const temps = extend(templates, settings.templates);



    if (typeof settings.input == "string") {
        var inputTemplateName = settings.input.toLowerCase();
        if (temps[inputTemplateName]) settings.input = temps[inputTemplateName];
        else settings.input = {
            format: settings.input
        }
    }

    if (typeof settings.output == "string") {
        var outputTemplateName = settings.output.toLowerCase();
        if (temps[outputTemplateName]) settings.output = temps[outputTemplateName];
        else settings.output = {
            format: settings.output
        }
    }

    if (settings.relative) settings.output.relative = settings.relative;
    if (settings.locale) settings.output.locale = settings.locale;

    const getFormat = obj => {
        if (typeof obj == 'object') return obj;
        const format = obj.toLowerCase();
        return temps[format] ? temps[format].format : obj;
    };

    const getZone = obj => {
        const zone = obj.toLowerCase();
        return temps[zone] ? temps[zone].zone : obj;
    };

    const getRelativeFormat = (obj) => {
        if (typeof obj == 'object') return obj;
        const RelativeFormat = obj.toLowerCase();
        return temps[RelativeFormat] ? temps[RelativeFormat].relative : obj;
    };

    settings = extend(defaultSettings, settings);

    settings.input.format = getFormat(settings.input.format);
    settings.output.format = getFormat(settings.output.format);
    settings.input.zone = getZone(settings.input.zone);
    settings.output.zone = getZone(settings.output.zone);
    settings.output.relative = getRelativeFormat(settings.output.relative);


    return settings;
}