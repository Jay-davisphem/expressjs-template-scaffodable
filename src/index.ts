require('module-alias/register')
import "./pre-start"; // Must be the first import
// import logger from "jet-logger";

import EnvVars from "./config";
import server from "./server";

// import prisma from "./models/prisma";

// Just for testing, to be deleted
// query raw is calling postgres:5432 directly
// async function main() {
//   const currentDateFromDatabase = await prisma.$queryRaw`SELECT CURRENT_DATE`;
//   console.log("Current date from the database:", currentDateFromDatabase);
// }

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

const expressServer = server.listen(EnvVars.Port, async () => {
//   logger.info(SERVER_START_MSG);
  console.log("started app on port ", EnvVars.Port);

  // try {
  //   await main();
  // } catch (err) {
  //   console.error(err);
  // }
});

async function handleTerminationSignal(signal: string, server = expressServer) {
  console.log(
    `Received ${signal} signal. Closing server and disconnecting from the database...`,
  );
  server.close();
//   await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => handleTerminationSignal("SIGINT"));
process.on("SIGTERM", () => handleTerminationSignal("SIGTERM"));
