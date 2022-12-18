const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
var db;
const multer = require('multer');
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'img/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});


const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs');

MongoClient.connect("mongodb+srv://kangwhon:1234@cluster0.osyfgrf.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
     db = client.db('mongodb');

    console.log('DB connected')

  app.listen(7070, function() {
    console.log('listening on 7070')
  })
})

app.get('/', function(req, res) { 
    res.sendFile(__dirname +'/home.html')
    })

app.get('/signup', function(req, res) { 
    res.sendFile(__dirname +'/signup.html')
    })

    app.get('/login', function(req, res) { 
      res.sendFile(__dirname +'/login.html')
      })
    
app.get('/producer', function(req, res) { 
    res.sendFile(__dirname +'/producer.html')
    })
    
    app.get('/consumer', function(req, res) { 
      res.sendFile(__dirname +'/consumer.html')
      })    
    
app.get('/potatoinput', function(req, res) { 
    res.sendFile(__dirname +'/potatoinput.html')
    })

    app.get('/appleinput', function(req, res) { 
      res.sendFile(__dirname +'/appleinput.html')
      })

      app.get('/tomatoinput', function(req, res) { 
        res.sendFile(__dirname +'/tomatoinput.html')
        })
      

    app.get('/potato', function(req, res) {
      db.collection('potato').find().toArray(function(err, result){
        console.log(result);
        res.render('potato.ejs', {loginfo : result})
      })
    })

    app.get('/tomato', function(req, res) {
      db.collection('tomato').find().toArray(function(err, result){
        console.log(result);
        res.render('tomato.ejs', {loginfo : result})
      })
    })

    app.get('/apple', function(req, res) {
      db.collection('apple').find().toArray(function(err, result){
        console.log(result);
        res.render('apple.ejs', {loginfo : result})
      })
    })


    app.post('/add', function(req, res){
        db.collection('config').findOne({name : 'totalcount'}, function(err, result){
          var mycount = result.count;
          db.collection('potato').insertOne( { _id : (mycount + 1), title : req.body.title, writer : req.body.writer, cellphone : req.body.cellphone, email : req.body.email, content : req.body.content, count : req.body.count} , function(){
            db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
              if (err) return console.log(err)
              console.log('save complete')
            });  
          });
        });
        res.sendFile(__dirname +'/producer.html')
      });

      app.post('/add_2', function(req, res){
        db.collection('config').findOne({name : 'totalcount'}, function(err, result){
          var mycount = result.count;
          db.collection('tomato').insertOne( { _id : (mycount + 1), title : req.body.title, writer : req.body.writer, cellphone : req.body.cellphone, email : req.body.email, content : req.body.content, count : req.body.count} , function(){
            db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
              if (err) return console.log(err)
              console.log('save complete')
            });  
          });
        });
        res.sendFile(__dirname +'/producer.html')
      });

      app.post('/add_3', function(req, res){
        db.collection('config').findOne({name : 'totalcount'}, function(err, result){
          var mycount = result.count;
          db.collection('apple').insertOne( { _id : (mycount + 1), title : req.body.title, writer : req.body.writer, cellphone : req.body.cellphone, email : req.body.email, content : req.body.content, count : req.body.count} , function(){
            db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
              if (err) return console.log(err)
              console.log('save complete')
            });  
          });
        });
        res.sendFile(__dirname +'/producer.html')
      });

      app.post('/signup', function(req, res){
        db.collection('config').findOne({name : 'totalcount'}, function(err, result){
          var mycount = result.count;
          db.collection('signup').insertOne( { _id : (mycount + 1), id : req.body.id, pw : req.body.pw, name : req.body.name, email : req.body.email, nickname : req.body.nickname, cellphone : req.body.cellphone} , function(){
            db.collection('config').updateOne({name:'totalcount'},{ $inc: {count:1} },function(err, result){
              if (err) return console.log(err)
              console.log('save complete')
            });  
          });
        });
        res.sendFile(__dirname +'/home.html')
      });
      