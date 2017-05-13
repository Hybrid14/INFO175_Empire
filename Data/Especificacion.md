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
SELECT `applabel`,DATE_FORMAT(FROM_UNIXTIME(`unixtimestamp`), '%Y-%m-%d') AS `date`,
					`topicname`,`group`, count(*) as `activity_count`
					FROM `activity_traces` WHERE `durationseconds` > 0 
					GROUP BY `applabel`,`group`,`topicname`,`date` ORDER BY `group`,`date`;
```


