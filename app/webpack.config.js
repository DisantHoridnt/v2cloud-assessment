const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: "./frontend/static/js/index.js",
    output: { 
        filename: "bundle.js",
        path: path.resolve("frontend/static"),
        publicPath: '/static/',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                "useBuiltIns": "usage",
                                "corejs": 3,
                            }],
                            "@babel/preset-react"
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-private-methods'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            }
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'frontend/static'),
        },
        port: 3000,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }
}