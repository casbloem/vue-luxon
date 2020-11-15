import extend from "./extend";
export default {
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
        lang: null,
        relative: {
            round: true,
            unit: null
        }
    },
    parse: false

}