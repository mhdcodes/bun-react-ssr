import { serve } from "bun";
import { Database } from "bun:sqlite";
import cluster from "node:cluster";
import os from "node:os";
import { renderToReadableStream } from "react-dom/server";
import { App, type Tweet } from "./app";

const numCPUs = os.cpus().length;
const port = 3000;

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running`);

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});

	console.log(`Server is running on http://localhost:${port}`);
} else {
	const db = new Database("database.sqlite", { readonly: true });

	serve({
		async fetch(req) {
			const query = db.query("select id, author, content, likes from tweets");
			const tweets = query.all() as Tweet[];

			const stream = await renderToReadableStream(<App tweets={tweets} />);
			return new Response(stream, {
				headers: { "Content-Type": "text/html" },
			});
		},
		port,
	});
}
