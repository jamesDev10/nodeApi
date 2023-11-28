import express from "express";
import apiFetch from "node-fetch"
import {peoples} from "./dateJson/people.js";
import {templateNoData, templateNoDataFilter} from "./templates/allTemplates.js";
import {v4 as uuidv4} from 'uuid';
import cors from "cors"

const app = express()

const port = 9862

app.use('/public', express.static('public'));
app.use(express.json())
app.use(cors())
app.get('/peoples', (req, res) => {
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

app.get('/peoples/:name', (req, res) => {
  const name = req.params.name
  try {
    if (peoples.length > 0) {
      const constPeople = peoples.filter(people => people.name.toLowerCase() === name.toLowerCase())
      constPeople.length > 0 ? res.json(constPeople) : res.send(templateNoDataFilter)
    } else {
      res.send(templateNoData)
    }
  } catch (e) {
    console.error('CatchError', e)
    res.send(e)
  }

})

app.post('/peoples', (req, res) => {
  const newData = req.body
  newData["id"] = nuevoId
  peoples.push(newData)
  res.status(200).json(`${newData.id}`)
})

app.put('/peoples/:id', (req, res) => {
  const idUpdate = req.params.id
  const dataUpdate = req.body
  const idxPeopled = peoples.findIndex(people => people.id === idUpdate)
  idxPeopled !== -1 ? peoples[idxPeopled] = dataUpdate : res.json('No se ha podido actualizar')
  res.json(peoples)
})

app.delete('/peoples/:id', (req, res) => {
  const id = req.params.id

  console.log(id)
  const idxPeopled = peoples.findIndex(people => people.id === id)
  peoples.splice(idxPeopled, 1)
  res.json(peoples)
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
