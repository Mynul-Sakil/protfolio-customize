const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const profile = await db.collection('profiles').findOne({});
  console.log("Profile Data:", profile);
  process.exit(0);
}
run().catch(console.error);
