const form = document.getElementById('client-form');
const error_paragraph = document.getElementById('error');

// Helpers
const validate_form = (data) => {
	const keys = Object.keys(data);

	// Validate keys
	if (keys.length === 1) {
		return {
			status: false,
			message: 'Must selet at least one column',
		};
	} else {
		if (data.plot !== 'scatter') {
			return keys.length === 2
				? { status: true, message: 'Ok' }
				: { status: false, message: 'Must select only one column' };
		} else {
			return keys.length === 3
				? { status: true, message: 'Ok' }
				: {
						status: false,
						message: 'You must select 2 columns to generate the scatter plot',
				  };
		}
	}
};

// Handle submit event
form.addEventListener('submit', (e) => {
	e.preventDefault();

	// Get data
	const data = Object.fromEntries(new FormData(e.target));
	const validation = validate_form(data);

	if (validation.status) {
		error_paragraph.innerText = '';
		error_paragraph.classList.remove('form__error--active');
	} else {
		error_paragraph.innerText = validation.message;
		error_paragraph.classList.add('form__error--active');
	}
});
