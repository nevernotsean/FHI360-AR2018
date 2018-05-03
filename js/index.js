// CSS
import './vendor/modernizr-3.5.0.min'
import '../sass/index.scss'

// Site Scripts
import main from './site/main.js'

const Site = new main()

$(document).ready(() => {
	Site.init()
})
