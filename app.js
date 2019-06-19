require( 'dotenv' ).config();

// Mongoose
const mongoose = require( 'mongoose' );
mongoose.connect( process.env.DB_URI, {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  useNewUrlParser: true
} ).catch( err => { console.error( `Could not connect: ${err}` ) });

// End Mongoose

const express = require( 'express' );
const path = require( 'path' );
const sassMiddleware = require( 'node-sass-middleware' );

const app = express();

// Body Parser
const bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
  extended: true
}) );
// End Parser

// SASS Parse
app.use(sassMiddleware({
    /* Options */
    src: path.join( __dirname, 'assets', 'scss' ),
    dest: path.join(__dirname, 'assets', 'stylesheets'),
    // debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// Our views path
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'pug' );
app.use( '/css', express.static('assets/stylesheets') );
app.use( '/js', express.static('assets/javascripts') );
app.use( '/images', express.static('assets/images') );

// Our Routes
const routes = require( './routes.js' );
app.use( '/', routes );

const port = (process.env.PORT || 4000);
app.listen( port, () => console.log( `Listening on ${port}`) );