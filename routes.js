const express = require( 'express' );
const app = express();

// Import Page routes
const pageRoutes = require( './routes/pages' );
const proceduresRoutes = require( './routes/procedures' );
const scriptsRoutes = require( './routes/scripts' );

// Register our page routes.
// First parameter is the "prefix" for the routes contained within the folder.
app.use( '/', pageRoutes );
app.use( '/procedures', proceduresRoutes );

app.use( '/js', scriptsRoutes );

module.exports = app;