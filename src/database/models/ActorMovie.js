module.exports = (sequelize, dataTypes) => {
    let alias = 'ActorMovie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movie_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        actor_id: {
            type: dataTypes.INTEGER.UNSIGNED
        }
    };
    let config = {
        tableName: 'actor_movie',
        timestamps: false
    };
    const ActorMovie = sequelize.define(alias, cols, config)

    return ActorMovie
}