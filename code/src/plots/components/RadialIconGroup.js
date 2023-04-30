import { svg2element } from "../../support/helpers.js";

/*Should this be a separate plot maybe? And a plot that allows interactions? So it shows all the triangles, and all the radial contractions, and it allows the user to select using it? */


export default class RadialIconGroup {

  // This class should also display two designs at teh same time, using hte same color scheme (or similar) as the contour plot.
  
  // This is just an icon subplot, and it may be hosted on hte same svg with other subplots. Therefore it is drawn into a prescribed box.
  
  icons = []
  
  constructor(data, accessor, xscale, yscale){
    let obj = this;

    obj.data = data;
	obj.accessor = accessor;
    
	// Calculate the scale to use for drawing.
	obj.xscale = xscale;
    obj.yscale = yscale;

	
	// The translate is required to allow the plot to be drawn with a single scale.
    obj.node = svg2element( `<g>
	  <text class="cornflowerblue" fill="cornflowerblue" text-anchor="middle" x=-10 y=-10></text>
	  <text class="orange" fill="orange" text-anchor="middle" x=-10 y=-10></text>
	</g>` )

    
  } // constructor


  update(){
	// redraw the triangles.
	let obj = this;
	
	// First remove all existing triangles.
	obj.remove();
	
	
	// Now create new ones.
	obj.icons = obj.data.subset.value.map(function(task){
		let icon = new RadialIcon( task, obj.accessor, obj.xscale, obj.yscale );
		obj.node.appendChild( icon.node );
		icon.node.onmouseenter = function(){
			obj.onmouseenter( task )
		} // onmouseenter
		return icon
	})
	
	
	obj.node.querySelector("text.cornflowerblue").setAttribute("x", obj.xscale(0.5))
	obj.node.querySelector("text.cornflowerblue").setAttribute("y", obj.yscale(0) - 15)
	
	obj.node.querySelector("text.orange").setAttribute("x", obj.xscale(0.5))
	obj.node.querySelector("text.orange").setAttribute("y", obj.yscale(0) + 15)
	
  } // update


  repaint(){
    let obj = this;
    
	obj.node.querySelector(`text.orange`).textContent = "";
	obj.node.querySelector(`text.cornflowerblue`).textContent = "";
	
    obj.icons.forEach(function(t){
		// If design is current it should be in blue, if datum orange, and if not gainsboro.
		let color = "gainsboro";
		let textflag = false;
		
		if(t.task==obj.data.current || t.task==obj.data.datum){
			color = t.task==obj.data.current ? "cornflowerblue" : "orange";
			obj.node.querySelector(`text.${color}`).textContent = obj.accessor(t.task).toFixed(3);
			t.node.parentElement.insertBefore(t.node,null)
		} // if
		
		t.highlight(color)
	})

	/* For an array of selected tasks
	obj.icons.filter(t=>selected.includes(t.task)).forEach(function(t){
      t.highlight("black", true);
	  t.node.parentElement.insertBefore(t.node,null)
    })
	*/	
	
    
  } // repaint
  
  
  remove(){
	let obj = this;
	obj.icons.forEach(function(t){
		t.remove();
	}) // forEach
	obj.icons = []
  } // remove
  
  // Dummy
  onmouseenter(selected){} // onmouseenter
  
} // RadialIconGroup







function numformat(v){ return parseFloat(v.toFixed(3)) }


class RadialIcon{
	
	// Horizontal spacing between the U and Vtheta lines.
	spacing = 3
	
	constructor(task, accessor, xscale, yscale){
		let obj = this;
		obj.task = task;
		
		let d = accessor(obj.task);
		
		
		obj.node = svg2element(`<path
			fill="none" stroke="gainsboro" stroke-width="2"
			d="
			M${ xscale(0) } ${ yscale(-1) }
			L${ xscale(0) } ${ yscale( 1) }
			L${ xscale(1) } ${ yscale( d ) }
			L${ xscale(1) } ${ yscale(-d) }
			L${ xscale(0) } ${ yscale(-1) }"
		></path>`.replace(/[\n\r]+/g, ' '));
		
		
	} // constructor
	
	highlight(color, textflag){
		let obj = this;
        obj.node.style.stroke = color;
	} // repaint
	
	remove(){
		this.node.remove()
	} // remove

} // RadialIcon