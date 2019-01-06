import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

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
      variables: {...this.state},
      refetchQueries: [{ query: getBooksQuery}]
    });
    this.setState({
      name: '',
      genre: '',
      authorId: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="field">
          <label htmlFor="name">Book name:</label>
          <input required id="name" name="name" type="text" value={this.state.name} onChange={this.onInputChange}/>
        </div>

        <div className="field">
          <label htmlFor="genre">Genre:</label>
          <input required id="genre" name="genre" type="text" value={this.state.genre} onChange={this.onInputChange}/>
        </div>

        <div className="field">
          <label htmlFor="authorId">Author:</label>
          <select required id="author" name="authorId" value={this.state.authorId} onChange={this.onInputChange}>
            <option value="" disabled hidden>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  };
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);
