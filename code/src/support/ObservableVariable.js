export default class ObservableVariable{
  
  _value = undefined;
  subscribers = [];
  
  constructor(initialvalue){
    let obj = this;
	obj._value = initialvalue;
  } // constructor
  
  
  set value(v){
	let obj = this;
	obj._value = v;
	obj.update();
  } // set value
  
  get value(){
	return this._value;
  } // get value
  
  
  subscribe(f){
	  let obj = this
	  obj.subscribers.push(f)
  } // subscribe
  
  
  update(){
	let obj = this;
	obj.subscribers.forEach(f=>{
		f();
	}) // forEach
  } // update
  
} // ObservableVariable