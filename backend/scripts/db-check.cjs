require("dotenv").config();

const { Client } = require("pg");

async function checkDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL mungon në backend/.env");
    process.exitCode = 1;
    return;
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query("SELECT 1");
    console.log("Lidhja me databazën u realizua me sukses.");
  } catch {
    console.error("Lidhja dështoi. Kontrollo DATABASE_URL në backend/.env.");
    process.exitCode = 1;
  } finally {
    await client.end().catch(() => {});
  }
}

checkDatabase();