const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.get("/api", function (req, res) {
  if (req.url === "/favicon.ico") {
    res.end();
  }

  const json =fs.readFileSync('count.json', 'utf-8');
  const obj = JSON.parse(json);

  obj.pageViews = obj.pageViews+1;
  if (req.query.type === 'visit-pageview') {
    obj.visits = obj.visits+1;
  }
  const newJson = JSON.stringify(obj);

  fs.writeFileSync('count.json', newJson);
  res.send(newJson);
});
app.listen(3000, function () {
  console.log("Server running on port 3000!");
});
