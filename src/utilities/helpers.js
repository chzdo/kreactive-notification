const { default: axios } = require('axios');
const { Logger } = require('./logger');

module.exports = {
    callApi: async (config) => {
        try {
            const { data } = await axios.request({
                ...config,
            });
            return data;
        } catch (e) {
            Logger.error({e})
        }
    },
    getTemplate: (template, result) => {
        return Object.keys(result).reduce((prev, cur) => {
            const pattern = new RegExp(`#${cur}`, 'gi');
            return prev.replaceAll(pattern, result[cur]);
        }, template);
    },
};
