const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class UsersService {
  constructor() {
    this.users = []
    this.generate()
  }

  generate() {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        image: faker.image.url(),
      })
    }
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users)
      }, 5000)
    })
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id)
    if (!user){
      throw boom.notFound('User not found')
    }
    if (user.isBlock){
      throw boom.conflict('User if blocked')
    }
    return user
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1){
      throw boom.notFound('User not found')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1){
      throw boom.notFound('User not found')
    }
    this.users.splice(index, 1)
    return {id}
  }
}

module.exports = UsersService
