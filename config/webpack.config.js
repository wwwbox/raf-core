const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");


const BASE_DIRECTORY = __dirname + "/..";
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(isDevelopment ? "DEVELOPMENT" : "PRODUCTION");

module.exports = {
    entry: [`${BASE_DIRECTORY}/src/index.js`],
    mode: isDevelopment ? "development" : "production",
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
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${BASE_DIRECTORY}/public/index.html`
        }),
        new ForkTsCheckerWebpackPlugin(),
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean)
}