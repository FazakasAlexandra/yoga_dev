const path = require('path')

module.exports = {
    i18n: {
        locales: ['en', 'ro'],
        defaultLocale: 'ro',
        localePath: path.resolve('./public/locales'),
    },
}