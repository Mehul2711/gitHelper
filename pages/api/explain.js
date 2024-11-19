

import explainCommand from "../../commands"; 

export default function handler(req, res) {
  const { command } = req.query;


  console.log("Received command:", command);

  if (!command) {
    return res.status(400).json({ message: "No command provided." });
  }

  const explanation = explainCommand(command); 
  res.status(200).json({ message: explanation });
}
