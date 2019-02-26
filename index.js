const server = require("./server");

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
  console.log(`\n\n*** Now listening on port ${PORT} ***\n`);
});
