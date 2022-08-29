require('dotenv').config();
const express = require('express');
const { response } = require('express');
const { render } = require('express/lib/response');
const app = express();
const PORT = 3000; 
const fetch = require('node-fetch');
const pool = require('./db');
const searchRoutes = require('./routes/searchRoutes');
const authorizeRoutes = require('./routes/authorizeRoutes');
const callbackRoutes = require('./routes/callbackRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const path = require('path');

app.use(express.static(path.join(__dirname, '/views/')))
app.use(
    '/css',
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
)
app.use(
    '/js',
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist'))
)
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

const redirect_uri = 'http://localhost:3000/callback';
const client = process.env.CLIENT_ID; 
const secret = process.env.CLIENT_SECRET;
let access_token;
let userInfo; 
let playlist = [];

app.get('/', (req,res) => {
    res.render('index');
})

app.get('/authorize', (req,res) => {
    const auth_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: client, 
        scope:'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000/callback',
        state: '34fFs29kd09'
    })
    res.redirect("http://accounts.spotify.com/authorize?" + auth_parameters.toString());
});

app.get('/callback', async (req,res) => {
    const code = req.query.code; 
    const body = new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    })

    const response = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        body: body, 
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization':
            'Basic ' + Buffer.from(`${client}:${secret}`).toString('base64')
        },
    })

    const data = await response.json(); 
    access_token = data.access_token;
    res.redirect('search');
});

async function addUser(){
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    const data = await response.json();
    
    try{
         await pool.query('INSERT INTO users (username) VALUES ($1)', [ data.id ])
        } catch (err){
        console.log(err);
    }
    return data;
}

app.get('/search', async (req,res) => {
    const userInfo = await addUser(); 
    res.render('search', { user: userInfo});  
});

app.get('/accesstoken', (req,res) =>{
    res.send({access_token});
})
    
app.get('/playlist', (req,res) => {
    
    pool.query("SELECT tracks FROM favorites", (err, res) =>{
        if(!err){
            let playlistArray = res.rows;
            playlist = playlistArray.map(a => a.tracks);
        }else{
            console.log(err);
        }
    })
    res.render('playlist', { playlist });
    });

app.post('/search', async (req,res) => {
    try{
        const {track} = req.body;

        if(track == null){
            console.log("Track is null");
            return;
        }
        
        const newTrack = await pool.query("INSERT INTO favorites (tracks, user_id) VALUES ($1,$2)", [ track, 1 ])
        } catch(err){
            console.log(err);
        }
})  

app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 

//MVC route set up 
// app.use('/authorize', authorizeRoutes);
// app.use('/callback', callbackRoutes);
// app.use('/playlist', playlistRoutes);
// app.use('/search', searchRoutes);

