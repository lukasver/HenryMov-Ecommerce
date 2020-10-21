require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];
 
sequelize.authenticate()
.then(()=>{
  console.log( "Conectado")
}
)
.catch(()=>{
  console.log("Error de conexion")
})

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, productCategory, User, Order, Orderline, Reviews, Newsletter } = sequelize.models;

// Aca vendrian las relaciones

// 1a1
// eventualmente podriamos incluir aca una tabla adress para desagregarla de la tabla user por la cant de datos...
// User.HasOne(Adress);
// Adress.BelongsTo(User); // se agregaría la FK de "userId" acá...

// 1aN
// == USUARIO PUEDE TENER MUCHAS ORDENES // CADA ORDEN PERTENECE A UN USUARIO ==
User.hasMany(Order);
Order.belongsTo(User); // se agrega FK "userId" en tabla Order que referencia al id del User.

// NaM
// == PRODUCTOS PUEDEN SER DE MUCHAS CATEGORIAS // CATEGORIAS TIENEN MUCHOS PRODUCTOS ==
// == TABLA INTERMEDIA: productCategory
Product.belongsToMany(Category, {through: 'productCategory', timestamps: false});
Category.belongsToMany(Product, {through: 'productCategory'});

// == PRODUCTOS ESTAN EN MUCHAS ORDENES // ORDENES TIENEN MUCHOS PRODUCTOS ==
// == TABLA INTERMEDIA: Orderline
Order.belongsToMany(Product, { through: Orderline, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: Orderline, foreignKey: 'productId' });

// Product se vincula a users con tabla intermedia reviews?? habria q ver eso

// Relaciones de Reviews
Reviews.belongsTo(Product);
Product.hasMany(Reviews );


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
