var path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    debug: true,
    context: path.join(__dirname, 'src'),
    entry: {
        // собирать отдельно в html
        //order_pug: "pug-loader!./pug/pages/order.pug",
        //product_list_pug: "pug-loader!./pug/pages/product_list.pug",

        product_list: "./containers/ProductList/ProductList.js",
        order: "./containers/Order/Order.js",

        // копирование css в build
        //resourses: "./resources.js"
    },
    output: {
        path: path.join(__dirname, 'build', 'js'),
        filename: '[name].js'
    },
    module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
              'babel-loader?{presets: ["react", "es2015"]}',
              'eslint-loader'
            ],
          },
          //https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          }
        ],
    },
    plugins: [
      new ExtractTextPlugin("../css/styles.css")
      //new ExtractTextPlugin("[name].css")
    ],
    resolve: {
        extensions: [
            "",
            ".js",
            ".pug"
        ]
    }
}
