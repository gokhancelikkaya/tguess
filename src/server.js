const { generateTGuess } = require("tguess");
const express = require("express");
const fetch = require("node-fetch");

const app = express().use(express.json());

app.post("/tguess", async (req, res) => {
	const { guess, dapib_url: dapibUrl, session_token: sessionToken } = req.body;

	if (!guess || !dapibUrl || !sessionToken)
		return res.status(400).json({ success: false, message: "Missing data" });

	const scriptContent = await (await fetch(dapibUrl)).text();
	if (!scriptContent)
		return res
			.status(400)
			.send({ success: false, message: "Invalid dapib url" });

	const tguess = await generateTGuess(scriptContent, {
		sessionToken,
		guess,
	});

	res.json({ success: true, tguess });
});

app.listen(3333, () => console.log("Server started"));
