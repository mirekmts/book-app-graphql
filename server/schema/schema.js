const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

let books = [
  { name: 'In to the Wild', genre: 'Drama', id: '1', authorId: '1' },
  { name: 'Lord of the ring', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'Star Wars', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'Wybitnoś', genre: 'Sci-Fi', id: '4', authorId: '2' },
  { name: 'Habits', genre: 'Sci-Fi', id: '5', authorId: '3' },
  { name: 'Fighter', genre: 'Sci-Fi', id: '6', authorId: '3' },
];

let authors = [
  { name: 'Adam Mickiewicz', age: 100, id: '1' },
  { name: 'Dawid Piątkowski', age: 30, id: '2' },
  { name: 'Stephen Covey', age: 51, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString},
    genre: { type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString},
    age: { type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve (parent, args) {
        return _.find(books, { id: args.id});
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    author: {
      type: AuthorType,
      args: { id: {type: GraphQLID }},
      resolve(parent, args) {
        return _.find(authors, {id: args.id });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
