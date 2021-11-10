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

app.use(express.static('ux/build'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

//-------------------------------------------------------
//Global Routes
app.use('/global', require('./routes/global'));
//-------------------------------------------------------
//Auth Routes
app.use('/auth', require('./routes/auth'));
//-------------------------------------------------------
//Setup Routes
app.use('/setup', require('./routes/setup'));
//-------------------------------------------------------
//Customer Routes
app.use('/customers', require('./routes/customers'));
//-------------------------------------------------------
//Vendors Routes
app.use('/vendors', require('./routes/vendors'));
//-------------------------------------------------------
//Carrier Routes
app.use('/carriers', require('./routes/carriers'));

//Vehicles Routes
app.use('/vehicles', require('./routes/vehicles'));

//Trailer Routes
app.use('/trailers', require('./routes/trailers'));
//-------------------------------------------------------
//Pool Routes
app.use('/pools', require('./routes/pools'));
//-------------------------------------------------------
//Items Routes
app.use('/items', require('./routes/items'));
//-------------------------------------------------------
//Purchases Routes
app.use('/purchases', require('./routes/purchases'));
//-------------------------------------------------------
//Orders Routes
app.use('/orders', require('./routes/orders'));
//-------------------------------------------------------
//Production Routes
app.use('/production', require('./routes/production'));
//-------------------------------------------------------
//Delivery Routes
app.use('/delivery', require('./routes/delivery'));
//-------------------------------------------------------
//Users Routes
app.use('/users', require('./routes/users'));
//-------------------------------------------------------
//Calendar Routes
app.use('/calendar', require('./routes/calendar'));
//-------------------------------------------------------
//Roles Routes
app.use('/roles', require('./routes/role'));
//-------------------------------------------------------
//Alerts Routes
app.use('/alerts', require('./routes/alerts'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/ux/build/index.html'));
});

const server = app.listen(port, () => {
  console.log(`app listening at ${origin}:${port}`);
});