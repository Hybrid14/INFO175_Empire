<head>
<h1>Nombre de grupo:</h1> <LI><STRONG> Empire</STRONG> 

<h1>Integrantes:</h1> 
             <LI> Marcelo Arriagada S.
             <LI> Luis Guzman B.
             <LI> Christian Matzner S.
             <LI> Sebastian Zambrano R.
             
<h1>Requerimiento general:</h1> 
                     Seguir el progreso y la actividad de los estudiantes, en grupos o individualmente, en el tiempo.

<h1>Historia de usuario:</h1>
                    <STRONG>"Yo como profesor, quiero definir los picks de cada estudiante al momento de realizar una actividad
                   en relación del tiempo, para poder identificar la organización de estudio del alumno."
                   
<h1>Retroalimentación_1:</h1>
                    <OL>
                    <LI> Poder considerar mas filtros a la hora de poder visualizar los resultados de organización entre el alumno y/o el
                    total del alumnado(cada tópico poder subdividirlo en distintas actividades, por ejemplo:example,questions,etc).
                    <LI>Poder considerar una opción/filtro en donde solo se muestren en la visualizacion de los gráficos,los picks del o                       los estudiante(s).
                    <LI>Cada tópico, tendrá una visualización gráfica considerando tres gráficas: Grupo 1-2, Grupo 3-4 y Grupo 5-6.
                    <LI> Desechar la opción de que se visualice en otra ventana la informacion de un alumno en particular. Asi, se debe 
                    presentar la informacion del alumno en el gráfico del grupo que corresponde.</LI>
                    </OL>
                    
