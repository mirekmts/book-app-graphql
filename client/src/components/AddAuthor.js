import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addAuthorMutation } from '../queries/queries';

class AddAuthor extends Component {
  state = {
    name: '',
    age: '',
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value, 10)  : e.target.value})
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.addAuthorMutation({
      variables: {...this.state},
      refetchQueries: [{ query: getAuthorsQuery}]
    });
    this.setState({
      name: '',
      age: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="field">
          <label htmlFor="name">Name:</label>
          <input required id="name" name="name" type="text" value={this.state.name} onChange={this.onInputChange}/>
        </div>

        <div className="field">
          <label htmlFor="age">Age:</label>
          <input required id="age" name="age" type="number" value={this.state.age} onChange={this.onInputChange}/>
        </div>

        <button>+</button>
      </form>
    );
  };
};

export default compose(
  graphql(addAuthorMutation, { name: "addAuthorMutation"})
)(AddAuthor);
