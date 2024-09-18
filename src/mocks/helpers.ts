import { API_URL } from "../config/app";

const DISABLE_MOCKING = process.env.NODE_ENV !== "development";

export async function enableMocking() {
	// Mock even for deployment
	// if (DISABLE_MOCKING) {
	// 	return;
	// }

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
