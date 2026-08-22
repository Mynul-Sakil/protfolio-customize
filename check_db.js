const mongoose = require('mongoose');
const fs = require('fs');
const envFile = fs.readFileSync('.env', 'utf8');
const match = envFile.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
const dbUrl = match ? match[1] : process.env.DATABASE_URL;

async function run() {
  await mongoose.connect(dbUrl);
  const db = mongoose.connection.db;
  const profile = await db.collection('profiles').findOne({});
  console.log("Profile Data:", profile);
  process.exit(0);
}
run().catch(console.error);
