const Sequelize = require('sequelize')
const db = require('../db')

const Beer = db.define('beer', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {type: Sequelize.FLOAT},
  inventory: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: false},
  abv: {type: Sequelize.FLOAT},
  ibu: {type: Sequelize.INTEGER},
  type: {
    type: Sequelize.ENUM(
      'Pilsner',
      'Lager',
      'Bock',
      'Stout',
      'IPA',
      'Wheat',
      'Red Ale',
      'Amber Ale',
      'Hefeweizen',
      'Lambic'
    )
  },
  imgURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://robohash.org/beer69'
  }
})

module.exports = Beer
