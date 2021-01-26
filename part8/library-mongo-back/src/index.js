const config = require('../utils/config')
const jwt = require('jsonwebtoken')

const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')

const MONGODB_URI = config.MONGODB_URI
const JWT_SECRET = config.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/


const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.countDocuments(),
    bookCount: async () => await Book.countDocuments(),
    allBooks: async (root, args) => {
      let books = []

      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        books = await Book
          .find({
            author: { $in: [author.id]},
            genres: { $in: [args.genre]}
          })
          .populate('author', { name: 1 })
      } else if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        books = await Book
          .find({ author: { $in: [author.id]} })
          .populate('author', { name: 1 })
      } else if (!args.author && args.genre) {
        books = await Book
          .find({ genres: { $in: [args.genre]} })
          .populate('author', { name: 1 })
      } else {
        books = await Book
          .find({})
          .populate('author', { name: 1 })
      }

      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      return currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const count = await Book.find({ author: root._id }).countDocuments()
      return count
    }
  },

  Mutation: {
    addAuthor: async (root, args, context) => {
      if (!args || args && args.name.length <= 4) {
        throw new UserInputError(`Author name is too short or it was not provided`)
      }

      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        if (!args || args && args.author.length <= 4) {
          throw new UserInputError(`Author name is too short or it was not provided`)
        }
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      if (!args || args && args.title.length <= 2) {
        throw new UserInputError(`Book title is too short or it was not provided`)
      }

      const book = new Book({ ...args, author: author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = null
      try {
        author = await Author
          .findOneAndUpdate(
            { "name": args.name },
            { $set: { "born": args.born } }
          )

        if (!author) {
          throw new UserInputError(`No author with name: ${args.name}`)
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    // Old way, not using MongoDB
    // addBook: (root, args) => {
    //   const newBook = { ...args, id: uuidv4() }
    //   const author = authors.find(a => a.name.toLowerCase() === args.author.toLowerCase())
    //   if (!author) {
    //     const newAuthor = { name: args.author, id: uuidv4() }
    //     authors = authors.concat(newAuthor)
    //   }
    //   books = books.concat(newBook)
    //   return newBook
    // }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      // const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
