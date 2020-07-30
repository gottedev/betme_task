const express = require("express");
const cors = require("cors");
const papa = require("papaparse");
const request = require("request");

const app = express();

app.use(cors());

const consoleJSONData = (URL) => {
  const data = [];
  const options = { header: true, dynamicTyping: true };

  const dataStream = request.get(URL);
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

  dataStream.pipe(parseStream);

  parseStream.on("data", (chunk) => {
    const { Div, Date, Time, HomeTeam, AwayTeam, FTHG, FTAG } = chunk;
    const extractedData = {
      Div,
      Date,
      Time,
      HomeTeam,
      AwayTeam,
      FTHG,
      FTAG,
    };
    data.push(extractedData);
  });

  parseStream.on("finish", () => {
    return console.log(JSON.stringify(data));
  });
};

consoleJSONData("https://www.football-data.co.uk/mmz4281/1920/E0.csv");

app.listen(8091, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log("Listening at http://localhost:8090/");
});
