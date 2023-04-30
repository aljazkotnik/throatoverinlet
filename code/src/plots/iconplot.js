// Super class.
import plotframe from "./plotframe.js";


import {svg2element, ScaleLinear} from "../support/helpers.js";
import TriangleIconGroup from "./components/TriangleIconGroup.js";
import RadialIconGroup from "./components/RadialIconGroup.js";



// Generate markers to be used by all subcomponents.
const generatorMarker = function(aspectRatio, size, name, color){
	return `<marker
          id="${ name }"
          viewBox="0 0 ${ aspectRatio*5 } 5"
          refX="${ aspectRatio*5 }"
          refY="2.5"
          markerWidth="${ size }"
          markerHeight="${ size }"
          orient="auto-start-reverse">
          shape-rendering="auto"
          <path fill="${ color }" d="M 0 0 L ${ aspectRatio*5 } 2.5 L 0 5 z" />
     </marker>`
} // generatorMarker



// The template can now hold one inset per div let's say. Maybe here I want to include a modelInputVariableSelectionInset and a twoInteractiveAxesInset. The drawing on the svg should be implemented here.
let template = `
<svg width=400 height=400>
  <defs>
    <!-- Markers to be used as an arrowhead -->
    ${ generatorMarker( 2, 10, "arrow-cornflowerblue", "cornflowerblue" ) }
	${ generatorMarker( 2, 10, "arrow-orange", "orange" ) }
    ${ generatorMarker( 2, 10, "arrow-gainsboro", "gainsboro" ) }	
  </defs>
  
  <g class="background"></g>
  <g class="current"></g>
  <g class="lastselected"></g>
  
</svg>
`


export default class iconplot extends plotframe{
	
	width = 400
	
	accessor = function(){}
	data = {
		current: undefined,
		datum: undefined,
		tasks: undefined
	}
	lastselected = undefined
	
	facets = [1,1,1]
	
	
	constructor(data){
		super();
		let obj = this;
		
		// Data is a dataStorage item.
		obj.data = data;
		
		
		
		// Append the plot backbone.
		obj.svg = svg2element(template);
		let container = obj.node.querySelector("div.card-body");
		container.appendChild( obj.svg );

		
		// The scales. All scales need to have a unit aspect ratio of 1. This should be determined here. So scales can be made inside, but domains are governed from here.
		let scales = obj.scales(obj.facets)
		
		

		obj.inlet = new TriangleIconGroup( obj.data, task=>task.icons.inlet, v=>-5, v=>-5 );
		obj.svg.querySelector("g.background").appendChild( obj.inlet.node );
		
		obj.radial = new RadialIconGroup( obj.data, task=>task.icons.radial, v=>-5, v=>-5 )
		obj.svg.querySelector("g.background").appendChild( obj.radial.node );
		
		obj.outlet = new TriangleIconGroup( obj.data, task=>task.icons.outlet, v=>-5, v=>-5 );
		obj.svg.querySelector("g.background").appendChild( obj.outlet.node );
		
		
		function coordinating(selected){
			obj.data.setcurrent(selected);
			obj.data.repaint();
		} // coordinating
		obj.inlet.onmouseenter = coordinating;
		obj.radial.onmouseenter = coordinating;
		obj.outlet.onmouseenter = coordinating;


		function selectdatum(selected){
			obj.data.selecttask(selected);
			obj.data.repaint();
		} // selectdatum
		obj.inlet.onclick = selectdatum;
		obj.radial.onclick = selectdatum;
		obj.outlet.onclick = selectdatum;
		
		
		// Change the initial title
		obj.node.querySelector("input.card-title").value = "Icons";

		console.log(obj)
	} // constructor
	
