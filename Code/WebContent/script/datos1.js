 (function(){
	 var poblacion = [
	                  {Region: 'America',Pais:'Costa Rica', Cantidad:4},
	                  {Region: 'America',Pais:'Argentina', Cantidad:41},
	                  {Region: 'America',Pais:'EE.UU', Cantidad:316},
	                  {Region: 'Europa',Pais:'España', Cantidad:47},
	                  {Region: 'Europa',Pais:'Francia', Cantidad:66},
	                  {Region: 'Europa',Pais:'Alemania', Cantidad:80}
	                  ];
	 
	 var pobRegion_Keys = Enumerable.From(poblacion)
	 								.OrderBy(function(x) {return x.Region;})
	 								.Select(function(x) {return x.Region;})
	 								.Distinct()
	 								.ToArray();
	 
	 var pobRegion_Values = Enumerable.From(poblacion)
	 								 .OrderBy(function(x) {return x.Region;})
	 								 .GroupBy(function(k) {return k.Region},
	 										  function(v) {return {Region: v.Region,
	 									 								  Poblacion: v.Cantidad
	 								 					   		  }
 														  },
 											  function(key,group){
 															  return{
 																  Region: key,
 																  Poblacion: group.Sum(function(region){
 																	  return region.Poblacion;
 																  })
 																  
 															  }															  
 															  
 												}
 														  )
 														  .Select(function(x){return [x.Region, x.Poblacion]})
 														  .ToArray();
	 var barChart = c3.generate({
		bindto:'#c-bar',
		data:{
			columns: pobRegion_Values,
			keys : {value:pobRegion_Keys},
			type :'bar',
			labels : true,
			color : function(color,d){
				//var region = (d,id) ? d.id : d;
				return color;
			}
		},
		axis:{
			x:{
				type:'category',
				label:'Meses',
				categories:' '
			},
			y:{
				label:'Alumnos'
			}
		}
	 }); 
 }());