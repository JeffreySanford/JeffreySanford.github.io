###Header
---------
Author:     Jeffrey Sanford
Date:       1 December 2014
Purpose:    This web application will allow people that have items they want
            to rent to connect to people that want to rent them in the movie 
            industry.
Usage:      This will be built on the angular.js lirary as a single page
            application.  

####Structure
-------------

Data Repository:

    users.json:     This will list all the users of the site; buyers, sellers, and admins.
    buyers.json:    All the users that are production managers looking to rent vehicles.
    sellers.json:   All the users wanting to rent their personal vehicles.

admin.html -

    Both databases are shown on one page, listing all information.  Use limit to 20 records per page for each database.  Database listed will be users, buyers and sellers.

buyers.html - 

sellers.html -

User Based:

    buyer.html - 
    
    seller.html -


App ---->   MainController
            (loads mainPage values)
                ---->   landingPage.html
                ---->   about.html
    
    ---->   BuyerController
            (loads buyer values)
                ---->   buyers.html     (ADMIN)
                ---->   buyer.html      (USER)      /buyer/:buyerID
    
    ---->   SellerController
            (loads seller values)
                ---->   sellers. html   (ADMIN)
                ---->   seller.html     (USER)      /seller/:sellerID

####File Structure
------------------

APP/
    index.html                     landing page
    about.html                     An about page
    admin.html                     Administration functions


    controllers/
       resources.js
       buyers.js

    views/
        #                           langing.html
        /buyers                     buyers/buyers.html
        /buyers/1                   buyers/buyer.html
        /buyers/1/1                 buyers/buyer/item.html

        /resources                  resources/resources.html      
        /resources/resource         resources/resource/resource.html               
        /resources/resource/item    resouces/resource/item.html                    

    model/{sqlite}
        crud.js                     Functions for the resources and buyers database

#####Views
----------

Description of the views function.

#####Controllers
----------------

Description of the controller functions.

####Models
----------

Description of the model functions.

####Notes
---------

Build responsive first, add larger media second.

[REDO]The landing page and the admin page will access the entire database.  The landing page will display featured (top selling items) along with a 'buy now' feature. The admin page will display the complete inventory along with a CRUD function to add, update, and delete items.  The CRUD function will be in a controller (model?) that will also allow the partial pages to read from the database.

[REDO]The main page is index.html located under views.  Thepartials are included into the inde.html with the ng-view directive.  The partials (landingPage.html, find.html, about.html) will display the various pages of the website.  resource and buyers will be section included into the web pages dynamically depending on context (as opposed to URL).

####Data Sample
---------------

Create a table of sample data that can be used for testing purposes.  One database for buyers, one for resources.  Include properties for name, telephone, e-mail address, address, city, state, zip, company, [more]

| Coffee Name        | Price | Amount | onHand | onOrder |
|--------------------|------:|--------|--------|---------|
| Seabear Blend      |  7.00 |  12oz  |    6   |    5    |
| Dark Roast         |  8.00 |  18oz  |   12   |    3    |
| Mild Blend         |  7.25 |   7oz  |    5   |    9    |

buyers.json

| Buyers Name  | Phone         | Address        | City   | State  | email address              |
|--------------|---------------|----------------|--------|-------------------------------------|
| Hon Smith    |(707) 448-7449 |100 Main Street |  City  | State  |    emailname@domain.com    |
| Hon Smith    |(707) 448-7449 |100 Main Street |  City  | State  |    emailname@domain.com    |
| Hon Smith    |(707) 448-7449 |100 Main Street |  City  | State  |    emailname@domain.com    |

buyers.buyersID
buyers.name
buyers.address
buyers.city
buyers.state
buyers.zipcode
buyers.emailaddress (unique)


####Database
------------

THree tables will be used in the CarConnecion database; BUYERS, RESOURCES and AUTHENTICATION.  Creditcard information will not be stored on the database, tokens will be kept on PayPal.

The database will be kept in SQLITE.  There is a greate article on creating a CRUD system under AngularJS located here:  http://jaydata.org/blog/angularjs-with-jaydata%E2%80%93-the-todo-example-with-the-itemstore-api  

####User Authentication
-----------------------

Techniques:
https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

Simple Angular Method for User Authenticaton:
http://beletsky.net/2013/11/simple-authentication-in-angular-dot-js-app.html

Quick Role-Based Authentication:
http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/

Cookies versus Token Authtication System
https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/

LaravelBook:  Laravel User AUthentication:
http://laravelbook.com/laravel-user-authentication/

Laracast:
https://laracasts.com/lessons/auth-essentials