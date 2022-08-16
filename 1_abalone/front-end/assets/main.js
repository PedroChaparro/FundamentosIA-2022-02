const form = document.getElementById('client-form');
const error_paragraph = document.getElementById('error');
const atypicalToggle = document.getElementById('atypical-toggle');
const alphaInput = document.getElementById('atypical-alpha');
const main = document.getElementsByClassName('main')[0];
const statisticsButton = document.getElementById('statistics');

const URL = 'http://localhost:5000';

// Helpers
const validate_form = (data) => {
	const keys = Object.keys(data);

	// Validate keys
	if ((!alphaInput.disabled && keys.length === 3) || keys.length === 1) {
		return {
			status: false,
			message: 'Must select at least one column',
		};
	} else {
		// All plots (except scatter) accept only column selected
		if (data.plot !== 'scatter') {
			// Sex column can't generate normal probability plot or box plot
			if (
				data.plot === 'boxplot' ||
				(data.plot === 'normplot' && keys.includes('sex'))
			) {
				return {
					status: false,
					message:
						'You can´t select sex column to generate a box plot or a normal plot (Because is not a numeric value)',
				};
			}
			// Can't remove atypical values on sex column
			else if (keys.includes('sex') && !alphaInput.disabled) {
				return {
					status: false,
					message:
						'Yo can´t remove atypical values on sex column (Because is not a numeric value)',
				};
			} else {
				return (!alphaInput.disabled && keys.length === 4) || keys.length === 2
					? { status: true, message: 'Ok' }
					: { status: false, message: 'Must select only one column' };
			}
		}
		// Scatter plot only accept two column selected
		else {
			return (!alphaInput.disabled && keys.length === 5) || keys.length === 3
				? { status: true, message: 'Ok' }
				: {
						status: false,
						message: 'You must select 2 columns to generate the scatter plot',
				  };
		}
	}
};

const OneColumnRequest = async (plot, column, atypicalToggle, atypicalAlpha) => {
	const response = await fetch(`${URL}/${plot}`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({
			column,
			'atypical-toggle': atypicalToggle,
			'atypical-alpha': atypicalAlpha,
		}),
	});

	const json_response = await response.json();

	return json_response;
};

const ScatterRequest = async (plot, column1, column2, atypicalToggle, atypicalAlpha) => {
	const response = await fetch(`${URL}/${plot}`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({
			column1,
			column2,
			'atypical-toggle': atypicalToggle,
			'atypical-alpha': atypicalAlpha,
		}),
	});

	const json_response = await response.json();

	return json_response;
};

/**
 *
 * @param {string} url Base 64 image
 */
const addImageOnPage = (url) => {
	const base64 = url.slice(2, url.length - 1);

	// Create the image
	const image = document.createElement('img');
	image.src = `data:image/jpg;base64,${base64}`;
	image.classList.add('results__image');

	// Append to the HTML
	main.innerHTML = '';
	main.appendChild(image);
};

const addTableOnPage = (data) => {
	const keys = Object.keys(data);

	const table = document.createElement('table');
	table.classList.add('table');

	const thead = document.createElement('thead');
	thead.innerHTML = `
	<tr>
		<th scope='col'>Column</th>
		<th scope='col'>Kurtosis</th>
		<th scope='col'>Skew</th>
		<th scope='col'>Mean</th>
		<th scope='col'>Median</th>
		<th scope='col'>Mode</th>
	</tr>
	`;

	const tbody = document.createElement('tbody');

	keys.forEach((key) => {
		console.log(data[key]);
		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${key}</td>
			<td>${data[key]['kurtosis']}</td>
			<td>${data[key]['skew']}</td>
			<td>${data[key]['mean']}</td>
			<td>${data[key]['median']}</td>
			<td>${data[key]['mode']}</td>
		`;

		tbody.appendChild(row);
	});

	table.appendChild(thead);
	table.appendChild(tbody);
	main.innerHTML = '';
	main.appendChild(table);
};

// Event handlers
form.addEventListener('submit', async (e) => {
	e.preventDefault();

	// Get data
	const data = Object.fromEntries(new FormData(e.target));
	console.log(data);

	const keys = Object.keys(data);
	const validation = validate_form(data);

	// Check atypical data values
	data['atypical-toggle'] = data['atypical-toggle'] ? true : false;
	data['atypical-alpha'] = data['atypical-alpha'] ? data['atypical-alpha'] : null;

	if (validation.status) {
		error_paragraph.innerText = '';
		error_paragraph.classList.remove('form__error--active');

		// Send the request
		if (data.plot !== 'scatter') {
			const response = await OneColumnRequest(
				data.plot,
				keys[1],
				data['atypical-toggle'],
				data['atypical-alpha']
			);
			addImageOnPage(response.image);
		} else {
			const response = await ScatterRequest(
				data.plot,
				keys[1],
				keys[2],
				data['atypical-toggle'],
				data['atypical-alpha']
			);
			addImageOnPage(response.image);
		}
	} else {
		error_paragraph.innerText = validation.message;
		error_paragraph.classList.add('form__error--active');
	}
});

atypicalToggle.addEventListener('change', () => {
	// Toggle input disabled state
	alphaInput.disabled ? (alphaInput.disabled = false) : (alphaInput.disabled = true);
});

statisticsButton.addEventListener('click', async () => {
	const response = await fetch(`${URL}/statistics`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({
			'atypical-toggle': !alphaInput.disabled,
			'atypical-alpha': alphaInput.value,
		}),
	});

	const json_response = await response.json();

	addTableOnPage(json_response);
});
