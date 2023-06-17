import { Schema } from 'mongoose'

const stockSchema = new Schema({
  stockName: {
    type: String,
    required: true
  },
  stockSymbol: {
    type: String,
    required: true,
    index: { unique: true }
  }
}, {
  versionKey: false
})

export default stockSchema
