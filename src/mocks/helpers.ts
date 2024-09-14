import { API_URL } from "../config/app";

export async function enableMocking() {
	if (process.env.NODE_ENV !== "development") {
		return;
	}

	const { worker } = await import("./browser");

	return worker.start({
		onUnhandledRequest(req, print) {
			// Only show warning for unhandled requests if it comes from our API
			if (!req.url.startsWith(API_URL)) {
				return;
			}

			print.warning();
		},
	});
}
