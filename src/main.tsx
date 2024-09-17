import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/query-client.ts";
import { enableMocking } from "./mocks/helpers.ts";

const root = document.getElementById("root");

if (!root) {
	throw Error("Unable to get root element");
}

enableMocking().then(() => {
	createRoot(root).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<App />
			</QueryClientProvider>
		</StrictMode>,
	);
});
