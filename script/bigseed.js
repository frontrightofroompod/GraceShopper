'use strict'
const faker = require('faker')
const db = require('../server/db')
const {
  User,
  Beer,
  Review,
  Image,
  Category,
  Brewery
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  for (let i = 0; i < 10000; i++) {
    await Beer.create(faker.fake(name.lastName()))
  }
}
