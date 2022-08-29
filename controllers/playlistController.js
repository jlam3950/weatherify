const saveToPlaylist = (req,res) => {
    pool.query("SELECT tracks FROM favorites", (err, res) =>{
        if(!err){
            let playlistArray = res.rows;
            playlist = playlistArray.map(a => a.tracks);
        }else{
            console.log(err);
        }
    })
    res.render('playlist', { playlist });
}

module.exports = {
    saveToPlaylist,
}