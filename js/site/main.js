import config from './fullpage-config.js'

import anime from 'animejs'

export default class Site {
	constructor(props) {
		this.config = config

		this.config.anchors = [
			'intro',
			'ceo',
			'jordanlens',
			'jordanlens-2',
			'hptn',
			'ivlp',
			'ivlp-2',
			'sinoimplant',
			'succeed2020',
			'succeed2020-2',
			'challengetb',
			'fanta',
			'civilsociety',
			'uswdp',
			'uswdp-2',
			'technology',
			'learn-more'
		]
		this.config.onLeave = this.handleOnLeave.bind(this)
		this.config.afterLoad = this.handleAfterLoad.bind(this)
		this.config.afterRender = this.handleAfterRender.bind(this)
		this.config.animateAnchor = false

		this.gDur = 800
		this.gEase = 'easeOutCubic'

		this.$hideEls = $('.stagger-in')
		this.pulseAnim = null
	}
	handleOnLeave(index, nextIndex, direction) {
		// console.log('handleOnLeave', index, nextIndex, direction)
		if ($('body').hasClass('drawer-open')) {
			this.toggleDrawer(index, 1, true)
		}
		if ($('body').hasClass('credit-open')) {
			this.toggleCredit(true)
		}
		this.pulseAnim && this.pulseAnim.pause()
	}
	handleAfterLoad(anchorLink, index) {
		this.hideEls()
		this.staggerInEls(index - 1)

		this.pulseAnim && this.pulseAnim.pause()

		this.pulseAnim = anime({
			targets: `[data-section="${index - 2}"] .drawer-button_container img`,
			scale: [0.85, 1],
			loop: true,
			direction: 'alternate',
			duration: 1000,
			easing: 'easeInOutSine'
		})

		$(`[data-section="${index - 2}"] .drawer-button_container`).one(
			'click',
			() => this.pulseAnim && this.pulseAnim.pause()
		)

		this.handleTocProgress(index - 2)
	}
	handleTocProgress(index) {
		let tocIndex = $(`[data-section='${index}']`).data('toc')
		if (!tocIndex) {
			$('.toc-toggle-inner').html('Start')
		} else {
			$('.toc-toggle-inner').html(tocIndex + ' / 10')
		}
		console.log(index, tocIndex)
	}
	pauseDrawerButton() {
		this.pulseAnim && this.pulseAnim.pause()
	}
	staggerInEls(index) {
		const dur = this.gDur
		const ease = this.gEase
		anime({
			targets: `[data-section="${index - 1}"] .stagger-in`,
			opacity: [0, 1],
			duration: dur,
			translateY: [50, 0],
			easing: ease,
			delay: function(el, i, l) {
				return i * dur / 3
			}
		})
	}
	handleAfterRender() {
		// console.log('handleAfterRender')
		this.hideEls()
		this.createHero()
	}
	hideEls() {
		this.$hideEls.css('opacity', 0)
	}
	handleCreditToggle() {
		this.toggleCredit()
	}
	handleTocToggle(e) {
		this.toggleTOC()
	}
	handleTocClick(e) {
		let dest = $(e.target).data('moveto')

		if (!dest)
			dest = $(e.target)
				.closest('[data-moveto]')
				.data('moveto')

		this.moveToSlide(dest)
	}
	handleCeoLink() {
		if ($('body').hasClass('drawer-open')) {
			this.toggleDrawer()
		}
		if ($('body').hasClass('toc-open')) {
			this.toggleTOC(1, true)
		}
		$.fn.fullpage.silentMoveTo(2)
		this.toggleDrawer(1)
		this.pauseDrawerButton()
	}
	moveToSlide(dest) {
		this.toggleTOC()
		$.fn.fullpage.silentMoveTo(dest, 0)
	}
	toggleTOC(dur = 300, forceClose = false) {
		let $drawer = $(`#rightSideBar`)
		let $button = $(`.toc-toggle`)

		let drawerOpen = forceClose || $('body').hasClass('toc-open')

		anime({
			targets: $drawer[0],
			duration: dur,
			easing: () => (drawerOpen ? 'easeInQuad' : 'easeOutQuad'),
			translateX: () => (drawerOpen ? [0, '100%'] : ['100%', 0]),
			begin: () => $('body').toggleClass('toc-open')
		})

		this.toggleDrawer(null, 300, true)

		$.fn.fullpage.setAllowScrolling(drawerOpen)
		$.fn.fullpage.setKeyboardScrolling(drawerOpen)
	}
	handleDrawerToggle(e) {
		let toggleID = $(e.target)
			.parent('[data-toggle]')
			.data('toggle')
		this.toggleDrawer(toggleID)
	}
	toggleDrawer(toggleID, dur = 300, forceClose = false) {
		let $drawer =
			toggleID !== null
				? $(`.leftDrawer[data-toggle="${toggleID}"`)
				: $(`.leftDrawer`)
		let $button = $(`.drawer-button_container`)

		let drawerOpen = forceClose || $('body').hasClass('drawer-open')

		anime({
			targets: $drawer[0],
			duration: dur,
			easing: () => (drawerOpen ? 'easeInQuad' : 'easeOutQuad'),
			translateX: () => (drawerOpen ? [0, '-100%'] : ['-100%', 0]),
			begin: () => $('body').toggleClass('drawer-open')
		})
		$.fn.fullpage.setAllowScrolling(drawerOpen)
		$.fn.fullpage.setKeyboardScrolling(drawerOpen)
	}
	closeDrawer(id) {
		if (!$('body').hasClass('drawer-open')) return
		this.toggleDrawer(id, 300)
	}
	toggleCredit(forceClose = false) {
		let creditOpen = forceClose || $('body').hasClass('credit-open')

		anime({
			targets: '.photo-credits',
			duration: 300,
			easing: 'easeInOutQuad',
			translateY: () => (creditOpen ? [0, '100%'] : ['100%', 0]),
			begin: () => $('body').toggleClass('credit-open')
		})
	}
	startFullpage() {
		$('#fullpage').fullpage(this.config)
		if (!location.hash) {
			$.fn.fullpage.setAllowScrolling(false)
			$.fn.fullpage.setKeyboardScrolling(false)
		}
	}
	addEventListeners() {
		$('.move-next').on('click', e => $.fn.fullpage.moveSectionDown())
		$('.drawer-button_container').on('click', e => this.handleDrawerToggle(e))
		$('.toc-toggle').on('click', e => this.handleTocToggle(e))
		$('.close-rightbar').on('click', e => this.toggleTOC())
		$('.toc-item').on('click', e => this.handleTocClick(e))
		$('[data-ceoLink]').on('click', e => this.handleCeoLink())

		$('[data-closedrawer]').on('click', e => {
			let id = $(e.target)
				.closest('[data-section]')
				.data('section')

			console.log(id)
			this.closeDrawer(id)
		})

		$('.photo-credit-trigger').on('click', e => this.handleCreditToggle(e))
		$('.photo-credits').on('click', e => this.toggleCredit(true))

		$('[data-movedown]').on('click', () => $.fn.fullpage.moveSectionDown())

		$('[data-moveup]').on('click', () => $.fn.fullpage.moveSectionUp())
	}
	createHero() {
		var words = [
			'promote peace?',
			'end HIV?',
			'increase economic well-being?',
			'eliminate TB?',
			'empower women and girls?',
			'give citizens voice?',
			'drive student success?',
			'improve nutrition?',
			'use data for greater impact?',
			'end HIV?',
			'increase economic well-being?',
			'eliminate TB?',
			'empower women and girls?',
			'promote civic engagement?',
			'advance peace and stability?',
			'expand access to healthcare?',
			'drive student success?',
			'improve nutrition?',
			'use data for greater impact?',
			'inspire young leaders?',
			'harness digital technology?',
			'prepare students for 21st century jobs?',
			'promote healthy families?',
			'generate groundbreaking research?',
			'combat violent extremism?',
			'support communities in crisis?'
		]
		var createWords = function() {
			var shuffledWords = shuffle(words)

			shuffledWords.push('improve lives?')

			for (var i = 0; i < words.length; i++) {
				var first = ''
				$('#words').append(`<span ${first}>${words[i]}</span>`)
			}
			animate()
		}

		var animate = function() {
			var tl = anime.timeline()

			$('.skip-intro').click(() => tl.seek(tl.duration))

			var wordState = {
				indexTween: 0,
				activeIndex: 0,
				$words: $('#words > span')
			}

			let title_white =
				'#cat_title_white path, #cat_title_white polyline,#cat_title_white line'
			let title = '#cat_logo #cat_title'
			let subtitle = '#cat_logo #cat_subtitle'
			let dot = '#cat_logo #orange_dot'

			tl
				.add({
					targets: '.intro-header',
					opacity: [0, 1],
					translateY: ['20px', '0'],
					duration: 500,
					easing: 'easeInOutSine',
					delay: 1000
				})
				.add({
					targets: wordState,
					indexTween: 4,
					duration: 4000,
					easing: 'linear',
					offset: '-=1000',
					update: cycleWord
				})
				.add({
					targets: wordState,
					indexTween: wordState.$words.length,
					duration: wordState.$words.length * 200,
					easing: 'easeInQuad',
					update: cycleWord
				})
				.add({
					targets: '.intro-header',
					scale: {
						value: [1, 1.25],
						duration: 3000,
						easing: 'linear',
						delay: 500
					},
					color: {
						value: '#f27321',
						duration: 1000,
						easing: 'easeInSine',
						delay: 500
					},
					begin: () => $('.intro-header').css('position', 'absolute')
				})
				// start catalyst
				.add({
					targets: dot,
					opacity: [0, 1],
					r: [9.51, 800],
					duration: 1000,
					easing: 'easeOutExpo',
					offset: '-=300',
					begin: function() {
						$('.catalyst')
							.show()
							.css('opacity', 1)

						$(dot).attr('cx', '640')
						$(dot).attr('cy', '400')
					},
					complete: () => $('.intro-header').hide()
				})
				.add({
					targets: title_white,
					strokeDashoffset: [anime.setDashoffset, 0],
					duration: 500,
					delay: (el, i) => {
						return i * 100
					},
					easing: 'easeOutSine'
				})
				.add({
					targets: dot,
					duration: 500,
					r: 9.51,
					easing: 'easeOutCubic',
					offset: '+=1000',
					begin: () => {
						$(dot).attr('cx', '333.42')
						$(dot).attr('cy', '369.25')
					}
				})
				.add({
					targets: title,
					duration: 500,
					opacity: [0, 1],
					easing: 'easeInQuart',
					offset: '-=500'
				})
				.add({
					targets: subtitle,
					duration: 500,
					opacity: [0, 1],
					easing: 'easeOutCubic',
					offset: '+=1000'
				})
				.add({
					targets: '#intro-chevron',
					duration: 500,
					opacity: [0, 1],
					translateY: [20, 0],
					easing: 'easeInQuart',
					offset: '+=1000',
					complete: handleIntroComplete
				})

			if (location.hash) {
				tl.seek(tl.duration)
				handleIntroComplete()
			}

			function cycleWord(anime) {
				if (Math.floor(wordState.indexTween) !== wordState.activeIndex) {
					wordState.$words.hide()

					wordState.activeIndex = Math.floor(wordState.indexTween)

					if ($(wordState.$words[wordState.activeIndex - 1]).show) {
						$(wordState.$words[wordState.activeIndex - 1]).show()
					}
				}
			}
		}
		function shuffle(a) {
			var j, x, i
			for (i = a.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1))
				x = a[i]
				a[i] = a[j]
				a[j] = x
			}
			return a
		}
		function handleIntroComplete() {
			anime({
				targets: '#intro-chevron',
				loop: true,
				direction: 'alternate',
				translateY: ['-10px', '10px'],
				duration: 1000,
				easing: 'easeInOutQuart'
			})
			anime({
				targets: '#orange_dot2',
				loop: true,
				r: 20,
				opacity: [1, 0],
				duration: 500,
				delay: 1500,
				easing: 'linear'
			})

			$.fn.fullpage.setAllowScrolling(true)
			$.fn.fullpage.setKeyboardScrolling(true)
		}

		createWords()
	}
	init() {
		this.addEventListeners()
		this.startFullpage()
	}
}
