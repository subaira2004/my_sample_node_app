
var home = (req, res) => {    
    res.render('home/home', {  title:'Welcome to My Site', menu:'home' });
}
module.exports = home;
