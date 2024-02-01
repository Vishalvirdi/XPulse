import express from "express";
const app = express();


app.use(express.json({limit: "20kb"}))

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the XPulse please",
  });
});

export {app};
