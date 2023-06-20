// app/actions.ts

import sqlite3 from "sqlite3";

export async function saveEmail(email: string): Promise<void> {
  const db = new sqlite3.Database("database.db");

  db.serialize(() => {
    // Create the table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL
      )
    `);

    // Insert the email into the table
    const insertQuery = `INSERT INTO emails (email) VALUES (?)`;
    db.run(insertQuery, email, (err) => {
      if (err) {
        console.error("Error saving email:", err);
      } else {
        console.log("Email saved successfully!");
      }
    });
  });

  db.close();
}
