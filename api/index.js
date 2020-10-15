//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { Product, Category, User, Order, Orderline, conn } = require('./src/db.js');
const { port } = process.env // agregar port a tu variable de entorno .env

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port || 3001, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
    const precarga = async function () {

    	await User.create({
    		name: 'Michael',
    		lastname: 'Jackson',
    		email: 'mjtheBEST@sony.com',
    		phone: 12345678,
			password: 'MJtheBest2020!',
			birthdate: new Date('02/23/1960'), // este new Date es para sacar un warning de consola
			role: 'Admin',
    	}).then(User.create({
    		name: 'Homero',
    		lastname: 'Simpson',
    		email: 'HomerJSimpson@yahoo.com',
    		phone: 0011234256,
			password: 'YoAmo@Marge123',
			address: 'Calle Falsa 123, Springfield, FL, 90210, USA',
			birthdate: new Date('05/12/1956'), // este new Date es para sacar un warning de consola
			role: 'Cliente',
    	}))

 
	  	await Category.create({
	  		name: 'Scooters',
	  		description: 'Descripción 1',
	  		status: 'Activado'
	  	}).then(Category.create({
	  		name: 'Skates',
	  		description: 'Descripción 2',
	  		status: 'Activado'
	  	})).then(Category.create({
	  		name: 'Windsurf',
	  		description: 'Descripción 3',
	  		status: 'Activado'
	  	})).then(Category.create({
	  		name: 'Bikes',
	  		description: 'Descripción 4',
	  		status: 'Activado'
	  	})).then(Category.create({
	  		name: 'Hoverboards',
	  		description: 'Descripción 5',
	  		status: 'Activado'
	  	})).then(Category.create({
	  		name: 'Gorras',
	  		description: 'Descripción 6',
	  		status: 'Activado'
	  	})).then(Category.create({
			name: 'Patines',
			description: 'Descripción 7',
			status: 'Activado'
		})).then(Category.create({
			name: 'Skates Electricos',
			description: 'Descripción 8',
			status: 'Activado'
		})).then(Category.create({
			name: 'Zapatillas',
			description: 'Descripción 9',
			status: 'Activado'
		})).then(Category.create({
			name: 'Indumentaria',
			description: 'Descripción 10',
			status: 'Activado'
		})).then(Category.create({
			name: 'Accesorios',
			description: 'Descripción 11',
			status: 'Activado'
		}));

	  	await Product.create({
	  		name: 'Vela de Windsurf',
	  		description: 'Un vela para tabla de windsurf de color celeste',
	  		price: 23000,
	  		availability: true,
	  		stock: 3,
	  		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHP4KrqOQd-WoLR1EAKi-PTBSBlyiAQgYlOQ&usqp=CAU'
	  	}).then(createdProduct => {
				createdProduct.setCategories([3]);
			})
	  	await Product.create({
	  		name: 'Tabla para Skate Downhill',
	  		description: 'Base de reemplazo para skate',
	  		price: 1000,
	  		availability: true,
	  		stock: 20,
	  		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg'
	  	}).then(createdProduct => {
				createdProduct.setCategories([2]);
			})
	  	await Product.create({
	  		name: 'Gorra',
	  		description: 'Gorro skate - Made in China',
	  		price: 210,
	  		availability: true,
	  		stock: 100,
	  		image: 'https://sc02.alicdn.com/kf/H55756b6151c748328ed7791a02a36fbcQ.jpg'
	  	}).then(createdProduct => {
				createdProduct.setCategories([6]);
			})
	  	await Product.create({
	  		name: 'Scooter',
	  		description: 'Scooter eléctrico gris/negro de 2 ruedas',
	  		price: 140,
	  		availability: true,
	  		stock: 100,
	  		image: 'https://www.luckybikes.com.ar/wp-content/uploads/2019/09/es2-2-600x706.jpg'
	  	}).then(createdProduct => {
				createdProduct.setCategories([1]);
			})
	  	await Product.create({
	  		name: 'Hoverboard',
	  		description: 'Un hoverboard blanco de 2 ruedas',
	  		price: 210,
	  		availability: false,
	  		stock: 100,
	  		image: 'https://i.pinimg.com/originals/ea/2b/84/ea2b84b6d1358a047ccd9925003620d8.jpg'
	  	}).then(createdProduct => {
				createdProduct.setCategories([5]);
			})
	  	await Product.create({
	  		name: 'Skate',
	  		description: 'Un shortboard blanco de 4 ruedas',
	  		price: 140,
	  		availability: true,
	  		stock: 100,
	  		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg'
	  	}).then(createdProduct => {
				createdProduct.setCategories([2]);
			})
	  	await Product.create({
	  		name: 'Electric Bike',
	  		description: 'Bicicleta electrica',
	  		price: 210,
	  		availability: false,
	  		stock: 100,
	  		image: 'https://ebikebc.com/wp-content/uploads/2019/11/ebikeBC-ebikes-banner-product-smaller.jpg'
	  	}).then(createdProduct => {
				createdProduct.setCategories([4]);
			})
		await Product.create({
				name: 'Casco No Name Profesional',
				description: 'Casco para bici - roller - skate de plástico flexible para amortiguar mejor el impacto. Con interior acolchado en la base, frente y nuca. Tiras ajustables Talles: XS-S-M-L-XL XS ',
				price: 1399,
				availability: false,
				stock: 10,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/casco-noname-rosa-1-21-ffaebc33792f6e6e6415900886785140-640-0.jpg'
		}).then(createdProduct => {
				  createdProduct.setCategories([11]);
			})
		await Product.create({
				name: 'Rollers Radius 633 Extensibles Base Aluminio',
				description: ' Ruedas PU, dureza de 82 A. Bota revestida con tela acolchonada. Ajuste con cordones y velcro “Power Strap”, dúo lock. Tamaño de Ruedas Talle M 72mm ',
				price: 4490,
				availability: false,
				stock: 545 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/8621-3a9dc31491d38459a615887197486657-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([7]);
			  })
		await Product.create({
				name: 'Zapatillas Huf Soto Skate Urbana Cocidas Tela Y Gamuza',
				description: 'Un zapato de plantilla bien solidificado que se ha hecho sentir como un zapato vulcanizado, HUF presenta su Soto centrado en el skate en color blanco y negro',
				price: 4099,
				availability: false,
				stock: 23,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/zapatillas-huf-soto-black-31-76232f6b4c699e9eae15997728362910-640-0.png'
			}).then(createdProduct => {
				  createdProduct.setCategories([9]);
			  })
	 	await Product.create({
				name: 'Zapatillas Dc Shoes Pure Negro/blanco',
				description: ' Zapatillas DC DC Tonik SE Calzado skate súper core con Impact S para una mejor amortiguación Suela vulcanizada Capellada de textil y cuero Plantilla desmontable de ImpactS Suela de caucho vulcanizada para un mejor agarre y menor desgaste.',
				price: 4990,
				availability: false,
				stock: 65,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/1661-3fb85721265fe466d815887005517584-640-0.jpg	'
			}).then(createdProduct => {
				  createdProduct.setCategories([9]);
			  })
		await Product.create({
				name: 'Zapatillas Dc Heathrow Negro (bkw)',
				description: 'Zapatillas DC Heathrow Negro (BKW) Caractéristicas Parte superior de microante y malla Estructura de botín para mejor ajuste Refuerzo de la puntera interno Suela intermedia UniLite™ para mayor ligereza, comodidad y sujeción Plantilla OrthoLite®',
				price: 4500,
				availability: false,
				stock: 34,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/3931-90e1bd9e6cd28b2a0815884478454641-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([9]);
			  })
		await Product.create({
				name: 'Zapatillas Vans Sk8 Hi Negro',
				description: ' Zapatillas Vans Sk8 Hi Negro Las Sk8-Hi, el legendario modelo high-top de cordones inspirado en las clásicas Old Skool, tienen un forro de suede y canvas muy resistente con costuras tonales, un refuerzo acolchado en el tobillo y la suela de fibra vulcanizada de Vans',
				price:5990 ,
				availability: false,
				stock: 32,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2141-8bba392f6d3979a3b315884422233072-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([9]);
			  })
		await Product.create({
				name: 'Zapatillas Huf Galaxy Skate Urbana Negro / Azul',
				description: 'Huf Galaxy con la mas fina combinación de gamuza y suela vulcanizada,Costuras en la parte delantera para mejorar el agarre de estas al pie y mejorar el grip al raspar.',
				price: 4099,
				availability: false,
				stock: 43,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/wGorrasapp-image-2020-09-11-at-7-55-14-pm-11-63675c24f813f274bc16008106443232-640-0.jpeg'
			}).then(createdProduct => {
				  createdProduct.setCategories([9]);
			  })
		await Product.create({
				name: 'Remera Powell Peralta Frankie Hill Verano 2020 100% Original',
				description: 'Remera Powell Peralta Frankie Hill ',
				price: 1720,
				availability: false,
				stock:43 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/1811-68a374a4b8091df2ce15880342841356-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([10]);
			  })
		await Product.create({
				name: 'Remera Powell Peralta Mc Gill Skull And Snake',
				description: 'Remera Powell Peralta Mc Gill Skull And Snake',
				price:1299 ,
				availability: false,
				stock:32 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2711-547008059e8ca6e0c515883835046272-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([10]);
			  })
		await Product.create({
				name: 'Camisa Dc Arrowood',
				description: ' Camisa DC Arrowood 100% Algodón Bolsillos en el pecho con solapa y botón Parte trasera curva Avios DC ',
				price: 1299,
				availability: false,
				stock: 21,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/6201-2d4a0b42b2f3d6870815887072186453-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([10]);
			  })
		await Product.create({
				name: 'Malla Bermuda Short De Baño Playa Quiksilver Techtonics Boys',
				description: ' Board Shorts 4-way stretch Estampado con cintura en contraste Bragueta 4-way stretch Bolsillo trasero con parche Etiqueta en el bajo de la pierna izquierda Detalles de DC Largo 20" Composición 92% Poliéster Reciclado, 8% Elastano',
				price:2599 ,
				availability: false,
				stock: 54,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/acero11-1bdcd6443ab65e6bb615879959523320-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([10]);
			  })
		await Product.create({
				name: 'Malla Dc Lanai Ii Boardshort De Playa Bermuda Baño 18 Largo',
				description: 'Composición 100% poliéster Color Azul /Amarillo - Azul / Negro - Bordo / Gris - Negro / Amarillo Fit Relajado Acceso Velcro Cintura sin elástico Bolsillos Uno lateral con tapa y velcro Sin suspensor',
				price: 1999,
				availability: false,
				stock: 64,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/81-09fe09b0cb4e4beeeb15879984952437-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([10]);
			  })
		await Product.create({
				name: 'Pantalon Dc Jean Wrk Slim Med Stone',
				description: 'Pantalon DC Jean Wrk Slim Med Stone Materiales: 82% Algodón 16%Poliester 2%Elastano Slim fit Jeans Avios DC personalizados Bolsillos internos estampados Sistema de refuerzo y atraque 07 ',
				price: 1600,
				availability: false,
				stock:12 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/6551-bd082bb589e4fa5f0015887048790512-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([10]);
			  })
		await Product.create({
				name: 'Campera Quiksilver Wanna Negra 2019',
				description: ' Parka resistente al agua con capucha para Hombre Fabricada con algodón nailon, diseñada con corte clásico, cómodo, normal, con capucha fija de 3 paneles. Esta parka con capucha resistente al agua para hombre es un gran añadido a la colección Quiksilver',
				price:6299 ,
				availability: false,
				stock: 23,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/11211-18ad3ad0daa67bc69d15886296499645-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([10]);
			  })
		await Product.create({
				name: 'Mochila Dc Shoes Backstack Cb',
				description: 'Amplio compartimiento principal Bolsillo externo con organizador Cavidad interior acolchada elevada para portátil Panel posterior acolchado Etiqueta de tela en la correa del hombro',
				price: 2490,
				availability: false,
				stock: 34,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/991-0fdf1ee8debca1764515886289931793-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([11]);
			  })
		await Product.create({
				name: 'Riñonera Thrasher Flame',
				description: 'Riñonera de cuero narural con agarre ajustablde y broche de alto rendimiento',
				price: 1500,
				availability: false,
				stock: 34,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/521-5a6bd3140b2a3b37f315886984024789-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([11]);
			  })
		await Product.create({
				name: 'Mochila Quiksilver Everyday Poster',
				description: 'Everyday Poster TELA: 100% Poliester Tamaño: 45x29.2x19 cm Volumen: 20L Características: Gran compartimiento principal Bolsillo interior acolchado para laptop 15 Bolsillo delantero con cierre Organizador interno Correas de hombro acolchadas',
				price:1950 ,
				availability: false,
				stock:32 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/6821-ca82226cb7b86af19915884504558586-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([11]);
			  })
		await Product.create({
				name: 'Medias Huf Importadas Og Logo Media Caña Degrade Blanco Negro',
				description: 'Medias de Algodón 3/4 marca HUF Importadas Excelente calidad',
				price: 575,
				availability: false,
				stock: 43,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/medias-huf-henry-crew1-63f2d8575f7a8f2bd216021925636092-640-0.png'
			}).then(createdProduct => {
				  createdProduct.setCategories([11]);
			  })
		await Product.create({
				name: 'Medias Huf Importadas Og Logo Media Caña Black',
				description: 'Medias de Algodón 3/4 marca HUF Importadas Excelente calidad',
				price: 575 ,
				availability: false,
				stock:32 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/huf-og-logo_black-11-210afe5db5089c800e15911494614271-640-0.png'
			}).then(createdProduct => {
				  createdProduct.setCategories([11]);
			  })
		await Product.create({
				name: 'Skate Completo 7,75 Maple Banga Maple Abec7 Skull',
				description: 'Deck 7 capas Maple REAL Tamaño: 31" (79cm) x 7.75" (19.6cm) Doble Kick Cóncavo Trucks de aluminio 5 Ruedas PUC 52 x 32mm HR95A Bujes de PU 95A Rodamientos ABEC 7 Tornilleria de acero',
				price: 8200,
				availability: false,
				stock: 23,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/skate-banga-skull1-4d10a1ae22b60579b016010598447465-640-0.png'
			}).then(createdProduct => {
				  createdProduct.setCategories([2]);
			  })
		await Product.create({
				name: 'Skate Completo Freevibe Maple Importado Animé 2',
				description: 'Skate completo, ideal para principiantes.	Tabla de maple chino de 8 láminas, estampado por debajo. Lija negra 80-AB, trucks de aluminio de 5,5"Ruedas 54 mm estampadas sobre un pad de 4mm',
				price:9500 ,
				availability: false,
				stock:54 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/fms1sk0211-3fc80b140b19f4615316016590273659-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([2]);
			  })
		await Product.create({
				name: 'Skate Completo Freevibe Maple Importado Animé 1',
				description: 'Skate completo, ideal para principiantes.	Tabla de maple chino de 8 láminas, estampado por debajo. Lija negra 80-AB, trucks de aluminio de 5,5"Ruedas 54 mm estampadas sobre un pad de 4mm',
				price:9500 ,
				availability: false,
				stock:54 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/fms1sk011-8df4a708054824f61916016587162562-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([2]);
			  })
		await Product.create({
				name: 'Cruiser No Name Fish Tail Pine Tree Black Trucks Invertidos',
				description: 'Mini Cruiser tipo Penny Moolah Vinyl Blanco 22" Cambia de color con la luz solar. La línea de minicruisers Vinyl 22 de Moolahh Boards se caracteriza por sus decks de plástico inyectado reforzado y una combinación de colores brillantes elegidas especialmente en cada caso en combinación con trucks y ruedas.',
				price:8500 ,
				availability: false,
				stock:12 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/3031-c0298f95fdb73c3f3915887963031044-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([2]);
			  })
		await Product.create({
				name: 'Gorra Fallen Risen Patch Importadas Originales Summer 20',
				description: ' Gorra Fallen Cap Star TX 98% Algodón, 2% Elastano Cap 6 paneles Flexfit + Visera curva ',
				price: 1099,
				availability: false,
				stock:32,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/341-41b87472176de8c33915880178735099-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([6]);
			  })
		await Product.create({
				name: 'Gorra Dc Cap Star Tx',
				description: 'Gorra DC Cap Star TX 98% Algodón, 2% Elastano Cap 6 paneles Flexfit + Visera curva + Logo 3D bordado al frente',
				price: 1999,
				availability: false,
				stock:32 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/6231-c152af4a1549763f0515884503288404-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([6]);
			  })
		await Product.create({
				name: 'Gorra Dc Shoes Baffles 6 Paneles',
				description: 'Gorra sin estructura , 6 Panel flat brim , Cinta DCSHOECOUSA estampada , Cierre trasero con elástico ajustable',
				price: 1799 ,
				availability: false,
				stock:23 ,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/841-aa37c4236ca9ef08b215884632016078-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([6]);
			  })
		await Product.create({
				name: 'Gorra Dc Reynotts Niños',
				description: 'Gorra niños snapback 5 paneles snapback estructurado, Parche de goma en dos colores en el centro , Cierre plástico',
				price: 1799,
				availability: false,
				stock: 43,
				image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/4211-8d897112cd5b4af29315880921728471-640-0.jpg'
			}).then(createdProduct => {
				  createdProduct.setCategories([6]);
			  })
		await Product.create({
				name: 'Skate eléctrico hoverboard Fiat 500 Blanco 6.5 cm',
				description: 'Con tu hoverboard disfrutarás de una nueva forma de movilizarte: cómoda, segura y con estilo; podrás utilizarlo para divertirte, jugar y trasladarte de un lugar a otro, tanto en espacios cerrados como abiertos.',
				price: 37900,
				availability: false,
				stock: 32,
				image: 'https://http2.mlstatic.com/D_NQ_NP_728530-MLA43214211601_082020-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([8]);
			  })
		await Product.create({
				name: 'Skate eléctrico hoverboard Kanji KJ-HV002C 6.5"',
				description: 'Diversión para grandes y chicos.Gracias a su diseño y tecnología, este skate eléctrico es ideal para el uso recreativo tanto de niños como adultos, ya que te permitirá desplazarte a una velocidad máxima de 15 km/h.',
				price: 32999 ,
				availability: false,
				stock:43 ,
				image: 'https://http2.mlstatic.com/D_NQ_NP_762822-MLA43481932680_092020-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([8]);
			  })
		await Product.create({
				name: 'Hoverboard Patineta Electrica Skate Bluetooth Luces Led',
				description: 'PATINETA ELÉCTRICA HOVERBOARD MAX-YOU XFUN 6,5,MOTOR 250 W,RUEDAS DE 6,5 MACIZA,FRENO DINAMICO,BATERIA 36V 2Ah DE 10 CELDAS, VOLTAJE 220 V',
				price: 35000,
				availability: false,
				stock:23 ,
				image: 'https://http2.mlstatic.com/D_NQ_NP_859963-MLA43692366670_102020-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([8]);
			  })
		await Product.create({
				name: 'Roller Patin Expert Aluminio Extensible Abec + Bolso El Rey',
				description: 'ROLLERS EXPERT EXTENSIBLES: Bota de excelente confort. Base de metal de alto impacto. Ruedas de PU. Rulemanes de alto rodamiento. Sistema de ajuste con cordones y DuoLock. Con freno desmontable de PVC',
				price: 4500,
				availability: false,
				stock:43 ,
				image: 'https://http2.mlstatic.com/D_NQ_NP_751798-MLA42802383909_072020-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([7]);
			  })
		await Product.create({
				name: 'Rollers Expert Extensibles Silicona Aluminio Abec7- El Rey',
				description: 'ROLLERS EXPERT EXTENSIBLES: Bota de excelente confort. Base de metal de alto impacto. Ruedas de PU. Rulemanes de alto rodamiento. Sistema de ajuste con cordones y DuoLock. Con freno desmontable de PVC',
				price: 4500,
				availability: false,
				stock: 43,
				image: 'https://http2.mlstatic.com/D_NQ_NP_738191-MLA31112676292_062019-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([7]);
			  })
		await Product.create({
				name: 'Roller Patin Gadnic Ruedas Pu + Bolso Extensible Correas',
				description: 'Roller Profesional Gadnic RL01 Aluminio Extensible Ruedas PU + Bolso',
				price:6399 ,
				availability: false,
				stock: 32,
				image: 'https://http2.mlstatic.com/D_NQ_NP_679560-MLA43168480883_082020-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([7]);
			  })
		await Product.create({
				name: 'Bicicleta Mountain Bike Fierce Rodado 29 21 Velocidades Full',
				description: 'Bicicleta Mountain Bike Fierce Rodado 29 21 velocidades',
				price: 35000,
				availability: false,
				stock:32 ,
				image: 'https://http2.mlstatic.com/D_NQ_NP_737040-MLA32620021373_102019-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([4]);
			  })
		await Product.create({
				name: 'Bicicleta Mountain Bike Slp 5 R29 21v Shimano F/disco Susp.',
				description: 'Bicicleta Mountain Bike Fierce Rodado 29 21 velocidades',
				price: 65000,
				availability: false,
				stock: 43,
				image: 'https://http2.mlstatic.com/D_NQ_NP_974760-MLA41876665207_052020-O.webp'
			}).then(createdProduct => {
				  createdProduct.setCategories([4]);
			  })
		
		await Order.create({
    		shipping: 0,
    		paymentMethod: 1,
    		status: 'On Cart',
    		received: "0",
    		amount: 4533.23, // deberia ser la suma de los amount de productos...
    		quantity: 34, // deberia ser la suma de las quantities?...
    		productId: 3,
    	}, {
    		include: [ Product ]
    	}).then(res => {
    		res.setUser(1);
    		res.addProducts(1, { through: { quantity: 3, amount: 13000 }}) // ver forma de hacer q el amount persista en real...
    		res.addProducts(2, { through: { quantity: 1, amount: 500 }})
    	})

    	await Order.create({
    		shipping: 1,
    		paymentMethod: 2,
    		status: 'Created',
    		received: "0",
    		amount: 4533.23,
    		quantity: 34,
    		productId: 3,
    	}, {
    		include: [ Product ]
    	}).then(res => {
    		res.setUser(1);
    		res.addProducts(5, { through: { quantity: 4, amount: 74000 }}) // ver forma de hacer q el amount persista en real...
    		res.addProducts(7, { through: { quantity: 5, amount: 8300 }})
    	})

	  };
	  precarga();
  });
});
