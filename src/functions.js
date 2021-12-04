const client = require('./index')
const { getCommand, getCommands } = require('./config/database')

function onConnectedHandler(address, port) {
	console.log(`* Connected to ${address}:${port}`)
	client.say('eddyber16', 'Butler Eddy ready to help you.')
}

async function onMessageHandler(target, context, msg, self) {
	if (self) return

	// GET MESSAGE BY WORDS
	let message = msg.trim().toLowerCase().split(' ')

	// IF IS A COMMAND
	if (message[0].startsWith('!')) {

		// GET COMMANDS
		if (message[0] === '!commands') {
			const commands = await getCommands()
			client.say(target,
				`Commands available for butler Eddy: ${commands.join(', ')}`)
			return
		}

		// CHECK COMMAND AVAILABILITY
		const command = await getCommand(message[0])
		if (!command) return

		// FORMAT TEMPLATE
		let formattedMessage = ''
		if (command.message.includes('{user.target.name}')) {
			formattedMessage = command.message.replace(
				'{user.target.name}',
				message[1]
			)
		} else if (command.message.includes('{user.name}')) {
			formattedMessage = command.message.replace(
				'{user.name}',
				context.username
			)
		}else {
			formattedMessage = command.message
		}

		client.say(target, formattedMessage)
		console.log(`* Executed ${command.name} command`)
	}
}
	
module.exports = {
	onConnectedHandler,
	onMessageHandler
}
