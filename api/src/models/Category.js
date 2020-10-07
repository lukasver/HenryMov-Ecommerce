import Sequelize from 'sequelize';
import db from './db.js';
const S = Sequelize;

const Category = db.define('category', {
	name: {type: S.STRING(45), allowNull: false, unique: true},
	description: {type: S.STRING(255)},
	status: {type: S.ENUM('Activado', 'Desactivado')}
});

export default Category;