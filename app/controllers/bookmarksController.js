const dataMapper = require("../dataMapper");

const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage: (req, res) => {
    const reviews = "";
    const bookmarks = req.session.bookmarks;

    res.render("favoris", { bookmarks, reviews });
  },

  addBookmarks: async (req, res) => {
    const figurineId = req.params.id;
    const bookmarks = req.session.bookmarks;
    if (bookmarks) { // Si l'array bookmarks existe
      const figurineFound = bookmarks.find( figurine => figurine.id === figurineId); // <<<=   on va chercher dans l'array si la figurine existe
      if (!figurineFound){ // Si il n'existe pas
        try {
          const figurine = await dataMapper.getOneFigurine(figurineId); // on demande a la db l'objet figurine
          req.session.bookmarks.push(figurine); // puis on rajoute la figurine au bookmarks dans la session
          res.redirect("/bookmarks"); // on redirige vers la view favoris
        } catch (error) {
          res.status(500);
        }
      } else {
        res.redirect("/bookmarks"); // on redirige vers la view favoris
      }
    } else { // Si l'array bookmarks n'existe pas
      req.session.bookmarks = []; // on le créer
      try {
        const figurine = await dataMapper.getOneFigurine(figurineId); // on demande à la db l'objet figurine
        req.session.bookmarks.push(figurine); // puis on rajoute la figurine aux bookmarks dans la session
        res.redirect("/bookmarks"); // on redirige vers la view favoris
      } catch (error) {
        res.status(500);
      }
    }
  },

  deleteBookmarks: async (req, res) => {
    const figurineId = parseInt(req.params.id); // get id

    const bookmarks = req.session.bookmarks; // récupérer la liste

    const figurineFound = bookmarks.find( figurine => figurine.id === figurineId); // On cherche dans la liste la figurine à supprimer

    if (figurineFound){
      const index = bookmarks.indexOf(figurineFound);


      bookmarks.splice(index, 1);

      res.redirect("/bookmarks"); // on redirige vers la view favoris

    }
  }

};


module.exports = bookmarksController;
