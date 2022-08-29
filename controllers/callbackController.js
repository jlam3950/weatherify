const fetch = require('node-fetch');

const retrieveToken = async (req,res) => {
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
}

module.exports = {
    retrieveToken,
}