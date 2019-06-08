const Process = require( '../models/process' );

exports.index = (req, res) => {
  Process.find()
    .then( processes => {
      res.render('processes/index', {
        processes: processes,
        title: 'Process Archive'
      })
    })
    .catch(err => {
      console.error( `Error: ${err}` );
      res.render('processes/index', {
        processes: [],
        title: 'Process Archive'
      })
    });
    res.render('processes/index', {
      processes: [],
      title: 'Process Archive'
    })
};

exports.show = (req, res) => {
  Process.findById(req.params.id)
  .then( (process) => {
    res.render( 'processes/show', {
      process: process,
      title: process.title
    })
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.new = (req, res) => {
  res.render( 'processes/new', {
    title: 'New Process Post'
  } );
};

exports.edit = (req, res) => {
  Process.findById(req.params.id)
  .then( (process) => {
    res.render( 'processes/edit', {
      process: process,
      title: process.title
    })
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.create = (req, res) => {

  // This is our form post object. The POST data is an object and has our desired keys.
  Process.create( req.body.process )
  .then(() => {res.redirect( `/processes` )})
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.update = (req, res) => {
  Process.updateOne({
    _id: req.body.id
  }, req.body.process, {
    runValidators: true
  } )
  .then(() => {
    res.redirect( `/processes/${req.body.id}` );
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

exports.destroy = (req, res) => {
  Process.deleteOne({
    _id: req.body.id
  })
  .then(() => {
    res.redirect( `/processes` );
  })
  .catch(err => {
    console.error( `Error: ${err}` )
  });
};

// To fill in later
exports.drafts = (req, res) => {};

exports.published = (req, res) => {};
