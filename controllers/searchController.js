const fetch = require('node-fetch');

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

const search_addUser = async (req,res) => {
    const userInfo = await addUser(); 
    res.render('search', { user: userInfo});  
}

const search_insertFavorite = (req,res) => {
    try{
        const {track} = req.body;
        if(track == null){
            console.log("Track is null");
            return;
        }
        const newTrack = pool.query("INSERT INTO favorites (tracks, user_id) VALUES ($1,$2)", [ track, 1 ])
        // const newTrack = await pool.query("INSERT INTO favorites (tracks, user_id) VALUES ($1,$2)", [ track, 1 ])
        } catch(err){
            console.log(err);
        }
}

module.exports = {
    search_addUser, 
    search_insertFavorite,
}