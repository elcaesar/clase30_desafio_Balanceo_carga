const dotenv = require('dotenv').config()
const { dbConnection } = require('./db')
const express = require('express')
const {create} = require('express-handlebars')
const indexRoute = require('../routes/index.route')
const argv = require('./yargs')

class Server {
  constructor(){
    this.PORT = argv.p || 8080;
    this.app = express();
    this.root = '/'
    this.path = require('path')
    this.hbs = create({
      defaultLayout : 'main',
      layoutsDir    : this.path.join(this.app.get('views'), 'layouts'),
      partialsDir   : this.path.join(this.app.get('views'), 'partials'),
      extname       : '.hbs'
    })
    
    //Middlewares
    this.middlewares()

    // Rutas de la app
    this.routes()

    //connect db
    this.connectDB()
  }

  middlewares(){
    this.app.use(express.static('public'))
    this.app.use(express.urlencoded({extended: false}))
    
    this.app.engine('.hbs', this.hbs.engine)
    this.app.set('view engine', '.hbs')
    this.app.set('views', this.path.join(__dirname, '../views'))
  }

  routes(){
    this.app.use(this.root, indexRoute)
  }

  connectDB(){
    (async () => {
      await dbConnection();
    })();
  }

  listen(){
    this.app.listen(this.PORT, () => {
      console.log(`Server Up on port ${this.PORT}`)
    })
  }

}

module.exports = Server