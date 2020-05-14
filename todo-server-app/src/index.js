import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));



const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

const database = mongoose.connection

database.on('error', console.error.bind(console, 'connection error:'))
database.once('open', () => console.log('We are connected to MongoDB'))

const typeDefs = gql(
  fs.readFileSync(`${__dirname}/graphql/schema.graphql`, { encoding: 'utf-8' })
)
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({ typeDefs, resolvers })

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`GraphQL server ready on ${url}`))
