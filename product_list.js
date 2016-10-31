const pug = require('pug');

console.log(pug.compileFile('./src/pug/pages/product_list.pug', {
    //"debug": true,
    "pretty": true,
})());
