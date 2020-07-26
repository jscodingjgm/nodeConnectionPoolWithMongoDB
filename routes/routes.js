const assert = require('assert');
const fs = require('fs');

const movieRoutes = (app, client) => {
    // Database Name
    const dbName = 'moviedb';

    const buffer = fs.readFileSync('./movies.json');
    const movies = JSON.parse(buffer);
    
    app.get('/getAllMovies', (req, res) => {
        const col = client.collection('movies');
        let documentArr = [];
        col.find({}).each((err, doc) => {
            assert.equal(null, err);
            if(doc != null)
                documentArr.push(doc);
            if(doc == null){
                res.json(documentArr);
            }
        });
    });

    app.get('/createMovieCollection', (req, res) => {
        client.createCollection('movies', {},function(err, results) {
            if(err)
                console.log('errr>>>>>>', err);
            
            console.log('Collection Created!');
            res.json({'message' : 'Collection Created Successfuly!'});
        });
    });

    app.get('/insertToMovieCollection', (req, res) => {
        client.collection('movies').insertMany(movies, (err, r) => {
            if(err)
                res.json({'message' : err});
            assert.equal(5, r.insertedCount);
            res.json({'message' : 'record insertion successful!'});
        });
    });

    app.get('/getMovieByName/:name', (req, res) => {
        client.collection('movies').findOne({'name' : req.params.name}, (err, r) => {
            if(err)
                res.json({message : 'Failed to fetch'});
            res.json({data : r});
        });
    });

    app.get('/getThreeTopRatedMovie', (req, res) => {
        let docArr = [];
        client.collection('movies').find({rating : { $gt : '8.7'}})
        .limit(3)
        .each((err, doc) => {
            assert.equal(null, err);
            if(doc != null)
                docArr.push(doc);
            if(doc == null)
                res.json(docArr); 
        });
    });

    app.get('/updateDocument/:movieName/:acheivement', (req, res) => {
        client.collection('movies').update({name: req.params.movieName}, {$set: {acheivement : req.params.acheivement}}, (err, r) => {
            if(err)
                console.log('errr>>>>>>', err);
            res.json({'message' : 'record updated successful!'});
        });
    });

    app.get('/getAcheivementMovies', (req, res) => {
        let documentArr = [];
        client.collection('movies').find(
            {$and : [{
                    $or:[
                        {acheivement : 'Super hit'}, 
                        {acheivement : 'Super Duper Hit'}
                    ]
                }
            ]})
            .each((err, doc) => {
                if(err)
                    res.json({message : 'Failed to retreive record!'});
                if(doc != null)
                    documentArr.push(doc);
                if(doc == null)
                    res.json(documentArr);
        });
    });

    app.get('/getRecordHavingKey/:key', (req, res) => {
        let documentArr = [];
        client.collection('movies').find({[req.params.key] : { $exists : true }}).each((err, doc) => {
            if(err)
                res.json({message : 'Failed to retreive record!'});
            if(doc != null)
                documentArr.push(doc);
            if(doc == null)
                res.json(documentArr);
        });
    });

    return app;
}

module.exports = movieRoutes;