const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors());

mongoose.connect(`mongodb://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`, {
  useNewUrlParser: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.get('/', (req, res) => res.send('Go to /graphl to start playground'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Now listening for request on port ${PORT}`);
});
