var express = require('express')
var app = express()
var request = require('request')
var moment = require('moment')

const http = require('http')
const https = require('https')
// const htmlparser = require('htmlparser2')
const cheerio = require('cheerio')
// const logger = require('logger').createLogger()

app.get('/', function (req, res) {
  res.send('hello world')
})

// <!-- VERSION: ver-2.5.14.2 -->
app.get('/fetch', function (req, res, next) {
  let url = Object.keys(req.query)[0]
  if (typeof url === 'undefined') {
    res.send({message: /url cannot be undefined/})
  }
  req.query.url = url.replace(/.*?:\/\//g, '')
  let options = {
    hostname: url
  }
  processResponse(req, res, options)
})

let processResponse = function (req, res, options) {
  let time = moment().format('YYYY-MM-DD HH:mm:ss ZZ')
  var responseObject = {
    website: options.hostname,
    port: options.port,
    version: '',
    lastChecked: time
  }
  request(options.hostname, function (error, response, html) {
    var $ = cheerio.load(html, {xmlMode: true})
    if (!error && response.statusCode === 200) {
      $('body').contents().filter(function () {
        return this.nodeType === 8
      }).each(function (i, e) {
        let comment = e.nodeValue
        if (comment.toLowerCase().indexOf('version') > 0) {
          responseObject['version'] = comment.split('ver-')[1].trim()
        }
      })
      res.send(responseObject)
    } else {
      res.send(responseObject)
    }
  })
}

app.set('port', process.env.PORT || 8081)

// Server
var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
