const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => res.send('Go to /graphl to start playground'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Now listening for request on port ${PORT}`);
});
