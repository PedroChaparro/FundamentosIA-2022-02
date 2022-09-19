const form = document.getElementById('symptoms');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const iterator = document.getElementById('iterator');
let it = 0;

// *** *** *** *** ***
// Results
// *** *** *** *** ***

const rTitle = document.querySelector('.result__title');
const rImage = document.querySelector('.result__image');
const rDescription = document.querySelector('.result__description');
const rTreatment = document.querySelector('.result__treatment');

const results = {
	'PUDRICION DEL COGOLLO': {
		title: 'Pudrición del cogollo',
		image_relative_route: './assets/images/pudricion_cogollo.png',
		description: `Es una de las enfermedades más serias y devastadoras, 
		con episodios severos en Brasil, Colombia, Ecuador, Panamá, Surinam, 
		Costa Rica, Nicaragua, Honduras, Perú y Venezuela.\n\nEsta enfermedad 
		comienza en los  tejidos inmaduros de las flechas, pero se expande con 
		rapidez afectando los nuevos tejidos.`,
		treatment: `Lo más importante es una detección temprana para poder
		remover el tejido afectado y protejer el tejido sano con insecticidas,
		fungicidad y bactericidas.\n\nEs recomendable realizar un programa de
		aspersión para eliminar los estados avanzados de la enfermedad y remover 
		lotes afectados.`,
	},
};

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
	const result = results[finals[0].label];
	//const rTitle = document.querySelector('.result__title');
	//const rImage = document.querySelector('.result__image');
	//const rDescription = document.querySelector('.result__description');
	//const rTreatment = document.querySelector('.result__treatment');

	rTitle.textContent = result.title;
	rImage.src = result.image_relative_route;
	rImage.alt = `Imagen representativa de: ${result.title}`;
	rDescription.textContent = result.description;
	rTreatment.innerHTML = `
	<span>Tratamiento: </span> ${result.treatment}
	`;
};
