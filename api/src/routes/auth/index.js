// RUTAS DE PRUEBA JWT

// const jwt = require('jsonwebtoken')
// const { User } = require('../../db.js');
// const { createToken } = require ('./authMiddlewares.js')

// const userLogin = (req,res,next) => {
//     const { email, password} = req.body
//    	const { TOKEN_SECRET } = process.env

//    	const sucessToken = jwt.sign(email, TOKEN_SECRET)

//    	console.log(sucessToken)
//     res.json({accessToken: sucessToken})

// }

// const userSignUp = async (req,res,next) => {

// 	const { name, lastname, email, address, phone, password, birthdate } = req.body 

// 	try {
// 	const newUser = await User.create({
// 		name,
// 		lastname,
// 		email,
// 		password,
// 		address,
// 		phone,
// 		birthdate
// 	})
// 	const token = createToken(newUser.email)
// 	res.cookie('jwt', token); // solo manipulable por http y dura 10 mins

// 	res.status(201).json(newUser)

// 	} catch (error) {
// 		console.log(error)
// 		res.status(400).send(errors)
// 	}

// }

// const getCookies = (req,res,next) => {

// 	res.cookie('test', true, {maxAge: 2000}) // dura 2 segundos
// 	res.send('Cookie puesta')
// }

// const clearCookies = (req,res,next) => {

// 	res.clearCookie('test')
// 	res.send('cookie removida')
// }


// module.exports = {
// 	userLogin,
// 	getCookies,
// 	clearCookies,
// 	userSignUp
// }