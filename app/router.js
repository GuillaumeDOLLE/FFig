const express = require("express");

// on importe nos controllers
const mainController = require("./controllers/mainController");
const bookmarksController = require("./controllers/bookmarksController");
const categoryController = require("./controllers/categoryController");

const router = express.Router();

// page d'accueil
router.get("/", mainController.homePage);

// page article
router.get("/article/:id", mainController.articlePage);

// page favoris
router.get("/bookmarks", bookmarksController.bookmarksPage);

router.get("/bookmarks/add/:id", bookmarksController.addBookmarks);
router.get("/bookmarks/delete/:id", bookmarksController.deleteBookmarks);

router.get("/category/:category", categoryController.categoryPage);


// on exporte le router
module.exports = router;