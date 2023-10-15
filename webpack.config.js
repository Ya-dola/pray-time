const path = require('path');

module.exports = {
    // other webpack config options...

    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'file-loader',
                type: 'javascript/auto',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
};
