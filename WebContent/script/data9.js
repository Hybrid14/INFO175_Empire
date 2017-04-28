 (function(){
	 var universo = [
	                  {Activity:'Example',Mes:'Enero', activitycount:200},
	                  {Activity:'Exercise',Mes:'Febrero', activitycount:400},
	                  {Activity:'Example',Mes:'Marzo', activitycount:150},
	                  {Activity:'Quiz',Mes:'Enero', activitycount:200},
	                  {Activity:'Quiz',Mes:'Febrero', activitycount:50},
	                  {Activity:'Exercise',Mes:'Febrero', activitycount:40},
	                  {Activity:'Exercise',Mes:'Marzo', activitycount:100}
	                  ];
	 
	 var uniActivity_Keys = Enumerable.From(universo)
	 								.OrderBy(function(x) {return x.Activity;})
	 								.Select(function(x) {return x.Activity;})
	 								.Distinct()
	 								.ToArray();
	 
	 var uniActivity_Values = Enumerable.From(universo)
	 								 .OrderBy(function(x) {return x.Activity;})
	 								 .GroupBy(function(k) {return k.Activity},
	 										  function(v) {return {Activity: v.Activity,
	 									 								  total: v.activitycount
	 								 					   		  }
 														  },
 											  function(key,group){
 															  return{
 																 Activity: key,
 																  total: group.Sum(function(activity){
 																	  return activity.total;
 																  })
 																  
 															  }															  
 															  
 												}
 														  )
 														  .Select(function(x){return [x.Activity, x.total]})
 														  .ToArray();
	//console.log(arrCategoria);
	 var barChart = c3.generate({
		bindto:'#c-bar',
		data:{
			columns: uniActivity_Values,
			keys : {value:uniActivity_Keys},
			type :'bar',
			labels : true,
			//color : function(color,d){
				//var region = (d,id) ? d.id : d;
				//return color;
			//}
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