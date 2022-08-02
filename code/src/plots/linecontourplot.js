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
	data = {
		current: undefined,
		datum: undefined,
		tasks: undefined
	}
	lastselected = undefined
	
	constructor(data){
		super();
		let obj = this;
		obj.data = data;
		
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
	
	update(){
		// Update this plot.
		let obj = this;
		
		obj.svgobj.update();
		obj.draw();
	} // update
	

    updatedata(){
		let obj = this;


		let xVariable = new variableobj({name: "x", extent: obj.data.extent.contour.x});
		let yVariable = new variableobj({name: "y", extent: obj.data.extent.contour.y});
		

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
		
		obj.drawcurrent();
		obj.drawdatum();
		
	} // draw
	
	
	drawcurrent(){
		let obj = this;
		
		
		
		if(obj.data.current){
			obj.lastselected = obj.data.current;
		} // if
		
		if(obj.lastselected){

			// Display the name in the title.
			obj.node.querySelector("input.card-title").value = obj.lastselected.metadata.name[0];
		


			let lines = d3.select(obj.node)
			  .select("g.data")
			  .selectAll("path")
			  .data( obj.lastselected.contour.lineconfigs )
			  
			// First exit.
			lines.exit().remove();

			// Then update
			lines
			  .attr("d", d=>obj.getpath(d))
			  .attr("stroke", d=>d.color)
			  
			  
			// Finally add new lines.
			lines.enter()
			  .append("path")
				.attr("stroke-width", 1)
				.attr("stroke", d=>d.color)
				.attr("fill", "none")
				.attr("d", d=>obj.getpath(d) )
				.on("mouseenter", (e,d)=>{
					e.target.setAttribute("stroke-width", 2)
					console.log("show tooltip")
				})
				.on("mouseout", (e,d)=>{
					e.target.setAttribute("stroke-width", 1)
				}) // on
		} // if
			
	} // drawcurrent
	
	
	drawdatum(){
		// This should only draw a very specific item. But the config is precomputed anyway.
		let obj = this;
		
		
		if(obj.data.datum){
				
			let lines = d3.select(obj.node)
			  .select("g.datum")
			  .selectAll("path")
			  .data( obj.data.datum.contour.lineconfigs )
			  
			// First exit.
			lines.exit().remove();

			// Then update
			lines
			  .attr("d", d=>obj.getpath(d))
			  .attr("stroke", d=>"orange")
			  
			  
			// Finally add new lines.
			lines.enter()
			  .append("path")
				.attr("stroke-width", 1)
				.attr("stroke", d=>"orange")
				.attr("fill", "none")
				.attr("d", d=>obj.getpath(d) )
				
			
		} else {
			d3.select(obj.node)
			  .select("g.datum")
			  .selectAll("path")
			  .remove()
		} // if
		
		
	} // drawdatum
	
} // linecontourplot








