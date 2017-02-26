let app = require('../server.js') ;
var massive = require('massive');
var massiveInstance = massive.connectSync({connectionString :"postgres://rlqkowzp:8KSTNz0MdmfMv5qvPYZAURBUXW89Blp3@babar.elephantsql.com:5432/rlqkowzp"})
app.set('db', massiveInstance);
var db = app.get('db');

module.exports = {
  serverTest: function (req, res) {
    res.send("there and back again")
  }
}
