import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  state = {
    selected: null,
  }

  displayBooks = () => {
    const data = this.props.data;
    if(data.loading) {
      return <div>Loading books...</div>

    }

    return data.books.map(book => <li onClick={() => this.setState({ selected: book.id })} key={book.id}>{book.name}</li>)
  };

  render() {
    return (
      <div>
        <ul className="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
