const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors("*"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.get("/location", async (req, res) => {
  const alllocation = await prisma.servicelocation.findMany();
  res.send(alllocation);
});
app.get("/healthcheck", (req, res) => {
  const healthobj = {
    request_time: new Date().toString(),
    connectivity: prisma.$connect ? "connected" : "not connected",
    status: "working",
    servicename: "location",
  };
  res.send(healthobj);
});
app.listen(3007, () => {
  console.log("location service started");
});
