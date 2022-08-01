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
	tasks = []
	
	constructor(){
		super();
		let obj = this;
		
		
		// Append the plot backbone.
		let container = obj.node.querySelector("div.card-body");
		container.appendChild(html2element(template));

		
		// Add a scatterplot inset. When initialising already pass in the card size.
		obj.svgobj = new twoInteractiveAxesInset([]);
		container.querySelector("div.scatterplot").appendChild(obj.svgobj.node);
		obj.svgobj.onupdate = function(){
			obj.draw( obj.drawdata );
		}; // function
		
		
				// Change the initial title
		obj.node.querySelector("input.card-title").value = "Metadata";


	} // constructor
	
	update(tasks){
		// Update this plot.
		let obj = this;
		
		
		let variables;
		if(tasks){
			obj.tasks = tasks;
			
			// `dr' and `name' are the only allowed strings.
			variables = Object.getOwnPropertyNames( tasks[0].metadata )
			  .filter(name=>!["dr", "name"].includes(name))
			  .map(name=>{
				  return new variableobj( {
					  name: name,
					  extent: d3.extent(obj.tasks, t=>t.metadata[name])
				  } )// new variableobj
			  });
		} // if
		
		
		obj.svgobj.update( variables );
		
		obj.draw( obj.drawdata );
	} // update
	
	
	
	
	get drawdata(){
		// drawdata is different from the rest of the data in that it contains the model results.
		let obj = this;
		
		
		// Configure all the series that need to be drawn.
		let config = [
			{data: obj.svgobj.isConfigured ? obj.tasks : [], gclass: "data"},
		];
		
		return config
	} // drawdata

    
	getcolor(d, defaultcolor){
		let obj = this;
		return obj.selecteddatum == d ? "orange" : defaultcolor;
	}


	draw(config){
		// config:  data, gclass, color, showline.
		let obj = this;
		
		
		
		
		let xaxis = obj.svgobj.x;
		let yaxis = obj.svgobj.y;
		
		config.forEach(c=>{
			
			
			function getcolor(d){
				
			} // getcolor
			
			
			let circles = d3.select(obj.node)
			  .select(`g.${ c.gclass }`)
			  .selectAll("circle")
			  .data( c.data )
			
			// First exit.
			circles.exit().remove();

			// Then update
			circles
			  .attr("fill", d=>obj.getcolor(d, "cornflowerblue"))
			  .attr("cx", d=>xaxis.getdrawvalue(d.metadata) )
			  .attr("cy", d=>yaxis.getdrawvalue(d.metadata) );
			
			// Finally add new circles.
			circles.enter()
			  .append("circle")
			    .attr("r", 5)
			    .attr("fill", d=>obj.getcolor(d, "cornflowerblue"))
			    .attr("cx", d=>xaxis.getdrawvalue(d.metadata) )
			    .attr("cy", d=>yaxis.getdrawvalue(d.metadata) )
				.on("mouseenter", (e,d)=>{
					obj.highlight([d]);
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
		}) // forEach
		
		  
		
		
	} // draw
	
	
	highlight(selected){
		let obj = this;
		
		
		let allpoints = d3.select(obj.node)
		  .select("g.data")
		  .selectAll("circle")
		  .attr("r", 5)
		  .attr("fill", d=>obj.getcolor(d, "gainsboro"))
		
		let selectedpoints = allpoints
		  .filter(d=>selected.includes(d))
		  .attr("r", 5)
		  .attr("fill", d=>obj.getcolor(d, "cornflowerblue"))
		  .raise()
	} // highlight
	
	
	unhighlight(){
		let obj = this;
		
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll("circle")
		  .attr("r", 5)
		  .attr("fill", d=>obj.getcolor(d, "cornflowerblue"))
	} // highlight
	
	
	setdatum(selecteddatum){
		let obj = this;
		
		obj.selecteddatum = selecteddatum;
		
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll("circle")
		  .filter(d=>selecteddatum==d)
		  .attr("fill",  d=>obj.getcolor(d, "cornflowerblue"))
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
	
} // scatterplot