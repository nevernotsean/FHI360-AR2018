import config from './fullpage-config.js'
import content from '../../content/content.json'

import anime from 'animejs'

export default class Site {
	constructor(props) {
		this.config = config

		this.config.anchors = content.sections.map(section => `slide-${section.id}`)
		this.config.onLeave = this.handleOnLeave.bind(this)
		this.config.afterLoad = this.handleAfterLoad.bind(this)
		this.config.afterRender = this.handleAfterRender.bind(this)

		this.gDur = 800
		this.gEase = 'easeOutCubic'

		this.$hideEls = $('.stagger-in')
	}
	handleOnLeave(index, nextIndex, direction) {
		console.log('handleOnLeave', index, nextIndex, direction)
	}
	handleAfterLoad(anchorLink, index) {
		this.hideEls()
		this.staggerInEls(index)
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
	}
	hideEls() {
		this.$hideEls.css('opacity', 0)
	}
	init() {
		$('#fullpage').fullpage(this.config)
	}
}
