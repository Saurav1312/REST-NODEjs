const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json ({
        message : 'Handling get request to /products'
    });
 });

 router.post('/', (req, res, next) => {
    const product = {
        name:req.body.name,
        price:req.body.price
    };

    res.status(201).json ({

        message : 'Handling post request to /products',
        createdProduct: product
    });
 });

 router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if (id === 'special'){
        res.status(200).json ({
            message : 'You discovered the special ID'
        });
    } else {
        res.status(200).json ({
            message : 'You passed an ID'
        });
    }  
 });

 router.patch('/:productId', (req, res, next) => {
    res.status(200).json ({
        message: 'You Updated an ID'
    }) 
 });

 router.delete('/:productId', (req, res, next) => {
    res.status(200).json ({
        message: 'You Deleted an ID'
    }) 
 });

 module.exports =router;