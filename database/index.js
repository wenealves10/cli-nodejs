import { resolve } from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

class Database {
  constructor() {
    this.NAME_FILE = 'heroes.json';
  }

  async getDatasFiles() {
    const file = await readFileAsync(resolve('./database', this.NAME_FILE), { encoding: 'utf-8' });
    return JSON.parse(file.toString());
  }

  async list(id) {
    const data = await this.getDatasFiles();
    const dataFilter = data.filter((item) => (id ? item.id === id : true));
    return dataFilter;
  }
}

export default new Database();
