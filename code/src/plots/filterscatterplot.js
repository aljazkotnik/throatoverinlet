import * as d3 from "d3";

import scatterplot from "./scatterplot.js";
import brush from "./components/brush.js";


/*
Needs to update hte filtering dimensions. But also the dimensions should be dynamic?
How many dimensions will crossfilter support?


Filtering plots should highlight the filter setting - this is different functionality than comparison plots!!
But both could be combined!!
*/
export default class filterscatterplot extends scatterplot{
  constructor(data){
	super(data);
    let obj = this;
	
	
	// Add functionality to draw a rectangle... How will this be done since the scatterplot has to support zoom... For now the zoom can be disabled by removing the rectangle hosting it.
	d3.select( obj.svgobj.node )
	  .select("g.background")
	  .select("rect.zoom-area")
      .remove()	  
	
	
	// Now add the drawing of the box.
	const svg = obj.svgobj.node.querySelector("svg");
	const g = d3.select(svg).select("g.markup");
	
	obj.brush = new brush(svg, g, "2d");
	
	obj.brush.clear = function(){
		// Clear the filter
		obj.data.filterremove( obj.svgobj.x.variable.name )
		obj.data.filterremove( obj.svgobj.y.variable.name )
	} // clear
	obj.brush.submit = function(){
		// Apply the filter
		let intervals = obj.calculateIntervals();
		obj.data.filterapply( obj.svgobj.x.variable.name, intervals[0] );
		obj.data.filterapply( obj.svgobj.y.variable.name, intervals[1] );

	} // submit
	
	


	// Changing the variable on the axis should remove the filter, as it is no longer visible.
	obj.svgobj.onupdate = function(){
		obj.refresh();
		obj.data.filtertrim();
	} // onupdate
	
	
	// Subscribe the plot to any changes of the subset.
	obj.data.subset.subscribe(function(){
		obj.repaint();
	}) // subscribe
	
	
  } // constructor
  
  
  
  repaint(){
	// On user interactions the data is merely repainted, and not replaced to accelerate interactions. But the brushes do need to be updated.
	super.repaint();
	let obj = this;
	
	// Update the brush. But only show it if one of the ranges is defined.
	let x = obj.data.filters[obj.svgobj.x.variable.name];
	let y = obj.data.filters[obj.svgobj.y.variable.name];
	
	if( x || y ){
	  let xrange = x ? x.range : obj.svgobj.x.variable.extent;
	  let yrange = y ? y.range : obj.svgobj.y.variable.extent;
	  obj.updateBrush([xrange,yrange]);	
	} // if
  } // repaint
  
  
  calculateIntervals(){
	// Calculate the intervals having been given two diagonally opposing points. The returned intervals should be in data units.
	let obj = this;
	
	let x = [ obj.brush.p0[0], obj.brush.p1[0] ];
	let y = [ obj.brush.p0[1], obj.brush.p1[1] ];
	
	return [ 
	  x.map(v=>obj.svgobj.x.scale.invert(v)).sort(),
	  y.map(v=>obj.svgobj.y.scale.invert(v)).sort() 
	]
	
  } // calculateIntervals
  
  
  updateBrush(intervals){
	let obj = this;
	
	let x = obj.svgobj.x.scale;
	let y = obj.svgobj.y.scale;
	
	// Note that the y-axis is inverted by default, so a high variable value converts to a small pixel value. Furthermore, the top left corner of the rectangle will be at the maximum value of the interval.
	obj.brush.update(
	  x(intervals[0][0]),
	  y(intervals[1][1]),
	  x(intervals[0][1]) - x(intervals[0][0]),
	  y(intervals[1][0]) - y(intervals[1][1])
	)
	// console.log("width", intervals[0], x(intervals[0][1]) > x(intervals[0][0]) )
	// console.log("height", intervals[1], y(intervals[1][0]) > y(intervals[1][1]) )
  } // updateBrush
  
    
} // filterscatterplot




function calculateRangeArray(points){
	return points.reduce(function(acc,p){
		p.forEach(function(v,i){
			acc[i][0] = p[0] < acc[0] ? p[0] : acc[0];
			acc[i][1] = p[0] > acc[1] ? p[0] : acc[1];
		})
		return acc
	},[
	 [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
	 [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
	 ])
} // calculateRange




