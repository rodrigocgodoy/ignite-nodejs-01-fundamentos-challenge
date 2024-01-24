import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { existId } from './utils/exist-id.js'
import { iterator } from './utils/async.iterator.js';

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      console.log('entrou aqui', req.body)
      if (req.body && !req.body.title) {
        return res.writeHead(400).end('Título é obrigatório')
      }

      if (req.body && !req.body.description) {
        return res.writeHead(400).end('Descrição é obrigatório')
      }

      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      existId(req, res)

      if (req.body && !req.body.title) {
        return res.writeHead(400).end('Título é obrigatório')
      }

      if (req.body && !req.body.description) {
        return res.writeHead(400).end('Descrição é obrigatório')
      }

      const { id } = req.params
      const { title, description } = req.body
      const data = {}

      if (title) data.title = title
      if (description) data.description = description

      data.updated_at = new Date()

      database.update('tasks', id, data)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      existId(req, res)

      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      existId(req, res)

      const { id } = req.params

      const data = {
        updated_at: new Date(),
        completed_at: true
      }

      database.update('tasks', id, data)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/import'),
    handler: async (req, res) => {
      await iterator()

      res.writeHead(204).end()
    }
  }
]
