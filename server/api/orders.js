const router = require('express').Router()
const {
  Beer,
  Review,
  Category,
  Brewery,
  User,
  Order,
  OrderItem
} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

const isLoggedIn = (req, res, next) => {
  if (req.user) next()
  else {
    const err = new Error('Must loggin to do things')
    res.status(401)
    next(err)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.userType === 'admin') {
    next()
  } else {
    const err = new Error('Must be an admin')
    res.status(401)
    next(err)
  }
}

//ADMIN ROUTES

// router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
//   try {
//     const allOrders = await Order.findAll()
//     res.json(allOrders)
//   } catch (error) {
//     next(error)
//   }
// })

//GET ORDERS
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    if (req.user.userType === 'admin') {
      const allOrders = await Order.findAll()
      res.json(allOrders)
    } else {
      const allOrders = await Order.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(allOrders)
    }
  } catch (error) {
    next(error)
  }
})
