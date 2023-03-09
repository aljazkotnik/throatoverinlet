import crossfilter from "crossfilter2";


export default class dataStorage{
  _tasks = undefined
  
  
  // Highlighting
  currentlocked = false
  current = undefined
  datum = undefined
  
  distributions = [
	  {name: "mach", extent: [], accessor: function(d){ return d.distribution["mach"]} },
	  {name: "camber", extent: [], accessor: function(d){ return d.distribution["camber"]} },
	  {name: "theta", extent: [], accessor: function(d){ return d.distribution["theta"]} }
  ]
  
  
  contours = [
       {name: "mach", extent: [], accessor: function(d){ return d.contour["mach"]} }
  ]
  
  
  constructor(){
    let obj = this;
	
	
	// Initiate a crossfilter object.
	obj.crossfilter = crossfilter();
	
  } // constructor
  
  
  // Access the data.
  set tasks(d){
	  let obj = this;
	  obj._tasks = d;
  }
  
  get tasks(){
	  let obj = this;
	  return obj._tasks;
  }
  
  
  // DATA IMPORT
  replace(tasks){
	let obj = this;
	
	obj.tasks = reformatTasks(tasks);
	
	obj.crossfilter.remove();
	obj.crossfilter.add( obj.tasks );
	
	// The actual distribution data is created for individual task objects, and the `distributions' property are helpers for the plots - they are given to the plots to specify which distribution they should use.
	obj.updateextent();
  } // replace
  
  add(tasks){
	  // Instead of replacing the data, merge the previous and the old data.
	  let obj = this;
	  
	  let existingtasks = obj.tasks ? obj.tasks : [];
	  let newtasks = reformatTasks(tasks);
	  
	  
	  obj.tasks = existingtasks.concat( newtasks );
	  obj.crossfilter.add(newtasks); 
	  
	  
	  obj.updateextent();
  } // add
  
  
  updateextent(){
	// After new data is added the extent has to be corrected.
	let obj = this;
	
	// Calculate the extents here
	obj.distributions.forEach(series=>{
		let ex = extent( obj.tasks, function(t){return t.distribution[series.name]} );
		series.extent = ex;
	}) // forEach
	
	
	obj.contours.forEach(contour=>{
		let ex = extentContour( obj.tasks, function(t){return t.contour[contour.name]} );
		contour.extent = ex;
	})
	
  } // updateextent
  

  selecttask(task){
	// The user may wish to have two datum designs chosen at any time. If two datums are chosen, then the highlighting should not be active. More than two datums are not allowed because the names need to fit in the header.
	let obj = this;
	
	
	if(obj.datum){
		// Datum currently defined. Task could be datum clicked again, or another task.
		if(obj.datum==task){
			// Datum clicked again. Clear everything.
			obj.currentlocked = false;
			obj.current = undefined;
			obj.datum = undefined;
		} else {
			// Datum defined, but a different task has been clicked. If the task is the same as current, then just unlock the current. If it is a different task, then replace current.
			if(obj.current==task){
				// Toggle the selection.
				obj.currentlocked = !obj.currentlocked;
				obj.current = obj.currentlocked ? task : undefined;
			} else {
				// New task selected as current.
				obj.currentlocked = true;
				obj.current = task;
			} // if
		} // if
	} else {
		// Datum not currently defined. Select this task as datum.
		obj.datum = task;
		obj.currentlocked = false;
	} // if
	

  } // toggledatum
 
  setcurrent(task){
	let obj = this;
	obj.current = obj.currentlocked ? obj.current : task;
  } // togglecurrent

  
  
  
} // dataStorage


function reformatTasks(tasks){
	tasks = reformatDistributionData(tasks);
	tasks = reformatContourData(tasks);
	return tasks
} // reformatTasks


function reformatDistributionData(tasks){
	
	tasks.forEach(function(t){
		
		// Mach distributon
		let mach1 = t.distribution.Mis_1.map((v,i)=>{
			return [t.distribution.s_1[i], t.distribution.Mis_1[i]]
		})
		
		let mach2 = t.distribution.Mis_2.map((v,i)=>{
			return [t.distribution.s_2[i], t.distribution.Mis_2[i]]
		})
		
		let mach = mach1.concat(mach2.reverse());
		
		
		// Camber distributions
		let camber = t.camber.camber.map((v,i)=>{
			return [t.camber.s_cam[i], t.camber.camber[i]]
		}) // map
		
		
		// Theta distributions.
		let theta1 = t.camber.theta_ps.map((v,i)=>{
			return [t.camber.s_ps[i], t.camber.theta_ps[i]]
		}) // map
		
		let theta2 = t.camber.theta_ss.map((v,i)=>{
			return [t.camber.s_ss[i], t.camber.theta_ss[i]]
		}) // map
		
		let theta =  theta1.concat(theta2.reverse());
		
		
		
		
		// Create the series that can be plotted
		t.distribution = {
			mach:   {level: t.metadata.name[0], points: mach, color: "cornflowerblue"},
			camber: {level: t.metadata.name[0], points: camber, color: "cornflowerblue"},
			theta:  {level: t.metadata.name[0], points: theta, color: "cornflowerblue"}
		} // distribution
		
	}) // forEach
	
	return tasks
	
	
} // reformatDistributionData

