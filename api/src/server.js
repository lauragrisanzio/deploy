const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require("cors");
const indexRoute = require("./routes/index");

require('./db.js');

const server = express(); //a partir de aca tenemos creado nuestrom servidor
//use: darle el camino
server.use(morgan("dev")); //recibe la req y registra los que sucede con ella/ "console.log de la req"
server.use(cors()); //permite a los servidores indicar a los navegadores si deben permitir la carga de recursos para un origen distinto al suyo
server.use(express.json());//reconocer el objeto de solicitud entrante como un objeto JSON, el envio de datos va a ser tomado como .json

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', indexRoute);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

//postgress: sist de gestion de db
//.use: indica a la req por donde debe pasar
//pasar la req por determinados middlewars: 
// fx que reciben la req, hace algo, y la devuelve a su camino - en el medio del camino hacia la endpoint
//middleware: req, res, next
//final de la req --> endpoint

//middleware:códigos que se ejecutan antes de que una petición 
//HTTP llegue al manejador de rutas o antes de que un cliente reciba una respuesta;