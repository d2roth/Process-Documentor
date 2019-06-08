const express = require( 'express' );
const app = express();

// Import Page routes
const pageRoutes = require( './routes/pages' );
const processesRoutes = require( './routes/processes' );

// Register our page routes.
// First parameter is the "prefix" for the routes contained within the folder.
app.use( '/', pageRoutes );
app.use( '/processes', processesRoutes );

module.exports = app;