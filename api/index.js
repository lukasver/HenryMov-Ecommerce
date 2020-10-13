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
const { Product, Category, conn } = require('./src/db.js');
const { port } = process.env // agregar port a tu variable de entorno .env

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port || 3001, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
    const precarga = async function () {	  	

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
	  		name: 'Hats',
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
	  		description: 'un hoverboard blanco de 2 ruedas',
	  		price: 210,
	  		availability: false,
	  		stock: 100,
	  		image: 'https://i.pinimg.com/originals/ea/2b/84/ea2b84b6d1358a047ccd9925003620d8.jpg'
	  	}).then(createdProduct => {
				createdProduct.setCategories([5]);
			})
	  	await Product.create({
	  		name: 'Skate',
	  		description: 'un shortboard blanco de 4 ruedas',
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

	  };
	  precarga();
	  console.log("Productos y Categorias precargadas");
  });
});
