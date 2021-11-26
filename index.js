const tmi = require('tmi.js')
require('dotenv').config()

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

const client = new tmi.client(options)

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

client.connect()

function onMessageHandler(target, context, msg, self) {
	if (self ) return

	const commandName = msg.trim()

	if (commandName === '!dice') {
		client.say(target, `You rolled a ${rollDice()}`)
		console.log(`* Executed ${commandName} command`)
	} else {
		console.log(`* Unknown command: ${commandName}`)
	}
}

function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function onConnectedHandler(address, port) {
	console.log(`* Connected to ${address}:${port}`)
	client.say('eddyber16', 'Butler Eddy ready to work.')
}
