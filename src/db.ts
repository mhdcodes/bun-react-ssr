import { Database } from "bun:sqlite";

console.log("Creating database...");
const db = new Database("database.sqlite");

console.log("Creating tweets table...");
db.run(`
  DROP TABLE IF EXISTS tweets;
  CREATE TABLE tweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author VARCHAR(255),
    content TEXT,
    likes INTEGER
  );
`);

console.log("Inserting tweets...");
const tweets = Array.from({ length: 1e4 }, (_, i) => {
	const author = `User ${i}`;
	const content = `This is a tweet from ${author}`;
	const likes = Math.floor(Math.random() * 1000);
	return [author, content, likes];
});
db.run(
	`
INSERT INTO tweets (author, content, likes)
VALUES ${tweets.map(() => "(?, ?, ?)").join(", ")};
`,
	tweets.flat(),
);

console.log("Closing database connection...");
db.close();
