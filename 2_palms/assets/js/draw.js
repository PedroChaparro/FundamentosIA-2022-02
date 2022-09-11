const container = document.getElementById('mynetwork');

// --- --- --- --- ---
// Vis variables
// --- --- --- --- ---
const nodes = new vis.DataSet([
	{ id: 1, label: 'A', x: 200, y: 0, fixed: true }, //Plumas
	{ id: 2, label: 'B', x: 200, y: 200, fixed: true }, //Vuela
	{ id: 3, label: 'C', x: 400, y: 200, fixed: true }, //Frio
	{ id: 4, label: 'D', x: 600, y: 200, fixed: true }, //Ave
	{ id: 5, label: 'C && D', color: 'red', x: 200, y: 400, fixed: true }, //Cond 1
	{ id: 6, label: 'B && D', color: 'red', x: 800, y: 400, fixed: true }, //Cond 2
	{ id: 7, label: 'E', x: 200, y: 600, fixed: true }, //Pinguino
	{ id: 8, label: 'F', x: 600, y: 600, fixed: true }, //Aguila
]);

const edges = new vis.DataSet([
	{ from: 1, to: 4, arrows: 'to' },
	{ from: 4, to: 5, arrows: 'to' },
	{ from: 3, to: 5, arrows: 'to' },
	{ from: 4, to: 6, arrows: 'to' },
	{ from: 2, to: 6, arrows: 'to' },
	{ from: 5, to: 7, arrows: 'to' },
	{ from: 6, to: 8, arrows: 'to' },
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
let network = new vis.Network(container, data, options);
