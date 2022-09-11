const container = document.getElementById('mynetwork');

// --- --- --- --- ---
// Vis variables
// --- --- --- --- ---
/*
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
*/

const nodes =new vis.DataSet([
	{ id: 1, label:'AMHJ', x:0, y:0, fixed: true},
	{ id: 2, label:'HJM', x:100, y:0, fixed: true},
	{ id: 3, label:'DCTN', x:200, y:0, fixed: true},
	{ id: 4, label:'CHJ', x:300, y:0, fixed: true},
	{ id: 5, label:'PFTP', x:400, y:0, fixed: true},
	{ id: 6, label:'PBF', x:500, y:0, fixed: true},
	{ id: 7, label:'PR', x:600, y:0, fixed: true},
	{ id: 8, label:'DDI', x:700, y:0, fixed: true},
	{ id: 9, label:'DCF', x:800, y:0, fixed: true},
	{ id: 10, label:'DSF', x:900, y:0, fixed: true},
	{ id: 11, label:'NBL', x:1000, y:0, fixed: true},
	{ id: 12, label:'DG', x:1100, y:0, fixed: true},
	{ id: 13, label:'PV', x:1200, y:0, fixed: true},
	{ id: 14, label:'ECP', x:1300, y:0, fixed: true},
	{ id: 15, label:'RDHR', x:1400, y:0, fixed: true},
	{ id: 16, label:'PCA', x:1500, y:0, fixed: true},
	{ id: 17, label:'SCMH', x:1600, y:0, fixed: true},
	{ id: 18, label:'AMHJ && HJM && DTCN && CHJ', color: 'red', x:0, y:200, fixed: true},
	{ id: 19, label:'PFTP && PBF && PR && DDI && DCF && DSF', color: 'red', x:400, y:200, fixed: true},
	{ id: 20, label:'PFTP && PBF && PR && DDI && DCF && DSF && NBL', color: 'red', x:800, y:200, fixed: true},
	{ id: 21, label:'DG && PV && ECP', color: 'red', x:1200, y:200, fixed: true},
	{ id: 22, label:'RDHR && PBF && PCA && SCMH', color: 'red', x:1600, y:200, fixed: true},
	{ id: 23, label:'PUDRICION COGOLLO', x:400, y:400, fixed: true},
	{ id: 24, label:'MARCHITEZ SORPRESIVA', x:600, y:400, fixed: true},
	{ id: 25, label:'MARCHITEZ LETAL', x:800, y:400, fixed: true},
	{ id: 26, label:'AÑUBLO FOLIAR', x:1000, y:400, fixed: true},
	{ id: 27, label:'DEFICIENCIA DEL MAGNESIO', x:1200 , y:400, fixed: true}
]);

const edges = new vis.DataSet([
	{ from: 1, to: 18, arrows: 'to' },
	{ from: 2, to: 18, arrows: 'to' },
	{ from: 3, to: 18, arrows: 'to' },
	{ from: 4, to: 18, arrows: 'to' },
	{ from: 5, to: 19, arrows: 'to' },
	{ from: 6, to: 19, arrows: 'to' },
	{ from: 7, to: 19, arrows: 'to' },
	{ from: 8, to: 19, arrows: 'to' },
	{ from: 9, to: 19, arrows: 'to' },
	{ from: 10, to: 19, arrows: 'to' },
	{ from: 5, to: 20, arrows: 'to' },
	{ from: 6, to: 20, arrows: 'to' },
	{ from: 7, to: 20, arrows: 'to' },
	{ from: 8, to: 20, arrows: 'to' },
	{ from: 9, to: 20, arrows: 'to' },
	{ from: 10, to: 20, arrows: 'to' },
	{ from: 11, to: 20, arrows: 'to' },
	{ from: 12, to: 21, arrows: 'to' },
	{ from: 13, to: 21, arrows: 'to' },
	{ from: 14, to: 21, arrows: 'to' },
	{ from: 15, to: 22, arrows: 'to' },
	{ from: 16, to: 22, arrows: 'to' },
	{ from: 17, to: 22, arrows: 'to' },
	{ from: 6, to: 22, arrows: 'to' },
	{ from: 18, to: 23, arrows: 'to' },
	{ from: 19, to: 24, arrows: 'to' },
	{ from: 20, to: 25, arrows: 'to' },
	{ from: 21, to: 26, arrows: 'to' },
	{ from: 22, to: 27, arrows: 'to' }
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
