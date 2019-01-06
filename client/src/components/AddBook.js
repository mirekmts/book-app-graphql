import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
  };

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if(data.loading) {
      return <option disabled>Loading Authors...</option>
    }

    return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name] : e.target.value})
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {...this.state}
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="filed">
          <label htmlFor="name">Book name:</label>
          <input id="name" name="name" type="text" onChange={this.onInputChange}/>
        </div>

        <div className="filed">
          <label htmlFor="genre">Genre:</label>
          <input id="genre" name="genre" type="text" onChange={this.onInputChange}/>
        </div>

        <div className="filed">
          <label htmlFor="authorId">Author:</label>
          <select id="author" name="authorId" onChange={this.onInputChange}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);
