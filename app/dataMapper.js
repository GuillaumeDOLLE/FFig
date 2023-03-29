const db = require("./database");


const dataMapper = {
  async getAllFigurines() {
    const query = "SELECT * FROM figurine;";
    const result = await db.query(query);
    const figurines = result.rows;
    return figurines;
  },
  async getOneFigurine(id) {
    const query = "SELECT * FROM figurine WHERE id = $1;";
    const result = await db.query(query, [id]);
    const specificFigurine = result.rows[0];
    return specificFigurine;
  },
  async getReviews(id) {
    const query = "SELECT * FROM review WHERE figurine_id = $1;";
    const result = await db.query(query, [id]);
    const reviews = result.rows;
    console.log(reviews);
    return reviews;
  },
  async getCategory(category) {
    const query = "SELECT * FROM figurine WHERE category = $1;";
    const result = await db.query(query, [category]);
    const specificCategory = result.rows;
    console.log(specificCategory);
    return specificCategory;
  }
};

module.exports = dataMapper;