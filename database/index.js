import { resolve } from 'path'
import { readFile, writeFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
  constructor() {
    this.NAME_FILE = 'heroes.json'
  }

  async getDatasFiles() {
    const file = await readFileAsync(resolve('./database', this.NAME_FILE), {
      encoding: 'utf-8',
    })
    return JSON.parse(file.toString())
  }

  async writeFiles(data) {
    await writeFileAsync(
      resolve('./database', this.NAME_FILE),
      JSON.stringify(data)
    )
    return true
  }

  async register(hero) {
    const data = await this.getDatasFiles()
    const id = hero.id <= 2 ? hero.id : Date.now()
    const heroWithId = {
      ...hero,
      id,
    }

    const newData = [...data, heroWithId]

    const result = await this.writeFiles(newData)

    return result
  }

  async list(id) {
    const data = await this.getDatasFiles()

    const dataFilter = data.filter((item) => (id ? item.id === id : true))

    return dataFilter
  }

  async update(id, data) {
    const datas = await this.getDatasFiles()

    const index = datas.findIndex((item) => item.id === parseInt(id, 10))

    if (index === -1) {
      throw Error('Herói não encontrado!')
    }

    const actual = datas[index]

    const objectUpdate = {
      ...actual,
      ...data,
    }

    datas.splice(index, 1, objectUpdate)

    return await this.writeFiles(datas)
  }

  async remove(id) {
    if (!id) {
      return await this.writeFiles([])
    }

    const data = await this.getDatasFiles()

    const index = data.findIndex((item) => item.id === parseInt(id, 10))

    if (index === -1) {
      throw Error('Herói não encontrado!')
    }

    data.splice(index, 1)

    return await this.writeFiles(data)
  }
}

export default new Database()
