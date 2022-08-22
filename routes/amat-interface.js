'use strict'
const express = require('express')
const router = express.Router()
const DatabaseHelper = require('../helper/DatabaseHelper')

const Interface = require('../models/fetch/amat-interface')
const Validator = require('../helper/validator')
const Response = require('../helper/response')

const requiredFields = {
  'update': [
    'receipt_date',
    'date_time_performed',
    'shipper_customer_name',
    'shipper_customer_location',
    'customer_name',
    'customer_location',
  ],

  'move': [
    'from_location',
    'to_location',
    'quantity',
    'date_time_performed',
    'move_flag',
  ],

  'hold-unhold': [
    'date_time_performed',
  ],

  'allocate': [
    'loc',
    'quantity',
    'uom',
    'vas_flag',
  ],

  'pick': [
    'quantity',
    'date_time_performed'
  ],

  'finalize': [
    'ship_flag',
    'no_of_lp',
    'date_time_performed'
  ]
}

async function updateInterface (payload) {
  const query = { lp_no: payload.lp_no, store_key: payload.store_key }

  try {
    const inter = await Interface.findOneAndUpdate(query, payload,
      { upsert: true, new: true })
    if (inter) return {
      error: false,
      data: 'Data has been updated successfully',
    }
    else return { error: true, data: 'Unknown error' }

  } catch (err) {
    return { error: true, data: err }
  }
}

async function addJourney (payload) {
  const query = { lp_no: payload.lp_no, store_key: payload.store_key }

  try {
    const inter = await Interface.findOne(query)
    if (inter) {

      if (payload.action === 'hold-unhold') {
        inter.on_hold = payload.flag === 'hold'
        payload.hold_unhold_flag = payload.flag
      }

      inter.journey.push(payload)
      await inter.save()
      return {
        error: false,
        data: 'Data has been updated successfully',
      }

    } else return {
      error: true,
      data: 'The given lp_no and store_key does not exist. Please update the interface first',
    }
  } catch (err) {
    console.log(err)
    return { error: true, data: err }
  }
}

router.post('/event', async (req, res) => {
  const payload = req.body

  if (!Validator.body_has(payload.action)) return Response.send(res, 200, false,
    'Action is required')

  if (!Validator.body_has(payload.store_key)) return Response.send(res, 200,
    false, 'Store key is required')
  if (!Validator.body_has(payload.lp_no)) return Response.send(res, 200, false,
    'LP Number is required')

  await DatabaseHelper.connect()

  let missing = null
  let result = { error: true, data: 'Default error' }

  switch (payload.action) {

    case 'update':
      missing = missingField(requiredFields[payload.action], payload)
      if (missing) return Response.send(res, 200, false,
        missing + ' field is required')

      result = await updateInterface(payload)
      await DatabaseHelper.disconnect()

      if (result.error) return Response.send(res, 200, false,
        result.data)
      else return Response.send(res, 200, true,
        result.data)

    case 'move':
    case 'hold-unhold':
    case 'allocate':
    case 'pick':
    case 'finalize':
      missing = missingField(requiredFields[payload.action], payload)
      if (missing) return Response.send(res, 200, false,
        missing + ' field is required')

      result = await addJourney(payload)
      await DatabaseHelper.disconnect()

      if (result.error) return Response.send(res, 200, false,
        result.data)
      else return Response.send(res, 200, true,
        result.data)

    default:
      return Response.send(res, 200, false, 'This action is not defined.')
  }
})

function missingField (requiredFields, payload) {

  for (let field of requiredFields) {
    if (!Validator.body_has(payload[field])) return field
  }

  return null
}

module.exports = router