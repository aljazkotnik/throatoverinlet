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
	<div class="linedistributionplot"></div>
</div>
`






export default class linedistributionplot extends plotframe{
	width = 400
	tasks = []
	selecteddatum = undefined
	
	constructor(){
		super();
		let obj = this;
		
		
		// Append the plot backbone.
		let container = obj.node.querySelector("div.card-body");
		container.appendChild(html2element(template));

		
		// Add a linedistributionplot inset. When initialising already pass in the card size.
		obj.svgobj = new twoInteractiveAxesInset([]);
		container.querySelector("div.linedistributionplot").appendChild(obj.svgobj.node);
		obj.svgobj.onupdate = function(){
			obj.draw( obj.current );
		}; // function
		


		// Change the title
		obj.node.querySelector("input.card-title").value = "Distributions";
		

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
			
			
			let side1 = t.distribution.Mis_1.map((v,i)=>{
				return [t.distribution.s_1[i], t.distribution.Mis_1[i]]
			})
			
			let side2 = t.distribution.Mis_2.map((v,i)=>{
				return [t.distribution.s_2[i], t.distribution.Mis_2[i]]
			})
			
			
			// A single line is drawn for these.
			let custom_line = {level: "aerofoil", points: side1.concat(side2.reverse()), color: "cornflowerblue"};

			
			// calculate the extents
			t.distribution.lineconfig = custom_line;
			
			[t.distribution.lineconfig].forEach(line=>{
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
		
		
		
		
		let xVariable = new variableobj({name: "s", extent: x_extent});
		let yVariable = new variableobj({name: "Mis", extent: y_extent});
		

		// First update the menu current selection, so that whenthe items are updated the current option will be automatically assigned.
		obj.svgobj.x.menu.current = xVariable;
		obj.svgobj.y.menu.current = yVariable;

		obj.svgobj.x.update( [xVariable] );
		obj.svgobj.y.update( [yVariable] );
		
	} // updatedata
	
	
	
	
	getcolor(d, defaultcolor){
		let obj = this;
		return obj.selecteddatum == d ? "orange" : defaultcolor;
	}
	
	

	draw(d){
		// This draws all lines, and highlights a specific one if asked for it.
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
		
		
		
			
		let lines = d3.select(obj.node)
		  .select("g.data")
		  .selectAll("path")
		  .data( obj.tasks )
		  
		// First exit.
		lines.exit().remove();

		// Then update
		lines
		  .attr("d", d=>getpath(d.distribution.lineconfig))
		  .attr("stroke", d=>obj.getcolor(d, d.distribution.lineconfig.color))
		  
		  
		// Finally add new lines.
		lines.enter()
		  .append("path")
			.attr("stroke-width", 2)
			.attr("stroke",  d=>obj.getcolor(d, d.distribution.lineconfig.color))
			.attr("fill", "none")
			.attr("d", d=>getpath(d.distribution.lineconfig) )
			.on("mouseenter", (e,d)=>{
				// Place a label next to the target.
				obj.highlight([d])
				obj.onitemmouseover(d);
			})
			.on("mouseout", (e,d)=>{
				obj.unhighlight();
				obj.onitemmouseout();
			})
			.on("click", (e,d)=>{
				obj.selecteddatum = obj.selecteddatum == d ? undefined : d;
				obj.update();
				obj.onitemselected( obj.selecteddatum );
			})

		
		
	} // draw
	
	
	
	highlight(selected){
		let obj = this;
		
		let alllines = d3.select(obj.node)
		  .select("g.data")
		  .selectAll("path")
		  .attr("stroke",  d=>obj.getcolor(d, "gainsboro"))
		  .attr("stroke-width", 2)
		
		let selectedlines = alllines
		  .filter(d=>selected.includes(d))
		  .attr("stroke",  d=>obj.getcolor(d, d.distribution.lineconfig.color))
		  .attr("stroke-width", 4)
		  .raise()
	} // highlight
	
	
	unhighlight(){
		let obj = this;
		
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll("path")
		  .attr("stroke",  d=>obj.getcolor(d, d.distribution.lineconfig.color))
		  .attr("stroke-width", 2)
	} // highlight
	
	
	setdatum(selecteddatum){
		let obj = this;
		
		obj.selecteddatum = selecteddatum;
		
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll("path")
		  .filter(d=>selecteddatum==d)
		  .attr("stroke",  d=>obj.getcolor(d, d.distribution.lineconfig.color))
		  .attr("stroke-width", 4)
		  .raise()
	} // setdatum
	
	
	onitemmouseover(d){
		// dummy function.
	} // onitemmouseover
	
	
	onitemmouseout(d){
		// dummy function.
	} // onitemmouseover
	
	onitemselected(d){
		// dummyfunction
	}
	
	
} // linedistributionplot


















