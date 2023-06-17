import koaCors from '@koa/cors'
import dotenv from 'dotenv'
import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import mongoose from 'mongoose'

import { spiderYahooFinance } from './spider/index.js'
import { getOneByStockName } from './stock/getOneByStockName.js'
import { getOneByStockSymbol } from './stock/getOneByStockSymbol.js'
import { updateMongoStocks } from './stock/updateMongoStocks.js'
dotenv.config()

const app = new Koa()
const router = new Router()
const port = 3000

app.use(koaBody())
  .use(koaCors())

router.get('/', async ctx => {
  ctx.body = 'Hello koa!'
})

router.get('/stockData/:stockSymbol', async ctx => {
  const { stockSymbol } = ctx.params
  const result = await spiderYahooFinance(stockSymbol)
  ctx.body = result
})

router.post('/stockData', async ctx => {
  const { stockSymbolArray } = ctx.request.body
  const temp = []
  stockSymbolArray.forEach(element => {
    temp.push(spiderYahooFinance(element))
  })
  const resObj = await Promise.all(temp)
  ctx.body = resObj
})

router.get('/getOneBystockName/:stockName', async ctx => {
  const { stockName } = ctx.params
  const resObj = await getOneByStockName(stockName)
  ctx.body = resObj
})

router.get('/getOneBystockSymbol/:stockSymbol', async ctx => {
  const { stockSymbol } = ctx.params
  const resObj = await getOneByStockSymbol(stockSymbol)
  ctx.body = resObj
})

app.use(router.routes())

connect()

function listen () {
  app.listen(port)
  console.log('Koa app started on port ' + port)
}

async function connect () {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen)
  return mongoose.connect(
    process.env.MONGO_LOCAL_URL,
    {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    async () => {
      console.log('connect mongodb ...')
      await updateMongoStocks()
    }
  )
}
