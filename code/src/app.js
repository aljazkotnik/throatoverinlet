import dragDropHandler from "./support/dragDropHandler.js";
import scatterplot from "./plots/scatterplot.js";
import linecontourplot from "./plots/linecontourplot.js";

// The app will always look the same - three side-by-side plots.
// SCATTERPLOT, quasi-CONTOURPLOT (really a lineplot), LINEPLOT
let container = document.getElementById("plotcontainer");



// Instantiate the data.
var data = undefined;





let sp = new scatterplot();
container.appendChild(sp.node);
sp.update();


let lc = new linecontourplot();
container.appendChild(lc.node);
lc.update();

console.log(sp, lc);



// Updatethe app.
function update(){
	sp.update( data );
	lc.update( data );
} // update


sp.onitemmouseover = function(d){
	lc.draw(d);
} // onitemmouseover










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
dataLoader.loadfiles(["./assets/data/M95A60SC80TC4_psi040A95_t_c_2.json"]);