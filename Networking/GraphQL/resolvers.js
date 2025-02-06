const data = {
  authors : [
        { id: '1', name: "xyz", bookIds : ['101','103'] },
        { id: '2', name: "abc", bookIds : ["102"] },
  ],
  books : [
        {
          id: "101",
          title: "keep buying",
          publishedYear: 1998,
          authorId: "1",
        },
        {
          id: "102",
          title: "hold the door",
          publishedYear: 2023,
          authorId: "2",
        },
        {
          id: "103",
          title: "focus on today",
          publishedYear: 2028,
          authorId: "1",
        },
      ]
}

// Book is the parent of author from the typeDefs
export const resolvers = {
  Book: {
    author: (parent, args, context, info) =>
      data.authors.find((author) => author.id === parent.authorId),
  },

  // parent gives all the data of that iteration
  Author: {
    books: (parent, args, context, info) => {
      console.log(parent)
      return data.books.filter((book) => parent.bookIds.includes(book.id))
    }
  },

  // fetching data from db/ external apis
  Query: {
    authors: () => data.authors,
    books: () => data.books,
  },
  Mutation: {
    // args given the data sent from the client side
    addBook: (parent, args, context, info) => {
      console.log(args)
      const newBook = { ...args, id: data.books.length + 1 };
      data.books.push(newBook);
      return newBook;
    }
  },
};
