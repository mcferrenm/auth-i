require("dotenv").config();
const path = require("path");

const server = require("./api/server");

const PORT = process.env.PORT || 4000;

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`\n\n*** Now listening on port ${PORT} ***\n`);
});
