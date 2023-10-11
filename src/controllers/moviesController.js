const db = require('../database/models');
const moment = require('moment');
const { validationResult } = require('express-validator');

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    },
    add: function (req, res) {
        const genres = db.Genre.findAll({
            order: ["name"],
        })
        const actors = db.Actor.findAll({
            order: [
                ['first_name'],
                ['last_name']
            ]
        })
        Promise.all([genres,actors])
        .then(([genres,actors]) => {
            return res.render("moviesAdd",{
                genres,
                actors
            })
        })
    },
    create: function (req, res) {
        // TODO
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const { title, rating, awards, release_date, length, genre_id } = req.body

            db.Movie.create({
                title: title.trim(),
                rating,
                awards,
                release_date,
                length,
                genre_id
            })
                .then(movie => {
                    console.log(movie);
                    return res.redirect('/movies')
                })
                .catch(error => console.log(error))
        } else {
            return res.render('moviesAdd', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    edit: function (req, res) {
        // TODO
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                return res.render('moviesEdit', {
                    Movie: movie,
                    moment
                })
            })
            .catch(error => console.log(error))
    },
    update: function (req, res) {
        // TODO
        const { title, rating, awards, release_date, length, genre_id} = req.body

        db.Movie.update(
            {
                title: title.trim(),
                rating,
                awards,
                release_date,
                length,
                genre_id
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(response => {
                return res.redirect('/movies/detail/' + req.params.id)
            })
            .catch(error => console.log(error))

    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then((movie) => {
                return res.render("moviesDelete", {
                    movie,
                });
            })
            .catch((error) => console.log(error));
    },
    destroy: function (req, res) {

        db.ActorMovie.destroy({
            where: {
                movie_id: req.params.id,
            },
        })
            .then((response) => {
                console.log('response ActorMovie =>', response);
                db.Actor.update(
                    {
                        favorite_movie_id: null
                    },
                    {
                        where: {
                            favorite_movie_id: req.params.id
                        }
                    }
                )
                    .then((response) => {
                        console.log('response Actor =>', response);
                        db.Movie.destroy({
                            where: {
                                id: req.params.id,
                            },
                        })
                            .then((response) => {
                                console.log('response Movie =>', response);
                                return res.redirect('/movies')
                            })
                    })

            })
            .catch((error) => console.log(error));
    },
}

module.exports = moviesController;