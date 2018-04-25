let LBC = require('./scrape-lbc');
let Param = require('./param');


Param.get().then((params) => {
    return LBC.search(params);
}).then(results => {
    console.log(results);
});
