// pages/api/explain.js

import explainCommand from "../../commands"; // Import the shared logic

export default function handler(req, res) {
  const { command } = req.query;

  // Log the command received
  console.log("Received command:", command);

  if (!command) {
    return res.status(400).json({ message: "No command provided." });
  }

  const explanation = explainCommand(command); // Get the explanation for the command
  res.status(200).json({ message: explanation });
}
