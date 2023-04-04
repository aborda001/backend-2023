const app = require('./app');
const { config } = require('./config/config');
const { port } = config;

app.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});
