import dragDropHandler from "./support/dragDropHandler.js";
import dataStorage from "./support/dataStorage.js";

import scatterplot from "./plots/scatterplot.js";
import linecontourplot from "./plots/linecontourplot.js";
import linedistributionplot from "./plots/linedistributionplot.js";


// The app will always look the same - three side-by-side plots.
// SCATTERPLOT, quasi-CONTOURPLOT (really a lineplot), LINEPLOT
let container = document.getElementById("plotcontainer");


const plots = [];

// Instantiate the data.
var data = new dataStorage();
data.globalupdate = function update(){
	plots.forEach(p=>{
		p.repaint()
	}); // forEach
} // update




let sp = new scatterplot(data);
container.appendChild(sp.node);
sp.update();
plots.push(sp)

let lc = new linecontourplot(data);
container.appendChild(lc.node);
lc.update();
plots.push(lc)

let lp_mach = new linedistributionplot(data);
container.appendChild(lp_mach.node);
lp_mach.update();
plots.push(lp_mach)


let lp_camber = new linedistributionplot(data);
container.appendChild(lp_camber.node);
lp_camber.update();
plots.push(lp_camber)


let lp_theta = new linedistributionplot(data);
container.appendChild(lp_theta.node);
lp_theta.update();
plots.push(lp_theta)




console.log(data, plots);













// ADD DRAG AND DROP FOR DATA

let dataLoader = new dragDropHandler();
dataLoader.ondragdropped = function(loadeddata){
	// This replaces the 'ondragdropped' function of the data loader, which executes whn the new data becomes available.
	data.settasks(loadeddata);
	
	
	// Load the data in and assign the series.
	sp.updatedata()
	lc.updatedata()
	
	
	lp_mach.updatedata( data.distributions[0] )
	lp_camber.updatedata( data.distributions[1] )
	lp_theta.updatedata( data.distributions[2] )
	

	
	data.globalupdate();
} // ondragdropped

// DRAGGING AND DROPPING THE DATA IS A DEVELOPMENT FEATURE.
let dragDropArea = document.getElementsByTagName("body")[0];
dragDropArea.ondrop = (ev)=>{dataLoader.ondrop(ev)};
dragDropArea.ondragover = (ev)=>{dataLoader.ondragover(ev)};

// Dev test dataset.
// dataLoader.loadfiles(["./assets/data/M95A60SC80TC4_psi040A95_t_c_Axt.json"]);