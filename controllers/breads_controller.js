const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')
const baker = require('./bakers_controller.js')

//INDEX
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      console.log(foundBreads)
      res.render('index', {
        breads: foundBreads,
        title: 'Index Page'
      })
    })
})

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})

// EDIT - pre db
// breads.get('/:indexArray/edit', (req, res) => {
//   res.render('edit', {
//     bread: Bread[req.params.indexArray],
//     index: req.params.indexArray
//   })
// })

// EDIT get method
breads.get('/:id/edit', (req, res) => {
  Baker.find()
  .then(foundBakers => {
    Bread.findById(req.params.id)
    .then (foundBread => {
      res.render ('edit', {
        bread: foundBread,
        bakers: foundBakers
      })
    })
  })
})

//SHOW
//using ".populate" method to access "baker"
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then(foundBread => {
      const bakedBy = foundBread.getBakedBy()
      console.log(bakedBy)
      res.render('show', {
        bread: foundBread
      })
    })
})


//DELETE - pre db
// breads.delete('/:indexArray', (req, res) => {
//   Bread.splice(req.params.indexArray, 1)
//   res.status(303).redirect('/breads')
// })

//DELETE - with db
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
      res.status(303).redirect('/breads')
    })
})

//UPDATE - pre db
// breads.put('/:arrayIndex', (req, res) => {
//   if (req.body.hasGluten === 'on') {
//     req.body.hasGluten = true
//   } else {
//     req.body.hasGluten = false
//   }
//   Bread[req.params.arrayIndex] = req.body
//   res.redirect(`/breads/${req.params.arrayIndex}`)
// })

//UPDATE - with db
breads.put('/:id', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBread => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
    })
})


// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  console.log('did i get here pre?')
  Bread.create(req.body)
  console.log('did i get here post?')
  res.redirect('/breads')
})




module.exports = breads
