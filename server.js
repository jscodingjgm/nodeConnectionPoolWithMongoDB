const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

function connect(url) {
    return MongoClient.connect(url).then(client => client.db('moviedb'))
}

module.exports = async () => {
    let dbs = await Promise.all([connect(url)]); //multiple DB urls can be configured.
   
    return dbs[0];
}