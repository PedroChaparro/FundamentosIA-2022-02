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

const nodes = new vis.DataSet([
	{
		id: 1,
		label: 'AMHJ',
		x: 0,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 2,
		label: 'HJM',
		x: 100,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 3,
		label: 'DCTN',
		x: 200,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 4,
		label: 'CHJ',
		x: 300,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 5,
		label: 'MCM',
		x: 400,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 6,
		label: 'CPH',
		x: 500,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 7,
		label: 'DPE',
		x: 600,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 8,
		label: 'CCE',
		x: 700,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 9,
		label: 'BLM',
		x: 800,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 10,
		label: 'DG',
		x: 900,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 11,
		label: 'PV',
		x: 1000,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 12,
		label: 'ECP',
		x: 1100,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 13,
		label: 'RDHR',
		x: 1200,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 14,
		label: 'PCA',
		x: 1300,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 15,
		label: 'SCMH',
		x: 1400,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 16,
		label: 'P39',
		x: 1500,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 17,
		label: 'AHA',
		x: 1600,
		y: 0,
		fixed: true,
		color: {
			background: '#97C2FC',
			border: '#4089EB',
		},
	},
	{
		id: 18,
		label: 'MBFE',
		x: 1700,
		y: 0,
		fixed: true,
		color: {
			background: '#97c2fc',
			border: '#4089EB',
		},
	},
	{
		id: 19,
		label: 'R1:AMHJ && HJM',
		x: 50,
		y: 200,
		fixed: true,
		isCondition: true, //Custom flag
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
	},
	{
		id: 20,
		label: 'R2:DTCN && CHJ',
		x: 250,
		y: 200,
		fixed: true,
		isCondition: true, //Custom flag
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
	},
	{
		id: 21,
		label: 'R3:MCM && CPH',
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
		x: 450,
		y: 200,
		fixed: true,
		isCondition: true, //Custom flag
	},
	{
		id: 22,
		label: 'R4:DPE && CCE',
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
		x: 650,
		y: 200,
		fixed: true,
		isCondition: true, //Custom flag
	},
	{
		id: 23,
		label: 'R5:DG && PV',
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
		x: 950,
		y: 200,
		fixed: true,
		isCondition: true, //Custom flag
	},
	{
		id: 24,
		label: 'R6:RDHR && PCA',
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
		x: 1250,
		y: 200,
		fixed: true,
		isCondition: true, //Custom flag
	},
	{
		id: 25,
		label: 'R7:P39 && AHA',
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
		x: 1550,
		y: 200,
		fixed: true,
		isCondition: true, //Custom flag
	},
	{
		id: 26,
		label: 'R8:R1 && R2',
		x: 150,
		y: 400,
		fixed: true,
		isCondition: true, //Custom flag
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
	},
	{
		id: 27,
		label: 'R9:R4 && BLM',
		x: 700,
		y: 400,
		fixed: true,
		isCondition: true, //Custom flag
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
	},
	{
		id: 28,
		label: 'R10:R5 && ECP',
		x: 1050,
		y: 400,
		fixed: true,
		isCondition: true, //Custom flag
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
	},
	{
		id: 29,
		label: 'R11:R6 && SCMH',
		x: 1350,
		y: 400,
		fixed: true,
		isCondition: true, //Custom flag
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
	},
	{
		id: 30,
		label: 'R12:R7 && MBFE',
		x: 1600,
		y: 400,
		fixed: true,
		isCondition: true, //Custom flag
		color: {
			background: '#FC9797',
			border: '#EB4040',
		},
	},
	{
		id: 31,
		label: 'Pudrición del cogollo',
		x: 150,
		y: 600,
		fixed: true,
		color: {
			background: '#97c2fc',
			border: '#4089EB',
		},
	},
	{
		id: 32,
		label: 'Moteado',
		x: 450,
		y: 600,
		fixed: true,
		color: {
			background: '#97c2fc',
			border: '#4089EB',
		},
	},
	{
		id: 33,
		label: 'Pudrición Basal del tronco',
		x: 700,
		y: 600,
		fixed: true,
		color: {
			background: '#97c2fc',
			border: '#4089EB',
		},
	},
	{
		id: 34,
		label: 'Añublo Foliar',
		x: 1050,
		y: 600,
		fixed: true,
		color: {
			background: '#97c2fc',
			border: '#4089EB',
		},
	},
	{
		id: 35,
		label: 'Deficiencia del magnesio',
		x: 1350,
		y: 600,
		fixed: true,
		color: {
			background: '#97c2fc',
			border: '#4089EB',
		},
	},
	{
		id: 36,
		label: 'Pudrición de los racimos',
		x: 1600,
		y: 600,
		fixed: true,
		color: {
			background: '#97c2fc',
			border: '#4089EB',
		},
	},
]);

const edges = new vis.DataSet([
	{ from: 1, to: 19, arrows: 'to' },
	{ from: 2, to: 19, arrows: 'to' },
	{ from: 3, to: 20, arrows: 'to' },
	{ from: 4, to: 20, arrows: 'to' },
	{ from: 5, to: 21, arrows: 'to' },
	{ from: 6, to: 21, arrows: 'to' },
	{ from: 7, to: 22, arrows: 'to' },
	{ from: 8, to: 22, arrows: 'to' },
	{ from: 9, to: 27, arrows: 'to' },
	{ from: 10, to: 23, arrows: 'to' },
	{ from: 11, to: 23, arrows: 'to' },
	{ from: 12, to: 28, arrows: 'to' },
	{ from: 13, to: 24, arrows: 'to' },
	{ from: 14, to: 24, arrows: 'to' },
	{ from: 15, to: 29, arrows: 'to' },
	{ from: 16, to: 25, arrows: 'to' },
	{ from: 17, to: 25, arrows: 'to' },
	{ from: 18, to: 30, arrows: 'to' },
	{ from: 19, to: 26, arrows: 'to' },
	{ from: 20, to: 26, arrows: 'to' },
	{ from: 26, to: 31, arrows: 'to' },
	{ from: 21, to: 32, arrows: 'to' },
	{ from: 22, to: 27, arrows: 'to' },
	{ from: 23, to: 28, arrows: 'to' },
	{ from: 24, to: 29, arrows: 'to' },
	{ from: 25, to: 30, arrows: 'to' },
	{ from: 27, to: 33, arrows: 'to' },
	{ from: 28, to: 34, arrows: 'to' },
	{ from: 29, to: 35, arrows: 'to' },
	{ from: 30, to: 36, arrows: 'to' },
	{ from: 31, to: 37, arrows: 'to' },
]);

const data = {
	nodes,
	edges,
};

const options = {
	nodes: {
		shape: 'dot',
		borderWidth: 3,
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
