const axios = require('axios');
const dotenv = require("dotenv").config()

async function exchangeCodeForToken(code) {
	const tokenUrl = 'https://api.intra.42.fr/oauth/token';
	const clientId = process.env.CLIENT_UID;
	const clientSecret = process.env.CLIENT_SECRET;
	const redirectUri = `${process.env.CURRENT_URL}/auth/callback`;
	// const redirectUri = `${process.env.CURRENT_URL}:3000/auth/callback`;
	
	const response = await axios.post(tokenUrl, {
		grant_type: 'authorization_code',
		client_id: clientId,
		client_secret: clientSecret,
		code: code,
		redirect_uri: redirectUri
	});
	return response.data.access_token;
}

async function getUserInfo(token) {
	const apiUrl = 'https://api.intra.42.fr/v2/me';
  
	const response = await axios.get(apiUrl, {
	  headers: { Authorization: `Bearer ${token}` }
	});
	return response.data;
}


module.exports = {
	exchangeCodeForToken,
	getUserInfo
}
