const Procedure = require( '../models/procedure' );

exports.index = (req, res) => {
  Procedure.find()
    .then( procedures => {
      res.render('procedures/index', {
        procedures: procedures,
        title: 'Procedure Archive'
      })
    })
    .catch(err => {
      console.error( `Error: ${err}` );
    });
};

exports.show = (req, res) => {
  Procedure.findById(req.params.id)
  .then( (procedure) => {
    res.render( 'procedures/show', {
      procedure: procedure,
      title: procedure.title
    })
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.new = (req, res) => {
  res.render( 'procedures/new', {
    title: 'New Procedure Post'
  } );
};

exports.edit = (req, res) => {
  Procedure.findById(req.params.id)
  .then( (procedure) => {
    res.render( 'procedures/edit', {
      procedure: procedure,
      title: procedure.title
    })
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.create = (req, res) => {

  // This is our form post object. The POST data is an object and has our desired keys.
  Procedure.create( req.body.procedure )
  .then(() => {res.redirect( `/procedures` )})
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.update = (req, res) => {
  Procedure.updateOne({
    _id: req.body.id
  }, req.body.procedure, {
    runValidators: true
  } )
  .then(() => {
    res.redirect( `/procedures/${req.body.id}` );
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.destroy = (req, res) => {
  Procedure.deleteOne({
    _id: req.body.id
  })
  .then(() => {
    res.redirect( `/procedures` );
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

// To fill in later
exports.drafts = (req, res) => {};

exports.published = (req, res) => {};
