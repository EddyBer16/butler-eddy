const client = require('./index')

function onConnectedHandler(address, port) {
	console.log(`* Connected to ${address}:${port}`)
	client.say('eddyber16', 'Butler Eddy ready to help you.')
}

function onMessageHandler(target, context, msg, self) {
	if (self) return

	let isCommand = false

	let message = msg.trim().toLowerCase().split(' ')

	if (message[0].startsWith('!')) {
		isCommand = true
		command = message[0]
	}

	if (isCommand) {
		switch (command) {
			case '!test':
				client.say(target, `Hello, everybody. Butler eddy is here, sir. How could I help you?`)
				break

			case '!love':
				client.say(target, `youuuuu cutieeeee bongoTap we all here luv you so much!!! but specially ${context.username} wants to let you know that they love you more than anything in the world cuz you're a really nice person <3 pls keep doing what you do and lemme hug you so hard >.< <3`)
				break

			case '!welcome':
				client.say(target, `ayoooo @${message[1]} thank you so much for joining. I hope you're doing great today <3 I'd love if you could introduce yourself to the chat and let me know what are you up to today! catJAM In this co-working stream we do 50/10 pom sessions, usually 4 a day. Hopefully we can help motivate you and make the online life feel a bit less lonely!`)
				break
		}
	
		console.log(`* Executed ${command} command`)
	}

}
	
module.exports = {
	onConnectedHandler,
	onMessageHandler
}
