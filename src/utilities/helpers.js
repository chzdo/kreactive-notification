const { default: axios } = require('axios');

module.exports = {
    callApi: async (config) => {
        try {
            const r = await axios.request({
                ...config,
            });
            console.log(r);
            return r.data;
        } catch (e) {
            console.log(e);
        }
    },
    getTemplate: (template, result) => {
        return Object.keys(result).reduce((prev, cur) => {
            const pattern = new RegExp(`#${cur}`, 'gi');
            return prev.replaceAll(pattern, result[cur]);
        }, template);
    },
};
