const axios = require("axios");
const app = require("./app");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8888;

const protobuf = require("protobufjs");
let MTAProtobufRoot = null;

const apiKey = process.env.TRAIN_API_KEY;

protobuf.load("Proto/gtfs-realtime.proto", function (err, root) {
  if (err) throw err;
  MTAProtobufRoot = root;
  console.log("Protobuf definitions loaded successfully!");
});
app.use(cors());

app.get("/service-alerts", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  // const apiUrl =
  //   "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace";
  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts";
  //test service alters for all train lines

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
    }); /////

    const alertMessage = MTAProtobufRoot.lookupType(
      "transit_realtime.FeedMessage"
    );
    const decodedAlerts = alertMessage.decode(new Uint8Array(response.data));

    res.json(decodedAlerts);
  } catch (error) {
    res.status(500).send("Error fetching subway alerts.");
  }
});

/////////////// ELEVATORS / ESCALATORS OUTAGES
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

// ////////  SUBWAY FEEDS
app.get("/subway-feed-ace", async (req, res) => {
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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});

app.get("/subway-feed-g", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
      responseType: "arraybuffer",
    });

    // Decode the ProtoBuf data
    const transitFeedMessage = MTAProtobufRoot.lookupType(
      "transit_realtime.TripUpdate"
    );
    const decodedMessage = transitFeedMessage.decode(
      new Uint8Array(response.data)
    );

    res.json(decodedMessage);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});
app.get("/subway-feed-nqrw", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw";

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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});

app.get("/subway-feed-123-456-7", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs";

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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});

app.get("/subway-feed-bdfm", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm";

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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});
app.get("/subway-feed-jz", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz";

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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});
app.get("/subway-feed-l", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l";

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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});
app.get("/subway-feed-sir", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-sir";

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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});

app.get("/subway-feed-lirr", async (req, res) => {
  if (!MTAProtobufRoot) {
    return res
      .status(500)
      .send("Server is initializing. Please try again later.");
  }

  const apiUrl =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-lirr";

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
    res.status(500).send("Error fetching NYCT GTFS ACE data.");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
