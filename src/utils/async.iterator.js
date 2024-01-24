import fs from 'node:fs'
import { parse } from 'csv-parse';

const csvPath = new URL('../../input.csv', import.meta.url)

export async function iterator() {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(parse())

  for await (const [title, description] of parser) {
    if (title !== 'title') {
      await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description
        })
      })
    }
  }
}
