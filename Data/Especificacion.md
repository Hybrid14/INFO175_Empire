//Aunque podríamos usar la siguiente estructura
//"arr_datos": [
//{"unixtimestamp":numérico,"user":cadena,"group":cadena,"applabel":cadena,"topicname":cadena,"Activitycount":numérico}
//]
//Compromete el rendimiento de la aplicación al poner la mayor parte de la carga en el cliente, el navegador.

//La siguiente especificación 
"Arr_data":[
  {"applabel" : string, "group":string ,users:[{"user":string,data:[{"dia":numérico,"activitycount":numérico}]}]}
]
//Arr_data, es un arreglo de doce registros, que como campo tienen un identificador para cada actividad y grupo, junto con un arreglo de usuarios que contiene a los miembros del grupo y consiste de un campo de string con el nombre y a su vez un arreglo de registros con la información para cada día del semestre y el contador de actividad para cada usuario. Mucho más ordenado y a su vez más optimizado, dejando una carga equivalente tanto para el cliente como para el servidor.

# Servicios
## GetTotalsByUser
### Descripcion
Este servicio resume la información de actividad en todos los tipos de contenido usuario por usuario. 
### Parametros
No tiene paramteros definidos
### Salida

```javascript
[
  USER,
  ...
]

// USER object:
{
  "user": "noname160005",
  "unixtimestamp":120,
  "group" : "GROUP161",
  "applabel" :"QUIZPET",
  "topicname":"QUIZPET",
  "Activitycount" :10
  
 
}
```

### Consulta SQL
```SQL
select A.`user`, S.treatments_16 as vis, S.gender, S.pretest, S.posttest, S.pretest_binned,
	sum(if(A.appid=41,1,0)) as q_att, 
	sum(if(A.appid=41 AND A.result=1,1,0)) as q_att_succ, 
	count(distinct(if(A.appid=41,activityname,0)))-1 as dist_q_att, 
	count(distinct(if(A.appid=41 AND A.result=1,A.activityname,0)))-1 as dist_q_att_succ, 
	sum(if(A.appid=38,1,0)) as p_att, 
	sum(if(A.appid=38 AND result=1,1,0)) as p_att_succ, 
	count(distinct(if(A.appid=38,A.activityname,0)))-1 as dist_p_att, 
	count(distinct(if(A.appid=38 AND A.result=1,A.activityname,0)))-1 as dist_p_att_succ, 
	count(distinct(if(A.appid=3,A.parentname,0)))-1 as dist_e, 
	sum(if(A.appid=3,1,0)) as e_lines, 
	count(distinct(if(A.appid=35,A.parentname,0)))-1 as dist_ae, 
	sum(if(A.appid=35,1,0)) as ae_lines, 
	sum(if(A.appid=41,A.durationseconds,0)) as q_time, 
	sum(if(A.appid=38,A.durationseconds,0)) as p_time, 
	sum(if(A.appid=3,A.durationseconds,0)) as e_time, 
	sum(if(A.appid=35,A.durationseconds,0)) as ae_time 
from activity_traces A, student_info S 
	where A.`user` = S.`userid` and A.durationseconds > 0 and A.appid > -1 
	group by A.`user`
```
### Procesamiento
* `gender` : se codifica a female/male de los valores 0/1
* `pretest_binned` : se codifica a low/high de los valores 1/2


