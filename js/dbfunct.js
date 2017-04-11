function cleanList(divID) {
 $("#" + divID ).html("");
}
function populateFromDB() {
  //Open or Create DB
  var base = JMDBlite.getDB();
  if(base == null || base == undefined) {
      console.log("db seems to be closed, trying to open db...");
      //Open or Create DB
      JMDBlite.open('JMFinderDB', '1.0', 'JMFinder config DB', 2 * 1024 * 1024);
      
  }
  
 //var task3 = ['task_showingPManagers', 'Mostrando La Tabla PManagers', 0, 'Tabla PManagers mostrada', 'Error mostrando PManagers'];
 //JMDBlite.consoleFromSQL(task3, 'SELECT * from pmanagers');
 JMDBlite.readConfig();
 JMDBlite.readFileTypes();
 JMDBlite.refreshTableList();
  
}
function openCreateDB() {

  //JMFinder.cleanTaskList();
  
  //show loading
  $("#tasks").show();
  
  //Open or Create DB
  JMDBlite.init('JMFinderDB', '1.0', 'JMFinder config DB', 2 * 1024 * 1024);
  
}

function otrafun() {
  var cuantosLibros = 0;
 

/*    
  //adding one favoritos example   
 db.transaction(function (tx) {
              tx.executeSql('DROP TABLE favoritos');
  }, function (err) {
        alert('1. should be rolling back caused by: ' + err.message );
        return false;
  });
   
  */
 //adding one favoritos example   
 /*db.transaction(function (tx) {
              tx.executeSql('INSERT INTO favoritos VALUES("Mt:17,10-13", "Ejemplo, San Mateo")');
  }, function (err) {
        alert('1. should be rolling back caused by: ' + err.message );
        return false;
  });*/
  //adding one favoritos example   
 
/*
 db.transaction(function (tx) {
              tx.executeSql('DROP TABLE historial');
  }, function (err) {
        alert('1. should be rolling back caused by: ' + err.message );
        return false;
  });
*/
  
  db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS historial ( fechahora varchar, ' +
                            'texto varchar, libro varchar , capini int , capfin int , versini int, versfin int , ' +
                            'muestraver int )');

  }, function (err) {
        alert('1. should be rolling back caused by: ' + err.message );
        return false;
  });
  
  db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS favoritos ( cita mediumtext PRIMARY KEY, titulo mediumtext )');
  }, function (err) {
        alert('1. should be rolling back caused by: ' + err.message );
        return false;
  });
    
  cuantosLibros = 0;
  db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS libros ( idreg mediumint PRIMARY KEY , libro varchar , titulo varchar , testamento char , estadoreg char , audiolibro int )');
  }, function (err) {
        alert('1. should be rolling back caused by: ' + err.message );
        return false;
  });
  
  var cuantasOpciones = 0;
  db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS tb_opc ( idreg mediumint PRIMARY KEY , codigoopc varchar , nombreopc varchar , codigotab varchar , estadoreg char , ordendeopc varchar , datiungreg datetime , datingreg datetime , datingusu varchar , datmodreg datetime , datmodusu varchar )');
  }, function (err) {
        alert('2. should be rolling back caused by: ' + err.message );
        return false;
  });
  
              //'CREATE TABLE IF NOT EXISTS lecturas ( idreg mediumint PRIMARY KEY , codigo varchar , primera mediumtext , salmo mediumtext , segunda mediumtext , evangelio mediumtext , color varchar, estadoreg char )');
  var cuantasLecturas = 0;
  db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS lecturas ( idreg mediumint PRIMARY KEY , letra varchar , tipo varchar , semana varchar , codigo varchar , tiempo varchar , color varchar, primera mediumtext , salmo mediumtext , segunda mediumtext ,         evangelio mediumtext , estadoreg char )'); 
              
  }, function (err) {
        alert('3. should be rolling back caused by: ' + err.message );
        return false;
  });
  
  var cuantosVersos = 0;
  db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS biblia ( ID mediumint , BookID mediumint , idreg mediumint PRIMARY KEY , orden mediumint , libro varchar , capit int , versini int , versfin int , titulo varchar , contenido mediumtext , estadoreg char , media varchar , audio varchar )');
  }, function (err) {
        alert('4. should be rolling back caused by: ' + err.message );
        return false;
  });
  
  //insert libros
  cuantosLibros = 0;
  db.transaction(function (tx) {
     tx.executeSql('SELECT count(1) as cuenta FROM libros', [], function (tx, results) {
  
        cuantosLibros = results.rows.item(0).cuenta;
            
        /*var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          alert(results.rows.item(i).text);
        }*/

        //alert("Libros encontrados: " + cuantosLibros);
        if(cuantosLibros === 0 || cuantosLibros == "undefined") {
            //alert("Intentando crear la Tabla pues Libros :" + cuantosLibros);

              tx.executeSql('CREATE TABLE IF NOT EXISTS libros ( idreg mediumint PRIMARY KEY , libro varchar , titulo varchar , testamento char , estadoreg char , audiolibro int )');
              tx.executeSql('INSERT INTO libros VALUES(1, "Gn", "Génesis", "AT", "A", 0)');
              tx.executeSql('INSERT INTO libros VALUES(2, "Ex", "Éxodo", "AT", "A", 0)');
              tx.executeSql('INSERT INTO libros VALUES(77, "OraRosario", "Como Orar con el Santo Rosario", "", "A", 1)');

              //return true;
        }
      }, function (err) {
          alert('6. should be rolling back caused by: ' + err.message );
          return false;
      });
    }, function (err) {
        alert('7. should be rolling back caused by: ' + err.message );
        return false;
    });

    //insert tb_opc
  db.transaction(function (tx) {
     tx.executeSql('SELECT count(1) as cuenta FROM tb_opc', [], function (tx, results) {
  
        cuantasOpciones = results.rows.item(0).cuenta;
            
        /*var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          alert(results.rows.item(i).text);
        }*/

        //alert("Opciones encontradas: " + cuantasOpciones);
        if(cuantasOpciones === 0 || cuantasOpciones == "undefined") {
            //alert("Intentando crear la Tabla pues tb_opc :" + cuantasOpciones);

              tx.executeSql('CREATE TABLE IF NOT EXISTS tb_opc ( idreg mediumint PRIMARY KEY , codigoopc varchar , nombreopc varchar , codigotab varchar , estadoreg char , ordendeopc varchar , datiungreg datetime , datingreg datetime , datingusu varchar , datmodreg datetime , datmodusu varchar )');
              tx.executeSql('INSERT INTO tb_opc VALUES(1, "O", "Oraciones", "site:1,1-500", "A", "100", "0000-00-00 00:00:00", "0000-00-00 00:00:00", "", "0000-00-00 00:00:00", "")');
              tx.executeSql('INSERT INTO tb_opc VALUES(61, "MF", "Pruebas Cientificas Milagros", "site:8,54-54", "A", "506", "0000-00-00 00:00:00", "0000-00-00 00:00:00", "", "0000-00-00 00:00:00", "")');

              //return true;
        }
      }, function (err) {
          alert('8. should be rolling back caused by: ' + err.message );
          return false;
      });
    }, function (err) {
        alert('9. should be rolling back caused by: ' + err.message );
        return false;
    });
    
  
  //insert lecturas
  db.transaction(function (tx) {
     tx.executeSql('SELECT count(1) as cuenta FROM lecturas', [], function (tx, results) {
  
        cuantasLecturas = results.rows.item(0).cuenta;
            
        /*var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          alert(results.rows.item(i).text);
        }*/

        //alert("Lecturas encontradas: " + cuantosLibros);
        if(cuantasLecturas === 0 || cuantasLecturas == "undefined") {
            //alert("Intentando crear la Tabla pues Libros :" + cuantosLibros);

              tx.executeSql('CREATE TABLE IF NOT EXISTS lecturas ( idreg mediumint PRIMARY KEY , letra varchar , tipo varchar , semana varchar , codigo varchar , tiempo varchar , color varchar, primera mediumtext , salmo mediumtext , segunda mediumtext ,         evangelio mediumtext , estadoreg char )'); 
              tx.executeSql('INSERT INTO lecturas VALUES ( 1, "A", "0", 1, "DOMADVIENTO", "ADV", "MORADO", "Is:2,1-5", "Sal:122,1-2.3-4a.4b-5.6-7.8-9", "Ro:13,11-14", "Mt:24,37-44", "A")');
              tx.executeSql('INSERT INTO lecturas VALUES ( 722, "0", "0", 0, "PEDROYPABLO", "ORD", "ROJO", "Hch:12,1-11", "Sal:18,2-3.4-4", "2 Tm:4,6-8.17-18", "Mt:16,13-19", "A")');
              tx.executeSql('INSERT INTO lecturas VALUES ( 723, "0", "0", 0, "TODOSSANTOS", "ORD", "ROJO", "Ap:7,2-4.9-14", "Sal:23,1-2.3-4ab.5-6", "1 Jn:3,1-3", "Mt:5,1-12a", "A")');


              //return true;
        }
      }, function (err) {
          alert('6. should be rolling back caused by: ' + err.message );
          return false;
      });
    }, function (err) {
        alert('7. should be rolling back caused by: ' + err.message );
        return false;
    });

  $("#workingPerc").val("1%");
  //insert Biblia
  db.transaction(function (tx) {
     tx.executeSql('SELECT count(1) as cuenta FROM biblia', [], function (tx, results) {
  
        cuantosVersos = results.rows.item(0).cuenta;
            
        /*var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          alert(results.rows.item(i).text);
        }*/

        //alert("Lecturas encontradas: " + cuantosLibros);
        if(cuantosVersos === 0 || cuantosVersos == "undefined") {
            //alert("Intentando crear la Tabla pues Libros :" + cuantosLibros);

              tx.executeSql('CREATE TABLE IF NOT EXISTS biblia ( ID mediumint , BookID mediumint , idreg mediumint PRIMARY KEY , orden mediumint , libro varchar , capit int , versini int , versfin int , titulo varchar , contenido mediumtext , estadoreg char , media varchar , audio varchar )');
              tx.executeSql('INSERT INTO biblia VALUES(29099, 40, 29099, 29099, "Mt", 14, 20, 20, "", "Comieron todos y se saciaron, y recogieron de los trozos sobrantes doce canastos llenos.", "A", "", "")');
              tx.executeSql('INSERT INTO biblia VALUES(41389, 76, 41389, 41389, "site", 8, 80, 80, "San Luis de Tolosa", "Concédenos, Dios todopoderoso, que imitemos el ejemplo de San Luis de Tolosa, obispo, que antepuso el Reino de los Cielos al poder temporal, y como él se distinguió en la virtud de la castidad y el amor a los pobres, así nosotros usemos debidamente las cosas de este mundo para ganar el cielo por la bondad y la misericordia de Dios.\r\nSan Luis de Tolosa, en tus manos ponemos nuestras intenciones...\r\nSan Luis de Tolosa, Ruega por nosotros, Amén.", "A", "", "")');
              tx.executeSql('INSERT INTO biblia VALUES(41390, 76, 41390, 41390, "site", 8, 81, 81, "San Antonio de Padua", "Oh Dios, Padre bueno y lleno de misericordia, que escogiste a San Antonio de Padua como testigo del Evangelio y mensajero de Paz en medio de tu pueblo, escucha la plegaria que te dirigimos confiando en su intercesión.\r\nSantifica nuestra familia, ayúdala a crecer en la Fé, conserva en ella la paz, la unidad y el amor.\r\nBendice a nuestros hermanos, protege a nuestros jóvenes. Concede tu ayuda a quienes padecen enfermedad o dolor, o se encuentran en soledad.\r\nSé nuestro amparo de cada día y danos tu amor.\r\nAmén.", "A", "", "")');
              tx.executeSql('INSERT INTO biblia VALUES(41391, 76, 41391, 41391, "site", 8, 82, 82, "Oración del Monaguillo (2)", "Señor, Te doy mi vida entera. Ayúdame a servir Enséñame a ser fiel y constante.\r\nHaz que irradie tu amor a los que me rodean. Que pueda ser testigo de tu mensaje en todas partes.\r\nQue pueda servirte con dignidad en el Altar y ponga en el servicio a Tí y a los demás, todo mi corazón.\r\nVírgen María, enséñame a amar y servir a Jesucristo como tu lo hiciste y como lo hacen contigo los ángeles del Cielo. \r\nAmén", "A", "", "")');
              tx.executeSql('INSERT INTO biblia VALUES(41392, 76, 41392, 41392, "site", 8, 83, 83, "Oración por las Vocaciones Franciscanas", "Oh Dios, Padre nuestro y Altísimo Señor, tu voluntad es que el Evangelio sea anunciado a todos, que la vida de Jesucristo llene la tierra y crezca en los corazones de los hombres.\r\nTe pedimos que llames Jóvenes para seguir mas de cerca la vida de Jesucristo como frailes menores conventuales.\r\nLlama a jóvenes que a través de su Fé, su amor y su alegría sean testigos valientes de tu Reino.\r\nProtégenos y haz que fieles al Evangelio y con el ejemplo de San Francisco de Asís, sirvamos al Señor y a todos los hermanos en pobreza y humildad.\r\nAsí construiremos un mundo mas fraterno y evangélico. Te lo pedimos por Jesucristo nuestro Señor.\r\nAmén", "A", "", "")');
              tx.executeSql('INSERT INTO biblia VALUES(41393, 76, 41393, 41393, "site", 8, 84, 84, "Oración de los Padres", "Señor, Padre Todopoderoso, Te damos gracias  por habernos dado la Bendición de nuestros hijos. Señor, ayúdanos a comprender a nuestros hijos, a escucharlos con paciencia, a contestar con cariño todas sus preguntas y permite que les enseñemos con amor.\r\nSeñor, no permitas que seamos un mal ejemplo para ellos.\r\nTe rogamos nos ilumines todas las horas del día para que podamos ser sus guías en el crecimiento de su Fé y de su experiencia de vida cristiana.\r\nSeñor, no permitas que los agredamos física o verbalmente con el pretexto de corregirlos.\r\nPor el contrario, que siempre tengamos para ellos Tiempo, Abrazos, Te Amo y Besos.\r\nSeñor, haznos tan justo, tan considerados y verdaderos amigos de nuestros hijos para que nos sigan por amor y no por temor.\r\nSeñor, te rogamos que permanezcas en nuestros corazones y nos llenes de tu amor.\r\nSeñor, Queremos ser como tu, para que valga la pena que nuestros hijos sean como nosotros.\r\nAmén.", "A", "", "")');

              //return true;
        }
      }, function (err) {
          alert('8. should be rolling back caused by: ' + err.message );
          return false;
      });
    }, function (err) {
        alert('9. should be rolling back caused by: ' + err.message );
        return false;
    });

$("#workingPerc").val("100%");
    //Ahora si, Buscar las citas según los parámetros,
      /*buscarCitas("citasHoy", 
       document.getElementById("lafecha").value,
       document.getElementById("semana").value,
       document.getElementById("dialit").value,
       document.getElementById("ciclo").value,
       document.getElementById("tipo").value,
       document.getElementById("tiempo").value,
       document.getElementById("color").value);
*/
  //stop loading
  $("#working").hide();
}
