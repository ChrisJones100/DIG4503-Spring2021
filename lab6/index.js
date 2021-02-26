const express = require('express')
const app = express()
const PORT = 45030

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/person', (req, res) => {
    res.send({name: "Chris", color:"Green"})
  })
  
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})