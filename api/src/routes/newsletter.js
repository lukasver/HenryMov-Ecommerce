const server = require('express').Router();
const { Newsletter } = require('../db.js');


server.get("/", async (req,res) => {

	try{

	const maildb = await Newsletter.FindAll()

	return res.status(200).json(maildb)

	} catch (err) {
		return res.status(404).send(err)
	}
})

server.post("/suscribe", async (req,res) => {

	const { email } = req.body

	const repetido = await Newsletter.findOne({
		where: {email: email, status: "unsuscribed"}
	}) 

	if (repetido) {   // si el user se desuscribió y quiere volver a suscribirse puede hacerlo aca
		repetido.update({status: "suscribed"})
		.then()
		.catch(err => err)
	} else {
		try {

		const mail = await Newsletter.create({
			email: email
		}) 

		return res.status(200).send("Suscrito con éxito!")
		} catch (error) {
			console.log(error.type)
		return res.status(400).send(error.errors[0])
		}
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