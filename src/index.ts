require('module-alias/register')
import "./pre-start"; // Must be the first import
import EnvVars from "./config";
import server from "./server";
import { Server } from "http";
import mongoose from "mongoose";


async function main() {
  await mongoose.connect(EnvVars.MONGO_URI);
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