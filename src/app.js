const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// carrega banco
mongoose.connect('mongodb://wilkor:ju210322@ds044907.mlab.com:44907/ndhistory')

//carrega model product
//../src/models/product
const Product = require('../src/models/product');
const  indexRoutes = require('../src/rotas/index')
const  productRoutes = require('../src/rotas/products')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use('/', indexRoutes)
app.use('/products', productRoutes)

app.listen(3000)
