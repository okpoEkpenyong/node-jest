const express = require("express");
const router = express.Router();
const db = require("../config");


router.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM students");
 //console.log('res: ', res)
  return res.json(data.rows);
});

router.post("/", async (req, res) => {
  
  try {
    const result = await db.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING *",
      [req.body.name]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    res.json(error)
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING *",
      [req.body.name]
    );
    return res.json(result.rows[0]);

  } catch (error) {
    res.json(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE students SET name=$1 WHERE id=$2 RETURNING *",
      [req.body.name, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM students WHERE id=$1", [
      req.params.id
    ]);
    return res.json({ message: "Deleted" });

  } catch (error) {
    res.json(error);
  }
});


module.exports = router;