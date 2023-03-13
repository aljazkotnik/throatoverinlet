import * as d3 from "d3";

import histogram from "./histogram.js";
import brush from "./components/brush.js";


/* Extend the histogram to allow filtering using a rectange */
export default class filterhistgoram extends histogram{
  constructor(data){
	super(data);
    let obj = this;
	
	
	// Add functionality to draw a rectangle.
	// Now add the drawing of the box.
	const svg = obj.svgobj.node.querySelector("svg");
	const g = d3.select(svg).select("g.markup")
	  
	// Add in a brush
	obj.brush = new brush(svg, g, "horizontal");
	
	obj.brush.clear = function(){
		// Clear the filter
		obj.data.filterremove( obj.svgobj.x.variable.name );
	} // clear
	obj.brush.submit = function(){
		// Apply the filter
		obj.data.filterapply( obj.svgobj.x.variable.name, obj.calculateInterval() );
	} // submit
	
	
	
	// Needs to also trim the filters when navigating away from dimension.
	obj.svgobj.x.onupdate = function(){
		obj.updatebins();
		obj.draw();
		obj.repaint();
		obj.data.filtertrim();
	}; // function
	
	
	
	// Subscribe the plot to any changes of the subset.
	obj.data.subset.subscribe(function(){
		obj.repaint();
	}) // subscribe
	
	
  } // constructor
  
  
  repaint(){
	super.repaint();
	let obj = this;
	
	let x = obj.svgobj.x.scale;
	let xf = obj.data.filters[obj.svgobj.x.variable.name];
	if( xf ){		
		obj.brush.update(
		  x(xf.range[0]),
		  undefined,
		  x(xf.range[1])-x(xf.range[0]),
		  undefined
		)
	} // if
  } // repaint
  
  
  calculateInterval(){
	// Calculate the intervals having been given two diagonally opposing points. The returned intervals should be in data units.
	let obj = this;
	
	let x = [ obj.brush.p0[0], obj.brush.p1[0] ];
	
	return  x.map(v=>obj.svgobj.x.scale.invert(v)).sort();
	
  } // calculateIntervals
  
} // filterhistgoram




