var express = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();
var app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/google", async (req, res) => {
  console.log("hello");
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
  try {
    await doc.useServiceAccountAuth(
      {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      (err) => {
        if (err) console.log(err);
        console.log("Working");
      }
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    console.log("Sheedsdt", sheet);
    await sheet.addRow({
      web_client: "kushdaga pwa",
      timestamp: Date.now(),
      spin_result_index: req.body.index,
    });
    return res.status(200).json("Ok");
  } catch (err) {
    console.log("Errror", err);
    return res.status(500).json({ err: err });
  }
});

app.listen(5000 || process.env.PORT, function () {
  console.log("Listening on 5000");
});
