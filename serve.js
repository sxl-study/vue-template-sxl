const express = require('express')
const app = express()


app.get('/data', (req, res) => {
    console.log('11111')
    res.send('hello')
  })


app.listen(8081, () => {
  console.log('server is running in port:8081');
})
