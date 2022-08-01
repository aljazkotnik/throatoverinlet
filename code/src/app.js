import dragDropHandler from "./support/dragDropHandler.js";

import scatterplot from "./plots/scatterplot.js";
import linecontourplot from "./plots/linecontourplot.js";
import linedistributionplot from "./plots/linedistributionplot.js";


// The app will always look the same - three side-by-side plots.
// SCATTERPLOT, quasi-CONTOURPLOT (really a lineplot), LINEPLOT
let container = document.getElementById("plotcontainer");




let sp = new scatterplot();
container.appendChild(sp.node);
sp.update();


let lc = new linecontourplot();
container.appendChild(lc.node);
lc.update();


let lp = new linedistributionplot();
container.appendChild(lp.node);
lp.update();



console.log(sp, lc, lp);



// Instantiate the data.
var data = undefined;




// Updatethe app.
function update(){
	sp.update( data );
	lc.update( data );
	lp.update( data );
} // update

sp.onitemmouseover = function(d){
	lc.draw(d);
	lp.highlight([d]);
} // onitemmouseover

sp.onitemmouseout = function(d){
	lp.unhighlight();
} // onitemmouseover


sp.onitemselected = function(d){
	lp.setdatum(d);
	lc.setdatum(d);
}



lp.onitemmouseover = function(d){
	lc.draw(d);
	sp.highlight([d]);
} // onitemmouseover

lp.onitemmouseout = function(d){
	sp.unhighlight();
} // onitemmouseover


lp.onitemselected = function(d){
	sp.setdatum(d);
	lc.setdatum(d);
}







// ADD DRAG AND DROP FOR DATA

let dataLoader = new dragDropHandler();
dataLoader.ondragdropped = function(loadeddata){
	// This replaces the 'ondragdropped' function of the data loader, which executes whn the new data becomes available.
	data = loadeddata;
	update();
} // ondragdropped

// DRAGGING AND DROPPING THE DATA IS A DEVELOPMENT FEATURE.
let dragDropArea = document.getElementsByTagName("body")[0];
dragDropArea.ondrop = (ev)=>{dataLoader.ondrop(ev)};
dragDropArea.ondragover = (ev)=>{dataLoader.ondragover(ev)};

// Dev test dataset.
dataLoader.loadfiles(["./assets/data/M95A60SC80TC4_psi040A95_t_c_Axt.json"]);