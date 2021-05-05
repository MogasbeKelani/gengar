async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri =
  "mongodb+srv://calvinIsAG:02JPeKOT5dJGRQxR@clustergit.nzf4d.mongodb.net/GitGud?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function main(client) {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  } catch (e) {
    console.error(e);
  }
}

module.exports = { client, main };
