const pug = require('pug');

//console.log(pug.compile('p check it out! #{ch}')({'ch': 123}));
console.log(pug.compileFile('./src/pug/pages/order.pug', {
    //"debug": true,
    "pretty": true,
})());
