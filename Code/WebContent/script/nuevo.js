
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
var margin = {top: 50, right: 20, bottom: 30, left: 260},
width = 1050 - margin.left - margin.right,
height = 350 - margin.top - margin.bottom;

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
var groupline = d3.svg.line()
.interpolate("cardinal")
.x(function(d) { return x(d.year); })
.y(function(d) { return y(d.value); });
// Adds the svg canvas
var svg = d3.select("body")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
	  "translate(" + margin.left + "," + margin.top + ")");
var data;
// Get the data
d3.json("http://localhost:8080/INFO175_Empire/GetSampleData", function(error, json) {
	console.log(json)
	data = json.sort(function(a,b){return a.date.getTime() - b.date.getTime();})
	json.forEach(function(d) {
		d.value = +d.value;
        var date = new Date(d.year);
        var month = date.getMonth();
        var day = date.getDate();
        if(month<= 8){
            month = "0"+(month+1);
        }else{
            month = month + 1;
        }
        if(day<= 9){
            day = "0"+day;
        }
        date = date.getFullYear() + "-" + month + "-" + day;
        d.formattedDate = date;
		d.year = parseDate(date);
	});

	d3.select('#inds')
	.on("change", function () {
		var sect = document.getElementById("inds");
		var section = sect.options[sect.selectedIndex].value;
		data = filterJSON(json, 'applabel', section);
		data.forEach(function(d) {
			d.value = +d.value;
			d.active = true;
		});
		updateGraph(data);
		
		
		jQuery('h1.page-header').html(section);
	});
	d3.select('#inds2')
	.on("change", function () {
		var sect = document.getElementById("inds2");
		var section = sect.options[sect.selectedIndex].value;
		
		data = filterJSON(json, 'topicname', section);
		data.forEach(function(d) {
			d.value = +d.value;
			d.active = true;
		});
		updateGraph(data);
		
		
		jQuery('h1.page-header').html(section);
	});
	
	// generate initial graph
	data = filterJSON(json, 'applabel', 'QUIZPET');
	data = filterJSON(json, 'topicname', 'variables');
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
		return groupline(d.values)
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
			return groupline(d.values);
		});
		
		svg.selectAll(".line").data(result, function(d){return d.key}).exit().remove()  
		
	})
	
	// Add the Legend text
	legend.enter().append("text")
	.attr("x", 15)
	.attr("y", function(d,i){return 10 +i*15;})
	.attr("class", "legend");
	
	legend.transition()
	.style("fill", "#777" )
	.text(function(d){return d.key;});
	
	legend.exit().remove();
	
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
};

function clearAll(){
	d3.selectAll(".line")
	.transition().duration(100)
	.attr("d", function(d){
		return null;
	});
	d3.select("#legend").selectAll("rect")
	.transition().duration(100)
	.attr("fill", "#ccc");
};

function showAll(){
	d3.selectAll(".line")
	.transition().duration(100)
	.attr("d", function(d){
		return groupline(d.values);
	});
	d3.select("#legend").selectAll("rect")
	.attr("fill",function(d) {
		if (d.active == true){
			return color(d.key);
		}
	})
};