const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

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
  res.render('new')
})

// EDIT - pre db
// breads.get('/:indexArray/edit', (req, res) => {
//   res.render('edit', {
//     bread: Bread[req.params.indexArray],
//     index: req.params.indexArray
//   })
// })

// EDIT - pre db
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
  .then (foundBread => {
    res.render ('edit', {
      bread: foundBread
    })
  })
})

//SHOW
// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
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
  if(req.body.hasGluten === 'on'){
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
    req.body.image = undefinded
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})




module.exports = breads
