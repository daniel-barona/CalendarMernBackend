const { Router } = require("express");
const { JWTvalidate } = require("../middleware/JWTvalidate");
const { getEvent, createEvent, deleteEvent, updateEvent } = require("../controllers/events");
const { check } = require("express-validator");
const { fieldValidate } = require("../middleware/fieldValidate");
const { validateDate } = require("../helpers/validateDate");

const router = Router()

//Validacion de JWT global 

router.use(JWTvalidate)


//GET

router.get('/', getEvent)

//POST

router.post('/',
    [
        check('title', 'The title is a required field').not().isEmpty(),
        check('start', 'The start date is a required field and/or must be a date').not().isEmpty().bail().isISO8601(),
        check('end', 'The end date is a required field and/or must be a date').not().isEmpty().bail().isISO8601().custom(validateDate),
        check('category', 'The category is a required field').not().isEmpty(),
        fieldValidate
    ], 
    createEvent)

//DELETE

router.delete('/:id', deleteEvent)

//UPDATE
router.put('/:id', updateEvent)

module.exports = router