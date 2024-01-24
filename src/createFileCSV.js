import fs from 'node:fs';

const csvPath = new URL('../../input.csv', import.meta.url)

await fs.promises.writeFile(csvPath, [
  'title,description',
  'Task 01,Descrição da Task 01',
  'Task 02,Descrição da Task 02',
  'Task 03,Descrição da Task 03',
  'Task 04,Descrição da Task 04',
  'Task 05,Descrição da Task 05'
].join('\n'))