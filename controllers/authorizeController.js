const setAuthParams = (req,res) => {
    const auth_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: client, 
        scope:'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000/callback',
        state: '34fFs29kd09'
    })
    res.redirect("http://accounts.spotify.com/authorize?" + auth_parameters.toString());
}

module.exports = {
    setAuthParams,
}