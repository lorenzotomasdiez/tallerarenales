const { Router } = require("express")
const { check } = require("express-validator")
const { createUser, loginUser, revalidToken } = require("../controllers/auth")
const { fieldValidator } = require("../middlewares/fieldValidator")
const  validateJwt  = require("../middlewares/validateJwt")

const router = Router();

router.post(
    '/new',
    [//middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({min:6}),
        fieldValidator
    ],
    createUser
)

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({min:6}),
        fieldValidator
    ],
    loginUser
)


router.get('/renew', validateJwt ,revalidToken)

module.exports = router