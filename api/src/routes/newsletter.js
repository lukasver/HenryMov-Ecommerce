const server = require('express').Router();
const { Newsletter } = require('../db.js');

server.post("/suscribe", async (req,res) => {

	const { email } = req.body

	try {
	const mail = await Newsletter.create({
							email: email
						})

	return res.status(200).send("Suscrito con éxito!")
	} catch (error) {
		console.log(error.type)
	return res.status(400).send(error.errors[0])
	}

})

server.put("/unsuscribe", async (req,res) => {

	const { email } = req.body

	try {
	const mail = await Newsletter.findOne({
							where: {email: email}
						})
	await mail.update({status: "unsuscribed"})
	return res.status(200).send("Te has desuscrito con éxito de nuestro Newsletter!")
	} catch (error) {
	return res.status(400).send(error)
	}

})



module.exports = server;