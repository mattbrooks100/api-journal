//===================== SETUP =====================//
import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static("./public"));
const sql = postgres(process.env.DATABASE_URL);
// const sql = postgres({ database: "journal" });

//================== API ROUTES ==================//
// GET - read all journal entries
app.get("/api/entries", (req, res, next) => {
  sql`SELECT * FROM entry ORDER BY entry_date DESC`.then((result) => res.json(result)).catch(next);
});

// GET - read a single entry
app.get("/api/entries/:id", (req, res, next) => {
  const { id } = req.params;
  sql`SELECT * FROM entry WHERE id=${id}`
    .then((result) => {
      if (result.length === 0) {
        res.status(404).set("Content-Type", "text/plain").send("Not found: id out of bounds");
      } else {
        res.json(result[0]);
      }
    })
    .catch(next);
});

// POST - create a new entry
app.post("/api/entries", (req, res, next) => {
  const newEntry = req.body;

  // Delete any properties that aren't strings (only want to add strings to the new journal entry)
  Object.keys(newEntry).forEach((key) => {
    if (typeof newEntry[key] !== "string") {
      delete newEntry[key];
    }
  });
  sql`INSERT INTO entry ${sql(newEntry)} RETURNING *`
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

// PATCH - update an existing entry
app.patch("/api/entries/:id", (req, res, next) => {
  const { id } = req.params;
  sql`UPDATE entry SET ${sql(req.body)} WHERE id=${id} RETURNING *`
    .then((result) => {
      res.json(result[0]);
    })
    .catch(next);
});

// DELETE - remove an existing entry
app.delete("/api/entries/:id", (req, res, next) => {
  const { id } = req.params;
  sql`DELETE FROM entry WHERE id=${id} RETURNING *`
    .then((result) => {
      if (result.length === 0) {
        res.status(404).set("Content-Type", "text/plain").send("Not found: id out of bounds");
      } else {
        res.status(200).json(result[0]);
      }
    })
    .catch(next);
});

//================ ERROR HANDLING ================//
app.use((err, req, res, next) => {
  res.status(500).set("Content-Type", "plain/text").send("Internal Server Error");
});

app.use((req, res) => {
  res.status(404).set("Content-Type", "text/plain").send("Not Found");
});

//=============== START THE SERVER ===============//
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
