const server = require("./server");

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`\n\n*** Now listening on port ${PORT} ***\n`);
});