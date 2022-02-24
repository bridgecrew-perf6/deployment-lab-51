const express = require('express')
const path = require('path')

const app = express()


const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'f6539d27d5e84f86b0ff2d29f719ad9d',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

```// record a generic message and send it to Rollbar```
rollbar.log('Hello world!')

//GET ENDPOINTS
app.get(`/`, (req,res) => {
    res.sendFile(path.join(__dirname, '../public/main.html'))
})
app.get('/api/critical', (req,res) => {
    res.status(200).send(`Critical sent to rollbar`)
    rollbar.critical('rollbar critical sent')
})
app.get('/api/error', (req,res) => {
    res.status(200).send(`error sent to rollbar`)
    rollbar.error('rollbar error sent')
})
app.get('/api/info', (req,res) => {
    res.status(200).send(`info sent to rollbar`)
    rollbar.info('this should work for info')
})
app.get('/api/warning', (req,res) => {
    res.status(200).send(`warning sent to rollbar`)
    rollbar.warning('this is my warning')
})
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.js'))
})
app.get('/styles.css', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/styles.css'))
})


let port = process.env.PORT || 5500
app.listen(port, () => console.log(`Running on port ${port}`))