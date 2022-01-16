const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // finds all tags and returns them with their corresponding product info
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id' ]
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id` 
  Tag.findOne({
    where: {
      id: req.params.id
    },
    // includes the product info
    include: [
      {
        model: Product,
        attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id' ]
      }
    ]
  })
    .then(dbTagData => {
      // returns an error if no tag was found
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      // returns the found tag info
      res.json(dbTagData);
    })
    // returns an error if anything else went wrong
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTagData => {
      // returns a success message and the new tag info
      res.status(200).json(dbTagData);
    })
    // catches any errors
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then((dbTagData) => {
      // returns an error if no tag was found
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      // returns the tag info
      res.json(dbTagData);
    })
    // catches any errors encountered
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      // sends an error if no tag was found
      if (!dbTagData) {
        res.json(404).json({ message: 'No tag found with this id' });
        return;
      }
      // returns the tag info
      res.json(dbTagData);
    })
    // catches any errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
