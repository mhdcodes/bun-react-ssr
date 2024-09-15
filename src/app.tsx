export type Tweet = {
	id: number;
	author: string;
	content: string;
	likes: number;
};

export function App({ tweets }: { tweets: Tweet[] }) {
	return (
		<html lang="en">
			<head>
				<title>Twitter clone</title>
			</head>
			<body>
				<h1>Twitter</h1>
				<ul>
					{tweets.map((t) => (
						<li key={t.id}>
							{t.author} : {t.content} - {t.likes} likes
						</li>
					))}
				</ul>
			</body>
		</html>
	);
}
