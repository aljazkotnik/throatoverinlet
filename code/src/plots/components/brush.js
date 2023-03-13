import * as d3 from "d3";

export default class brush{
	
  
  p0 = [0,0];
  p1 = [0,0];
	
	
  constructor(svg, g, type){
	// Both svg and g should be d3.select(node). Furthermore, allow functionality modes.
	let obj = this;
	obj.svg = svg;
	obj.type = ["horizontal", "vertical", "2d"].includes(type) ? type : "2d";
  
    // Extend to pass in both interaction and element hosts.
	obj.rect = g
	  .append("rect")
	    .attr("x",0)
		.attr("y",0)
		.attr("width",0)
		.attr("height",0)
		.attr("fill", "gray")
		.attr("opacity", 0.4)
		
	
	let active = false;
	svg.addEventListener("mousedown", function(e){
		// Store start point.
		obj.p0 = d3.pointer(e);
		obj.p1 = d3.pointer(e);
		active = true;
	}) // mousedown
	svg.addEventListener("mousemove", function(e){
		// Update the end point. Interactively update teh filters.
		if(active){
		  obj.p1 = d3.pointer(e);
		  obj.update()
		} // if
	}) // mousemove
	svg.addEventListener("mouseup", function(e){
		
		// If the points are too close together then the interval should be teh variable extent. Or the filter should be cleared.
		if( dist(obj.p0, obj.p1) < 5**2 ){
			obj.clear();
		} else {
			obj.submit();
		} // if
		
		active = false;
	}) // mouseup
  
  
  
   
    // Add functionality to drag and extend the filter rectangle.
	let action = "drag";
	let rect = obj.rect.node();
	/* THIS IS QUITE COMPLICATED!!!
	rect.addEventListener("mousedown", function(e){
		e.stopPropagation();
		// If the user clicked on the rectangle, then the rectangle should be adjusted, as opposed to made from scratch.
		let box = rect.getBoundingClientRect();
		let point = [e.clientX - box.x, e.clientY - box.y];
		// console.log("edit", [point[0]/box.width, point[1]/box.height])
	})
    */
   
  
  
  } // constructor
  
  update(x,y,w,h){
	let obj = this;
	
	// Allow inputs to update brush.
	let xd = x ? x : Math.min( obj.p0[0],obj.p1[0] );
	let yd = y ? y : Math.min( obj.p0[1],obj.p1[1] );
	let wd = w ? w : Math.abs( obj.p0[0]-obj.p1[0] );
	let hd = h ? h : Math.abs( obj.p0[1]-obj.p1[1] );
	
	// For some brush types the width/height has to be set to the svg width/height.
	let b = obj.svg.getBBox();
	
	let xdt = obj.type=="vertical" ? 0 : xd;
	let ydt = obj.type=="horizontal" ? 0 : yd;
	let wdt = obj.type=="vertical" ? b.width : wd;
	let hdt = obj.type=="horizontal" ? b.height : hd;
	
	// console.log( xdt,ydt,wdt,hdt )
	
	obj.rect
	  .attr("x",  xdt )
	  .attr("y",  ydt )
	  .attr("width", wdt )
	  .attr("height", hdt )
  } // update
  
  
  // Dummy functions to allow behavior to be prescribed.
  clear(){} // clear
  submit(){} // submit
  
} // brush

function dist(a,b){ 
  return (a[0]-b[0])**2 + (a[1]-b[1])**2 
} // dist