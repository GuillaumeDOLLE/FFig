const dataMapper = require("../dataMapper");


const mainController = {

  // méthode pour la page d'accueil
  homePage: async (req, res) => {
    try {
      const figurines = await dataMapper.getAllFigurines();

      const categoryFound = new Set(figurines.map(figurine => figurine.category));
      const categoryNames = Array.from(categoryFound);
      let objt = {};
      for( const catName of categoryNames){
        const result = await dataMapper.getCategory(catName);
        console.log(result);
        objt[catName] = result.length;
      }
      console.log(objt);
      const reviews = "";
      res.render("accueil", { figurines, reviews, categoryNames, objt });
    } catch (error) {
      res.status(500);
    }
  },

  // méthode pour la page article
  articlePage: async (req, res) => {
    try {
      const id = req.params.id;
      const figurines = await dataMapper.getAllFigurines();
      const reviews = await dataMapper.getReviews(id);
      const categoryFound = new Set(figurines.map(figurine => figurine.category));
      const categoryNames = Array.from(categoryFound);
      let objt = {};
      for( const catName of categoryNames){
        const result = await dataMapper.getCategory(catName);
        console.log(result);
        objt[catName] = result.length;
      }
      console.log(objt);

      const specificFigurine = await dataMapper.getOneFigurine(id);
      res.render("article", { specificFigurine, reviews, figurines, categoryNames, objt });
    } catch (error) {
      res.status(500);
    }
  }

};


module.exports = mainController;
