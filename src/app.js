const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const  config =  require('./config')

const app = express();
const router = express.Router();

// carrega banco
mongoose.connect(config.conectionString);


//carrega model product

const Product = require('../src/models/product');
const Customer = require('../src/models/customer');
const Order = require('../src/models/order');
const  indexRoutes = require('../src/rotas/index');
const  productRoutes = require('../src/rotas/products');
const  customerRoutes = require('../src/rotas/customer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/customer', customerRoutes);

app.listen(3000);
