import { Database } from "../database.js"

const database = new Database()

export function existId(req, res) {
  const { id } = req.params

  const tasks = database.select('tasks', {
    id,
  })

  if (tasks.length === 0) return res.writeHead(400).end('Registro não existe')
}
