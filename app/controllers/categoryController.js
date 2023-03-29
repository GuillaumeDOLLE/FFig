const dataMapper = require("../dataMapper");

const categoryController = {
  async categoryPage (req, res) {
    try {
      const figurines = await dataMapper.getAllFigurines();
      const reviews = "";
      const category = req.params.category;
      const categoryFound = new Set(figurines.map(figurine => figurine.category));
      const categoryNames = Array.from(categoryFound);
      console.log(categoryNames);
      const categories = await dataMapper.getCategory(category);
      let objt = {};
      for( const catName of categoryNames){
        const result = await dataMapper.getCategory(catName);
        console.log(result);
        objt[catName] = result.length;
      }
      console.log(objt);
      res.render("category", { categories, reviews, categoryNames, objt });

    } catch (error) {

      res.status(500);
    }
  }
};

module.exports = categoryController;