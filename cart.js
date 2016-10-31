const pug = require('pug');

//console.log(pug.compile('p check it out! #{ch}')({'ch': 123}));
// node e.js > build/cart.htm
console.log(pug.compileFile('./src/pug/pages/cart.pug', {
    //"debug": true,
    "pretty": true,
})());
