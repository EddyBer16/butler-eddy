const tmi = require('tmi.js')
require('dotenv').config()

// Fixes Heroku Boot timeout error
const PORT = process.env.PORT || 8080

const options = {
	options: {
		debug: true
	},
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [process.env.CHANNEL_NAME]
}

const client = tmi.client(options)

module.exports = client
