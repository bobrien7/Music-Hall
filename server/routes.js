const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.pass,
  port: config.port,
  database: config.db
});
connection.connect((err) => err && console.log(err));

// routes here
const test = function (req, res) {
    res.send('response from express backend received!');
}

module.exports = {
    test
}
