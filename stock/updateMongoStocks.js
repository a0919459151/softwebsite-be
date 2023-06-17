import { stockModel } from '../db/index.js'
import { spiderMoneyDJ, spiderTwse } from '../spider/index.js'

/**
 * 更新 mongodb stocks (上市股票, ETF)
 * @returns {Array} stocks
 */
async function updateMongoStocks () {
  const stocks = await spiderTwse()
  const etfs = await spiderMoneyDJ()

  // console.log('stocks', stocks)
  // console.log('etfs', etfs)
  if (stocks.length === 0) return console.log('stocks is empty')
  if (etfs.length === 0) return console.log('etfs is empty')

  await stockModel.collection.drop()
  await stockModel.create(stocks.concat(etfs))
  console.log('updateMongoStocks done')
}

// updateMongoStocks()
export { updateMongoStocks }
