# softwebsite-be
小軟理財網後端

從雅虎股市、MoneyDJ理財網、台灣證交所爬取股票資訊提供給前端網頁畫面渲染。

# 使用到的技術
- language: node v16.16.0
- api server: koa
- db: mongo db
- orm: mongoose
- 爬蟲: puppeteer, got, cheerio

# get start 
### set env var
    cp .env.example .env

### npm install
    npm i

### run koa
    npm run start
