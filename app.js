const express = require('express');
const http = require('http');
const path = require('path');

// const api = require('./server/routes/api');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (res, req) =>{
  res.sendFiles(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, ()=>console.log('Running'));