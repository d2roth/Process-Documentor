const Task = require( '../models/task' );

exports.index = (req, res) => {
  Task.find()
    .then( tasks => {
      res.render('tasks/index', {
        tasks: tasks,
        title: 'All Tasks'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect( '/' );
    });
};

exports.drafts = (req, res) => {
  Task.find().drafts()
  .populate('tasks')
    .then( tasks => {
      res.render('tasks/index', {
        tasks: tasks,
        title: 'Draft Tasks'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
    });
};

exports.published = (req, res) => {
  Task.find().published()
  .populate('tasks')
    .then( tasks => {
      res.render('tasks/index', {
        tasks: tasks,
        title: 'Published Tasks'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
    });
};

exports.show = (req, res) => {
  Task.findById(req.params.id)
  .then( (task) => {
    res.render( 'tasks/show', {
      task: task,
      title: task.title
    })
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.flash('error', `ERROR: ${err}`);
    res.redirect( '/' );
  });
};

exports.new = (req, res) => {
  let task = req.session.task ? req.session.task : null;
  req.session.task = null;
  
  res.render( 'tasks/new', {
    task: task,
    title: 'New Task Post'
  } );
};

exports.edit = (req, res) => {
  if( process.env.SKIP_DATABASE && process.env.SKIP_DATABASE == true ){
    res.locals.flash.error.push('This view is not connected to the database! Remove or turn off SKIP_DATABASE in your environment variables.');
    res.render( 'tasks/edit', {
      task: {
        title: 'Some fake task'
      },
      title: 'Some fake task',
    });
  } else {
    Task.findById(req.params.id)
      .then( (task) => {
        res.render( 'tasks/edit', {
          task: task,
          title: task.title
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
  let sentBlocks = req.body.task.blocks;
  let sortedBlocks = [];

  // Re-order our items based on how they visually were displayed
  for (order of req.body.block_order){
    sortedBlocks.push(sentBlocks[order]);
  }

  req.body.task.blocks = sortedBlocks;

  // This is our form post object. The POST data is an object and has our desired keys.
  Task.create( req.body.task )
  .then(() => {
    req.flash('success', `Congrats! ${req.body.task.title} was created successfully.`);
    res.redirect( `/tasks` );
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.session.task = req.body.task;
    req.flash('error', `ERROR: ${err}`);
    res.redirect( '/tasks/new' );
  });
};

exports.update = (req, res) => {
  console.log( req.body.task );
  // return;
  Task.updateOne({
    _id: req.body.id
  }, req.body.task, {
    runValidators: true
  } )
  .then(() => {
    res.redirect( `/tasks/${req.body.id}` );
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.flash('error', `ERROR: ${err}`);
    res.redirect( `/tasks/${req.body.id}/edit` );
  });
};

exports.destroy = (req, res) => {
  Task.deleteOne({
    _id: req.body.id
  })
  .then(() => {
    res.redirect( `/tasks` );
  })
  .catch(err => {
    console.error( `Error: ${err}` );
    req.flash('error', `ERROR: ${err}`);
    res.redirect( '/' );
  });
};