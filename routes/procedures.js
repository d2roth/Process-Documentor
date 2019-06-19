const router = require( 'express' ).Router();

const ProceduresController = require( '../controllers/proceduresController' );

// Begin routes

router.get( `/`, ProceduresController.index );
router.get( `/new`, ProceduresController.new );
router.get( `/:id`, ProceduresController.show );
router.get( `/:id/edit`, ProceduresController.edit );
router.post( `/`, ProceduresController.create );
router.post( `/update`, ProceduresController.update );
router.post( `/destroy`, ProceduresController.destroy );

// End routes

module.exports = router;