var path = require("path");
var webpack = require("webpack");
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var svgoConfig = JSON.stringify({
    plugins: [
        {removeTitle: true},
        {convertColors: {shorthex: false}},
        {convertPathData: false}
    ]
});

module.exports = {
    cache: true,
    entry: {
        bundle: path.resolve(__dirname, 'src/app.js'),
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        loaders: [

            {test: /\.js$/, exclude: [node_modules_dir], loader: 'babel?stage=0'},

            // required for react jsx
            //{ test: /\.js$/,    loader: "jsx-loader" },
            //{ test: /\.jsx$/,   loader: "jsx-loader?insertPragma=React.DOM" },

            // required to write "require('./style.css')"
            //{ test: /\.css$/,    loader: "style-loader!css-loader" },
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']},

            // required for font icons
            {test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "file-loader?prefix=font/"},
            {test: /\.eot$/, loader: "file-loader?prefix=font/"},

            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=16384'},
            {test: /\.svg$/, loaders: ['file-loader', 'svgo-loader']}

        ]
    },
    resolve: {},
    plugins: []
};
