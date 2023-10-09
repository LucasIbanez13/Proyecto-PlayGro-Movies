const { check, body } = require('express-validator');

module.exports = [
    check('title')
        .notEmpty().withMessage('Agregue el título'),
    check('rating')
        .notEmpty().withMessage('Agregue el rating').bail()
        .isDecimal().withMessage('El rating debe ser un número'),
    check('awards')
        .notEmpty().withMessage('Agregue la cantidad de premios.').bail()
        .isDecimal().withMessage('Este campo debe ser un número'),
    check('release_date')
        .notEmpty().withMessage('Agregue la fecha de estreno'),
    check('length')
        .notEmpty().withMessage('Agregue la duración.').bail()
        .isDecimal().withMessage('La duración debe ser un número'),
]