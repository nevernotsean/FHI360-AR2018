import config from './fullpage-config.js'

export default class Site {
	constructor(props) {
		this.config = config
	}
	init() {
		$('#fullpage').fullpage(this.config)
	}
}
