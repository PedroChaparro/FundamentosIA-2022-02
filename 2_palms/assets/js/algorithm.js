const form = document.getElementById('symptoms');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const iterator = document.getElementById('iterator');
let it = 0;

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

		const to_node = nodesArr.filter((node) => node.id == edge.to)[0];

		//Eval "to" conditions
		const conditions = edgesArr.filter((edge) => edge.to == to_node.id);
		//console.log('conditions');
		//console.log(conditions);

		// Eval each condition
		for (let i = 0; i < conditions.length; i++) {
			if (!currentNodes.some((node) => node.id === conditions[i].from)) {
				correct = false;
				break;
			}
		}

		// If all conditions are true, add the node to nodes list
		if (correct && !currentNodes.some((node) => node.id === to_node.id)) {
			to_node.color.background = '#A5E69A'; // Change color
			to_node.color.border = '#55DF3A'; // Change border
			currentNodes.push(to_node);
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
		}, 3000);
	}
};
