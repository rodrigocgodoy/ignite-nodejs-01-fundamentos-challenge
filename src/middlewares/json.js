export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = buffers ? JSON.parse(Buffer.concat(buffers).toString()) : {}
  } catch {
    console.error('Error Json parser')
    req.body = {}
  }

  res.setHeader('Content-type', 'application/json')
}