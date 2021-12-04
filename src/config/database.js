const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		console.log(`DB connected: ${conn.connection.host}`)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

const CommandSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
})

const Command = mongoose.model('Command', CommandSchema)

async function getCommands() {
	try {
		const data = await Command.find({})
		let commands = []
		data.forEach(command => commands.push(command.name))
		return commands
	} catch(e) {
		console.error(e)
	}
}

async function getCommand(commandName) {
	try {
		const data = await Command.find({
			name: commandName
		})
		return data[0]
	} catch(e) {
		console.error(e)
	}
}

async function createCommand(name, message) {

	if (name && message) {
		try {
			await Command.create({
				name,
				message
			})
		} catch (e) {
			console.error(e)
		}
	}
}

module.exports = {
	connectDB,
	getCommands,
	createCommand,
	getCommand
}
