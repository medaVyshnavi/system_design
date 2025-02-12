const users = [
  {
    name:'abc', age:26
  },
  {
    name:'def', age:20
  },
  {
    name: 'ghi', age: 40
  },
  {
    name: 'jkl', age: 2
  }
]

const sortUsersByAge = () => {
  const userList = users.sort((a, b) => a.age - b.age)
  return userList
}

sortUsersByAge()

module.exports = sortUsersByAge
