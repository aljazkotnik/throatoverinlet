export function html2element(html){
  let template = document.createElement('template'); 
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template.content.firstChild;
} // html2element

export function svg2element(svg){
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = svg.trim();
  return g.firstChild;
} // svg2element



export function calculateExponent(val){
	// calculate the exponent for the scientific notation.
	var exp = 0
	while( Math.floor( Math.abs( val ) / 10**(exp+1) ) > 0 ){ exp+=1 }
	
	// Convert the exponent to multiple of three
	return Math.floor( exp / 3 )*3

} // 


// From regular helpers.
export function unique(d){		
	// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	} // unique
	
	return d.filter( onlyUnique )

} // unique





export class ScaleLinear {
	
  range = [0,1]
  domain = [0,1]
	
  constructor(){
    let obj = this;
  } // constructor
	
	
  val2px(v){
	let obj = this;
	return (v - obj.domain[0]) / (obj.domain[1]-obj.domain[0]) * (obj.range[1]-obj.range[0]) + obj.range[0]
  } // val2px
	
  px2val(v){
	let obj = this;
	return (v - obj.range[0]) / (obj.range[1]-obj.range[0]) * (obj.domain[1]-obj.domain[0]) + obj.domain[0]
  } // val2px
	
	
} // ScaleLinear