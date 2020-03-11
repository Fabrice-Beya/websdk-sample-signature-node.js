require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors());

app.get("/", function(req, res){
  res.send("Welcome to Virtual Classroom Backend api");
})



app.post('/', (req, res) => {

  const timestamp = new Date().getTime()
  const msg = Buffer.from(process.env.API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
  const hash = crypto.createHmac('sha256', process.env.API_SECRET).update(msg).digest('base64')
  const signature = Buffer.from(`${process.env.API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

  res.send(signature)
})



app.listen(port, () => console.log(`Welcome to Virtual Classroom Backend api runnning on port: ${port}!`))
