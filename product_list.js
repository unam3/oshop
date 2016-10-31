const pug = require('pug');

// node e.js > build/product_list.htm
console.log(pug.compileFile('./src/pug/pages/product_list.pug', {
    //"debug": true,
    "pretty": true,
})());
