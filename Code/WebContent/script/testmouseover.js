function loadData(){

function filterJSON(json, key, value) {
	var result = [];
	json.forEach(function(val,idx,arr){
		if(val[key] == value){
			
			result.push(val)
		}
	})
	return result;
}
// Set the dimensions of the canvas / graph
var margin = {top: 9, right: 2, bottom: 30, left: 30},
width = 897 - margin.left - margin.right,
height = 299 - margin.top - margin.bottom;
var chart = $("#chart"),
aspect = chart.width() / chart.height(),
container = chart.parent();
$(window).on("resize", function() {
var targetWidth = container.width();
chart.attr("width", targetWidth);
chart.attr("height", Math.round(targetWidth / aspect));
}).trigger("resize");
// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%d").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
.orient("bottom").ticks(5)
//.tickFormat(d3.time.format("%Y-%m-d%"))

var yAxis = d3.svg.axis().scale(y)
.orient("left").ticks(5);

// Define the line
var line = d3.svg.line()
.interpolate("basis-open")
.x(function(d) { return x(d.year); })
.y(function(d) { return y(d.value); });
// Adds the svg canvas
var svg = d3.select("#chart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
	  "translate(" + margin.left + "," + margin.top + ")");
var data;
// Get the data
d3.json("http://146.83.216.206/INFO175_Servicios/GetSampleData", function(error, data) {
	//data = json;
var json = data;
	console.log(data)
	//data = json.sort(function(a,b){return a.date.getTime() - b.date.getTime();})
	data.forEach(function(d) {
		d.value = +d.value;
        var date = new Date(d.year);
        var month = date.getMonth();
        var day = date.getDate();
        if(month<= 8){
            month = "0"+(month+1);
        }else{
            month = month + 1;
        }
        if(day<= 8){
            day = "0"+(day);
        }
        date = date.getFullYear() + "-" + month + "-" + day;
        d.formattedDate = date;
		d.year = parseDate(date);
	});

	d3.select('#inds')
	.on("change", function () {
		var sect = document.getElementById("inds");
		var section = sect.options[sect.selectedIndex].value;
		var sect2 = document.getElementById("inds2");
		var section2 = sect2.options[sect2.selectedIndex].value;
		data = filterJSON(json, 'applabel', section);
		data = filterJSON(data, 'topicname',section2);
		data.forEach(function(d) {
			d.value = +d.value;
			d.active = true;
		});
		console.log(data);
		console.log("data filtered, updating graph");
		updateGraph(data);
		
		
		jQuery('h1.page-header').html(section);
	});
	d3.select('#inds2')
	.on("change", function () {
		var sect = document.getElementById("inds2");
		var section = sect.options[sect.selectedIndex].value;
		var sect2 = document.getElementById("inds");
		var section2 = sect2.options[sect2.selectedIndex].value;
		data = filterJSON(json, 'topicname', section);
		data = filterJSON(data,'applabel',section2);
		data.forEach(function(d) {
			d.value = +d.value;
			d.active = true;
		});
		console.log(data);
		console.log("data filtered, updating graph");
		updateGraph(data);
		
		
		jQuery('h1.page-header').html(section);
	});
	
	// generate initial graph
	data = filterJSON(data, 'applabel', 'QUIZPET');
	data = filterJSON(data, 'topicname', 'variables');
	updateGraph(data);
});

var color = d3.scale.ordinal().range(["#48A36D",  "#0096ff", "#ff007e"]);

function updateGraph(data) {
	
	
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.year; }));
	y.domain([d3.min(data, function(d) { return d.value; }), d3.max(data, function(d) { return d.value; })]); 
	
	// Nest the entries by group
	dataNest = d3.nest()
	.key(function(d) {return d.group;})
	.entries(data);
	
	
	var result = dataNest.filter(function(val,idx, arr){
		return $("." + val.key).attr("fill") != "#ccc" 
		// matching the data with selector status
	})
	
	
	var group = svg.selectAll(".line")
	.data(result, function(d){return d.key});
	
	group.enter().append("path")
	.attr("class", "line");
	group.transition()
	.style("stroke", function(d,i) { return d.color = color(d.key); })
	.attr("id", function(d){ return 'tag'+d.key.replace(/\s+/g, '');}) // assign ID
	.attr("d", function(d){
		console.log(d)
		return line(d.values)
	});
	
	group.exit().remove();
	var legend = d3.select("#legend")
	.selectAll("text")
	.data(dataNest, function(d){return d.key});
	
	//checkboxes
	legend.enter().append("rect")
	.attr("width", 10)
	.attr("height", 10)
	.attr("x", 0)
	.attr("y", function (d, i) { return 0 +i*15; })  // spacing
	.attr("fill",function(d) { 
		return color(d.key);
		
	})
	.attr("class", function(d,i){return "legendcheckbox " + d.key})
	.on("click", function(d){
		d.active = !d.active;
		
		d3.select(this).attr("fill", function(d){
			if(d3.select(this).attr("fill")  == "#ccc"){
				return color(d.key);
			}else {
				return "#ccc";
			}
		})
		
		
		var result = dataNest.filter(function(val,idx, arr){
			return $("." + val.key).attr("fill") != "#ccc" 
			// matching the data with selector status
		})
		
		// Hide or show the lines based on the ID
		svg.selectAll(".line").data(result, function(d){return d.key})
		.enter()
		.append("path")
		.attr("class", "line")
		.style("stroke", function(d,i) { return d.color = color(d.key); })
		.attr("d", function(d){
			return line(d.values);
		});
		svg.selectAll(".line").data(result, function(d){return d.key}).exit().remove()  
		
	})
	svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 16)
    .text("Mes");
	svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 16)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Cantidad de actividad");
	// Add the Legend text
	legend.enter().append("text")
	.attr("x", 15)
	.attr("y", function(d,i){return 10 +i*15;})
	.attr("class", "legend");
	
	legend.transition()
	.style("fill", "#777" )
	.text(function(d){return d.key;});
	
	legend.exit().remove();
	svg.selectAll(".mouse-per-line").remove();
	svg.selectAll(".axis").remove();
	
	// Add the X Axis
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
	
	// Add the Y Axis
	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);
	var mouseG = svg.append("g")
	  .attr("class", "mouse-over-effects");

	mouseG.append("path") // this is the black vertical line to follow mouse
	  .attr("class", "mouse-line")
	  .style("stroke", "black")
	  .style("stroke-width", "1px")
	  .style("opacity", "0");
	var lines = document.getElementsByClassName('line');
	console.log(lines);
	var mousePerLine = mouseG.selectAll('.mouse-per-line')
	  .data(result, function(d){console.log(d);return d.key;});
	  mousePerLine.enter()
	  .append("g")
	  .attr("class", "mouse-per-line");

	mousePerLine.append("circle")
	  .attr("r", 7)
	  .style("stroke", function(d, i) {
	    return d3.scale.category20c(i);
	  })
	  .style("fill", "none")
	  .style("stroke-width", "1px")
	  .style("opacity", "0");
		
	mousePerLine.append("rect")
		.attr("x", 0)
		.attr("y", -10)
	  .attr("width", 100)
		.attr("height", 56)
	  .style("stroke", function(d, i) {
	    return d3.scale.category20c(i);
	  })
		.attr("class", "tooltip-container")
		  .style("fill", "grey")
			.style("opacity", "0")
		  .style("stroke-width", "1px");
	mousePerLine.append("text").attr("id", "grupo")
	  .attr("transform", "translate(5,3)")
	mousePerLine.append("text").attr("id", "x-text")
	  .attr("transform", "translate(10,23)");
	mousePerLine.append("text").attr("id", "y-text")
	  .attr("transform", "translate(10,43)");
	mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
	  .attr('width', width) // can't catch mouse events on a g element
	  .attr('height', height)
	  .attr('fill', 'none')
	  .attr('pointer-events', 'all')
	  .on('mouseout', function() { // on mouse out hide line, circles and text
	    d3.select(".mouse-line")
	      .style("opacity", "0");
	    d3.selectAll(".mouse-per-line circle")
	      .style("opacity", "0");
		  d3.selectAll(".mouse-per-line rect")
	      .style("opacity", "0");			
	    d3.selectAll(".mouse-per-line text")
	      .style("opacity", "0");
	  })
	  .on('mouseover', function() { // on mouse in show line, circles and text
	    d3.select(".mouse-line")
	      .style("opacity", "1");
	    d3.selectAll(".mouse-per-line circle")
	      .style("opacity", "1");
	    d3.selectAll(".mouse-per-line text")
	      .style("opacity", "1");
			d3.selectAll(".mouse-per-line rect")
	      .style("opacity", "0.5");				
	  })
	  .on('mousemove', function() { // mouse moving over canvas
	    var mouse = d3.mouse(this);
	    d3.select(".mouse-line")
	      .attr("d", function() {
	        var d = "M" + mouse[0] + "," + height;
	        d += " " + mouse[0] + "," + 0;
	        return d;
	      });
	    d3.selectAll(".mouse-per-line")
	      .attr("transform", function(d, i) {
	    	  if (i<3||d!=undefined){
	        var xDate = x.invert(mouse[0]),
	          bisect = d3.bisector(function(d) {
	            return d[0];
	          }).right;
	        var idx = bisect(d.values, xDate);
	        var beginning = 0,
	          end = lines[i].getTotalLength(),
	          target = null;
	        //console.log(idx)
	        while (true) {
	          target = Math.floor((beginning + end) / 2);
	          var pos = lines[i].getPointAtLength(target);
	          if ((target === end || target === beginning) && pos.x !== mouse[0]) {
	            break;
	          }
	          if (pos.x > mouse[0]) end = target;
	          else if (pos.x < mouse[0]) beginning = target;
	          else break; //position found
	        }
	        var grupo;
	        d3.select(this).select('#grupo')
	          .text("Grupo: "+d.key);
	    	  }

	        d3.select(this).select('#y-text')
	          .text("y: " + y.invert(pos.y).toFixed(2));
						
	 				d3.select(this).select('#x-text')
	          .text("x: " + d3.time.format("%Y-%m-%d")(xDate));
						//console.log(mouse[0]);
	        return "translate(" + mouse[0] + "," + (10+60*i) + ")";
	      });
	  });
};

$(window).ready(function() {
    loadData(); // llama a la función loadData más arriba
    
});
