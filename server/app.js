var express = require('express')
var app = express()
var request = require('request')
var moment = require('moment')
var config = require('./sites-config.json')
// var cors = require('cors')

const http = require('http')
const https = require('https')
const cheerio = require('cheerio')
const axios = require('axios')

const showingPosterLinkTemplate = '/{country_code}/data-api-service/v1/poster/{tenant}/by-showing-type/SHOWING?ordering=desc'
const comingSoonPosterLinkTemplate = '/{country_code}/data-api-service/v1/poster/{tenant}/by-showing-type/FUTURE?ordering=asc'
const cinemasLinkTemplate = '/{country_code}/data-api-service/v1/quickbook/{tenant}/cinemas/with-event/until/'
const headers = { timeout: 5000, headers: { 'User-Agent': 'HTTPie/0.9.9'}}

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  next()
})

app.get('/fetch', function (req, res, next) {
  let queriedProject = Object.keys(req.query)[0]

  let tenant = config.find(x => x.project === queriedProject)
  if (typeof tenant !== 'undefined') {
    let url = tenant.websiteUrl
    if (typeof url === 'undefined') {
      res.json({error: 'URL_UNDEFINED', message: 'url cannot be undefined'})
      res.end()
    } else {
      req.query.url = url.replace(/.*?:\/\//g, '')
      let options = tenant
      return processResponse(req, res, options)
    }
  } else {
    res.json({error: 'PROJECT_UNDEFINED', message: 'no project found for specified id'})
    res.end()
    // res.end('Cannot ' + req.method + ' ' + req.url)
  }
})

let buildLink = function (template, options) {
  let result = ''
  if (typeof template !== 'undefined' && typeof options !== 'undefined') {
    result = template.replace('{country_code}', options.countryCode).replace('{tenant}', options.tenant)
  }
  return result
}

let processResponse = async function (req, res, options) {
  let time = moment().format()
  let futureDate = moment().add(1, 'y').format('YYYY-MM-DD')
  let responseObject = {
    project: options.project,
    website: options.websiteUrl,
    version: '',
    lastChecked: time
  }

  // get dynamic data for quickbook and posters
  let bookNowPosters = await getPosters(options.websiteUrl + buildLink(showingPosterLinkTemplate, options))
  let comingSoonPosters = await getPosters(options.websiteUrl + buildLink(comingSoonPosterLinkTemplate, options))
  let quickbookCinemas = await getCinemasForQuickbook(options.websiteUrl + buildLink(cinemasLinkTemplate, options) + futureDate)
  responseObject['bookNowPosters'] = bookNowPosters
  responseObject['comingSoonPosters'] = comingSoonPosters
  responseObject['quickbookCinemas'] = quickbookCinemas

  request(options.websiteUrl, headers, function (error, response, html) {
    if (!error && typeof response !== 'undefined' && response.statusCode === 200) {
      let $ = cheerio.load(html, {xmlMode: true})
      responseObject['version'] = getAppVersion($)
      responseObject['menuElements'] = getMenuElements($)
      responseObject['heroBanners'] = getHeroBanners($)
      responseObject['promoboxFirstTabItems'] = getPromoboxCards($)
      responseObject['footerLinks'] = footerLinks($)
      res.send(responseObject)
    } else {
      res.send(responseObject)
    }
  })
}

let getAppVersion = function ($) {
  let response = ''
  $('body').contents().filter(function () {
    return this.nodeType === 8
  }).each(function (i, e) {
    let comment = e.nodeValue
    if (comment.toLowerCase().indexOf('version') > 0) {
      response = comment.split('ver-')[1].trim()
    }
  })
  return response
}

let getMenuElements = function ($) {
  let $expIcons = $('#defaultmenu .nav.navbar-right .exp-icon-container a') // for uk
  let $menuItems = $('#defaultmenu ul.nav li:not(.session-cinema)')
  return $expIcons.length + $menuItems.length
}

let getHeroBanners = function ($) {
  return $('#slick-hero a').length
}

let getPosters = async function (url) {
  let result = ''
  await axios.get(url, headers)
    .then(function (response) {
      let data = response.data
      let body = data.body
      if (typeof body !== 'undefined' && typeof body['posters'] !== 'undefined') {
        result = body.posters.length
      } else {
        result = 0
      }
    })
    .catch(function () {
      result = 0
    })
  return result
}

let getCinemasForQuickbook = async function (url) {
  let result = ''
  await axios.get(url, headers)
    .then(function (response) {
      let data = response.data
      let body = data.body
      if (typeof body !== 'undefined' && typeof body['cinemas'] !== 'undefined') {
        result = body['cinemas'].length
      } else {
        result = 0
      }
    })
    .catch(function () {
      result = 0
    })
  return result
}

let getPromoboxCards = function ($) {
  let cards = $('#tab_promoTab1 .hidden-xs .promobox-card').length
  let links = $('#tab_promoTab1 .hidden-xs .promobox-link').length
  return cards + links
}

let footerLinks = function ($) {
  return $('section.footer .hidden-xs .footer-group-item').length
}

app.use(express.static('public'))
// app.use(cors())
// app.options('*', cors())
app.set('port', process.env.PORT || 8081)

// Server
var server = http.createServer(app)
server.timeout = 5000
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
