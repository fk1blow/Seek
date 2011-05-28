var Config = Packagr.from('Config').load('Config');


var Environment = {
	state: 'development',
	default_response: 'hahaha',
	default_layout: 'alternative',
	show_errors: true,
	pages: {
		404: true,
		error: true
	}
}


module.exports = Environment;
