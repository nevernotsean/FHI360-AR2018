// CSS
import './vendor/modernizr-3.5.0.min'
import '../sass/index.scss'

// Site Scripts
import main from './site/main.js'

const Site = new main()

const preload = () => {
	if (!Modernizr) return console.log('Enable Modernizer!')
	if (!Modernizr.objectfit) {
		$('.object-fit').each(function() {
			var $container = $(this),
				imgUrl = $container.find('img').prop('src')
			if (imgUrl) {
				$container
					.css('backgroundImage', 'url(' + imgUrl + ')')
					.addClass('compat-object-fit')
			}
		})
	}
}

$(document).ready(() => {
	preload
	Site.init()
})