	// A function to partition hte plot and return coherent scales.
	scales(widths){
		let obj = this;
		
		// Partition the plot into facets, and create corresponding scales. There will be three facets by default, and the first and third need to have a consistent y scale.
		
		let w = 400;
		let h = 400;
		let margin = 10;
		let dw = w/widths.reduce((a,v)=>a+v,0);
		
		
		
		

		
		
		// Calculate the value/pixel for all 4 axes that need to be coordinated.
		let facetwidths = [widths[0]*dw-2*margin, widths[2]*dw-2*margin, h-2*margin]
		let domains = obj.data.subset.value.reduce((acc,t)=>{
			acc[0][0] = Math.min( acc[0][0], t.icons.inlet.Vx);
			acc[0][1] = Math.max( acc[0][1], t.icons.inlet.Vx);
			
			acc[1][0] = Math.min( acc[1][0], t.icons.outlet.Vx);
			acc[1][1] = Math.max( acc[1][1], t.icons.outlet.Vx);
			
			acc[2][0] = Math.min( acc[2][0], t.icons.inlet.Vtheta-t.icons.inlet.U, t.icons.outlet.Vtheta-t.icons.outlet.U);
			acc[2][1] = Math.max( acc[2][1], t.icons.inlet.Vtheta, t.icons.outlet.Vtheta);
			
			
			// radial - here just the maximum value is needed.
			acc[3] = Math.max( acc[3], t.icons.radial );
			
			return acc
		},[
		   [0, Number.NEGATIVE_INFINITY],
		   [0, Number.NEGATIVE_INFINITY],
		   [0, Number.NEGATIVE_INFINITY],
		   Number.NEGATIVE_INFINITY
		]);
		
		
		
		// Calculate the value per pixel, and select the smallest one.
		let valPerPx = Math.max( ...[0,1,2].map(i=>(domains[i][1]-domains[i][0])/facetwidths[i]) );
		
		
		
		// Now re-establish the domains. Make the data centered.
		let xdomainin = [
			(domains[0][0] + domains[0][1])/2 - 1/2*valPerPx*widths[0]*dw,
			(domains[0][0] + domains[0][1])/2 + 1/2*valPerPx*widths[0]*dw,
		]
		let xdomainout = [
			(domains[1][0] + domains[1][1])/2 - 1/2*valPerPx*widths[2]*dw,
			(domains[1][0] + domains[1][1])/2 + 1/2*valPerPx*widths[2]*dw,
		]
		let ydomain = [
		    (domains[2][0] + domains[2][1])/2 - 1/2*valPerPx*h,
			(domains[2][0] + domains[2][1])/2 + 1/2*valPerPx*h,
		]
		
		
		
		let sum = 0;
		let ranges = widths.map((v,i)=>{
			sum += v*dw
			return [ sum - v*dw + margin, sum - margin]
		})
		
		// Scales for the triangles
		let inletxscale = new ScaleLinear();
		inletxscale.range = ranges[0];
		inletxscale.domain = xdomainin;

		let outletxscale = new ScaleLinear();
		outletxscale.range = ranges[2];
		outletxscale.domain = xdomainout;

		let yscale = new ScaleLinear();
		yscale.range = [0,h];
		yscale.domain = ydomain;
		
		
		
		// Scales for the radial contraction icon. This should be easier, no need to coordinate anything.
		let radialxscale = new ScaleLinear();
		radialxscale.range = ranges[1];
		radialxscale.domain = [0,1]; // flags for inlet/outlet
		
		let radialyscale = new ScaleLinear();
		radialyscale.range = [h/4,3*h/4];
		radialyscale.domain = [-domains[3], domains[3]]; // flags for inlet/outlet

		// Scales for the radial contraction icon.
		return {
			inlet: {
				x: inletxscale,
				y: yscale
			},
			radial: {
				x: radialxscale,
				y: radialyscale
			},
			outlet: {
				x: outletxscale,
				y: yscale
			}
		} // scales
		
		
	} // scales
	
	repaint(){
		// This is called when the datum design, or the currently inspected designs change.
		let obj = this;
		
		obj.inlet.repaint();
		obj.radial.repaint();
		obj.outlet.repaint();
		
	} // repaint
	
	
	// When is this update actually called??
	draw(){
		// Called when subset is changed
		let obj = this;
		obj.inlet.update();
		obj.radial.update();	
		obj.outlet.update();
	} // update
	
	update(){
		// Called upon being added to the DOM
		let obj = this;
	} // update
	

    updatedata(){
		// When the data is updated the scales need to be redone, and reassigned.
		let obj = this;
		
		let scales = obj.scales(obj.facets);
		
		obj.inlet.xscale = function(v){return scales.inlet.x.val2px(v)};
		obj.inlet.yscale = function(v){return scales.inlet.y.val2px(v)};
		
		obj.radial.xscale = function(v){return scales.radial.x.val2px(v)};
		obj.radial.yscale = function(v){return scales.radial.y.val2px(v)};
		
		obj.outlet.xscale = function(v){return scales.outlet.x.val2px(v)};
		obj.outlet.yscale = function(v){return scales.outlet.y.val2px(v)};
		
		obj.inlet.update();
		obj.radial.update();
		obj.outlet.update();
	} // updatedata
	
	// Should the insets have a g that is on top of everything, and on interactions copy the triangle there? That shouldn't destroy the interactions either I think.
	
	

	
} // iconplot








