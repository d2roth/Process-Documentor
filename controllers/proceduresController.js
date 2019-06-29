const Procedure = require( '../models/procedure' );

exports.index = (req, res) => {
  req.isAuthenticated();
  Procedure.find()
    .then( procedures => {
      res.render('procedures/index', {
        procedures: procedures,
        title: 'All Procedures'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect( '/' );
    });
};

exports.drafts = (req, res) => {
  req.isAuthenticated();
  Procedure.find().drafts()
  .populate('tasks')
    .then( procedures => {
      res.render('procedures/index', {
        procedures: procedures,
        title: 'Draft Procedures'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
    });
};

exports.published = (req, res) => {
  req.isAuthenticated();
  Procedure.find().published()
  .populate('tasks')
    .then( procedures => {
      res.render('procedures/index', {
        procedures: procedures,
        title: 'Published Procedures'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();
  Procedure.findById(req.params.id)
  .populate('tasks')
  .then( (procedure) => {
    res.render( 'procedures/show', {
      procedure: procedure,
      title: procedure.title
    })
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.flash('error', `ERROR: ${err}`);
    res.redirect( '/' );
  });
};

exports.new = (req, res) => {
  req.isAuthenticated();
  let procedure = req.session.procedure ? req.session.procedure : null;
  req.session.procedure = null;
  
  res.render( 'procedures/new', {
    procedure: procedure,
    title: 'New Procedure Post'
  } );
};

exports.edit = (req, res) => {
  req.isAuthenticated();
  if( process.env.SKIP_DATABASE ){
    res.locals.flash.error.push('This view is not connected to the database! Remove or turn off SKIP_DATABASE in your environment variables.');
    res.render( 'procedures/edit', {
      procedure: null,
      title: 'Some fake procedure',
    });
  } else {
    Procedure.findById(req.params.id)
    .then( (procedure) => {
      res.render( 'procedures/edit', {
        procedure: procedure,
        title: procedure.title
      })
    })
    .catch(err => {
      console.error( `Error: ${err}` );
      req.flash('error', `ERROR: ${err}`);
      res.redirect( '/' );
    });
  }
};

exports.create = (req, res) => {
  req.isAuthenticated();
  // This is our form post object. The POST data is an object and has our desired keys.
  Procedure.create( req.body.procedure )
  .then(() => {
    req.flash('success', `Congrats! ${req.body.procedure.title} was created successfully.`);
    res.redirect( `/procedures` );
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.session.procedure = req.body.procedure;
    req.flash('error', `ERROR: ${err}`);
    res.redirect( '/procedures/new' );
  });
};

exports.update = (req, res) => {
  req.isAuthenticated();
  Procedure.updateOne({
    _id: req.body.id
  }, req.body.procedure, {
    runValidators: true
  } )
  .then(() => {
    res.redirect( `/procedures/${req.body.id}` );
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.flash('error', `ERROR: ${err}`);
    res.redirect( `/procedures/${req.body.id}/edit` );
  });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();
  Procedure.deleteOne({
    _id: req.body.id
  })
  .then(() => {
    res.redirect( `/procedures` );
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.flash('error', `ERROR: ${err}`);
    res.redirect( '/' );
  });
};