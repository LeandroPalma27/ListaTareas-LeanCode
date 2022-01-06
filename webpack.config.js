const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

/* let otherHtmlPageNames = [];
let multipleHtmlPlugins = otherHtmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        filename: `resources/${name}.html`,
        template: `./src/resources/${name}.html`,
        chunks: [`${name}`],
        scriptLoading: 'blocking',
    })
});

let entryJsPropertieFiles = otherHtmlPageNames.map(name => {
    return JSON.parse(`{ "${name}": "./src/js/${name}.js", "${name}": "./src/js/${name}.js" }`);
});

let entries = {};

for (file of entryJsPropertieFiles) {
    entries = Object.assign(entries, file);
} */

module.exports = {

    mode: 'development',

    entry: {
        index: ['./src/js/index.js',],
        /* ...entries */
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: [/styles.css$/, /index.css$/],
                use: ["style-loader", "css-loader"],
            },
            {
                test: [/index.css$/],
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img',
                },
            },
            /* {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            { test: /\.txt$/, use: 'raw-loader' } */
        ],
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        client: {
            logging: 'info',
        },
    },

    optimization: {},

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            /* excludeChunks: [...otherHtmlPageNames], */
            scriptLoading: 'blocking',
        }),
        new HtmlWebpackPlugin({ 
            filename: 'styles.css',
            template: './src/styles.css',
            inject: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets", to: "assets/" },
            ],
        }),
    ]/* .concat(multipleHtmlPlugins), */

};