<h1>Retroalimentacion_2:</h1> 
                    <OL>
                    <LI>Definir bien los intervalos de tiempo para el eje x (de preferencia mas de un intervalo representativo.
                    <LI> Insertar graficos en vertical para comparar la frecuencia con la que los diferentes grupos ingresan a estudiar, con la
                    con una sola linea de tiempo que los atraviesa a todos.
                    <LI> agregar mas filtros para la barra de tiempo. 
                     </OL>

                    
<h1>Dia_13/Abril:</h1> 
                  <OL>
              Requerimientos general: Seguir el progreso y la actividad de los estudiantes, en grupos o individualmente, en el tiempo.
              Historia de usuario 1:"Yo como profesor, quiero definir los picks de cada estudiante al momento de realizar una actividad,
              en relación del tiempo, para poder identificar la organización de estudio del alumnos".
              Historia de usuario modificado 2.0:"Yo como profesor, quiero definir los picks de los estudiantes al momento de realizar
              una actividad, en relación del tiempo, para poder identificar la organización de estudio de los estudiantes".
              Para esto, agregamos los cambios que eran nesesarios desde la ultima retroalimentacion, tales como:
                          <LI>Cambiar los gráficos que se encontraba de forma consecutivas en direccion horizontal a gráficos consecutivos en forma vertical(se mantiene el numero de gráficos, que son tres).<LI>Agregar herramientas de comparación de los distintos grupos. </LI><LI>Insertar una pestaña para que compare todos los grupos en un gráfico para contrastar a todos los grupos.</LI><LI>Simplificar la interfaz gráfica para que al usuario se le haga mas fácil el uso, elimindando el buscador por persona y el CoverFlow que solo cumplían una funcionalidad estética.</LI>
                    </OL><P>Con respecto a la plataforma de desarrollo en que se va a montar el proyecto, es decir, 
             base de datos, servidor Tomcat y clipse, se instalaron de forma exitosa en dos computadores de los 
             4 del grupo. 
             En un principio, para verificar el correcto funcionamiento de los programas en conjunto, 
             se utilizó un programa de ejemplo. Éste no funcionó, debido a que se estaban obteniendo los datos de 
             manera dinamica. Además de eso había cierta  incompatibilidad con las versiones del servidor Tomcat 
             y eclipse, por lo que tuvimos que ver porque no estaba funcionando y arreglarlo. 
             Al finalizar la clase, se pudo concretar de forma exitosa, el funcionamiento total del ejemplo
             (correcto funcionamiento de los distintos sistemas/plataforma de desarrolo en conjunto), 
             utilizando los datos de manera estatica en el JSON.</P>
              
<h1>Dia_20/Abril:</h1> Hoy se presentó el primer prototipo de la visualización de nuestro proyecto. Nos enfocamos principalmente en las dos                      grandes problemáticas de la visualización: los gráficos comparativos; dejando de lado la estética y algunos campos en                   segundo plano(filtros).
              La caracteristica primordial para la visualizacion de las gráficas, es que sean dinámicos; desplegando información                        dependiendo de la información que se quiera obtener(mouseover, grafica de peacks e informacion adicional).
              Para esto se utilizaron herramientas con C3.js. Las transiciones funcionaban, solo que hay ciertos parametros visuales no                deseados 
              que aparecieron en nuestra interfaz. Es por esto, que durante la clase, se trato de darle solución a dicha problemática.                  No teniendo
              buenos resultados.
              Para la proxima clase, solo nos debemos enfocar en los 3 gráficos comparativos, del cual, cada uno tendrá la informacion                  de cada grupo
  
              
             
<h1>Dia_25/abril:</h1> Hoy se trabajo plenamente en la visualizacion de los graficos tratando de eliminar los problemas de visualizacion que tenian
              los graficos y definiendo bien los parametros del eje y, que van a ser las conexiones en un intervalo de tiempo definido
              por el ancho de las lineas que atraviesan a estos que que lo define el usuario.
              aun no podemos perfeccionar la visualizacion al 100%, por lo que nos tendremos que juntar nuevamente para la persentacion               del 27 de abril.
              
<h1>Dia_27/abril:</h1> se termino satisfactoriamente el grafico, dejando pendiente solo el trabajo con la flexibilidad y analisis del tiempo
              para poder comparar distintos intervalos de tiempo y ligarlo a la base de datos de los alumnos. Nos recomendaron
              hacer 4 graficos extra para analizar las actividades en un contexto secundario y eliminar el grafico que se centraba
              en los peacks. Comenzaremos a trabajar en eso para dar paso a la interfaz completa con los filtros y pciones que
              corresponden.
<h1>Dia_3/Mayo:</h1>   Hoy nos juntamos para organizarnos en como vamos a trabajar en lo que nos falta por hacer, quedamos en que nos                            deistribuiuriamos el trabajo de la siguiente manera:
              -Marcelo: Se encargara de terminar bien el tema del grafico
              -Sebastian: Se encargara de Base de datos
              -Luis y Christian: Se encargaran de la pagina en si, la interfaz con el usuario
<h1>Dia_4/Mayo:</h1>   Hoy tuvimos una reunion con el profesor, en la cual le mostramos el avance de nuestra visualización. En la cual nos dijo                 que ibamos en buen camino. Ademas nos dijo que teniamos que ponerle nombre a todos los campos de la visualización, lo                   cual ya lo  hicimos y especificamos la importancia, el avance, y el nombre de estas. Esto se subio al github con el nombre               "PROGRAMACIÓN".
El mockup hecho con el se subio a la carpeta final con el nombre de "Mockup_reunion"

<h1>Dia_11/Mayo:</h1>   Implementado el prototipo del servicio en el repositorio y se actualizó la especificación con el query a la base de datos, con los datos que se utilizarán en la visualización. También se ordenaron los directorios del repositorio para separar de forma efectiva los mockups del código y la especificación. Además se le puso formato a la bitácora para que se vea de forma mas clara y ordenada.

<h1>Dia_16/Mayo:</h1> Avanzamos el html, dejando listos los combobox, posiciones de los graficos, el titulo y nombre del programa, se subira todo cuando se corrija un problema con la pagina.

<h1>Dia_18/Mayo:</h1> Se subio el html,tuvimos problemas con una funcion que al compilar sale que no esta definida, al insertar el grafico en el html, a su vez se arreglo la visualizacion de los mockups cambiandolos a imagen en vez del ppt para tener esto mas ordenado y se vea de forma mas facil. Al final de la clase logramos insertar el grafico investigando en los codigos de ejemplo subidos al principio del semestre

<h1>Dia_25/Mayo:</h1> Este dia mas que realizar un aporte al trabajo propiamente tal, se tocaron ciertos puntos, en especìfico, las malas pràcticas que no deben presentarse al momento de trabajar en equipo. Ademàs de eso, las cargas acadèmicas jugaron un rol importante para no presentar un avance de nuestro proyecto para este dia. Enviamos un correo al profesor, consultando la posibilidad de poder postergar el avance y el nos agendò para el dia martes 30 de Mayo a las 14 hrs. De esta forma, para poder mostrar un avance positivo/completo, acordamos en juntarnos para el dia 26, 29 y 30 de Mayo.
                      
 <h1>Dia_26/Mayo:</h1> Hoy nos juntamos a avanzar para prepararnos para la reunion del 30 con el profesor, se avanzo en la posicion del grafico y en los filtros, esto nos dio problemas al compatibilizar con c3.
 
 <h1>Dia_29/Mayo:</h1> Hoy nuevamente juntamos a avanzar para prepararnos para la reunion del 30 con el profesor, se avanzo en el slider, esto nos costo mucho, avanzamos lo que pudimos, pero el c3 nos esta dando muchos problemas para compatibilizar. 
 
 <h1>Dia_30/Mayo:</h1> Para este dia, se habia acordado en presentar nuestro avance. Nos dirigimos a la oficina y nos encontramos con la sorpresa de que el profesor no se encontraba en ella. Esperamos en la sala Llancahue, mientras revisabamos algunos detalles en lo que respecta a la representacion de nuestros datos en el gràfico. Como el jueves se debe entregar la presentaciòn en formato pdf, decimos avanzar en eso.
                       La estructura que se le dio fue la siguiente:                      
                        <LI> Avance del proyecto...
                        <LI>...
                        <LI> Proyecto terminado
             
 <h1>Dia_07/Junio:</h1> Nos dimos cuenta que la herramienta C3 hacia que con compliquemos demasiado innesesariamente, por lo que decidimos recurrir a la herramienta D3, que nos simplificara un poco el trabajo. Dejando como tarea siguiente modificar la interfaz grafica que llevabamos hasta ahora. Preparamos la presentacion para el dia jueves mostrando nuestros avances.
 En terminos generales estan listos los filtros, la leyenda, el grafico y lo que nos falta es el slyder y el zoom dinamico, que al terminar daremos paso a ensamblaro todo. Tambien definimos que significa cada eje para que la informacion sea mas clara. Logramos hacer funcionar el grafico en D3, para dar paso a la presentacion hecha en clases.
 La presentacion salio bien, aun faltan arreglar un poco detales, tales como la organizacion del grafrica con el tema de los dias, para que se vean mas claramente los picks.
 <h1>Dia_9/Junio:</h1> Nos juntamos a ver como 
</head>
            
<h1>Dia_22/Junio:</h1>: Se pusieron los botones y se comenzo a hacer el slyder, aparte de hacer modificaciones al codigo con respecto al JSON
                    
