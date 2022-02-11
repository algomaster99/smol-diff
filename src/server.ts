import express from 'express'

import MinimisedDiff from './index'

const app = express()
const port = 3000

app.get('/', (_, response) => {
  response.send(MinimisedDiff)
})

app.listen(port, () => {
  console.log(`Hi from minimiser ;)`)
})
