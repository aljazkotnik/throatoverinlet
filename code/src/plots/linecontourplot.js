import {html2element} from "../support/helpers.js";
import * as d3 from "d3";


// Super class.
import plotframe from "./plotframe.js";

// Inset components.
import twoInteractiveAxesInset from "./components/twoInteractiveAxesInset.js";
import variableobj from "./components/variableobj.js";



// The template can now hold one inset per div let's say. Maybe here I want to include a modelInputVariableSelectionInset and a twoInteractiveAxesInset. The drawing on the svg should be implemented here.
let template = `
<div style="width: 400px; background-color: white;">
	<div class="linecontourplot"></div>
</div>
`






export default class linecontourplot extends plotframe{
	width = 400
	tasks = []
	current = undefined;
	
	constructor(){
		super();
		let obj = this;
		
		
		// Append the plot backbone.
		let container = obj.node.querySelector("div.card-body");
		container.appendChild(html2element(template));

		
		// Add a linecontourplot inset. When initialising already pass in the card size.
		obj.svgobj = new twoInteractiveAxesInset([]);
		container.querySelector("div.linecontourplot").appendChild(obj.svgobj.node);
		obj.svgobj.onupdate = function(){
			obj.draw( obj.current );
		}; // function
		

	} // constructor
	
	update(tasks){
		// Update this plot.
		let obj = this;
		
		
		
		if(tasks){
			obj.tasks = tasks;
			obj.updatedata();
		} // if
		
		
		obj.svgobj.update();
	} // update
	

    updatedata(){
		let obj = this;
		// Line contour plots are fully predefined. However the data for the contours need to be processed from the matlab format to something geared towards d3 plotting. This then also allows the necessary data range extents to be calculated.
		/*
		C - one passage contour
		c_pitch - second passage contour
		xrt - aerofoil
		*/
		// NOTE THAT THE PLOT ASPECT RATIO MUST BE CHANGED GIVEN THE DATA!! Height is prescribed.
		
		let x_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
		let y_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
		
		obj.tasks.forEach(function(t){
			let passage0 = matlabContour2drawLines( t.contour.C );
			let passage1 = matlabContour2drawLines( t.contour.C_pitch );
			
			let flow_lines = passage0.concat(passage1);
			
			flow_lines.forEach(line=>{line.color = "cornflowerblue";});
			let custom_lines = [
			    {level: "aerofoil", points: t.contour.xrt, color: "black"},
				{level: "aerofoil", points: t.contour.xrt_neg_pitch, color: "black"},
				{level: "aerofoil", points: t.contour.xrt_pos_pitch, color: "black"},
				
				{level: "throat_bl", points: t.contour.xrt_throat_bl, color: "blue-green"},
				{level: "stag_line", points: t.contour.xrt_throat_bl, color: "gainsboro"},
				{level: "bl", points: t.contour.bl, color: "gainsboro"}
			];

			
			// calculate the extents
			t.contour.lineconfigs = flow_lines.concat(custom_lines);
			
			t.contour.lineconfigs.forEach(line=>{
				line.points.forEach(p=>{
					x_extent[0] = x_extent[0] < p[0] ? x_extent[0] : p[0];
					x_extent[1] = x_extent[1] > p[0] ? x_extent[1] : p[0];
					
					y_extent[0] = y_extent[0] < p[1] ? y_extent[0] : p[1];
					y_extent[1] = y_extent[1] > p[1] ? y_extent[1] : p[1];
				}) // forEach
			}) // forEach
		})
		
		
		
		
		// Control the plot aspect ratio by controlling the extents. Always try to keep hte data in the middle.
		// Try to scale the plot to fit the aspect ratio??
		let y_range = y_extent[1]-y_extent[0];
		let x_range = x_extent[1]-x_extent[0];
		if( x_range > y_range ){
			// Readjust y_extent.
			y_extent = [
			  y_extent[0] + y_range/2 - x_range/2,
			  y_extent[0] + y_range/2 + x_range/2,
			]
		} else {
			x_extent = [
			  x_extent[0] + x_range/2 - y_range/2,
			  x_extent[0] + x_range/2 + y_range/2,
			]
		} // if
		
		
		
		
		let xVariable = new variableobj({name: "x", extent: x_extent});
		let yVariable = new variableobj({name: "y", extent: y_extent});
		

		// First update the menu current selection, so that whenthe items are updated the current option will be automatically assigned.
		obj.svgobj.x.menu.current = xVariable;
		obj.svgobj.y.menu.current = yVariable;

		obj.svgobj.x.update( [xVariable] );
		obj.svgobj.y.update( [yVariable] );
		
	} // updatedata
	

	draw(d){
		// This should only draw a very specific item. But the config is precomputed anyway.
		let obj = this;
		
		
		obj.current = d;
		
		
		let xaxis = obj.svgobj.x;
		let yaxis = obj.svgobj.y;
		
		
		function getpath(linedata){
			let p = d3.path();
			let d = linedata.points;
			
			p.moveTo( xaxis.scale(d[0][0]), yaxis.scale(d[0][1]) )
			for(let i=1; i<d.length; i++){
				p.lineTo( xaxis.scale(d[i][0]), yaxis.scale(d[i][1]) );
			} // for
			return p.toString();
		} // getpath
		
		
		
		if(d){
			
			
			// Display the name in the title.
			obj.node.querySelector("input.card-title").value = d.metadata.name[0];
			
			
				
			let lines = d3.select(obj.node)
			  .select("g.data")
			  .selectAll("path")
			  .data( d.contour.lineconfigs )
			  
			// First exit.
			lines.exit().remove();

			// Then update
			lines
			  .attr("d", d=>getpath(d))
			  .attr("stroke", d=>d.color)
			  
			  
			// Finally add new lines.
			lines.enter()
			  .append("path")
				.attr("stroke-width", 1)
				.attr("stroke", d=>d.color)
				.attr("fill", "none")
				.attr("d", d=>getpath(d) )
			
			
		} // if
		
		
	} // draw
	
	
	
	
} // linecontourplot




function matlabContour2drawLines(C){
	
	let lines = [];
	
	// {level: <scalar>, points: [...]}
	
	// Loop over all the columns, and decode accordingly.
	let currentline;
	let current_n = 0;
	for(let i=0; i<C[0].length; i++){
		if(current_n == 0){
			// All hte points for this level have been collected. Start new line.
			currentline = {level: C[0][i], points: []};
			current_n = C[1][i];
			lines.push(currentline);
		} else {
			// Add the current point to the current line
			currentline.points.push( [ C[0][i], C[1][i] ] )
			current_n -= 1;
		} // if
		
	} // for
	
	
	return lines
} // matlabContour2drawLines














