const today = new Date();

const isMobile = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)

const links = [
	{
		name: "blog.snisni.it",
		descr: "A blog about programming OSS",
		url: "https://blog.snisni.it",
	},
];

const games = [
	{
		name: "Tic-Tac-Vue",
		url: "https://tris.snisni.it",
	},
	{
		name: "Munchkin Counter",
		url: "https://munchkin-counter.snisni.it",
	},
];

const footerLinks = [
	{
		name: "💌 mattia@snisni.it",
		url: "mailto:mattia@snisni.it",
	},
	{
		name: "💼 LinkedIn",
		url: "https://www.linkedin.com/in/sinisimattia"
	},
	{
		name: "🐙 GitHub",
		url: "https://github.com/sinisimattia"
	},
	// {
	// 	name: "🚀 start2Impact",
	// 	url: "https://talent.start2impact.it/profile/mattia-sinisi"
	// },
	// {
	// 	name: "📝 Download my greeting card!",
	// 	url: "/poster.pdf",
	// },
];
