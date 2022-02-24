const express = require('express')
const path = require('path')

const app = express()

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'f6539d27d5e84f86b0ff2d29f719ad9d',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../main.html'))
})
app.use(express.static(path.join(__dirname, '../')))

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`This port is active ${port}`)
})