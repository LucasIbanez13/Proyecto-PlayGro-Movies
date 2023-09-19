module.exports = (sequelize, dataTypes) => {

    const alias = "Movie";
    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allwNull : false,
            autoIncrement : true
        },
        title : {
            type : dataTypes.STRING(500),
            allwNull : false,
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allwNull : false,
        },
        awards : {
            type : dataTypes.INTEGER.UNSIGNED,
            allwNull : false,
            defaultValue : 0
        },
        release_date : {
            type : dataTypes.DATE,
            allwNull : false,
        },
        length : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        },
        genre_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        }
    }

    const config = {
        tableName : "movies",
        timeStamps : true,
        underscored : true
    }


    const Movie = sequelize.define(alias, cols, config);

    return Movie
}