const client = require('./index')
const {
	onConnectedHandler,
	onMessageHandler
} = require('./functions')

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

client.connect()
