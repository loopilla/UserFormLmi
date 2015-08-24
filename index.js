var express    = require('express');        // call express
var occupations = require('./data/occupations');
var app        = express();                 // define our app using express
var validator = require('validator');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.use(express.static(__dirname + '/public'));
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

//Get occupation list
router.route('/occupation').get(function(req, res) {
    var pattern = req.query.searchstr?req.query.searchstr.toLowerCase():'';
    var result = [];
    console.log('Pattern: ' + pattern);
    
    occupations.forEach(function filter(o, index) {
        if(o.name.toLowerCase().indexOf(pattern) != -1)
            result.push(o);
    });
    res.json({ results: result });   
});

validator.extend('under18', function (str) {
    var birthday = new Date(str);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
});

router.route('/user').post(function(req, res){
    console.log('User api called.');
    var result = true;
    var user = req.body.user || {};
    console.log(user);
    if(!user.name.length || !user.email.length || !validator.isEmail(user.email))
        result = false;
    
    if(user.birthDate && user.birthDate.length && validator.under18(user.birthDate))
        result = false;
    
    res.json({ message: result?'Success':'Error' });
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('User form server started on port ' + port);