const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

dotenv.config({ path: './.envLocal' })

const app = express();
const port = process.env.PORT || 4000;
const origin = process.env.ORIGIN;

app.use(cors({
  origin: origin,
}));

app.use( express.static( 'ux/build' ) );
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(fileUpload());


//Auth Routes
app.use('/auth', require('./routes/auth'));

//Setup Routes
app.use('/setup', require('./routes/setup'));
//Global Routes
app.use('/global', require('./routes/global'));

//Customer Routes
app.use('/customers', require('./routes/customers'));

//Trailer Routes
app.use('/trailers', require('./routes/trailers'));

//Vehicles Routes
app.use('/vehicles', require('./routes/vehicles'));

//Carrier Routes
app.use('/carriers', require('./routes/carriers'));

//Users Routes
app.use('/users', require('./routes/users'));

//Roles Routes
//app.use('/roles', require('./routes/role'));  

//Vendors Routes
app.use('/vendors', require('./routes/vendors'));

//Purchases Routes
app.use('/purchases', require('./routes/purchases'));

//Production Routes
app.use('/production', require('./routes/production'));

//Orders Routes
app.use('/orders', require('./routes/orders'));

//Items Routes
app.use('/items', require('./routes/items'));

//Pool Routes
app.use('/pools', require('./routes/pools'));


app.get('*', ( req, res ) => {
  res.sendFile( path.join( __dirname+'/ux/build/index.html' ));
});

const server = app.listen(port, () => {
  console.log(`app listening at ${origin}:${port}`);
});