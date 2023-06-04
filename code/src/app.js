import dragDropHandler from "./support/dragDropHandler.js";
import dataStorage from "./support/dataStorage.js";
import CollapsibleFrame from "./support/CollapsibleFrame.js";


// Filtering plots.
import filterscatterplot from "./plots/filterscatterplot.js";
import filterhistogram from "./plots/filterhistogram.js";

// Flow detail plots.
import scatterplot from "./plots/scatterplot.js";
import linecontourplot from "./plots/linecontourplot.js";
import linedistributionplot from "./plots/linedistributionplot.js";

// Icon plot.
import iconplot from "./plots/iconplot.js";


// The app will always look the same - three side-by-side plots.
// SCATTERPLOT, quasi-CONTOURPLOT (really a lineplot), LINEPLOT


// First add in the collapsible frames, and their toggle buttons.
CollapsibleFrame.AddStyle();
const geometry = new CollapsibleFrame("Geometry");
const flow = new CollapsibleFrame("Flow");
const details = new CollapsibleFrame("Details");


const header = document.getElementById("header");
const body = document.getElementById("plotcontainer");


const coordinate = [geometry, flow, details];
coordinate.forEach(frm=>{
	header.appendChild( frm.button )
	body.appendChild( frm.folder )
	
	frm.button.onclick = function(e){
		coordinate.forEach(cfrm=>cfrm.update( frm==cfrm ))
	} // function
}) // forEach


// On window change the currentlz active folder should be activated again to extend it.
window.onresize = function(){
	coordinate.forEach(cfrm=>cfrm.update( cfrm.active ))
} // onresize









// How do I subscribe the regular plots to just the subset data? Do I just hardcode it so? Or do I subscribe them to it also?



// Instantiate the data.
var data = new dataStorage();
console.log(data)


// Data storage applies the filtering also, and precomputes a subset. Whenever the subset changes the plots should repaint, but also any header titles should adjust.
data.subset.subscribe(function(){
	geometry.label(`(${ data.tasks.length })`)
	flow.label(`(${ data.tasks.length })`)
	details.label(`(${ data.subset.value.length })`)
}) // subscribe




// PLOTS
function addPlot(p, folder){
  folder.appendChild(p.node);
  p.update();
  data.plots.push(p)
} // addPlot


// FILTERING PLOTS.


// Add some geometry histograms.
let fTC = new filterhistogram(data);
addPlot(fTC, geometry.folder);

let fSC = new filterhistogram(data);
addPlot(fSC, geometry.folder);

let fPC = new filterhistogram(data);
addPlot(fPC, geometry.folder);



// Add a scatterplot as a filtering plot prototype.
// Why do the filtering plots need to be available to filtering?
let fsp = new filterscatterplot(data);
addPlot(fsp, flow.folder);

let fh = new filterhistogram(data);
addPlot(fh, flow.folder);





// ICON plot
let ip = new iconplot(data)
addPlot(ip, details.folder)
data.subset.subscribe(function(){ ip.draw() })



// FLOW DETAIL PLOTS:
let lc = new linecontourplot(data);
addPlot(lc, details.folder)
data.subset.subscribe(function(){ lc.draw() })

let sp = new scatterplot(data);
addPlot(sp, details.folder)
data.subset.subscribe(function(){ sp.draw() })


let lp_mach = new linedistributionplot(data);
addPlot(lp_mach, details.folder)
data.subset.subscribe(function(){ lp_mach.draw() })


let lp_camber = new linedistributionplot(data);
addPlot(lp_camber, details.folder)
data.subset.subscribe(function(){ lp_camber.draw() })


let lp_theta = new linedistributionplot(data);
addPlot(lp_theta, details.folder)
data.subset.subscribe(function(){ lp_theta.draw() })


let lp_stream = new linedistributionplot(data);
addPlot(lp_stream, details.folder)
data.subset.subscribe(function(){ lp_stream.draw() })


// ADD DRAG AND DROP FOR DATA

let dataLoader = new dragDropHandler();
dataLoader.ondragdropped = function(loadeddata){
	

	// This replaces the 'ondragdropped' function of the data loader, which executes whn the new data becomes available.
	data.add(loadeddata);
	
	// Filtering plots
	fTC.updatedata();
	fSC.updatedata();
	fPC.updatedata();
	fsp.updatedata();
	fh.updatedata();
	
	// Load the data in and assign the series.
	sp.updatedata();
	lc.updatedata( data.contours[0] );
	
	lp_mach.updatedata( data.distributions[0] );
	lp_camber.updatedata( data.distributions[1] );
	lp_theta.updatedata( data.distributions[2] );
	lp_stream.updatedata( data.distributions[3] );
	
	// Update the icon plot.
	ip.updatedata();
	
} // ondragdropped

// DRAGGING AND DROPPING THE DATA IS A DEVELOPMENT FEATURE.
document.body.ondrop = (ev)=>{dataLoader.ondrop(ev)};
document.body.ondragover = (ev)=>{dataLoader.ondragover(ev)};




// Turn the details on by default. At the end so that the content has some height.
details.update(true);





// Dev test dataset.
// dataLoader.loadfiles(["./assets/data/M95A60SC80TC4_psi040A95_t_c_Axt.json"]);