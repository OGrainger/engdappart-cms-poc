const fetch = require('fetch');
const cheerio = require('cheerio');

module.exports = {
    search: (params) => {
        return new Promise((resolve, reject) => {
            if (!params.state) reject('No region selected');
            let url = `https://www.leboncoin.fr/locations/offres/${params.state}/?th=1&&ret=2`;
            if (params.locations) url += `&location=${encodeURIComponent(params.locations.join(','))}`;
            if (params.loyer_min) url += `&mrs=${params.loyer_min}`;
            if (params.loyer_max) url += `&mre=${params.loyer_max}`;
            if (params.surface_min) url += `&sqs=${params.surface_min}`;
            if (params.surface_max) url += `&sqe=${params.surface_max}`;
            if (params.meuble) url += `&furn=${params.meuble}`;
            if (params.q) url += `&q=${encodeURIComponent(params.q)}`;
            if (params.annonceur) url += `&f=${encodeURIComponent(params.annonceur === 'Particuliers' ? 'p' : 'c')}`;

            console.log(url);
            fetch.fetchUrl(url, (e, m, b) => {
                if (e) reject(e);
                const $ = cheerio.load(b.toString());
                let list = [];
                $('li[itemtype*=Offer]').each((index, root) => {
                    let result = {
                        title: root.children[1].attribs.title,
                        link: `https:${root.children[1].attribs.href}`
                    };
                    list.push(result);
                });
                resolve(list);
            });
        });
    }/*,
    offerDetails: (offer) => {
        return new Promise((resolve, reject) => {
            if (!offer.link) reject('No link provided');
            fetch.fetchUrl(offer.link, (e, m, b) => {
                console.log(b.toString());
            });
        });
    }*/
};