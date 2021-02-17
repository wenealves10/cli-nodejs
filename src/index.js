import Commander from 'commander'
import Database from '../database/index.js'
import Hero from './Hero.js'

async function main() {
  Commander.version('v1')
    .option('-n, --name [value]', "hero's name")
    .option('-p, --power [value]', 'hero power')
    .option('-r, --register', 'register a hero')
    .option('-i, --id [value]', 'ID Hero')
    .option('-l, --list', 'List all heroes')
    .option('-d, --delete', 'Delete a hero')
    .option('-u, --update [value]', 'Update hero')
    .parse(process.argv)

  const hero = new Hero(Commander.opts())
  try {
    if (Commander.opts().register) {
      delete hero.id
      const result = await Database.register(hero)
      if (!result) {
        console.error('Hero registration error!!')
        return
      }
      console.log('Hero successfully registered!')
      return
    }
    if (Commander.opts().list) {
      const result = await Database.list()
      console.table(result)
      return
    }
    if (Commander.opts().delete) {
      const result = await Database.remove(hero.id)
      if (!result) {
        console.log('an error occurred to delete!')
        return
      }
      console.log('Hero successfully deleted!')
      return
    }
    if (Commander.opts().update) {
      const idUpdate = parseInt(Commander.opts().update)
      const dataJson = JSON.stringify(hero)
      const heroUpdated = JSON.parse(dataJson)
      const result = await Database.update(idUpdate, heroUpdated)

      if (!result) {
        console.error('There was an error updating hero')
        return
      }
      console.log('Hero updated successfully')
      return
    }
  } catch (error) {
    console.error('There was an error in the cli', error)
  }
}

main()
