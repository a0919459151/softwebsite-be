import mongoose from 'mongoose'
import stockSchema from './schemas/stock.js'

// mongoose.connect(process.env.MONGO_LOCAL_URL, async () => {
//   await updateMongoStocks()
//   console.log('connect mongodb ...')
// })

const stockModel = mongoose.model('stocks', stockSchema)

export { stockModel }
