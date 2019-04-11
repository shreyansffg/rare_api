//server.js
const { DatabaseAPI } = require('./database')
const sqlite3 = require('sqlite3').verbose()
const db_path = './sqliteTest.db'
const dbMeta = require('./dbSchema')
var express = require('express');
var app = express();
var cors = require('cors');
var basicAuth = require('basic-auth');

var DB = new DatabaseAPI(db_path, dbMeta.dbSchema)

app.use(cors());

function printUserEmail(err,userInfo) {
    console.log("User's email is: " + userInfo)
    return userInfo
}
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'admin' && user.pass === 'passwd123') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}


app.all("/admin/*", auth);


app.get('/admin/findUserByEmail', function(req, res,next){
    DB.findUserByLogin(req.query.email, function(err, result){
    										res.status(200).json(result);
    } );
});
app.get('/admin/getAllUsers', function(req,res,next){
    DB.findAllUsers(function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});
app.get('/admin/getAllChallenges', cors(),  function(req,res,next){
    DB.findAllChallenges(function(err, result){
                res.send(result);
                console.log(err);
    } );
});
app.get('/admin/getAllHashtags', cors(),  function(req,res,next){
    DB.findAllHashtags(function(err, result){
                res.send(result);
                console.log(err);
    } );
});
app.get('/admin/getChallengesIdUsers', function(req,res,next){
    DB.findUsersByChallengeId(req.query.challengeId, function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});
app.get('/admin/getChallengeByName', function(req,res,next){
    DB.findChallengeByName(req.query.challengeName, function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});

app.get('/admin/getHashtagById', function(req,res,next){
    DB.findHastagById(req.query.hashtagID, function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});
app.post('/admin/addUsers', function(req, res){
	console.log(req);
    DB.registerUser(req.query.email, req.query.first_name, req.query.last_name, req.query.dob, req.query.gender, req.query.instagramHandle);
    res.send("added user!");
});

app.post('/admin/addChallenge', function(req, res){
	console.log(req);
    DB.addChallenge(req.query.challengeName, req.query.startDate, req.query.endDate, req.query.createTimestamp, req.query.active,req.query.hashtagId, req.query.mediaType, req.query.description);
    res.send("added challenge!");
});

app.post('/admin/addHashtag', function(req, res){
	console.log(req);
    DB.addHashtag(req.query.hashtag_name,req.query.points);
    res.send("added hashtag!");
});
app.post('/admin/updateStatus', function(req, res){
    console.log(req);
    DB.updateStatus(req.query.challenge_name);
    res.send("updates status");
});
//user registering for challenge- they are going to send challenge id, 
//post for user registrationm 
app.post('/admin/addUserToChallenge', function(req, res){
	console.log(req);
    DB.addUserToChallenge(req.query.user_id, req.query.challengeId, req.query.totalPoints, req.query.userUrl);
    res.send("connected user to a challenge!");
});

app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
