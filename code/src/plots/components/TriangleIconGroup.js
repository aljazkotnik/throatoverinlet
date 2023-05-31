import { svg2element } from "../../support/helpers.js";

/*Should this be a separate plot maybe? And a plot that allows interactions? So it shows all the triangles, and all the radial contractions, and it allows the user to select using it? */


export default class TriangleIconGroup {

  // This class should also display two designs at teh same time, using hte same color scheme (or similar) as the contour plot.
  
  // This is just an icon subplot, and it may be hosted on hte same svg with other subplots. Therefore it is drawn into a prescribed box.
  
  triangles = []
  
  constructor(data, accessor, xscale, yscale){
    let obj = this;

    obj.data = data;
	obj.accessor = accessor;
    
	// Calculate the scale to use for drawing.
	obj.xscale = xscale;
    obj.yscale = yscale;

	
	// The translate is required to allow the plot to be drawn with a single scale.
    obj.node = svg2element( `<g></g>` )

    
  } // constructor


  update(){
	// redraw the triangles.
	let obj = this;
	
	// First remove all existing triangles.
	obj.remove();
	
	
	// Now create new ones.
	obj.triangles = obj.data.subset.value.map(function(task){
		let triangle = new TriangleIcon( task, obj.accessor, obj.xscale, obj.yscale );
		obj.node.appendChild( triangle.node );
		
		triangle.node.onmouseenter = function(){ obj.onmouseenter( task ) } // onmouseenter
		triangle.node.onclick = function(){ obj.onclick(task) } // onclick
		
		return triangle
	})
	
	
	
  } // update


  repaint(selected){
    let obj = this;
    
    obj.triangles.forEach(function(t){
		let color = "gainsboro";
		let textflag = false;
		
		if(t.task==obj.data.current || t.task==obj.data.datum){
			color = t.task==obj.data.current ? "cornflowerblue" : "orange";
			t.node.parentElement.insertBefore(t.node,null)
			textflag = t.task==obj.data.current;
		} // if
		
		t.highlight(color, textflag)
	})

	/*
	obj.triangles.filter(t=>selected.includes(t.task)).forEach(function(t){
      t.highlight("black", true);
	  t.node.parentElement.insertBefore(t.node,null)
    })
	*/
    
  } // repaint
  
  
  remove(){
	let obj = this;
	obj.triangles.forEach(function(t){
		t.remove();
	}) // forEach
	obj.triangles = []
  } // remove
  
  // Dummy
  onmouseenter(selected){} // onmouseenter
  onclick(selected){} // onclick
  
} // TriangleIconGroup





	
function generatorLine( name, x1,y1,x2,y2,dx,dy, ndx,ndy ){
	// Floor the values to the nearest pixel to avoid smearing?
	const x1_ = Math.floor(x1+dx);
	const y1_ = Math.floor(y1+dy);
	const x2_ = Math.floor(x2+dx);
	const y2_ = Math.floor(y2+dy);
	
	
	// Text positioning.
	// let L = Math.sqrt( (y2-y1)**2 + (x2-x1)**2 );
	// L = L>0 ? L : 1;
	// let normal = [ (y2-y1)/L, (x2-x1)/L ];
	
	const tx = (x1_+x2_)/2 + ndx;
	const ty = (y1_+y2_)/2 + ndy;
	let angle = Math.atan((y2-y1)/(x2-x1))*180/Math.PI; // 0/0=NaN
	angle = angle ? angle : 0;
	
	
	return `<line stroke="gainsboro" stroke-width=2 marker-end="url(#arrow-inactive)" x1="${x1_}" y1="${y1_}" x2="${x2_}" y2="${y2_}"></line>
	<text text-anchor="middle" style="display: none;" transform="translate(${tx}, ${ty}) rotate(${angle})">${ name }</text>`
} // generatorLine


function numformat(v){ return parseFloat(v.toFixed(3)) }


class TriangleIcon{
	
	// Horizontal spacing between the U and Vtheta lines.
	spacing = 3
	
	constructor(task, accessor, xscale, yscale){
		let obj = this;
		obj.task = task;
		
		let d = accessor(obj.task);
		
		
		// If any of hte numbers is zero, then display an empty label.
		// Similarly if M==Mx then only one of them should be shown. M I guess?
		const nameVx = d.Vx==0 || d.Vtheta==0 ? "" : `Mx=${ numformat(d.Vx) }`;
		const nameVtheta = d.Vtheta==0 ? "" : `Mtheta=${ numformat(d.Vtheta) }`;
		const nameV = (d.Vx**2+d.Vtheta**2)==0 ? "" : `M=${ numformat( Math.sqrt(d.Vx**2+d.Vtheta**2) ) }`;
		const nameU = d.U==0 ? "" : `U=${ numformat( d.U ) }`;
		const nameVrel = (d.Vx**2+(-d.U+d.Vtheta)**2)==0 ? "" : `Mrel=${ numformat( Math.sqrt(d.Vx**2+(-d.U+d.Vtheta)**2) ) }`;
		
		
		obj.node = svg2element(`<g>  
	    ${ generatorLine( nameVx    , xscale(0), yscale(0), xscale(d.Vx), yscale(0),             0,            0,0,0 )}
	    ${ generatorLine( nameVtheta, xscale(0), yscale(0), xscale(0),    yscale(d.Vtheta),      xscale(d.Vx)-xscale(0)-obj.spacing, 0,-12,0 )}
		${ generatorLine( nameV     , xscale(0), yscale(0), xscale(d.Vx), yscale(d.Vtheta),      0,            0,0,0 )}
		${ generatorLine( nameU     , xscale(0), yscale(0), xscale(0),    yscale(d.U),           xscale(d.Vx)-xscale(0)+obj.spacing, yscale(-d.U+d.Vtheta)-yscale(0),0,0 )}
		${ generatorLine( nameVrel  , xscale(0), yscale(0), xscale(d.Vx), yscale(-d.U+d.Vtheta), 0,            0,0,0 )}
		</g>`);
		
		obj.lines  = obj.node.querySelectorAll("line");
		obj.labels = obj.node.querySelectorAll("text"); 
		
	} // constructor
	
	highlight(color, textflag){
		let obj = this;
		
        for(let i=0; i<obj.lines.length; i++){
          obj.lines[i].style.stroke = color;
		  obj.lines[i].setAttribute("marker-end", `url(#arrow-${ color })`)
		  obj.labels[i].style.display = textflag ? "" : "none";
        } // for
	} // repaint
	
	remove(){
		this.node.remove()
	} // remove

} // TriangleIcon