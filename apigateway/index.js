const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../authdetails/auth");
app.use(express.json());
app.use(cors("*"));

function authenticate(key) {
  try {
    const validated = jwt.verify(key, SECRET_KEY);
    return validated;
  } catch (error) {
    console.log(error);
  }
}

app.use(async (req, res, next) => {
  const authkey = req.header("x-token");
  if (authenticate(authkey)) {
    console.log("authenticated");

    console.log(req.path.split("/"));
    const resdata = await axios.get("http://localhost:3010/services");
    console.log(resdata.data);
    const action_name = req.path.split("/")[1];
    console.log(action_name);
    const servicedata = resdata.data;
    const serviceinfo = servicedata.find((e) => e.servicename == action_name);
    if (serviceinfo) {
      const serviceurl = serviceinfo.url + "/" + req.path.split("/")[2];
      const alldata = await axios.get(serviceurl);
      res.send(alldata.data);
    }
  } else {
    res.send("invalid key");
  }
  // const servicename = req.path.split("/")[1];
  // console.log(servicename);
  // const serviceres = await axios.get(
  //   `http://localhost:3010/getservice/${servicename}`
  // );
  // console.log(serviceres.data);
  // const alllocation = await axios.get(serviceres.data.url);
  // res.send(alllocation.data);
});

app.listen(3000, () => {
  console.log("api  gateway started");
});
