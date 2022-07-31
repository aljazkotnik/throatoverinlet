import dragDropHandler from "./support/dragDropHandler.js";






// Instantiate the data.
var data = undefined;


// Updatethe app.
function update(){
	console.log("Update the app.", data)
} // update













let dataLoader = new dragDropHandler();
dataLoader.ondragdropped = function(loadeddata){
	// This replaces the 'ondragdropped' function of the data loader, which executes whn the new data becomes available.
	data = loadeddata;
	update();
} // ondragdropped

// DRAGGING AND DROPPING THE DATA IS A DEVELOPMENT FEATURE.
let dragDropArea = document.getElementsByTagName("BODY")[0];
dragDropArea.ondrop = (ev)=>{dataLoader.ondrop(ev)};
dragDropArea.ondragover = (ev)=>{dataLoader.ondragover(ev)};

// Dev test dataset.
dataLoader.loadfiles(["./assets/data/M95A60SC80TC4_psi040A95.json"]);