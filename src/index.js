/* eslint-disable import/extensions */
import dataBase from '../database/index.js';

async function main() {
  const data = await dataBase.getDatasFiles();
  console.log(data);
}

main();
