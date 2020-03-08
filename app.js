const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require ('body-parser');

const productRoutes = require ('./api/routes/products');
const orderRoutes = require ('./api/routes/orders');

app.use(morgan ('dev'));  // Logger middleware
app.use(bodyParser.urlencoded({exteded: false})); // urlencoded means which type of body want to parse and T/F : parse extended body with rich data/simple body
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
     res.header('Access-Control-Allow-Method',
     'PUT, POST, PATCH, DELETE, GET');
     return res.status(200).json({});
    }
    next();
});

// routes which should handle request
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{
    const error = new Error ('Not Found');
    error.status = 404 ;
    next(error); 
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});


module.exports = app;

