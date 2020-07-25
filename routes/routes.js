const assert = require('assert');

const movieRoutes = (app, client) => {
    // Database Name
    const dbName = 'moviedb';

    const movies = [
        {
            'name' : 'The Dark Knight',
            'genres': [
                'Action',
                'Crime',
                'Drama'
            ],
            'language' : 'English',
            'rating' : '9.0'
        },
        {
            'name' : 'Forrest Gump',
            'genres': [
                'Comedy',
                'Romance',
                'Drama'
            ],
            'language' : 'English',
            'rating' : '8.8'
        },
        {
            'name' : 'Inception',
            'genres': [
                'Action',
                'Adventure',
                'Sci-Fi'
            ],
            'language' : 'English',
            'rating' : '8.8'
        },
        {
            'name' : 'Interstellar',
            'genres': [
                'Action',
                'Sci-Fi',
                'Drama'
            ],
            'language' : 'English',
            'rating' : '8.6'
        },
        {
            'name' : 'Matrix',
            'genres': [
                'Action',
                'Sci-Fi'
            ],
            'language' : 'English',
            'rating' : '8.7'
        }
    ];
    
    app.get('/getAllMovies', (req, res) => {
        const col = client.collection('movies');
        let documentArr = [];
        col.find({}).each((err, doc) => {
            assert.equal(null, err);
            documentArr.push(doc);
            if(doc == null){
                res.json(documentArr);
            }
        });
    });

    app.get('/createMovieCollection', (req, res) => {
        client.createCollection('movies1', {},function(err, results) {
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

    return app;
}

module.exports = movieRoutes;