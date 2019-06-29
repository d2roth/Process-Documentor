const express = require( 'express' );
const app = express();

// Import Page routes
const pageRoutes = require( './routes/pages' );
const userRoutes = require( './routes/users' );
const proceduresRoutes = require( './routes/procedures' );
const tasksRoutes = require( './routes/tasks' );
const sessionsRoutes = require( './routes/sessions' );
const scriptsRoutes = require( './routes/scripts' );

// Register our page routes.
// First parameter is the "prefix" for the routes contained within the folder.
app.use( '/', pageRoutes );
app.use( '/users', userRoutes );
app.use( '/procedures', proceduresRoutes );
app.use( '/tasks', tasksRoutes );

// Utility Routes
app.use( '/', sessionsRoutes );
app.use( '/js', scriptsRoutes );

module.exports = app;