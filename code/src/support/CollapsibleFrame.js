import { html2element } from "./helpers.js";

const templateButton = `<button class="breadcrumb"></button>`;
const templateFolder = `<div class="collapsible"></div>`;


// The buttons are coordinated because all the frames are part of a 'folder' form.
export default class CollapsibleFrame{
  active = false;
  
  constructor(name){
    let obj = this;

	
	obj.button = html2element( templateButton );
	obj.folder = html2element( templateFolder );
	
	// Keep name to allow construction of labels later on.
	obj.name = name;
	obj.label();
	

	

	
  } // constructor
  
  update(active){
	let obj = this;
	
	if(active){
		obj.button.classList.add("breadcrumb-active");
		obj.folder.style.maxHeight = obj.folder.scrollHeight + "px"
		obj.folder.style.paddingBottom = 30 + "px";
	} else {
		obj.button.classList.remove("breadcrumb-active");
		obj.folder.style.maxHeight = null
		obj.folder.style.paddingBottom = 0 + "px";
	} // if
	
	obj.active = active;
	
  } // update
  
  
  
  
  label(v){
	// Update the variable part of the label.
	let obj = this;
	obj.button.innerText = `${obj.name} ${v?v:""}`;
  } // label
  
  
  
  static AddStyle(){
	// This adds another css link to the header so that the elements get styled correctly. Perhaps it would be cleaner to do it in a more opaque way?
	let el = document.createElement("link");
	el.setAttribute("rel", "stylesheet");
	el.setAttribute("type", "text/css");
	el.setAttribute("href", "./code/src/support/CollapsibleFrame.css");
	document.head.appendChild(el);
  } // AddStyle
  
} // CollapsibleFrame