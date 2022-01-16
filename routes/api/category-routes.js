const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        // includes associated product data
        model: Product,
        attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id' ]
      }
    ]
  })// return the Category data
    .then(dbCategoryData => res.json(dbCategoryData))
    // catches any errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        // includes associated product data
        model: Product,
        attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id' ]
      }
    ]
  })
    .then(dbCategoryData => {
      // returns a message if no category found
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      // sends the found data
      res.json(dbCategoryData);
    })
    // catches any errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  // sends a success status and the created category data
    .then(dbCategoryData => {
      res.status(200).json(dbCategoryData);
    })
    // catches any errors
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then((dbCategoryData) => {
      // returns a message if no category found
      if(!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    // catches any errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' })
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
