var User = require('../models/users.js');

var userData = User.find(function(err, users){
    if (err) {
        return console.error(err);
    };

    if (users.length) {
        return;
    };

    new User({
        username: 'juice_admin',
        password: 'jjpassword',
        user_id: ['1']
    }).save();
});

module.exports = userData;
