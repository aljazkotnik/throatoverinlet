/*
A general inset with only one interactive axes, which is the horizontal axis.
*/
import {html2element} from "../../support/helpers.js";
import StaticOrdinalAxis from "./StaticOrdinalAxis.js";
import ordinalAxis from "./ordinalAxis.js";


// Zooming is required.
import * as d3 from "d3";


/*
background: elements for background functionality (e.g. zoom rectangle)
data      : primary data representations
markup    : non-primary data graphic markups, (e.g. compressor map chics) 
x/y-axis  : x/y axis elements
exponent  : power exponent (big number labels may overlap otherwise)
*/


let template = `
<div style="position: relative;">
	<svg class="plot-area" width="400" height="400">
		
		<g class="background">
			
			<g class="tooltip-anchor">
				<circle class="anchor-point" r="1" opacity="0"></circle>
			</g>
		</g>
		
		
		<g class="datum"></g>
		<g class="data"></g>
		<g class="markup"></g>
		<g class="axes"></g>
		
		
	</svg>
	
	<div class="variable-select-menus"></div>
	
</div>
`;



/*
The histogram inset is a modification of teh two interactive axis inset. Firstly, the y-axis is made to be static. Secondly, the domain increase functionality needs to be ammended to change the number of bins instead of changing the actual domain.
*/

export default class HistogramInset{
  width = 400
  height = 400
  
  constructor(){
	let obj = this;
	obj.node = html2element(template);
	  
	  
	// Make the axis objects, and connect them to the menu selection.
	// `obj.plotbox' specifies the area of the SVG that the chart should be drawn to.
	// Variables must be set later.
	obj.y = new StaticOrdinalAxis("y", obj.plotbox);
	obj.x = new ordinalAxis("x", obj.plotbox);
		
	let axisContainer = obj.node.querySelector("g.axes");
	axisContainer.appendChild(obj.y.node);
	axisContainer.appendChild(obj.x.node);
		
	let menuContainer = obj.node.querySelector("div.variable-select-menus");
	menuContainer.appendChild(obj.x.menu.node);
		
		
	
	obj.x.nbins = 10;
	obj.x.plusdomain = function(){
		obj.x.nbins += 1;
	} // plusdomain
	obj.x.minusdomain = function(){
		// Make sure the number of bins is above 0.
		obj.x.nbins = Math.max( obj.x.nbins-1, 1 );
	} // plusdomain
	  
	  
  } // constructor
  
  
  update(variables){
	let obj = this;
	obj.x.update( variables );
	obj.y.update();
  } // update
  
  get plotbox(){
	// Specify the area of the svg dedicated to the plot. In this case it'll be all of it. The margin determines the amount of whitespace around the plot. This whitespace will NOT include the axis labels etc.
	let obj = this;
	let margin = {top: 0, right: 0, bottom: 0, left: 0};
		
	// If the inset was not yet attached the getBoundingClientRect will return an empty rectangle. Instead, have this inset completely control the width and height of hte svg.
	// let svgrect = obj.node.getBoundingClientRect();
	let plot = {
	  x: [margin.left, obj.width - margin.left - margin.right], 
	  y: [margin.top , obj.height- margin.top  - margin.bottom]
	}
	return plot
		
  } // plotbox
	
	
  get isConfigured(){
	let obj = this;
		
	// At the beginning the plot starts empty.
	return (
	  (obj.x.variable.name != undefined)
	);
  } // isConfigured
  
} // HistogramInset




















