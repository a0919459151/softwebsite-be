import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
/**
 * 爬取台灣上市公司股票
 * @returns {Array} stocks
 */
const spiderTwse = async () => {
  const url = 'https://www.twse.com.tw/zh/stocks/inquiry.html'

  const stocksList = await getStockListDiv(url)

  const $ = cheerio.load(stocksList)
  const aElements = $('a')

  const stocksDataArray = aElements.toArray().map(el => {
    const text = $(el).text()
    const stock = {
      stockSymbol: text.split(' ')[0],
      stockName: text.split(' ')[1]
    }
    return stock
  })

  return stocksDataArray
}

// pupteer get div
const getStockListDiv = async (url) => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()
  await page.goto(url)

  // 等待 元素出现
  await page.waitForSelector('tbody.is-last-page')

  const tableContent = await page.evaluate(() => {
    const stocksListDiv = document.getElementById('stocksList')
    return stocksListDiv.innerHTML
  })

  await browser.close()

  return tableContent
}

// spiderTwse()
export { spiderTwse }
