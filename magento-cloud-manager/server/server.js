const express = require('express')
const db = require('./util/common')
const app = express()

app.set('port', process.env.PORT || 3001)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.get('/api/projects', (req, res) => {
  const param = req.query.q
  if (!param) {
    res.json({
      error: 'Missing required parameter `q`'
    })
    return
  }
  //const rows = db.prepare('SELECT id, title FROM projects WHERE id like ?').all('%' + param + '%')
  res.json(rows)
})

const fs = require('fs')
fs.readdir('./src', (err, files) => {
  files.forEach(file => {
    if (/\.js$/.test(file)) {
      const name = file.replace(/\.js$/, '')
      app.get(`/${name}`, require(`./src/${name}`))
    }
  })
})

// app.get('/hosts-states-current', require('./src/hosts-states-current'))

// app.get('/hosts-states-historic', require('./src/hosts-states-historic'))

// app.get('/environments', require('./src/environments'))

// app.get('/smoke-tests', require('./src/smoke-tests'))

// app.get('/command-generator', require('./src/commands'))

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
