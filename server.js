const { log } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000; // Change this to your desired port
const LOG_FILE_PATH = path.join(__dirname, "server.log");

// Middleware to parse JSON if needed in future
app.use(express.json());

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint to handle button click and log the event
app.post("/log", (req, res) => { 
  const logEntry = `[${new Date().toISOString()}] Button clicked from IP: ${req.ip} and method is ${req.method} at ${req.path} Error:java.lang.OutOfMemoryError.\n`;

  // Append the log entry to the file
  fs.appendFile(LOG_FILE_PATH, logEntry, (err) => {
    if (err) {
      console.error("Error writing log:", err);
      return res.status(500).send("Failed to write log");
    }
    console.log("Log entry added:", logEntry.trim());
    res.status(200).send("Log generated");
  });
});
app.post("/good", (req, res) => { 
  const logEntry = `[${new Date().toISOString()}] Button clicked from IP: ${req.ip} and method is ${req.method} at ${req.path}\n`;

  // Append the log entry to the file
  fs.appendFile(LOG_FILE_PATH, logEntry, (err) => {
    if (err) {
      console.error("Error writing log:", err);
      return res.status(500).send("Failed to write log");
    }
    console.log("Log entry added:", logEntry.trim());
    res.status(200).send("Log generated");
  });
});

// Start the server

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
