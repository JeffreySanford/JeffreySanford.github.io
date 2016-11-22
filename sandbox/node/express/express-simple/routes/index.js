exports.index = function pageHome(req, res) {
    res.render('default', {
        title: 'Home', //insert an object to the template
        classname: 'home',
        users: ['Ray', 'Frank', 'Bob', 'Sam'] // insert user's array
    });  
}

exports.about = function pageAboutUs(req, res) {
    res.render('default', {
        title: 'About Us', //insert an object to the template
        classname: 'about'
    });  
}