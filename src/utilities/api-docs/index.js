const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./pages/components');
const tags = require('./pages/tags');
const routes = require('./pages');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...routes,
};
