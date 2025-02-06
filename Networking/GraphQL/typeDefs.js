export const typeDefs = `
  type Book {
    id: ID!
    title: String!
    publishedYear: Int
    author : Author
  }

  type Author {
    id: ID!
    name: String!
    books : [Book]
  }
  
  # to get the data we use Query
  type Query {
    books : [Book]
    authors : [Author]
  }

  # to update the schema
  type Mutation {
    addBook (title : String!, publishedYear: Int, authorId : ID! ) : Book! 
  }
`;
