import { stockModel } from '../db/index.js'

const getOneByStockName = async (stockName) => {
  return await stockModel.findOne({ stockName })
}
export { getOneByStockName }
