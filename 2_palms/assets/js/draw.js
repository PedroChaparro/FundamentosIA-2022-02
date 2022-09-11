const container = document.getElementById('mynetwork');

// --- --- --- --- ---
// Vis variables
// --- --- --- --- ---
const nodes = new vis.DataSet([
	{ id: 1, label: 'A' }, //Plumas
	{ id: 2, label: 'B' }, //Vuela
	{ id: 3, label: 'C' }, //Frio
	{ id: 4, label: 'D' }, //Ave
	{ id: 5, label: 'E' }, //Pinguino
	{ id: 6, label: 'F' }, //Aguila
	{ id: 7, label: 'Cond', color: 'red' }, //Cond 1
	{ id: 8, label: 'Cond', color: 'red' }, //Cond 2
]);

const edges = new vis.DataSet([
	{ from: 1, to: 4, arrows: 'to' },
	{ from: 4, to: 7, arrows: 'to' },
	{ from: 3, to: 7, arrows: 'to' },
	{ from: 4, to: 8, arrows: 'to' },
	{ from: 2, to: 8, arrows: 'to' },
	{ from: 7, to: 5, arrows: 'to' },
	{ from: 8, to: 6, arrows: 'to' },
]);

const data = {
	nodes,
	edges,
};

const options = {
	nodes: {
		shape: 'dot',
	},
	edges: {
		// Fix edges color to not depend of node color
		color: { color: 'grey' },
	},
};

// --- --- --- --- ---
// Create the network
// --- --- --- --- ---
const network = new vis.Network(container, data, options);
