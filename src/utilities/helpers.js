const { default: axios } = require('axios');

module.exports = {
    callApi: async (config) => {
        try {
            const { data } = await axios.request({
                ...config,
            });

            return data;
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
