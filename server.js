const axios = require("axios");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 8888;

const protobuf = require("protobufjs");
let MTAProtobufRoot = null;

const apiKey = "OLEPnbM7K87leaINTEi5t1a4l7POZrf9acZ7RVIU";

protobuf.load("Proto/gtfs-realtime.proto", function (err, root) {
  if (err) throw err;
  MTAProtobufRoot = root;
  console.log("Protobuf definitions loaded successfully!");
});

app.get("/service-alerts", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
      responseType: "arraybuffer",
    });

    // Decode the ProtoBuf data
    const transitFeedMessage = MTAProtobufRoot.lookupType(
      "transit_realtime.FeedMessage"
    );
    const decodedMessage = transitFeedMessage.decode(
      new Uint8Array(response.data)
    );

    res.json(decodedMessage);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).send("Error fetching service alerts.");
  }
});
app.get("/subway-alerts", async (req, res) => {
  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
      responseType: "arraybuffer",
    });

    const alertMessage = MTAProtobufRoot.lookupType(
      "transit_realtime.FeedMessage"
    );
    const decodedAlerts = alertMessage.decode(new Uint8Array(response.data));

    res.json(decodedAlerts);
  } catch (error) {
    res.status(500).send("Error fetching subway alerts.");
  }
});

app.get("/elevator-escalator-current-outages", async (req, res) => {
  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene.json";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching MTA current outages data:", error.message);
    res.status(500).send("Error fetching MTA current outages data.");
  }
});

app.get("/elevator-escalator-upcoming-outages", async (req, res) => {
  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene_upcoming.json";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching MTA upcoming outages data:", error.message);
    res.status(500).send("Error fetching MTA upcoming outages data.");
  }
});

app.get("/elevator-escalator-equipment", async (req, res) => {
  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene_equipments.json";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching MTA equipment data:", error.message);
    res.status(500).send("Error fetching MTA equipment data.");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
