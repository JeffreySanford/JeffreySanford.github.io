(function IIFE() {
    'use strict';

    angular.module('angularHero.contactsService', [])

        .factory('contacts', function () {
            var contacts = [
                {id: 1, name: 'Frank', img: 'frank.png', phone: '(415) 329-1234', mobile: '(415) 329-1267', email: 'frank@example.com'},
                {id: 2, name: 'Susan', img: 'susan.png', phone: '(415) 329-1298', mobile: '(415) 329-1284', email: 'susan@example.com'},
                {id: 3, name: 'Emma', img: 'emma.png', phone: '(415) 543-1143', mobile: '(415) 543-1111', email: 'emma@example.com'},
                {id: 4, name: 'Scott', img: 'scott.png', phone: '(415) 543-1291', mobile: '(415) 543-1292', email: 'scott@example.com'},
                {id: 5, name: 'Bob', img: 'bob.png', phone: '(415) 543-1674', mobile: '(415) 543-1675', email: 'bob@example.com'},
                {id: 6, name: 'Olivia', img: 'olivia.png', phone: '(415) 543-1752', mobile: '(415) 543-1754', email: 'olivia@example.com'},
                {id: 7, name: 'Anne', img: 'anne.png', phone: '(415) 543-1665', mobile: '(415) 543-1664', email: 'anne@example.com'}
            ];

            var products = [
                {ownerID: 1, productName: 'watches', price: 29.50},
                {ownerID: 1, productName: 'wallets', price: 19.25},
                {ownerID: 1, productName: 'ties', price: 59.50}
            ];

            return {
                getContacts: function () {
                    return contacts;
                },
                getContact: function (id) {
                    return contacts.filter(function (contact) {
                        return contact.id === id;
                    })[0];
                }
                /* getProducts: function () { return products; } */
                /* getProduct: function (id) {
                        return products.filter (function (c) {
                            return c.id === id
                        })[0];
                    }
                */
            };
        });
}());