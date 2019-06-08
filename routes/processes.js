const router = require( 'express' ).Router();

const ProcessesController = require( '../controllers/processesController' );

// Begin routes

router.get( `/`, ProcessesController.index );
router.get( `/new`, ProcessesController.new );
router.get( `/:id`, ProcessesController.show );
router.get( `/:id/edit`, ProcessesController.edit );
router.post( `/`, ProcessesController.create );
router.post( `/update`, ProcessesController.update );
router.post( `/destroy`, ProcessesController.destroy );

// End routes

module.exports = router;