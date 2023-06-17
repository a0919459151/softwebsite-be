import { stockModel } from '../db/index.js'

const getOneByStockSymbol = async (stockSymbol) => {
  return await stockModel.findOne({ stockSymbol })
}

export { getOneByStockSymbol }
