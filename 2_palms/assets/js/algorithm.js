const form = document.getElementById('symptoms');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const nextButton = document.getElementById('next');

const iterator = document.getElementById('iterator');
let it = 0;

// *** *** *** *** ***
// Results
// *** *** *** *** ***

const rTitle = document.querySelector('.result__title');
const rImage = document.querySelector('.result__image');
const rDescription = document.querySelector('.result__description');
const rTreatment = document.querySelector('.result__treatment');

const possible_results = {
	'PUDRICION DEL COGOLLO': {
		title: 'Pudrición del cogollo',
		image_relative_route: './assets/images/pudricion_cogollo.jpg',
		description:
			'Es una de las enfermedades más serias y devastadoras, con episodios severos en Brasil, Colombia, Ecuador, Panamá, Surinam, Costa Rica, Nicaragua, Honduras, Perú y Venezuela.\n\nEsta enfermedad comienza en los  tejidos inmaduros de las flechas, pero se expande con rapidez afectando los nuevos tejidos.',
		treatment:
			'Lo más importante es una detección temprana para poder remover el tejido afectado y protejer el tejido sano con insecticidas, fungicidad y bactericidas.\n\nEs recomendable realizar un programa de aspersión para eliminar los estados avanzados de la enfermedad y remover lotes afectados.',
	},
	'MOTEADO': {
		title:'Moteado',
		image_relative_route: './assets/images/moteado.png',
		description:'No es un síntoma que caracterice la enfermedad y se presenta independientemente de las pudriciones de flecha-cogollo; sin embargo, palmas con pudriciones de flecha acentúan el síntoma de moteado. Los moteados leves o moderados desaparecen con los cambios de clima y buenas prácticas agronómicas.',
		treatment:'1.Revisar cuidadosamente las palmitas de vivero, ante su transplante a sitio definitivo, a fin e eliminar todas aquellas sospechosas de estar infectadas 2.Eliminar especies de gramíneas en los lotes, reemplazándolas por cobertura de pueraria Erradicar las palmas, tan pronto presenten síntomas de la enfermedad 3.Mantener libre de malezas los círculos (zona  de  plateo) de las palma 4.Protección de las palmas, especialmente en el vivero, mediante la aplicación de insecticidas que eliminen posibles vectores de la enfermedad '
	},
	'PUDRICIÓN BASAL DEL TRONCO': {
		title: 'Pudrición basal del tronco',
		image_relative_route: './assets/images/pudricion_basal.jpg',
		description:
			'Esta enfermedad es mas común en Africa, Asia e Indonesia. Es causada por Ganoderma Lucidum y G. Zonatum. Produce que los tejidos invadidos se descompongan y aparezcan cavidades más o menos grandes en la base del estipe.',
		treatment:
			'Se recomienda la remoción de los tejidos infectados y la aplicación de fungicidas protectores con una pasta cicatrizante. Las plantas afectadas deben destruirse "in situ", al igual que sus raíces.',
	},
	'AÑUBLO FOLIAR': {title: 'Añublo foliar',
	image_relative_route: './assets/images/añublo_foliar.png',
	description:
		'Esta enfermedad es mas común en Africa, Asia e Indonesia. Es causada por Ganoderma Lucidum y G. Zonatum. Produce que los tejidos invadidos se descompongan y aparezcan cavidades más o menos grandes en la base del estipe.',
	treatment:
		'Se recomienda la remoción de los tejidos infectados y la aplicación de fungicidas protectores con una pasta cicatrizante. Las plantas afectadas deben destruirse "in situ", al igual que sus raíces.',
},
	'DEFICIENCIA DE MAGNESIO': {
		title: 'Deficiencia  de magnesio',
		image_relative_route: './assets/images/deficiencia_magnesio.jpg',
		description:'Se caracteriza por un  amarillamiento de las hojas de la base del tronco. La deficiencia de este elemento es causada por reservas bajas de él en el suelo, por la presencia de un subsuelo muy ácido y por el desbalance entre el magnesio',
		treatment:'El fertilizante más comúnmente empleado para corregir esta deficiencia es el sulfato de magnesio.'
	},
	'PUDRICIÓN DE LOS RACIMOS': {
		title:'Pudrición de los racimos',
		image_relative_route: './assets/images/pudricion_racimos.jpg',
		description:'La pudrición de los frutos y racimos causada por el hongo Marasmius es más frecuente en palmas de 3 a 9 años de edad y bajo condiciones de alta humedad ambiental, como consecuencia de períodos prolongados de lluvias. Los frutos toman una coloración marrón, se vuelven blandos y al final de color negro, con el mesocarpió descompuesto casi en su totalidad.',
		treatment:'Los racimos infectados deben retirarse de las palmas, así como también los restos de inflorescencias, mediantes podas sanitarias regulares. Cuando sea necesario se realiza la polinización asistida para conseguir un mejor cuajamiento de los frutos, para así disminuir el exceso de humedad ambiental mediante un control de malezas y mejoramientos de las condiciones de drenaje'
	},
};

