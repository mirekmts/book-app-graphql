import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';
import Tabs from './components/Tabs';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <div className="App">
          <h1>Reading List</h1>
          <BookList />
          <Tabs>
            <div label="Add Book">
              <AddBook />
            </div>
            <div label="Add Author">
              <AddAuthor />
            </div>
          </Tabs>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
