(function IFEE() {
    'use strict';

    exports.index = function pageLanding(req, res) {
        console.log("landing view triggered");
        res.render('default', {
            title: 'Landing', 
            classname: 'landing',
            usersObject: [
                {id: '57', name: 'Ray', email: 'ray@gmail.com', image: 'images/artists/ray.png'},
                {id: '29', name: 'Frank', email: 'frank@gmail.com', image: 'images/artists/frank.png'},
                {id: '63', name: 'Bob', email: 'bob@gmail.com', image: 'images/artists/bob.png'},
                {id: '46', name: 'Sam', email: 'sam@gmail.com', image: 'images/artists/sam.png'},
                {id: '32', name: 'Linda', email: 'linda@gmail.com', image: 'images/artists/linda.png'},
                {id: '61', name: 'Shelly', email: 'shelly@gmail.com', image: 'images/artists/shelly.png'}
            ] // insert user's object
        });
    };

    exports.user = function pageUser(req, res) {
        var i = 0;
        console.log("landing view triggered");
        res.render('single', {
            title: 'User',
            item: req.params.id.slice(1),
            classname: 'user',
            usersObject: [
                {id: '57', artistName: 'Ray', email: 'ray@gmail.com', artistImage: 'images/artists/ray.png'},
                {id: '29', artistName: 'Frank', email: 'frank@gmail.com', artistImage: 'images/artists/frank.png'},
                {id: '63', artistName: 'Bob', email: 'bob@gmail.com', artistImage: 'images/artists/bob.png'},
                {id: '46', artistName: 'Sam', email: 'sam@gmail.com', artistImage: 'images/artists/sam.png'},
                {id: '32', artistName: 'Linda', email: 'linda@gmail.com', artistImage: 'images/artists/linda.png'},
                {id: '61', artistName: 'Shelly', email: 'shelly@gmail.com', artistImage: 'images/artists/shelly.png'}
            ] // insert user's object
        });
    };

    exports.about = function pageAboutUs(req, res) {
        console.log("about view triggered");
        res.render('default', {
            title: 'About Us',
            classname: 'about'
        });
    };

    exports.products = function pageProducts(req, res) {
        console.log("product view triggered");
        res.render('default', {
            title: 'Products',
            classname: 'products',
            productsObject: [
                {id: '53', productName: 'Box', productDescription: 'This is a description of the Box object', productImage: 'images/products/Box.png'},
                {id: '23', productName: 'Jewel', productDescription: 'This is a description of the Jewel object', productImage: 'images/products/Jewel.png'},
                {id: '34', productName: 'Present', productDescription: 'This is a description of the Present object', productImage: 'images/products/Present.png'},
                {id: '69', productName: 'Dehydrated Water', productDescription: 'This is a description of the Dehydrated Water object', productImage: 'images/products/DehydratedWater.png'},
                {id: '143', productName: 'Canned Unicorn Meat', productDescription: 'This is a description of the Canned Unicorn Meat object', productImage: 'images/products/CannedUnicornMeeat.png'},
                {id: '96', productName: 'Rainbows', productDescription: 'This is a description of the Rainbows object', productImage: 'images/products/Rainbows.png'}
            ] // insert products object
        });
    };

    exports.products.product = function pageProduct(req, res) {
        var id = 0;
        console.log("parameter hit.  parameter: " + req.params.id);
        res.render('single', {
            title: 'Product',
            item: req.params.id.slice(1),
            classname: 'product',
            productsObject: [
                {id: '53', productName: 'Box', productDescription: 'This is a description of the Box object', productImage: 'images/products/Box.png'},
                {id: '23', productName: 'Jewel', productDescription: 'This is a description of the Jewel object', productImage: 'images/products/Jewel.png'},
                {id: '34', productName: 'Present', productDescription: 'This is a description of the Present object', productImage: 'images/products/Present.png'},
                {id: '69', productName: 'Dehydrated Water', productDescription: 'This is a description of the Dehydrated Water object', productImage: 'images/products/DehydratedWater.png'},
                {id: '143', productName: 'Canned Unicorn Meat', productDescription: 'This is a description of the Canned Unicorn Meat object', productImage: 'images/products/CannedUnicornMeeat.png'},
                {id: '96', productName: 'Rainbows', productDescription: 'This is a description of the Rainbows object', productImage: 'images/products/Rainbows.png'}
            ] // insert products object
        });
    };
}());