let current_results = {};
let actual_page = 0;

// *** *** *** *** ***
// Algorithm
// *** *** *** *** ***

resetButton.addEventListener('click', () => {
	reset();
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
});

startButton.addEventListener('click', () => {
	reset();
	const selections = Object.fromEntries(new FormData(form));
	recursivelyEval(Object.keys(selections));
});

nextButton.addEventListener('click', () => {
	actual_page++;
	actual_page == current_results.length ? (actual_page = 0) : (actual_page = actual_page);
	updateResultPage(actual_page);
});

const reset = () => {
	// Reset results panel
	rTitle.textContent = '';
	rImage.src = '';
	rDescription.textContent = '';
	rTreatment.textContent = '';

	// Reset network
	it = 0;
	iterator.textContent = `Iteracion: ${it}`;

	const nodesArr = Object.values(nodes._data);
	nodesArr.forEach((node) => {
		if (node.isCondition) {
			node.color.background = '#FC9797';
			node.color.border = '#EB4040';
		} else {
			node.color.background = '#97C2FC';
			node.color.border = '#4089EB';
		}
	});

	network = new vis.Network(container, data, options); // Update network
};

/**
 * Evaluar recursivamente el conjunto conflicto actual frente a la base de hechos
 * @param {Array} conflictSet
 */
const recursivelyEval = (conflictSet) => {
	// console.log(conflictSet);

	// Get nodes object (ids, and labels)
	const nodesArr = Object.values(nodes._data); // [{id: 1, label: 'A'}]

	const currentNodes = nodesArr.filter((node) => {
		if (conflictSet.includes(node.label)) {
			node.color.background = '#A5E69A';
			node.color.border = '#55DF3A';
			return node;
		}
	});

	network = new vis.Network(container, data, options);

	// Get and sort possible edges
	const edgesArr = Object.values(edges._data); // [{from: 1, to: 2, id: 'someid}]

	const possibleEdges = edgesArr.filter((edge) => {
		if (currentNodes.some((node) => node.id === edge.from)) {
			return edge;
		}
	});

	possibleEdges.sort((a, b) => a.from - b.from);

	// Eval possible edges
	possibleEdges.forEach((edge) => {
		let correct = true; // Flag
		let existing_conditions = 0;
		let possible = false;

		const to_node = nodesArr.filter((node) => node.id == edge.to)[0];

		if (to_node) {
			//Eval "to" conditions
			const conditions = edgesArr.filter((edge) => edge.to == to_node.id);

			// Eval each condition
			for (let i = 0; i < conditions.length; i++) {
				if (currentNodes.some((node) => node.id === conditions[i].from)) {
					existing_conditions++;
				}
			}

			// If at least half conditions exist, mark as possible
			possible = existing_conditions >= Math.ceil(conditions.length / 2) ? true : false;

			// If all conditions are true, add the node to nodes list
			if (possible && !currentNodes.some((node) => node.id === to_node.id)) {
				to_node.color.background = '#A5E69A'; // Change color
				to_node.color.border = '#55DF3A'; // Change border
				currentNodes.push(to_node);
			}
		}
	});

	// If some new node was added, continue the recursive evaluation
	if (conflictSet.length !== currentNodes.length) {
		const newConflictSet = [];
		currentNodes.forEach((node) => newConflictSet.push(node.label));

		// Update network
		setTimeout(() => {
			network = new vis.Network(container, data, options);

			it++;
			iterator.textContent = `Iteracion: ${it}`;

			recursivelyEval(newConflictSet);
		}, 2000);
	} else {
		updateResults(currentNodes);
	}
};

const updateResults = (conflictSet) => {
	const finals = conflictSet.filter((node) => node.isFinal);
	current_results = [];
	finals.forEach((final) => current_results.push(possible_results[final.label]));

	const result = possible_results[finals[0].label];
	//const rTitle = document.querySelector('.result__title');
	//const rImage = document.querySelector('.result__image');
	//const rDescription = document.querySelector('.result__description');
	//const rTreatment = document.querySelector('.result__treatment');

	if (finals.length === 0) {
		alert('No se encontraron enfermedades');
	} else {
		updateResultPage(0);
		if (finals.length > 1) nextButton.style.display = 'block';
	}
};

const updateResultPage = (page) => {
	console.log(current_results);
	console.log(page);
	rTitle.textContent = current_results[page].title;
	rImage.src = current_results[page].image_relative_route;
	rImage.alt = `Imagen representativa de: ${current_results[page].title}`;
	rDescription.textContent = current_results[page].description;
	rTreatment.innerHTML = `<span>Tratamiento: </span> ${current_results[page].treatment}`;
};