function reformatContourData(tasks){
	
	
	
	
	tasks.forEach(function(t){
		let passage0 = matlabContour2drawLines( t.contour.C );
		let passage1 = matlabContour2drawLines( t.contour.C_pitch );
		
		let flow_lines = passage0.concat(passage1);
		
		flow_lines.forEach(line=>{line.color = "cornflowerblue";});
		let custom_lines = [
			{level: "aerofoil", points: t.contour.xrt, color: "black"},
			{level: "aerofoil", points: t.contour.xrt_neg_pitch, color: "black"},
			{level: "aerofoil", points: t.contour.xrt_pos_pitch, color: "black"},
			
			{level: "throat_bl", points: t.contour.xrt_throat_bl, color: "magenta"},
			{level: "stag_line", points: t.contour.xrt_stag_line, color: "gray"},
			{level: "bl", points: t.contour.bl, color: "gray"}
		];

		
		// calculate the extents
		t.contour = {
			mach: flow_lines.concat(custom_lines)
		}
		
	}) // forEach
	
	return tasks
	
} // reformatContourData


function extentContour(tasks, accessor){
	
	
	let x_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
	let y_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];

	tasks.forEach(function(t){	
		// calculate the extents
		let c = accessor(t);
		
		c.forEach(line=>{
			line.points.forEach(p=>{
				x_extent[0] = x_extent[0] < p[0] ? x_extent[0] : p[0];
				x_extent[1] = x_extent[1] > p[0] ? x_extent[1] : p[0];
				
				y_extent[0] = y_extent[0] < p[1] ? y_extent[0] : p[1];
				y_extent[1] = y_extent[1] > p[1] ? y_extent[1] : p[1];
			}) // forEach
		}) // forEach
	}) // forEach
	
	
	// Control the plot aspect ratio by controlling the extents. Always try to keep hte data in the middle.
	// Try to scale the plot to fit the aspect ratio??
	let y_range = y_extent[1]-y_extent[0];
	let x_range = x_extent[1]-x_extent[0];
	if( x_range > y_range ){
		// Readjust y_extent.
		y_extent = [
		  y_extent[0] + y_range/2 - x_range/2,
		  y_extent[0] + y_range/2 + x_range/2,
		]
	} else {
		x_extent = [
		  x_extent[0] + x_range/2 - y_range/2,
		  x_extent[0] + x_range/2 + y_range/2,
		]
	} // if
	
	/*
	return {
		x: x_extent,
		y: y_extent
	}
	*/
	
	// As per Demetrios' specific request, the data extent is modified here to achieve a zoomed in initial state.
	const z = 1.75; // hand picked value.
	const xc = (x_extent[0] + x_extent[1])/2;
	const yc = (y_extent[0] + y_extent[1])/2;
	const dx = (x_extent[1] - x_extent[0])/(2*z);
	const dy = (y_extent[1] - y_extent[0])/(2*z);
	
	return {
		x: [xc - dx, xc + dx],
		y: [yc - dy, yc + dy]
	}

	
	
} // extentContour


function extent(tasks, accessor){
	
	let x_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];
	let y_extent = [Math.POSITIVE_INFINITY, Math.NEGATIVE_INFINITY];

	tasks.forEach(function(t){
		
		accessor(t).points.forEach(p=>{
			x_extent[0] = x_extent[0] < p[0] ? x_extent[0] : p[0];
			x_extent[1] = x_extent[1] > p[0] ? x_extent[1] : p[0];
			
			y_extent[0] = y_extent[0] < p[1] ? y_extent[0] : p[1];
			y_extent[1] = y_extent[1] > p[1] ? y_extent[1] : p[1];
		}) // forEach
	}) // forEach
		
	return {
		x: x_extent,
		y: y_extent
	}
	
} // extent



function axisequal(e){
	
	let y_range = e.y[1]-e.y[0];
	let x_range = e.x[1]-e.x[0];
	
	if( x_range > y_range ){
		// Readjust y_extent.
		e.y = [
		  e.y[0] + y_range/2 - x_range/2,
		  e.y[0] + y_range/2 + x_range/2,
		]
	} else {
		e.x = [
		  e.x[0] + x_range/2 - y_range/2,
		  e.x[0] + x_range/2 + y_range/2,
		]
	} // if
} // axisequal




function matlabContour2drawLines(C){
	
	let lines = [];
	
	// {level: <scalar>, points: [...]}
	
	// Loop over all the columns, and decode accordingly.
	let currentline;
	let current_n = 0;
	for(let i=0; i<C[0].length; i++){
		if(current_n == 0){
			// All hte points for this level have been collected. Start new line.
			currentline = {level: C[0][i], points: []};
			current_n = C[1][i];
			lines.push(currentline);
		} else {
			// Add the current point to the current line
			currentline.points.push( [ C[0][i], C[1][i] ] )
			current_n -= 1;
		} // if
		
	} // for
	
	
	return lines
} // matlabContour2drawLines
