var path = require('path')

module.exports = {
    debug: true,
    context: path.join(__dirname, 'src'),
    entry: {
        // собирать отдельно в html
        //order_pug: "pug-loader!./pug/pages/order.pug",
        //product_list_pug: "pug-loader!./pug/pages/product_list.pug",
        product_list: "./js/pages/product_list.js",
        order: "./js/pages/order.js"
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
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ],
    },
    resolve: {
        extensions: [
            "",
            ".js",
            ".pug"
        ]
    }
}
