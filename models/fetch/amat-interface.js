const mongoose = require('mongoose')
const Schema = mongoose.Schema

const modelName = 'amat-interface'
const schema = new Schema({
  store_key: {
    type: String,
    required: true,
  },
  as_no: {
    type: String,
  },
  receipt_date: {
    type: String,
  },
  date_time_performed: {
    type: String,
  },
  lp_no: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
  },
  sku_description: {
    type: String,
  },
  line_no: {
    type: String,
  },
  uom: {
    type: String,
  },
  received_quantity: {
    type: Number,
  },
  actual_date_time: {
    type: Date,
  },
  shipper_customer_name: {
    type: String,
  },
  shipper_customer_location: {
    type: String,
  },
  customer_name: {
    type: String,
  },
  customer_location: {
    type: String,
  },
  length: {
    type: Number,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  on_hold: {
    type: Boolean,
    default: false,
  },
  tote: {
    type: String,
  },
  journey: [
    {
      wms_order_no: {
        type: String,
      },
      project_code: {
        type: String,
      },
      action: {
        type: String,
        enum: ['move', 'hold-unhold', 'allocate', 'pick', 'finalize'],
        required: true,
      },
      date_time_performed: {
        type: String,
      },
      from_location: {
        type: String,
      },
      to_location: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      loc: {
        type: String,
      },
      uom: {
        type: String,
      },
      move_flag: {
        type: String,
      },
      hold_unhold_flag: {
        type: String,
      },
      ship_flag: {
        type: String,
      },
      vas_flag: {
        type: String,
      },
      order_date: {
        type: String,
      },
      delivery_date: {
        type: String,
      },
      no_of_lp: {
        type: String,
      },
    }],
}, {
  timestamps: true,
})

module.exports = mongoose.model(modelName, schema, modelName)