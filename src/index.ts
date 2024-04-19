require('module-alias/register')
import "./pre-start"; // Must be the first import
import EnvVars from "./config";
import server from "./server";
import { Server } from "http";
import mongoose from "mongoose";
import cron from "node-cron";
import { Token } from "./models";

async function main() {
  await mongoose.connect(EnvVars.MONGO_URI);
  // Define a cron job to delete expired tokens every 5 minutes
cron.schedule('*/30 * * * *', async () => {
  try {
    // Find and delete expired tokens
    const result = await Token.deleteMany({ expiresAt: { $lte: new Date() } });
    console.log(`Deleted ${result.deletedCount} expired tokens`);
  } catch (error) {
    console.error('Error deleting expired tokens:', error);
  }
});
}

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

const DB_CONNECTION_MSG = 'Connected to db@ ' + EnvVars.MONGO_URI

 
let expressServer: any = null;
main().then(res => {
  console.log(DB_CONNECTION_MSG)
  expressServer = server.listen(EnvVars.Port, async () => {
  //   logger.info(SERVER_START_MSG);
    console.log("started app on port ", EnvVars.Port);

  });
}).catch(console.error)

async function handleTerminationSignal(signal: string, server = expressServer) {
  console.log(
    `Received ${signal} signal. Closing server and disconnecting from the database...`,
  );
  server.close();
//   await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => handleTerminationSignal("SIGINT"));
process.on("SIGTERM", () => handleTerminationSignal("SIGTERM"))