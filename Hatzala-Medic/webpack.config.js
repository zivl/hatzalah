var webpack = require("webpack");

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

module.exports = {
    devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
    entry: {
        bundle: getEntrySources([
            './src/app.js'
        ])
    },
    output: {
        path: "/",
        // no real path is required, just pass "/"
        // but it will work with other paths too.
        publicPath: 'http://localhost:8080/',
        filename: 'dist/[name].js'
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader?stage=0'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=16384'}
        ]
    },
    plugins: []
};
