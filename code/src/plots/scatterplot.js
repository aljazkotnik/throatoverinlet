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
	<div class="scatterplot"></div>
</div>
`






export default class scatterplot extends plotframe{
	width = 400
	
	constructor(data){
		super();
		let obj = this;
		obj.data = data;
		
		// Append the plot backbone.
		let container = obj.node.querySelector("div.card-body");
		container.appendChild(html2element(template));

		
		// Add a scatterplot inset. When initialising already pass in the card size.
		obj.svgobj = new twoInteractiveAxesInset([]);
		container.querySelector("div.scatterplot").appendChild(obj.svgobj.node);
		obj.svgobj.onupdate = function(){
			obj.refresh();
		}; // function
		
		
				// Change the initial title
		obj.node.querySelector("input.card-title").value = "Scatterplot";


	} // constructor
	
	update(){
		// Update this plot.
		let obj = this;
		
		obj.svgobj.update();
		
		obj.refresh();
	} // update
	
	
	updatedata(){
		let obj = this;
		
		let variables = obj.data.variablenames
		  .map(name=>{
			  return new variableobj( {
				  name: name,
				  extent: d3.extent(obj.data.tasks, t=>t.metadata[name])
			  } )// new variableobj
		  });
		
		obj.svgobj.update( variables );
		obj.draw();
	} // updatedata
	

    
	getcolor(d, defaultcolor){
		let obj = this;
		
		// Just add in a condition that if the point is outside of the filter it should be gainsboro.
		
		let c = obj.data.current ? obj.data.current==d ? defaultcolor : "gainsboro" : defaultcolor
		c = obj.data.datum == d ? "orange" : c
		
		return c;
	} // getcolor


	// Create teh actual SVG elements.
	draw(){
		// config:  data, gclass, color, showline.
		let obj = this;
		
			
		let circles = d3.select(obj.node)
		  .select("g.data")
		  .selectAll("circle")
		  .data( obj.data.subset.value )
		
		// First exit.
		circles.exit().remove();

		// Finally add new circles.
		circles.enter()
		  .append("circle")
			.attr("r", 5)
			.attr("cx", -10)
			.attr("cy", -10)
			.on("mouseenter", (e,d)=>{
				// obj.data.current = d;
				obj.data.setcurrent(d);
				obj.data.repaint();
			})
			.on("mouseout", (e,d)=>{
				// obj.data.current = undefined;
				obj.data.setcurrent(undefined);
				obj.data.repaint();
				
			})
			.on("click", (e,d)=>{
				// obj.data.datum = obj.data.datum == d ? undefined : d;
				obj.data.selecttask(d);
				obj.data.repaint();
			})
		
		obj.refresh();
	
	} // draw
	
	
	// Try to implement a smaller update possibility to try and improve interactivity.
	repaint(){
		let obj = this;
		
		
		let circles = d3.select(obj.node)
			  .select("g.data")
			  .selectAll("circle")
			  
		circles.attr("fill", d=>obj.getcolor(d, "cornflowerblue"));
		
		// If there is a current element selected it should be raised.
		if(obj.data.current || obj.data.datum){
			circles
			  .filter(d=>[obj.data.current, obj.data.datum].includes(d))
			  .each((d,i,el)=>{
				// When the element is raised it is repositioned the mouseout etc events to be triggered...
				el[0].parentElement.insertBefore(el[0],null)
			  })
		} // if	
		
	} // repaint
	
	
	// Reposition and repaint the circles.
	refresh(){
		let obj = this;
		
		if( obj.svgobj.isConfigured ){
		
			let xaxis = obj.svgobj.x;
			let yaxis = obj.svgobj.y;
			
			d3.select(obj.node)
			  .select("g.data")
			  .selectAll("circle")
			  .attr("cx", d=>xaxis.getdrawvalue(d.metadata) )
			  .attr("cy", d=>yaxis.getdrawvalue(d.metadata) ); 
			  
			obj.repaint();
		} // if
	} // refresh
	
	
	
	
	
} // scatterplot