const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const BASE_DIRECTORY = __dirname + "/..";


module.exports = {
    entry: `${BASE_DIRECTORY}/src/index.js`,
    mode: "development",
    target: "web",
    output: {
        path: `${BASE_DIRECTORY}/public/`,
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    devServer: {
        contentBase: `${BASE_DIRECTORY}/public/`,
        compress: true,
        port: 3000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${BASE_DIRECTORY}/public/index.html`
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
}