const express = require('express');
const app = express();
const methodOverride = require('method-override');

//PORT
const port = process.env.PORT || 8080;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//data
const pokemons = require('./models/pokemon');

//Setting up index (main page)
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemonData: pokemons
    });
});

//Setting up 'add in" new pokemon page(needs to be before show)
app.get('/pokemon/new',(req,res) => {
    res.render('new.ejs');
});

app.post('/pokemon',(req,res)=>{
    console.log(req.body);
    pokemons.push(req.body);
    res.redirect('/pokemon');
});


//setting up show (pokemon's individual's page)
app.get('/pokemon/:id',(req,res) => {
    res.render('show.ejs', {
        pokeData : pokemons[req.params.id]
    });
});

//DELETE the selected pokemon
app.delete('/pokemon/:id', (req, res) => {
	pokemons.splice(req.params.id, 1); //remove the item from the array
	res.redirect('/pokemon');  //redirect back to index route
});


//Edit & updated the selected pokemon
app.put('/pokemon/:id', (req, res) => { // :index is the index of our scientist array that we want to change
	
	pokemons[req.params.id] = req.body //in our model array, find the index that is specified in the url (:id).  Set that element to the value of req.body (the input data)
	res.redirect('/pokemon'); //redirect to the index page
});

app.get('/pokemon/:id/edit', (req,res) => {
    res.render('edit.ejs', {
        pokemon: pokemons[req.params.id],
        id: req.params.id
    });
});

app.listen(port, ()=> {
    console.log(`PokeDex is listening to port: ${port}`);
});