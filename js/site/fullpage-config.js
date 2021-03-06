const config = {
	//Navigation
	menu: '#menu',
	lockAnchors: false,
	anchors: [],
	navigation: false,
	// navigationPosition: 'right',
	// navigationTooltips: ['firstSlide', 'secondSlide'],
	showActiveTooltip: false,
	slidesNavigation: false,
	// slidesNavPosition: 'bottom',

	//Scrolling

	css3: true,
	scrollingSpeed: 700,
	autoScrolling: true,
	fitToSection: false,
	fitToSectionDelay: 1000,
	scrollBar: false,
	easing: 'easeInOutCubic',
	easingcss3: 'ease',
	loopBottom: false,
	loopTop: false,
	loopHorizontal: true,
	continuousVertical: false,
	continuousHorizontal: false,
	scrollHorizontally: false,
	interlockedSlides: false,
	dragAndMove: false,
	offsetSections: false,
	resetSliders: false,
	fadingEffect: false,
	normalScrollElements: '#element1, .element2',
	scrollOverflow: false,
	scrollOverflowReset: false,
	scrollOverflowOptions: null,
	touchSensitivity: 15,
	normalScrollElementTouchThreshold: 5,
	bigSectionsDestination: null,

	//Accessibility

	keyboardScrolling: true,
	animateAnchor: true,
	recordHistory: true,

	//Design

	controlArrows: true,
	verticalCentered: true,
	sectionsColor: ['#fff'],
	// paddingTop: '0',
	// paddingBottom: '0',
	fixedElements: '#header, #up-down',
	responsiveWidth: 0,
	responsiveHeight: 0,
	responsiveSlides: false,
	// parallax: false,
	// parallaxOptions: {
	// 	type: 'reveal',
	// 	percentage: 62,
	// 	property: 'translate'
	// },

	//Custom selectors
	sectionSelector: '.section',
	slideSelector: '.slide',

	lazyLoading: true,

	//events
	onLeave: function(index, nextIndex, direction) {},
	afterLoad: function(anchorLink, index) {},
	afterRender: function() {},
	afterResize: function() {},
	afterResponsive: function(isResponsive) {},
	afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
	onSlideLeave: function(
		anchorLink,
		index,
		slideIndex,
		direction,
		nextSlideIndex
	) {}
}

export default config
