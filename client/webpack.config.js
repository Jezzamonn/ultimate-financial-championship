const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const common = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
}

const client = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    devtool: 'source-map'
}

const server = {
    entry: './js/server/server.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.bundle.js'
    },
    // Needed to stop webpack from mangling some node things
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals({
        modulesFromFile: true
    })],
    target: 'node',
}

module.exports = [
    Object.assign({}, common, client),
    Object.assign({}, common, server),
];