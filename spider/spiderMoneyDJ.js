import { load } from 'cheerio'
import got from 'got'

/**
 * @description 爬取台灣ETF
 * @returns {Array} etfDataArray
 */
const spiderMoneyDJ = async () => {
  const url = 'https://www.moneydj.com/etf/eb/et305001list.djhtm?c=47'
  let page = await got.get(url).buffer()
  page = new TextDecoder('big5').decode(page)
  const $ = load(page)
  const rows = $('#oMainTable tbody tr')

  const etfDataArray = rows.toArray().map(el => {
    const $item = $(el)
    return {
      stockSymbol: $item.find('.txt_l.Td_a').text(),
      stockName: $item.find('.txt_l.Td_a_L1a').text().replace('基金', '')
    }
  })

  return etfDataArray
}

// spiderMoneyDJ()
export { spiderMoneyDJ }
