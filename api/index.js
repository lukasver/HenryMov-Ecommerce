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

	  	await Product.create({
	  		name: 'patineta',
	  		description: 'un longboard negro de 4 ruedas',
	  		price: 70,
	  		availability: true,
	  		stock: 100,
	  		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHP4KrqOQd-WoLR1EAKi-PTBSBlyiAQgYlOQ&usqp=CAU'
	  	}).then(Product.create({
	  		name: 'Vela Windsurf',
	  		description: 'un shortboard blanco de 4 ruedas',
	  		price: 140,
	  		availability: true,
	  		stock: 100,
	  		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg'
	  	}))
	  	.then(Product.create({
	  		name: 'Gorra',
	  		description: 'un hoverboard azul de 2 ruedas',
	  		price: 210,
	  		availability: false,
	  		stock: 100,
	  		image: 'https://www.luckybikes.com.ar/wp-content/uploads/2019/09/es2-2-600x706.jpg'
	  	})).then(Product.create({
	  		name: 'longboard',
	  		description: 'un shortboard blanco de 4 ruedas',
	  		price: 140,
	  		availability: true,
	  		stock: 100,
	  		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg'
	  	}))
	  	.then(Product.create({
	  		name: 'hoverboard',
	  		description: 'un hoverboard azul de 2 ruedas',
	  		price: 210,
	  		availability: false,
	  		stock: 100,
	  		image: 'https://www.luckybikes.com.ar/wp-content/uploads/2019/09/es2-2-600x706.jpg'
	  	})).then(Product.create({
	  		name: 'skate',
	  		description: 'un shortboard blanco de 4 ruedas',
	  		price: 140,
	  		availability: true,
	  		stock: 100,
	  		image: 'https://d26lpennugtm8s.cloudfront.net/stores/001/049/128/products/2231-3432720f2779390e6615887894926411-640-0.jpg'
	  	}))
	  	.then(Product.create({
	  		name: 'bike',
	  		description: 'un hoverboard azul de 2 ruedas',
	  		price: 210,
	  		availability: false,
	  		stock: 100,
	  		image: 'https://www.luckybikes.com.ar/wp-content/uploads/2019/09/es2-2-600x706.jpg'
	  	}));

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
	  	}));
	  };
	  precarga();
	  console.log("Productos y Categorias precargadas");
  });
});
