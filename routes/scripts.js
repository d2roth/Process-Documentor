const router = require( 'express' ).Router();
const path = require( 'path' );

// Create our routes
router.get( `/pell.js`, (req, res) =>{
  res.sendFile(path.resolve( __dirname + '/../node_modules/pell/dist/pell.min.js' ) );
} );

module.exports = router;