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
	data = {
		current: undefined,
		datum: undefined,
		tasks: undefined
	}
	
	constructor(data){
		super();
		let obj = this;
		obj.data = data;
		
		// Append the plot backbone.
		let container = obj.node.querySelector("div.card-body");
		container.appendChild(html2element(template));

		
		// Add a linedistributionplot inset. When initialising already pass in the card size.
		obj.svgobj = new twoInteractiveAxesInset([]);
		container.querySelector("div.linedistributionplot").appendChild(obj.svgobj.node);
		obj.svgobj.onupdate = function(){
			obj.refresh();
		}; // function
		


		// Change the title
		obj.node.querySelector("input.card-title").value = "Distributions";
		

	} // constructor
	
	update(tasks){
		// Update this plot.
		let obj = this;
		
		obj.svgobj.update();
		obj.refresh();
	} // update
	

    updatedata(){
		let obj = this;
		
		
		let xVariable = new variableobj({name: "s", extent: obj.data.extent.distribution.x});
		let yVariable = new variableobj({name: "Mis", extent: obj.data.extent.distribution.y});
		

		// First update the menu current selection, so that whenthe items are updated the current option will be automatically assigned.
		obj.svgobj.x.menu.current = xVariable;
		obj.svgobj.y.menu.current = yVariable;

		obj.svgobj.x.update( [xVariable] );
		obj.svgobj.y.update( [yVariable] );
		
		
		obj.draw();
	} // updatedata
	
	
	
	
	getcolor(d, defaultcolor){
		let obj = this;
		
		// If a current is prescribed, then any other ones should be gray.
		// If a current is prescribed
		
		let c = obj.data.current ? obj.data.current==d ? defaultcolor : "gainsboro" : defaultcolor
		c = obj.data.datum == d ? "orange" : c
		
		return c;
	} // getcolor
	
	
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
		// This just creates the lines, and removes redundant ones. The updating is done in refresh.
		let obj = this;
		
		if(obj.data.tasks){
			let lines = d3.select(obj.node)
			  .select("g.data")
			  .selectAll("path")
			  .data( obj.data.tasks )
			  
			// First exit.
			lines.exit().remove();

			// Finally add new lines.
			lines.enter()
			  .append("path")
				.attr("stroke-width", 2)
				.attr("fill", "none")
				.on("mouseenter", (e,d)=>{
					// Place a label next to the target.
					obj.data.current = d;
					// When the element is raised it is repositioned the mouseout etc events to be triggered...
					e.target.parentElement.insertBefore(e.target,null)
					obj.data.globalupdate();
					
				})
				.on("mouseout", (e,d)=>{
					obj.data.current = undefined;
					obj.data.globalupdate();
				})
				.on("click", (e,d)=>{
					obj.data.datum = obj.data.datum == d ? undefined : d;
					obj.data.globalupdate();
				})

			

			obj.refresh();
		} // if
	} // draw
	
	
	refresh(){
		let obj = this;
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll("path")
		  .attr("d", d=>obj.getpath(d.distribution.lineconfig))
		  .attr("stroke", d=>obj.getcolor(d, d.distribution.lineconfig.color))
	} // refresh
	
	
	
	
} // linedistributionplot


















