const app = require('./app.js');
const startConnection = require('./database.js');

startConnection();

app.listen(app.get('port'), () => {
  console.log("Server on port", app.get('port'));
})