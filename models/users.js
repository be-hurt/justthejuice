var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    user_id: [String]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
