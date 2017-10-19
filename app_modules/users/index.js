
var users = (req, res) => {
    var users = [{ name: 'aaa', age: 43 }, { name: 'bbb', age: 23 }]
    res.render('users/users', { users: users });
}
module.exports = users;
