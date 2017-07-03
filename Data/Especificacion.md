# Servicio

```javascript
[{
		"group": String,
		"year": String,
		"applabel": String,
		"topicname": String,
		"value": int
	},
  ...
]
```
### Descripcion
Este servicio resume la información de todas las actividades en todos los tipos de contenido por cada grupo y cada día.
year vendría a ser la fecha y value la cantidad de actividad.
### Parametros
No tiene parámeteros definidos
### Salida

```javascript
[{
		"group": "Individual",
		"year": "2016-09-22",
		"applabel": "QUIZPET",
		"topicname": "variables",
		"value": "5"
	},
  ...
]
```

### Consulta SQL
```SQL
SELECT `applabel`,DATE_FORMAT(FROM_UNIXTIME(`unixtimestamp`), '%Y-%m-%d') AS `date`,
					`topicname`,`group`, count(*) as `activity_count`
					FROM `activity_traces` WHERE `durationseconds` > 0 
					GROUP BY `applabel`,`group`,`topicname`,`date` ORDER BY `date`,`group`;
```


