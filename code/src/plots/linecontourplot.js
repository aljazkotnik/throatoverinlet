import {html2element} from "../support/helpers.js";
import * as d3 from "d3";


// Super class.
import plotframe from "./plotframe.js";

// Inset components.
import twoInteractiveAxesInset from "./components/twoInteractiveAxesInset.js";
import variableobj from "./components/variableobj.js";


// Maybe move the width and height from the CSS into here?
import {css} from "./components/css.js";


// The template can now hold one inset per div let's say. Maybe here I want to include a modelInputVariableSelectionInset and a twoInteractiveAxesInset. The drawing on the svg should be implemented here.
let template = `
<div style="width: 400px; background-color: white;">
	<div class="linecontourplot"></div>
</div>
`


let additional = `
<input class="card-title" spellcheck="false"  style="${css.plotTitle} color:orange;" value="">
`



export default class linecontourplot extends plotframe{
	
	width = 400
	
	accessor = function(){}
	data = {
		current: undefined,
		datum: undefined,
		tasks: undefined
	}
	lastselected = undefined
	
	
	tooltips = []
	
	constructor(data){
		super();
		let obj = this;
		obj.data = data;
		
		
		// Add another title input.
		let header = obj.node.querySelector("div.card-header");
		header.appendChild(html2element(additional));
		
		
		// Append the plot backbone.
		let container = obj.node.querySelector("div.card-body");
		container.appendChild(html2element(template));

		
		// Add a linecontourplot inset. When initialising already pass in the card size.
		obj.svgobj = new twoInteractiveAxesInset([]);
		container.querySelector("div.linecontourplot").appendChild(obj.svgobj.node);
		obj.svgobj.onupdate = function(){
			obj.draw();
		}; // function
		
		
		// Change the initial title
		obj.node.querySelector("input.card-title").value = "Contours";

	} // constructor
	
	
	repaint(){
		let obj = this;
		// The repaint here has to update the data also.
		obj.update();
	} // repaint
	
	
	update(){
		// Update this plot.
		let obj = this;
		
		obj.svgobj.update();
		obj.draw();
	} // update
	

    updatedata(contour){
		// The data object may allow several different contours to be plotted, but the 'contour' here specifies which one this plot should select.
		let obj = this;
		obj.accessor = contour.accessor;

		let xVariable = new variableobj({name: "x", extent: contour.extent.x});
		let yVariable = new variableobj({name: "y", extent: contour.extent.y});
		

		// First update the menu current selection, so that whenthe items are updated the current option will be automatically assigned.
		obj.svgobj.x.menu.current = xVariable;
		obj.svgobj.y.menu.current = yVariable;

		obj.svgobj.x.update( [xVariable] );
		obj.svgobj.y.update( [yVariable] );
		
	} // updatedata
	
	
	
	getpath(linedata){
		let obj = this;
		
		
		let xaxis = obj.svgobj.x;
		let yaxis = obj.svgobj.y;
		
		let p = d3.path();
		let d = linedata.points;
		
		p.moveTo( xaxis.scale(d[0][0]), yaxis.scale(d[0][1]) )
		for(let i=1; i<d.length; i++){
			p.lineTo( xaxis.scale(d[i][0]), yaxis.scale(d[i][1]) );
		} // for
		
		return p.toString();
	} // getpath
	

	draw(){
		// This should only draw a very specific item. But the config is precomputed anyway.
		let obj = this;		
		
		
		// Display the name in the title.
		let titles = obj.node.querySelectorAll("input.card-title");
		titles[0].value = obj.data.current ? obj.data.current.metadata.name[0] : "";
		titles[1].value = obj.data.datum ? obj.data.datum.metadata.name[0] : "";
		
		// Keep track of the latest selected?
		obj.lastselected = obj.data.current ? obj.data.current : obj.lastselected;
		
		// g.datum, g.data
		obj.drawdata( obj.lastselected, "g.data", function(d){return d.color} );
		obj.drawdata( obj.data.datum, "g.datum", function(){return "orange"} );
		obj.removetooltip();
	} // draw
	
	
	drawdata(data, gselector, coloraccessor){
		let obj = this;
		
		if(data){
				
			let lines = d3.select(obj.node)
			  .select( gselector )
			  .selectAll("path")
			  .data( obj.accessor( data ) )
			  
			// First exit.
			lines.exit().remove();

			// Then update
			lines
			  .attr("d", d=>obj.getpath(d))
			  .attr("stroke", coloraccessor)
			  .attr("stroke-width", d=>d.lineWidth ? d.lineWidth : 1 )
			  
			// Finally add new lines.
			lines.enter()
			  .append("path")
				.attr("stroke-width", d=>d.lineWidth ? d.lineWidth : 1 )
				.attr("stroke", coloraccessor)
				.attr("fill", "none")
				.attr("d", d=>obj.getpath(d) )
				.on("mouseenter", (e,d)=>{
					// No stroke width changing because the lines are segments, so when mousing in only a segment is highlighted, and to highlight everything we'd have to search to see which other ones to highlight. And at width 1 they are too narrow to properly higlight anyway...
					// e.target.setAttribute("stroke-width", 2)
					obj.placetooltip(e,d);
				})
				/*
				.on("mouseout", (e,d)=>{
					e.target.setAttribute("stroke-width", 1)
				}) // on
				*/
			
		} else {
			d3.select(obj.node)
			  .select( gselector )
			  .selectAll("path")
			  .remove()
		} // if
	} // drawdata
	
	
	
	
	
	
	placetooltip(e,d){
		// The event gives the point where the tooltip should be placed, but it should be oriented using the data.
		let obj = this;
		
		// Find the svg position of the event.
		let svgbox = obj.svgobj.node.querySelector("svg").getBoundingClientRect();
		let plotbox = obj.svgobj.plotbox;
		let xpx = e.clientX - svgbox.x - plotbox.x[0];
		let ypx = e.clientY - svgbox.y - plotbox.y[0];
		
		
		// The scales to convert between pixel and data.
		let xaxis = obj.svgobj.x;
		let yaxis = obj.svgobj.y;
		
		
		// Now find the slope next to that point by first finding hte index of the closest point.
		let i_event = d.points.reduce((i_closest, v, i)=>{
			
			let currentclosest = d.points[i_closest];
			let current = d.points[i];
			
			let d0 = ( xpx - xaxis.scale(currentclosest[0]) )**2 
			       + ( ypx - yaxis.scale(currentclosest[1]) )**2;
			let d1 = ( xpx - xaxis.scale(current[0]) )**2 
			       + ( ypx - yaxis.scale(current[1]) )**2;
			
			return d1 < d0 ? i : i_closest;
		}, 0);
		
		// Calculate the local slope.
		
		let angle = Math.atan( (d.points[i_event][1]-d.points[i_event+1][1])/(d.points[i_event][0]-d.points[i_event+1][0])  )/Math.PI*180
		
		
		d3.select(obj.node)
		  .select("g.markup")
		  .append("text")
		  .attr("x", xpx)
		  .attr("y", ypx)
		  .attr("font-size", "10px")
		  .attr("transform", `rotate(${-angle} ${xpx},${ypx})`)
		  .text(d.level)
		
	} // placetooltip
	
	
	
	removetooltip(){
		// Maybe this on eis not needed on events, but just on redraws?
		let obj = this;
		
		d3.select(obj.node)
		  .select("g.markup")
		  .selectAll("text")
		  .remove();
		  
	} // removetooltip
	
	
	
} // linecontourplot








