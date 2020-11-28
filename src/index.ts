import { Application } from "probot"; // eslint-disable-line no-unused-vars
import { onPush } from "./on-push";

export = (app: Application) => {
	app.on("push", onPush);
	console.log("SECURITYFIXERBOT STARTED")
	
	// For more information on building apps:
	// https://probot.github.io/docs/

	// To get your app running against GitHub, see:
	// https://probot.github.io/docs/development/
};
