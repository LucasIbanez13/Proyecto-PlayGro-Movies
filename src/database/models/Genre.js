module.exports = (sequelize, dataTypes) => {

    const alias = "Genre";
    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allwNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING(100),
            allwNull : false,
        },
        ranking : {
            type : dataTypes.INTEGER.UNSIGNED,
            allwNull : false,
            unique : true
        },
        active : {
            type : dataTypes.BOOLEAN,
            allwNull : false,
            defaultValue : 1
        }
    }

    const config = {
        tableName : "genres",
        timeStamps : true,
        underscored : true
    }


    const Genre = sequelize.define(alias, cols, config);

    return Genre
}