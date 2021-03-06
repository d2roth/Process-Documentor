const router = require( 'express' ).Router();

// Our controllers
const PagesController = require( '../controllers/pagesController')

// Create our routes
router.get( `/`, PagesController.show );
router.get( `/contact`, PagesController.show );
router.get( `/register`, (req, res) => {res.redirect('/users/new')} );

module.exports = router;