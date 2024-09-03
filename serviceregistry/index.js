const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors("*"));
const axios = require("axios");
let services = [];
app.get("/services", (req, res) => {
  res.send(services);
});

app.post("/register", (req, res) => {
  services.push(req.body);
  res.send(`service registered ${req.body.servicename} ${req.body.url}`);
});

app.get("/getservice/:servicename", (req, res) => {
  const service = services.find((e) => e.servicename == req.params.servicename);
  if (service) {
    res.send(service);
  } else {
    res.send("not found");
  }
});
app.use(async (req, res) => {
  services = [];
  for (i = 3002; i < 3009; i++) {
    try {
      const response = await axios.get(`http://localhost:${i}/healthcheck`);
      if (response.status == 200) {
        console.log(response.data.servicename);
        console.log(`http://localhost:${i}/healthcheck`);
        servicename = response.data.servicename;
        url = `http://localhost:${i}`;
        let serviceobj = {
          servicename: servicename,
          url: url,
        };
        services.push(serviceobj);
      }
    } catch (error) {
      console.log("no services found on port " + i);
    }
  }
  res.send(services);
});
app.listen(3010, () => {
  console.log("service registry started");
});
