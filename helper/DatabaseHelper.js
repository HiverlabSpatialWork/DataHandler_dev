const mongoose = require('mongoose')
const config = require('../helper/config')

const dbUri = 'mongodb://localhost:27017/data-handler'

async function connect () {
  try {
    await mongoose.connect(config.url)
    console.log('Connected to databse')
  } catch (e) {
    console.log('Error connecting to Database')
  }
}

async function disconnect () {
  await mongoose.disconnect()
}

mongoose.plugin((schema) => {
  schema.options.toJSON = {
    virtuals: true,
    versionKey: false,
    transform (doc, ret) {
      delete ret._id
      delete ret.id
      delete ret.__v
    },
  }
})

module.exports = {
  connect,
  disconnect,
}