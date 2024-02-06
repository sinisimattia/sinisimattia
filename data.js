const today = new Date();

const isMobile = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)

const links = [
	{
		name: "blog.mattia.codes",
		descr: "A blog about programming OSS",
		url: "https://blog.mattia.codes",
	},
	{
		name: "tris.mattia.codes",
		descr: "A fun game of tic-tac-vue",
		url: "https://tris.mattia.codes",
	},
];

const projects = [
	{
		name: "tapi.js",
		logo: "https://i.ibb.co/m5j9zXQ/tapi-prism.png",
		thumbnail: "https://i.ibb.co/68zLwzx/tapi-js-thumbnail.jpg",
		subtitle: "My latest OSS project for TypeScript developers.",
		descr: "It allows you to convert incoming JSON data into typed objects.",
		url: "https://github.com/sinisimattia/tapi",
	},
	{
		name: "The Open Toolbox",
		logo: "https://i.ibb.co/NW81dVJ/The-Open-Toolbox-Cropped.gif",
		thumbnail: "https://i.ibb.co/vXq54JQ/opentoolbox-thumbnail.jpg",
		subtitle: "Collection of awesome tools.",
		descr: "Not only for developers, but for everything. You can start your own and add it as a subdomain! Of course, fully open source.",
		url: "https://github.com/sinisimattia/the-open-toolbox",
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
	{
		name: "🚀 start2Impact",
		url: "https://talent.start2impact.it/profile/mattia-sinisi"
	},
	// {
	// 	name: "📝 Download my greeting card!",
	// 	url: "/poster.pdf",
	// },
];
