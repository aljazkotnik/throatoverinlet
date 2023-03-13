import {html2element} from "../support/helpers.js";
import * as d3 from "d3";


// Super class.
import plotframe from "./plotframe.js";

// Inset components.
import HistogramInset from "./components/HistogramInset.js";
import variableobj from "./components/variableobj.js";



let template = `
<div style="width: 400px; background-color: white;">
	<div class="histogram"></div>
</div>
`



export default class histogram extends plotframe{
  width = 400

  constructor(data){
	super();
	let obj = this;
	obj.data = data;
	
	
	// Object to calculate the histgoram.
    obj.histogram = d3.histogram();
	obj.bins = [];
	
	
	// Append the plot backbone.
	let container = obj.node.querySelector("div.card-body");
	container.appendChild(html2element(template));

	
	// Add a histogram inset. When initialising already pass in the card size.
	obj.svgobj = new HistogramInset();
	container.querySelector("div.histogram").appendChild(obj.svgobj.node);
	obj.svgobj.x.onupdate = function(){
		obj.updatebins();
		obj.draw();
		obj.repaint();
	}; // function
	obj.svgobj.y.onupdate = function(){
		obj.refresh();
	} // function
	
	
	
	// Change the initial title
	obj.node.querySelector("input.card-title").value = "Histogram";
	  
  } // constructor
  
  update(){
	let obj = this;
	obj.svgobj.update();
	obj.refresh();
  } // update
  

  updatedata(){
	// Launch if the global data changes -> new variables are needed.
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
  
  
  updatebins(){
	let obj = this;
	
	let x = obj.svgobj.x;
    let y = obj.svgobj.y;
	
	let thresholds = Array( x.nbins+1 ).fill().map((el,i) =>{
		return x.domain[0]*(x.nbins-i)/x.nbins + x.domain[1]*i/x.nbins;
	})
	obj.histogram
      .value(function(d) { return d.metadata[x.variable.name]; })
      .domain(x.domain)
      .thresholds( thresholds );
	  
	// d3.thresholdFreedmanDiaconis(values, min, max)
	  
	
	
	// All bins should be calculated here, as it onlz depends on the overall data. Subset bins are calculated here to allow ???
	obj.allbins = obj.histogram( obj.data.tasks );
	obj.bins = obj.histogram( obj.data.subset.value );
	
	
	// The y-axis depends on the bins, so it needs to be updated here.
	y.setdomain([ 0, d3.max(obj.allbins, b=>b.length) ]);
	y.ticks = Array(y.domain[1]+1).fill().map((v,i)=>i);
	y.draw();
	
  } // updatebins
  
  
  draw(){
	let obj = this;
	
	obj.makeRects( obj.allbins,"outline","gainsboro" );
	obj.updateRects( "outline" );
	
	
	obj.makeRects( obj.bins,"active","cornflowerblue" );
	obj.refresh();
	
  } // draw
  
  
  makeRects(data,name,color){
	let obj = this;
	
	let x = obj.svgobj.x.scale;
	let y = obj.svgobj.y.scale;
	
	let rects = d3.select(obj.node)
	  .select("g.data")
	  .selectAll(`rect.${name}`)
	  .data( data );
	  
	rects.exit().remove();
	
	rects.enter()
	  .append("rect")
	    .attr("class", name)
	    .attr("x", b=>x(b.x0) )
		.attr("y", b=>y(0) )
		.attr("width", b=>Math.max( x(b.x1)-x(b.x0)-1,0 ))
		.attr("height", b=>0)
		.attr("fill", color)
		
  } // makeRects
  
  
  updateRects(name){
	let obj = this;
	
	if( obj.svgobj.isConfigured ){
		
		let x = obj.svgobj.x.scale;
		let y = obj.svgobj.y.scale;
		
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll(`rect.${ name }`)
		    .transition()
		    .attr("x", b=>x(b.x0) )
			.attr("y", b=>y(b.length) )
			.attr("width", b=>Math.max( x(b.x1)-x(b.x0)-1,0 ))
			.attr("height", b=>y(0) - y(b.length))
	} // if
	
	
  } // updateRects
  
  
  
  
  
  refresh(){
	let obj = this;
	
	obj.bins = obj.histogram( obj.data.subset.value );
		
	d3.select(obj.node)
	  .select("g.data")
	  .selectAll("rect.active")
	  .data( obj.bins )
		    
	obj.updateRects("active")
	
  } // refresh

  repaint(){
	// Repaint is called as part of the global update, as for the sctterplot it's sufficient to reapply colors when filtering. But for the histogram the underlying data must be recalculated.
	let obj = this;
	obj.refresh();
  
  } // repaint
  
} // histogram













