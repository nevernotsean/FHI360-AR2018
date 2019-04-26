export default function(){
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
			var tl = anime.timeline({
				easing: 'easeInSine'
			})

			$('.skip-intro').click(() => tl.seek(tl.duration))

			var wordState = {
				indexTween: 0,
				activeIndex: 0,
				$words: $('#words > span')
			}

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
					targets: '.intro-header #words',
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
					}
					// begin: () => $('.intro-header').css('position', 'absolute')
				})
				// start catalyst
				.add({
					targets: '#orange_dot',
					opacity: [0, 1],
					r: [9.51, 800],
					duration: 1000,
					delay: 800,
					offset: '-=300',
					easing: 'easeOutCirc',
					begin: function() {
						$('.catalyst')
							.show()
							.css('opacity', 1)
							.css('background', '#fff')

						$('.g-ants').hide()
					},
					complete: () => {
						$('#orange_dot').hide()
						$('.catalyst')
							.css('background', '#f27321')
							.addClass('run-ants')
					}
				})
				.add({
					targets: '.catalyst',
					duration: 1,
					begin: () => $('.g-ants').show(),
					offset: '+=100'
				})
				.add({
					targets: '#cat_subtitle',
					duration: 1000,
					opacity: [0, 1],
					easing: 'easeOutCubic',
					offset: '+=1000'
				})
				.add({
					targets: '#intro-chevron',
					duration: 500,
					opacity: [0, 1],
					translateY: [20, 0],
					easing: 'easeOutCubic',
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
			$('#orange_dot').hide()
			$('.catalyst')
				.css('background', '#f27321')
				.addClass('run-ants')
			$('.g-ants').show()
			anime({
				targets: '#intro-chevron',
				loop: true,
				direction: 'alternate',
				translateY: ['-10px', '10px'],
				duration: 1000,
				easing: 'easeInOutQuart'
			})

			$.fn.fullpage.setAllowScrolling(true)
			$.fn.fullpage.setKeyboardScrolling(true)
		}

		createWords()
	}