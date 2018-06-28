const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

app.use(express.static('examples/static'))
app.use('/dist', express.static('dist'))

app.all(['/en/:buildingId/'], (req, res) => {
  res.sendFile(`${__dirname}/static/en/index.html`)
})

app.all(['/zh-cn/:buildingId/'], (req, res) => {
  res.sendFile(`${__dirname}/static/zh-cn/index.html`)
})

const samplePanoCollectionId = 'pc_f34fdc10-1aff-4dd7-b7b3-fc5601a5fbd1'
app.get('/', (req, res) => {
  const url = `/en/${samplePanoCollectionId}`
  res.redirect(url)
})


app.listen(process.env.PORT || 3001, function () {
  console.log('Example app listening on port 3001!')
})
