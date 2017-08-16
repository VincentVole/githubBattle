var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

mongoose.connect('mongodb://localhost/fighters')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/dist')));
app.use(session({secret:'some secret'}));

var FighterSchema = new mongoose.Schema({
	name: String,
	url: String,
	score: Number
})

mongoose.model('Fighter', FighterSchema);

var Fighter = mongoose.model('Fighter');

app.post('/api/add', function(req, res){
	console.log('adding new fighters to db and session, in server')
	req.session.player1 = req.body.player1.name;
	req.session.player2 = req.body.player2.name;

	var player1 = new Fighter({name:req.body.player1.name, url:req.body.player1.url, score:req.body.player1.score});
	var player2 = new Fighter({name:req.body.player2.name, url:req.body.player2.url, score:req.body.player2.score});
	player1.save(err=>{
		if(err){
			console.log('error saving player1');
			console.log(err);
		}
		else{
			player2.save(err=>{
				if(err){
					console.log('error saving player2');
					console.log(err);
				}
				else{
					console.log('saved both players')
					res.json(true);
				}
			})
		}
	})
})

app.get('/api/fighters', function(req, res){
	console.log(req.session);
	Fighter.findOne({name: req.session.player1}, function(err, player1){
		if(err){
			console.log('error finding current player1 in server');
		}
		else{
			console.log('found player1*************');
			console.log(player1);
			Fighter.findOne({name: req.session.player2}, function(err, player2){
				if(err){
					console.log('error finding current player2 in server');
				}
				else{
					console.log('found both players in server');
					console.log('player1: ****************************')
					console.log(player1);
					console.log('player2: ****************************')
					console.log(player2);
					res.json({player1: player1, player2: player2});
				}
			})
		}
	})
})

app.get('/api/all', function(req,res){
	Fighter.find({},function(err, fighters){
		if(err){
			console.log('error getting all users');
			console.log(err);
		}
		else{
			console.log('got all fighters');
			res.json(fighters);
		}
	})
})


app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./public/dist/index.html"));
})

app.listen(8000, function(){
	console.log('listening at port 8000')
})