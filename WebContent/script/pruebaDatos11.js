 (function(){
	 var universo = [
	                  //{Activity:'Example',Mes:'Enero', Activitycount:50},
	                  //{Activity:'Example',Mes:'Enero', Activitycount:100},
	                  {Activity:'Example',Mes:'Marzo', Activitycount:150},
	                  {Activity:'Exercise',Mes:'Febrero', Activitycount:400},
	                  {Activity:'Example',Mes:'Marzo', Activitycount:150},
	                  {Activity:'Quiz',Mes:'Enero', Activitycount:200}
	                  //{Activity:'Quiz',Mes:'Febrero', Activitycount:50},
	                  //{Activity:'Exercise',Mes:'Enero', Activitycount:40},
	                  //{Activity:'Quiz',Mes:'Marzo', Activitycount:70},
	                  //{Activity:'Quiz',Mes:'Marzo', Activitycount:120},
	                  //{Activity:'Exercise',Mes:'Febrero', Activitycount:220},
	                  //{Activity:'Quiz',Mes:'Febrero', Activitycount:56},
	                  //{Activity:'Example',Mes:'Marzo', Activitycount:110}
	           
	                  ];
	 
	 var categorias = Enumerable.From(universo) //extraer informacion
	 								.Select(function(x) {return x.Activity;}) //aca se especifica lo que se quiere retornar	 								
	 								//.Distinct() //se quitan los duplicados
	 								.ToArray(); //los datos se insertan en un arreglo
	 
	 var arrCategorias = [];
	 arrCategorias.push('Mes'); //el primer nodo sea el mes
	 categorias.forEach(function(mes){arrCategorias.push(mes);}); //recorrer los meses(sin duplicarse)
	 
	 //console.log(arrCategoria);
	 
	 var monedas = Enumerable.From(universo)
	 						 .Select(function(x){return x.Mes;})
	 						 //.Distinct()
	 						 .ToArray();
	 var arrTipos = [];
	 monedas.forEach(function(moneda){
		 var arrMoneda =[];
		 arrMoneda.push(moneda);
		 
		 universo.filter(function(x){return x.Mes==moneda;})
		 		   .map(function(x){return x.Activitycount}) //manejo de arreglos
		 		   .forEach(function(activitycount){
		 			   arrMoneda.push(activitycount);
		 		   });
		 arrTipos.push(arrMoneda);
	 });
	 //console.log(arrCategoria);
	 var arrData = [] 
	 arrData[0] = arrCategorias;
	 arrTipos.forEach(function(arrMoneda){arrData.push(arrMoneda);});
	 
	 var lineChart = c3.generate({
		 bindto:'#c-line',
		 data:{
			 x:'Mes',
			 columns:arrData,			 
			 //color:function(color,d){
				 //var moneda = (d,id) ? d.id :d
						 //return color;
				 
			 },
		 //},
		 axis:{
				x:{
					type:'category'},
					categories: categorias
				}
	 }); 
	 
 }());