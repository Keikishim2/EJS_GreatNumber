const express = require('express');
const session = require('express-session');

let app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'counterific',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 70000 }
}));

app.get('/', function(request, response){
    if(!request.session.number){
        request.session.number = Math.floor(Math.random()*100+1);
    }
    if(!request.session.status){
        request.session.status = ' ';
    }
    response.render('index', {
        guess: request.session.status
    });
})

app.post('/number', function(request, response){
    if(request.body.guess < request.session.number){
        request.session.status = 'low';
    }
    else if(request.body.guess > request.session.number){
        request.session.status = 'high';
    }
    else{
        request.session.status = 'correct';
    }
    response.redirect('/');
})

app.get('/reset', function(request, response){
    request.session.destroy();
    response.redirect('/');
})

app.listen(8000, function(){
    console.log('Listening on port 8000');
});