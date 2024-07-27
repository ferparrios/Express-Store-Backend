const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express()
const port = 3000

app.use(express.json())
// const whitelist = ['http://localhost:8081', 'exp://192.168.1.39:8081']
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)){
//       callback(null, true)
//     } else {
//       callback(new Error('no permitido'))
//     }
//   }
// }
// app.use(cors(options))
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola Mundo en la nueva ruta')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, () => {
  console.log('Corriendo en el puerto ' + port)
})
