import express from "express";
import apiFetch from "node-fetch"
import {peoples} from "./dateJson/people.js";
import {templateNoData, templateNoDataFilter} from "./templates/allTemplates.js";
import {v4 as uuidv4} from 'uuid';


const app = express()

const port = 9861

app.use('/public', express.static('public'));
app.use(express.json())

app.get('/peoplesGet', (req, res) => {
  try {
    if (peoples.length > 0) {
      const constPeople = peoples.map(people => people)
      res.json(constPeople)
    } else {
      res.send(templateNoData)
    }
  } catch (e) {
    console.error('CatchError', e)
    res.send(e)
  }

})
const nuevoId = uuidv4();
console.log('uii', nuevoId)

app.get('/peoplesGet/:id', (req, res) => {
  const id = req.params.id
  try {
    if (peoples.length > 0) {
      const constPeople = peoples.filter(people => people.name === id)
      constPeople.length > 0 ? res.json(constPeople) : res.send(templateNoDataFilter)
    } else {
      res.send(templateNoData)
    }
  } catch (e) {
    console.error('CatchError', e)
    res.send(e)
  }

})
app.post('/peoplesSave', (req, res) => {

  const newData = req.body

  newData["id"] = nuevoId
  peoples.push(newData)
  res.status(200).json(`${newData.id}`)
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


