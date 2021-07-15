var typed = new Typed('#type', {
	strings: [
		"I like to develop open source.",
		"I like to write about programming.",
		"I like to try new stuff.",
		"I like to experiment.",
		"Let's talk!"
	],
	typeSpeed: 30,
	smartBackspace: true,
	backSpeed: 30,
	backDelay: 1000,
	cursorChar: '|',
	loop: true,
	startDelay: 3000,

});

var domainsCarousel = new Splide( '#domains-carousel', {
	type: 'loop',
	height: '3.5rem',
	direction: 'ttb',
	arrows: false,
	pagination: false,
	drag: false,
	autoplay: true,
	interval: 5000,
	pauseOnHover: true,
	pauseOnFocus: true,
	isNavigation: true,
});

var sitesCarousel = new Splide( '#sites-carousel', {
	type: 'loop',
	height: '500px',
	direction: 'rtl',
	arrows: false,
	pagination: false,
	autoplay: true,
	interval: 5000,
	pauseOnHover: true,
	pauseOnFocus: true,
	perPage: 3,
	gap: 20,
});

domainsCarousel.sync(sitesCarousel).mount();

sitesCarousel.mount();