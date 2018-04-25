let fs = require('fs');

module.exports = {
    get: () => {
        return new Promise((resolve, reject) => {

            fs.readFile('./param.json', 'utf8', (err,data) => {
                if (err) {
                    reject(err);
                }
                let json = JSON.parse(data);
                resolve(json[0]);
            });
        });
    }
};