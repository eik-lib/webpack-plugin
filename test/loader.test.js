import { createFsFromVolume, Volume } from "memfs";
import { URL } from "node:url";
import webpack from "webpack";
import fastify from "fastify";
import path from "node:path";
import tap from "tap";
import fs from "node:fs";

const LOADER = new URL("../src/loader.js", import.meta.url).pathname;
const FILE = new URL("../fixtures/modules/simple/main.js", import.meta.url)
	.pathname;

/*
 * When running tests on Windows, the output code get some extra \r on each line.
 * Remove these so snapshots work on all OSes.
 */
const clean = (str) => str.split("\r").join("");

const build = ({
	options = {},
	outputFileName = "bundle.js",
	outputPath = "/",
	inputEntry = "",
} = {}) =>
	new Promise((resolve, reject) => {
		const compiler = webpack({
			experiments: {
				outputModule: true,
			},
			entry: inputEntry,
			mode: "production",
			output: {
				environment: {
					module: true,
				},
				filename: outputFileName,
				path: outputPath,
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						use: {
							loader: LOADER,
							options,
						},
					},
				],
			},
		});

		const fileSystem = createFsFromVolume(new Volume());
		// @ts-expect-error
		compiler.outputFileSystem = fileSystem;

		compiler.run((err, stats) => {
			if (err) reject(err);
			if (stats && stats.hasErrors()) reject(stats.toJson().errors);

			const content = fileSystem.readFileSync("/bundle.js", "utf8");
			resolve(content);
		});
	});

tap.test("loader() - import map fetched from a URL", async (t) => {
	const app = fastify();
	app.server.keepAliveTimeout = 20;
	app.get("/one", (request, reply) => {
		reply.send({
			imports: {
				"lit-element": "https://cdn.eik.dev/lit-element/v2",
			},
		});
	});
	app.get("/two", (request, reply) => {
		reply.send({
			imports: {
				"lit-html": "https://cdn.eik.dev/lit-html/v1",
			},
		});
	});
	const address = await app.listen({
		host: "0.0.0.0",
		port: 52023,
	});

	const bundle = await build({
		inputEntry: FILE,
		options: {
			maps: [
				{
					imports: {
						"lit-html/lit-html": "https://cdn.eik.dev/lit-html/v2",
					},
				},
			],
			urls: [`${address}/one`, `${address}/two`],
		},
	});

	t.matchSnapshot(clean(bundle), "import maps from urls");
	await app.close();
	t.end();
});

tap.test("loader() - import map fetched from a URL via eik.json", async (t) => {
	const app = fastify();
	app.server.keepAliveTimeout = 20;
	app.get("/one", (request, reply) => {
		reply.send({
			imports: {
				"lit-element": "https://cdn.eik.dev/lit-element/v2",
				"lit-html": "https://cdn.eik.dev/lit-html/v1",
				"lit-html/lit-html": "https://cdn.eik.dev/lit-html/v2",
			},
		});
	});
	const address = await app.listen({
		host: "0.0.0.0",
		port: 52024,
	});

	await fs.promises.writeFile(
		path.join(process.cwd(), "eik.json"),
		JSON.stringify({
			name: "test",
			server: address,
			version: "1.0.0",
			files: {
				"/css": "/src/css/**/*",
				"/js": "/src/js/**/*",
			},
			"import-map": `${address}/one`,
		}),
	);

	const bundle = await build({
		inputEntry: FILE,
	});

	t.matchSnapshot(clean(bundle), "eik.json import-map string");
	await app.close();
	await fs.promises.unlink(path.join(process.cwd(), "eik.json"));
	t.end();
});

tap.test(
	'loader() - Import map defined through option "maps" take precedence over import map defined in eik.json',
	async (t) => {
		const app = fastify();
		app.server.keepAliveTimeout = 20;
		app.get("/one", (request, reply) => {
			reply.send({
				imports: {
					"lit-element": "https://cdn.eik.dev/lit-element/v1",
				},
			});
		});

		const address = await app.listen({
			host: "0.0.0.0",
			port: 52024,
		});

		await fs.promises.writeFile(
			path.join(process.cwd(), "eik.json"),
			JSON.stringify({
				name: "test",
				server: address,
				version: "1.0.0",
				files: {
					"/css": "/src/css/",
					"/js": "/src/js/",
				},
				"import-map": `${address}/one`,
			}),
		);

		const bundle = await build({
			inputEntry: FILE,
			options: {
				maps: [
					{
						imports: {
							"lit-element": "https://cdn.eik.dev/lit-element/v2",
						},
					},
				],
			},
		});

		t.matchSnapshot(
			clean(bundle),
			"Should rewrite import statement to https://cdn.eik.dev/lit-element/v2",
		);
		await app.close();
		await fs.promises.unlink(path.join(process.cwd(), "eik.json"));
		t.end();
	},
);

tap.test(
	'loader() - Import map defined through option "urls" argument take precedence over import map defined in eik.json',
	async (t) => {
		const app = fastify();
		app.server.keepAliveTimeout = 20;
		app.get("/one", (request, reply) => {
			reply.send({
				imports: {
					"lit-element": "https://cdn.eik.dev/lit-element/v1",
				},
			});
		});

		app.get("/two", (request, reply) => {
			reply.send({
				imports: {
					"lit-element": "https://cdn.eik.dev/lit-element/v2",
				},
			});
		});

		const address = await app.listen({
			host: "0.0.0.0",
			port: 52028,
		});

		await fs.promises.writeFile(
			path.join(process.cwd(), "eik.json"),
			JSON.stringify({
				name: "test",
				server: address,
				version: "1.0.0",
				files: {
					"/css": "/src/css/",
					"/js": "/src/js/",
				},
				"import-map": `${address}/one`,
			}),
		);

		const bundle = await build({
			inputEntry: FILE,
			options: {
				urls: [`${address}/two`],
			},
		});

		t.matchSnapshot(
			clean(bundle),
			"Should rewrite import statement to https://cdn.eik.dev/lit-element/v2",
		);
		await app.close();
		await fs.promises.unlink(path.join(process.cwd(), "eik.json"));
		t.end();
	},
);

tap.test(
	'loader() - Import map defined through option "maps" argument take precedence over import map defined through option "urls" argument',
	async (t) => {
		const app = fastify();
		app.server.keepAliveTimeout = 20;
		app.get("/one", (request, reply) => {
			reply.send({
				imports: {
					"lit-element": "https://cdn.eik.dev/lit-element/v0",
				},
			});
		});

		app.get("/two", (request, reply) => {
			reply.send({
				imports: {
					"lit-element": "https://cdn.eik.dev/lit-element/v1",
				},
			});
		});

		const address = await app.listen();

		await fs.promises.writeFile(
			path.join(process.cwd(), "eik.json"),
			JSON.stringify({
				name: "test",
				server: address,
				version: "1.0.0",
				files: {
					"/css": "/src/css/",
					"/js": "/src/js/",
				},
				"import-map": `${address}/one`,
			}),
		);

		const bundle = await build({
			inputEntry: FILE,
			options: {
				maps: [
					{
						imports: {
							"lit-element": "https://cdn.eik.dev/lit-element/v2",
						},
					},
				],
				urls: [`${address}/two`],
			},
		});

		t.matchSnapshot(
			clean(bundle),
			"Should rewrite import statement to https://cdn.eik.dev/lit-element/v2",
		);
		await app.close();
		await fs.promises.unlink(path.join(process.cwd(), "eik.json"));
		t.end();
	},
);
