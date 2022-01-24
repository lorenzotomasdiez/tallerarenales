const {Router} = require('express')
const {check} = require('express-validator')

const {isDate} = require('../helpers/isDate')
const {fieldValidator} = require('../middlewares/fieldValidator')
const validateJwt = require('../middlewares/validateJwt')
const {getTramites, createTramite, updateTramite, deleteTramite} = require('../controllers/tramites')

const router = Router()

router.use(validateJwt)

//get tramites
router.get('/', getTramites)

//create tramite
router.post(
    '/',
    [
        check('user', 'Be logged in is required').not().isEmpty(),
        check('plate', 'The plate is required to create a Tramite').not().isEmpty(),
        check('date', 'The date is required to create a Tramite').custom(isDate),
        fieldValidator
    ],
    createTramite
)
//update tramite
router.put(
    '/:id',
    [
        check('user', 'Be logged in is required').not().isEmpty(),
        check('plate', 'The plate is required to create a Tramite').not().isEmpty(),
        check('date', 'The date is required to create a Tramite').custom(isDate),
    ],
    updateTramite
)
//delete tramite
router.delete(
    '/:id', deleteTramite
)

module.exports = router