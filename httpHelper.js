let http = require("http");

function makeRequest(options, body) {
  let request = new Promise((resolve, reject) => {
    console.log("hui");
    let reqq = http.request(options, function(res) {
      let chunks = '';
      res.on("data", function(chunk) {
        chunks += chunk
      });
      res.on("end", function() {
        resolve(chunks);
      })
    });
    if(options.method === "POST") {
      reqq.write(JSON.stringify(body));
    }
    reqq.end();
  });
  return request;
}

module.exports = {
  makeRequest
}