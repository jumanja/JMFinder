/*!
 * JMDBlite Engine v0.1
 * https://jumanja.net/
 *
 * Copyright jumanja.net
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-04-11
 */

//JMDBlite
// JMDBlite.js
var db;
var cuantos;
var resultArray;
var JMDBlite = {
    open:  function(dbName, dbVersion, dbDesc, dbSize) {
        db = openDatabase(dbName, dbVersion, dbDesc, dbSize);
    },
    addRowTable: function(code) {
        $ ( '#newRowHeader' ).show();
        $ ( '#newRowFields' ).show();
        $ ( '#newRowButtons' ).show();
    },
    editRowTable: function(table, code) {
        $ ( '#editRowHeader' ).show();
        $ ( '#editRowFields' ).show();
        $ ( '#editRowButtons' ).show();
        
        $ ( '#editRow_code' ).val(code);
        $ ( '#editRow_code' ).attr("disabled", true);
        
        
        $.each($ ( '#'+table+'_'+code +' td'), function( index, value ) {
              // console.log( index + ": " + value );
              //console.log( this.id + ": " + this.innerText );
              var valores = this.id.split("_");
              $ ( '#editRow_' + valores[1] ).val(this.innerText);
        });      

    },
    statusColor:  function(obj) {
        if(obj.value == 'A') {
          obj.style.color = '#0000BB';
        } else if(obj.value == 'I') {
            obj.style.color = '#00BBBB';
        } else if(obj.value == 'R') {
            obj.style.color = '#BB0000';
        }
    },
    saveNewRow: function(table) {
    
        if($("#newRow_code").val() == "") {
            alert('Code can not be empty');
            return false;
        }
        
        var columnNames = $('#columnNames').val();
        var valores = columnNames.split(",");
        
        for(i = 0; i < valores.length; i++) {
            valores[i] = $('#newRow_' + valores[i]).val();
        }
        
        var stringValues = "";
        for(i = 0; i < valores.length; i++) {
            stringValues += ',"' + valores[i] + '" ';
        }
        stringValues = stringValues.substr(1);
        
        var task1 = ['task_insertRow' + table, 'Inserting into Table ' + table, 0, 
                '1 row inserted into ' + table + ' values for SQL:' + stringValues, 
                'Error inserting into ' + table];
                
        SQLs = [
                'SELECT count(1) as counter FROM '+ table + ' where code = "' + $("#newRow_code").val() + '" ',
                'INSERT INTO '+ table +'(' + columnNames + ') VALUES(' + 
                stringValues + 
                ')'
               ];
        JMDBlite.runSQLBlockWhenFirst(task1, SQLs, 0);

        JMDBlite.showGridTable(table, table);
    },
    saveEditRow: function(table) {
    
        if($("#editRow_code").val() == "") {
            alert('Code can not be empty');
            return false;
        }
        
        var columnNames = $('#columnNames').val();
        var valores = columnNames.split(",");
        
        for(i = 0; i < valores.length; i++) {
            valores[i] = valores[i] + " = '"+ $('#editRow_' + valores[i]).val() + "'";
        }
        
        var stringValues = "";
        for(i = 0; i < valores.length; i++) {
            stringValues += ', ' + valores[i] + ' ';
        }
        stringValues = stringValues.substr(1);
        
        var task1 = ['task_editRow' + table, 'Editing Table ' + table, 0, 
                '1 row edited ' + table + ' values for SQL:' + stringValues, 
                'Error editing ' + table];
                
                console.log( 'attempting SQL: ' + 'UPDATE '+ table +' SET ' + stringValues  );
                
        SQLs = [
                'SELECT count(1) as counter FROM '+ table + ' where code = "' + $("#editRow_code").val() + '" ',
                'UPDATE '+ table +' SET ' + stringValues + ' where code = "' + $("#editRow_code").val() + '" '
               ];
        JMDBlite.runSQLBlockWhenFirst(task1, SQLs, 1);

        JMDBlite.showGridTable(table, table);
    },
    statusChange: function(obj) {
        //alert('JMDBlite.statusChange');
        //alert(obj.id + ':' + obj.value);
        var res = obj.id.split("_");
        var codTabla = res[0];
        var key = res[1];
        var task1 = ['task_updStatus' + codTabla, 'Updating Table ' + codTabla, 0, 
                'Table ' + codTabla + ' updated', 
                'Error Updating ' + codTabla];

        JMDBlite.runSQL(task1, 'UPDATE ' + codTabla+ ' SET STATUS = "' + obj.value + '" WHERE code = "' + key + '"' );
        //obj.style = (obj.value =='A' ? "color:#0000BB" : (obj.value =='I' ? "color:#00BBBB" : "color:#BB0000"));
        JMDBlite.statusColor(obj);
        JMDBlite.refreshTableList();
    },
    showGridTable:  function(tableCode, tableName) {
          var taskGrid = ['task_showTable', 'Showing Table '+tableName+ ' on Grid', 0, 
              'Table '+tableName+' displayed',  
              'Error displaying Table '+tableName+ ' on Grid'];
          JMDBlite.gridFromSQL(taskGrid, tableCode, tableName, 'SELECT * from '+tableCode+' order by 2', 'gridTable');
          
    },
    readFileTypes:  function() {
          var task = ['task_readFileTypes', 'Reading File Types', 0, 
              'File Types Read',  
              'Error reading File Types'];
              
          JMDBlite.typesFromSQL(task, "SELECT * from filetypes where status = 'A'", "fileTypes");
          
    },
    readConfig:  function() {
          var task = ['task_readConfig', 'Reading Config', 0, 
              'Config Read',  
              'Error reading Config'];
              
          JMDBlite.linksFromSQL(task, "SELECT * from config where tipo='Link' and status = 'A' order by 3,1", "linksNavBar");
          
          task = ['task_readConfig', 'Reading Links', 0, 
              'Links Read',  
              'Error reading Links'];
          JMDBlite.pathsFromSQL(task, "SELECT * from config where tipo='Path' or tipo='Link' and status = 'A' order by 3,1", "pathsFieldSet");

          task = ['task_readConfig', 'Reading Paths', 0, 
              'Paths Read',  
              'Error reading Paths'];
          JMDBlite.textsFromSQL(task, "SELECT * from config where tipo='Text' and status = 'A' order by 3,1", "textsFieldSet");

          task = ['task_readConfig', 'Reading Projects', 0, 
              'Projects Read',  
              'Error reading Projects'];          
          JMDBlite.projsFromSQL(task, "SELECT A.*, B.name as pmanagername " +
                                      "from projects A INNER JOIN pmanagers B " +
                                      "ON b.code = a.pmanager " + 
                                      "where a.status = 'A' order by orden");
          
    },
    deleteRowTable:  function(table, code) {
        if(confirm("Are you sure you want to delete " + code + " from " + table + "? ")){
          var deleteTask = ['task_deleteRowTable', 'Deleting Row ' + code + ' from Table '+table, 0, 
                            'Code ' + code + ' from Table '+ table +' deleted',  
                            'Error Deleting code ' + code + ' from Table '+table];

          JMDBlite.runSQL(deleteTask, "DELETE FROM " + table + " WHERE CODE = '"+ code + "'");
          JMDBlite.showGridTable(table, table);
        }
    },
    deleteTable:  function(tableName) {
        if(confirm("Are you sure you want to delete " + tableName + "? ")){
          var deleteTask = ['task_deleteTable', 'Deleting Table '+tableName, 0, 'Table '+tableName+' deleted',  'Error Deleting Table '+tableName];
          JMDBlite.runSQL(deleteTask, 'DROP TABLE IF EXISTS '+ tableName);        
          JMDBlite.runSQL(deleteTask, "DELETE FROM TABLES WHERE CODE = '"+ tableName + "'");
          JMDBlite.refreshTableList();
        }
    },
    deleteAllTables:  function() {
        if(confirm("Are you sure you want to delete ALL TABLES ? ")){
          var deleteTask = ['task_deleteALL', 'Deleting Tables ', 0, 'Tables deleted',  'Error Deleting Tables '];
          JMDBlite.runSQL(deleteTask, 'DROP TABLE IF EXISTS config');
          JMDBlite.runSQL(deleteTask, 'DROP TABLE IF EXISTS help');
          JMDBlite.runSQL(deleteTask, 'DROP TABLE IF EXISTS pmanagers');
          JMDBlite.runSQL(deleteTask, 'DROP TABLE IF EXISTS filetypes');
          JMDBlite.runSQL(deleteTask, 'DROP TABLE IF EXISTS projects');
          JMDBlite.runSQL(deleteTask, 'DROP TABLE IF EXISTS tables');

          JMDBlite.refreshTableList();
        }
    },
    refreshTableList:  function() {
     var taskTables = ['task_showingTables', 'Displaying Tables Table', 0, 'Table Tables displayed', 'Error displaying Tables'];
     JMDBlite.listFromSQL(taskTables, 'SELECT * from tables order by 2', 'tableList');
    },
    init: function(dbName, dbVersion, dbDesc, dbSize) {
        //Open or Create DB
        //var db = openDatabase('LTVDB1.0', '1.0', 'LuzEnTuVida.net', 2 * 1024 * 1024);
        var mainTask, task1, task2, task3, task4;
        
        var mainTask = ['task_openCreateDB', 'Opening DataBase', 0, 'Database Opened',  'Error Opening DataBase'];
        JMDBlite.addTask(mainTask);
        db = openDatabase(dbName, dbVersion, dbDesc, dbSize);

        var codTabla, nomTabla, SQLS;
        
        //Begin Tables
        codTabla = "tables";
        nomTabla = "Tables";
        task1 = ['task_create' + nomTabla, 'Creating Table ' + nomTabla, 0, 
                'Table ' + nomTabla + ' created', 
                'Error Creating ' + nomTabla];

        JMDBlite.runSQL(task1, 'CREATE TABLE IF NOT EXISTS '+ codTabla +' ( code varchar, ' +
                              'name varchar, status varchar)');


        SQLs = [
                'SELECT count(1) as counter FROM '+ codTabla ,
                'INSERT INTO '+ codTabla +' VALUES("config", "Config", "A")',
                'INSERT INTO '+ codTabla +' VALUES("help", "Help", "A")',
                'INSERT INTO '+ codTabla +' VALUES("projects", "Projects", "A")',
                'INSERT INTO '+ codTabla +' VALUES("tables", "Tables", "A")',
                'INSERT INTO '+ codTabla +' VALUES("filetypes", "File types", "A")',
                'INSERT INTO '+ codTabla +' VALUES("pmanagers", "Project Managers", "A")'
               ];
        task2 = ['task_populate' + nomTabla, 'Populating ' + nomTabla, 0, 
                'Table ' + nomTabla + ' populated',  
                'Error Populating ' + nomTabla];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        
        //task3 = ['task_showingPManagers', 'displaying La Tabla PManagers', 0, 'Table PManagers mostrada', 'Error displaying PManagers'];
        //JMDBlite.consoleFromSQL(task3, 'SELECT * from pmanagers');
        //End Tables
        
        //Begin PManagers
        codTabla = "pmanagers";
        nomTabla = "PManagers";
        task1 = ['task_create' + nomTabla, 'Creating Table ' + nomTabla, 0, 
                'Table ' + nomTabla + ' created', 
                'Error Creating ' + nomTabla];

        JMDBlite.runSQL(task1, 'CREATE TABLE IF NOT EXISTS '+ codTabla +' ( code varchar, ' +
                              'name varchar, status varchar)');


        SQLs = [
                'SELECT count(1) as counter FROM '+ codTabla ,
                'INSERT INTO '+ codTabla +' VALUES("agomez", "Alejandro", "A")',
                'INSERT INTO '+ codTabla +' VALUES("egonzale", "Edgar", "A")',
                'INSERT INTO '+ codTabla +' VALUES("ecampos", "Eduardo", "A")',
                'INSERT INTO '+ codTabla +' VALUES("rsalcedo", "Ricardo", "A")'  
               ];
        task2 = ['task_populate' + nomTabla, 'Populating ' + nomTabla, 0, 
                'Table ' + nomTabla + ' populated',  
                'Error Populating ' + nomTabla];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        SQLs = [
                'SELECT count(1) as counter FROM tables where code = "'+ codTabla +'"',
                'INSERT INTO tables VALUES("pmanagers", "Project Managers")'  
               ];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        
        //task3 = ['task_showingPManagers', 'displaying La Tabla PManagers', 0, 'Table PManagers mostrada', 'Error displaying PManagers'];
        //JMDBlite.consoleFromSQL(task3, 'SELECT * from pmanagers');
        //End PManagers        

        //Begin Config
        codTabla = "config";
        nomTabla = "Config";
        task1 = ['task_create' + nomTabla, 'Creating Table ' + nomTabla, 0, 
                'Table ' + nomTabla + ' created', 
                'Error Creating ' + nomTabla];

        JMDBlite.runSQL(task1, 'CREATE TABLE IF NOT EXISTS '+ codTabla +' ( code varchar, name varchar, tipo varchar, ' +
                              'value varchar, status varchar)');


        SQLs = [
                'SELECT count(1) as counter FROM '+ codTabla ,
                "INSERT INTO "+ codTabla +" VALUES('OSSearchCmdline', 'Operating System Search and Command Line', 'Path', 'findstr /s /I /N /C:\"{0}\" \"{1}\\*.{2}\"', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('mergeEditorSoftware', 'Merge Editor Software', 'Link', '\"C:\\Program Files (x86)\\WinMerge\\WinMergeU.exe\"', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('mergeSoftwareCmdline', 'Merge Software Path and Command Line', 'Path', '\"C:\\Program Files (x86)\\WinMerge\\WinMergeU.exe\" /ul /ur \"{0}\" \"{1}\"', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('textEditorSoftware', 'Text Editor Software', 'Link', '\"C:\\CSI\\notepad2_4.2.25_x64\\Notepad2.exe\"', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('txtEditorCmdline', 'Text Editor Software Path and Command Line', 'Path', '\"C:\\CSI\\notepad2_4.2.25_x64\\Notepad2.exe\" /g {0} \"{1}\"', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('javaEditorSoftware', 'Java Editor Software', 'Link', '\"C:\\eclipse\\eclipse.exe\"', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('salutationPManager', 'Text for PManager', 'Text', 'Dear {0}, Could you please coordinate TimeSheet Assignation of {1} hour(s) under this AR ? Thanks in Advance.', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('salutationMirror', 'Text for Mirror Update', 'Text', 'Dear Boris,{enter}Could you please address for mirror update next filelist ? Thanks in advance :{enter}', 'A')",
                "INSERT INTO "+ codTabla +" VALUES('closingCRM', 'Text for Closing CRM', 'Text', 'Best Regards,{enter}Juan.{enter}', 'A')"
               ];
        task2 = ['task_populate' + nomTabla, 'Populating ' + nomTabla, 0, 
                'Table ' + nomTabla + ' populated',  
                'Error Populating ' + nomTabla];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        SQLs = [
                'SELECT count(1) as counter FROM tables where code = "'+ codTabla +'"',
                'INSERT INTO tables VALUES("config", "Config")'  
               ];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        
        //task3 = ['task_showingPManagers', 'displaying La Tabla PManagers', 0, 'Table PManagers mostrada', 'Error displaying PManagers'];
        //JMDBlite.consoleFromSQL(task3, 'SELECT * from pmanagers');
        //End Config
        


        //Begin filetypes
        codTabla = "filetypes";
        nomTabla = "FileTypes";
        task1 = ['task_create' + nomTabla, 'Creating Table ' + nomTabla, 0, 
                'Table ' + nomTabla + ' created', 
                'Error Creating ' + nomTabla];

        JMDBlite.runSQL(task1, 'CREATE TABLE IF NOT EXISTS '+ codTabla +' ( code varchar, ' +
                              'value varchar, status varchar)');


        SQLs = [
                'SELECT count(1) as counter FROM '+ codTabla ,
                'INSERT INTO '+ codTabla +' VALUES("js", "js", "A")',
                'INSERT INTO '+ codTabla +' VALUES("properties", "properties", "A")',
                'INSERT INTO '+ codTabla +' VALUES("html", "htm?", "A")',
                'INSERT INTO '+ codTabla +' VALUES("xml", "xml", "A")',
                'INSERT INTO '+ codTabla +' VALUES("xslt", "xslt", "A")',
                'INSERT INTO '+ codTabla +' VALUES("sql", "sql", "A")',
                'INSERT INTO '+ codTabla +' VALUES("css", "css", "A")',
                'INSERT INTO '+ codTabla +' VALUES("java", "java", "A")',
                'INSERT INTO '+ codTabla +' VALUES("log", "log*", "A")',
                'INSERT INTO '+ codTabla +' VALUES("other", "*", "A")'  
               ];
        task2 = ['task_populate' + nomTabla, 'Populating ' + nomTabla, 0, 
                'Table ' + nomTabla + ' populated',  
                'Error Populating ' + nomTabla];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        SQLs = [
                'SELECT count(1) as counter FROM tables where code = "'+ codTabla +'"',
                'INSERT INTO tables VALUES("filetypes", "File Types")'  
               ];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        
        //task3 = ['task_showingPManagers', 'displaying La Tabla PManagers', 0, 'Table PManagers mostrada', 'Error displaying PManagers'];
        //JMDBlite.consoleFromSQL(task3, 'SELECT * from pmanagers');
        //End filetypes


        //Begin help
        codTabla = "help";
        nomTabla = "Help";
        task1 = ['task_create' + nomTabla, 'Creating Table ' + nomTabla, 0, 
                'Table ' + nomTabla + ' created', 
                'Error Creating ' + nomTabla];

        JMDBlite.runSQL(task1, 'CREATE TABLE IF NOT EXISTS '+ codTabla +' ( code varchar, ' +
                              'value varchar, status varchar)');


        SQLs = [
                'SELECT count(1) as counter FROM '+ codTabla ,
                'INSERT INTO '+ codTabla +' VALUES("acercade", "jmanjarres@banktrade.com", "A")'
               ];
        task2 = ['task_populate' + nomTabla, 'Populating ' + nomTabla, 0, 
                'Table ' + nomTabla + ' populated',  
                'Error Populating ' + nomTabla];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        SQLs = [
                'SELECT count(1) as counter FROM tables where code = "'+ codTabla +'"',
                'INSERT INTO tables VALUES("help", "Help")'  
               ];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        
        //task3 = ['task_showingPManagers', 'displaying La Tabla PManagers', 0, 'Table PManagers mostrada', 'Error displaying PManagers'];
        //JMDBlite.consoleFromSQL(task3, 'SELECT * from pmanagers');
        //End help

        //Begin projects
        codTabla = "projects";
        nomTabla = "Projects";
        task1 = ['task_create' + nomTabla, 'Creating Table ' + nomTabla, 0, 
                'Table ' + nomTabla + ' created', 
                'Error Creating ' + nomTabla];

        JMDBlite.runSQL(task1, 'CREATE TABLE IF NOT EXISTS '+ codTabla +' ( code varchar, ' +
                              'shortname varchar, ' +
                              'country varchar, ' +
                              'pmanager varchar, ' +
                              'ruta varchar, ' +
                              'rutaCRM varchar, ' +
                              'orden varchar, ' +
                              'status varchar)');


        SQLs = [
                'SELECT count(1) as counter FROM '+ codTabla ,
                'INSERT INTO '+ codTabla +' VALUES("BBVACO55", "BBVA COL 5.5", "CO", "agomez", '+
                      '"C:\\eclipseprojects\\ClientTrade\\ClientTrade 5.0_release 5.5_env\\BBVA", ' +
                      '"$SOS Path=$ClientTrade/ClientTrade 5.0_release 5.5_env BBVA/", "3", "A")',
                'INSERT INTO '+ codTabla +' VALUES("BBVACO71", "BBVA COL 7.1 NEW", "CO", "agomez", '+
                      '"C:\\eclipseprojects\\ClientTrade\\ClientTrade 7.1_env\\BBVA Colombia (LATAM)", '+
                      '"$SOS Path=$/ClientTrade/ClientTrade 7.1_env/BBVA Colombia (LATAM)/", "1", "A")',
                'INSERT INTO '+ codTabla +' VALUES("BBVACO71OLD", "BBVA COL 7.1 OLD", "CO", "agomez", ' +
                      '"C:\\eclipseprojects\\ClientTrade\\ClientTrade 7.1", ' +
                      '"$SOS Path=$/ClientTrade/ClientTrade 7.1/", "8", "I")',
                'INSERT INTO '+ codTabla +' VALUES("BBVASP", "BBVA SP 6.0", "ES", "agomez", ' +
                      '"C:\\eclipseprojects\\ClientTrade\\ClientTrade 6.0_env\\BBVASP Phase B", ' +
                      '"$SOS Path=$/ClientTrade/ClientTrade 6.0_env/BBVASP Phase B", "2", "A")',
                'INSERT INTO '+ codTabla +' VALUES("BBVAMX", "BBVA MX 6.0", "MX", "ecampos", '+
                      '"C:\\eclipseprojects\\ClientTrade\\ClientTrade 6.0_env\\BBVA-Bancomer Mexico", ' +
                      '"$SOS Path=$/ClientTrade/ClientTrade 6.0_env/BBVA-Bancomer Mexico", "5", "A")',
                'INSERT INTO '+ codTabla +' VALUES("OCCID", "OCCID 6.0", "CO", "egonzale", ' +
                      '"C:\\eclipseprojects\\ClientTrade\\ClientTrade 6.0_env\\Banco de Occidente (OCCID)", ' +
                      '"$SOS Path=$/ClientTrade/ClientTrade 6.0_env/Banco de Occidente (OCCID)", "4", "A")',
               ];
        task2 = ['task_populate' + nomTabla, 'Populating ' + nomTabla, 0, 
                'Table ' + nomTabla + ' populated',  
                'Error Populating ' + nomTabla];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        SQLs = [
                'SELECT count(1) as counter FROM tables where code = "'+ codTabla +'"',
                'INSERT INTO tables VALUES("projects", "Projects")'
               ];
        JMDBlite.runSQLBlockWhenFirst(task2, SQLs, 0);
        
        //task3 = ['task_showingPManagers', 'displaying La Tabla PManagers', 0, 'Table PManagers mostrada', 'Error displaying PManagers'];
        //JMDBlite.consoleFromSQL(task3, 'SELECT * from pmanagers');
        //End projects

        
        //MainTask Completed
        JMDBlite.completeTask(mainTask);
        
    },
    getDB: function(){
        return db;
    },
    addTask: function(task) {
          if( $("#" + task[0]).length > 0) {
              JMDBlite.updateTask(task);
          } else {
              $("#taskList").append(
                '<li id="' + task[0] + '">' +
                '<span><label>' + task[1] + '</label>&nbsp;&nbsp;&nbsp;' +
                '<code>' + task[2] + '</code>' +
                '</span>' +
                '</li>');
          }
    },
    updateTask: function(task) {
          $("#" + task[0]).find("label").html(task[3]);     //descr succesful
          $("#" + task[0]).find("code").html(task[2]);      //porcentaje
    },
    completeTask: function(task) {
          $("#" + task[0]).find("label").html(task[3]);     //descr succesful
          $("#" + task[0]).find("code").html(100);      //porcentaje
    },
    errorTask: function(task) {
          $("#" + task[0]).find("label").html(task[4]);     //descr succesful
          $("#" + task[0]).find("code").html(-1);      //porcentaje
    },
    textsFromSQL: function(task, SQL, divID) {  
        JMDBlite.addTask(task);
        $("#"+divID).html();
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
                    $("#"+divID).append("<legend>&nbsp;Text Helpers&nbsp;</legend>");
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        //console.log(results.rows.item(i));
                        
                        //$("#" + results.rows.item(i).code).val(results.rows.item(i).value);
                        $("#"+divID).append(results.rows.item(i).name + ":" + 
                                                  "<input class='longInput' " + 
                                                  "type='text' id='"+results.rows.item(i).code+"' " +
                                                  "value='" + results.rows.item(i).value + "'><br>" );
                    }

                    JMDBlite.completeTask(task);
              }, function (err) {
                    alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    pathsFromSQL: function(task, SQL, divID) {  
        JMDBlite.addTask(task);
        $("#"+divID).html();
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
                    $("#"+divID).append("<legend>&nbsp;Paths and Parameters&nbsp;</legend>");
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        //console.log(results.rows.item(i));
                        
                        //$("#" + results.rows.item(i).code).val(results.rows.item(i).value);
                        $("#"+divID).append(results.rows.item(i).name + ":" + 
                                                  "<input class='longInput' " + 
                                                  "type='text' id='"+results.rows.item(i).code+"' " +
                                                  "value='" + results.rows.item(i).value + "'><br>" );
                    }

                    JMDBlite.completeTask(task);
              }, function (err) {
                    alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    typesFromSQL: function(task, SQL, divID) {  
        JMDBlite.addTask(task);

        //console.log("typesFromSQL SQL:" + SQL);
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
                    var ft = $('#' + divID);
                    var bar = $('#contBarra');
                    ft.append('&nbsp;&nbsp;<input type="checkbox" class="selChk" id="extAll" ' +
                              'value="0" onclick="JMFinder.toogleAllCheck(this)" checked>Select All');
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        
                        if(results.rows.item(i).code == 'other'){
                          ft.append('<br>');
                        }
                        
                        ft.append('&nbsp;&nbsp;<input type="checkbox" class="selChk" id="ext'+results.rows.item(i).code+
                                  '" value="'+results.rows.item(i).value+'" checked><label id="label_ext' +
                                  results.rows.item(i).code+'">'+results.rows.item(i).code+'</label>');

                        if(results.rows.item(i).code == 'other'){
                            ft.append('&nbsp;&nbsp;<input type="text" id="inputextother" value="'+results.rows.item(i).value+'">');
                        }
                        
                        bar.append('<div class="pbarLeft" style="display:none;" id="progressBar_ext'+results.rows.item(i).code+'" >&nbsp;</div>');
                        //console.log(results.rows.item(i));
                    }
                    
                    //$('.flipster').flipster('index');
                    //console.log("projsFromSQL is done");
                                 
                    JMDBlite.completeTask(task);
              }, function (err) {
                    alert('projsFromSQL: 1 Transaction Rolled Back caused by: ' + err.message  + "\n" +
                    SQL);
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              alert('projsFromSQL: 2 Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    projsFromSQL: function(task, SQL) {  
        JMDBlite.addTask(task);

        //console.log("projsFromSQL SQL:" + SQL);
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
                    //$("#"+divID).append("<legend>&nbsp;Paths and Parameters&nbsp;</legend>");                   
                    //var ul = $('.flipster ul');
                    var ul = $('#projectsul');
                    ul.html();
                    //console.log("projsFromSQL ul:" + ul);
                    
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        
                        //Generate flipster content style="display:inline;"
                        ul.append('<li ><a '+
                                  ' title="'+results.rows.item(i).shortname+'" '+
                                  ' id="anchor_'+i+'" class="linkTaskList" onclick="JMFinder.setProject(this.id,\''+
                                  results.rows.item(i).ruta.replace(/\\/g, '\\\\')+'\', \''+
                                  results.rows.item(i).rutaCRM+'\', \''+
                                  results.rows.item(i).pmanagername+'\')" '+
                                  '><img style="vertical-align:middle" width="32px" height="32px" id="img_'+i+'" src="img/flags/' + results.rows.item(i).country + '.png" />' +
                                  '&nbsp;<label>' + results.rows.item(i).code + '</label></a></li>');
                                  //results.rows.item(i).shortname + ' (' + results.rows.item(i).code + ')</a></li>');

                        //console.log(results.rows.item(i));
                    }
                    
                    //$('.flipster').flipster('index');
                    //console.log("projsFromSQL is done");
                                 
                    JMDBlite.completeTask(task);
              }, function (err) {
                    alert('projsFromSQL: 1 Transaction Rolled Back caused by: ' + err.message  + "\n" +
                    SQL);
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              alert('projsFromSQL: 2 Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    linksFromSQL: function(task, SQL, divID) {  
        JMDBlite.addTask(task);
        $("#"+divID).html();
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
                    //$("#"+divID).append("<legend>&nbsp;Paths and Parameters&nbsp;</legend>");                   
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        //console.log(results.rows.item(i));
                        
                        //$("#" + results.rows.item(i).code).val(results.rows.item(i).value);
                        $("#"+divID).append("<img alt='" + results.rows.item(i).name + "' " + 
                                            " alt='" + results.rows.item(i).name + "' " + 
                                            " title='" + results.rows.item(i).name + "' " + 
                                            " id='" + results.rows.item(i).name + "' " + 
                                            " src='img\\" + results.rows.item(i).code + ".png' " + 
                                            ' onerror="this.onerror=null;this.src=\'img/application_go'+i+'.png\'" ' + 
                                            ' onclick="JMFinder.launch(\'' + results.rows.item(i).code + '\');" >&nbsp;&nbsp;' );

                    }
                    $("#"+divID).append("<img alt='Help' title='Help' id='help' src='img\\help.png' " +
                                        "onclick='JMFinder.launchHelp();' class='progRight'>");
                    $("#"+divID).append("<img alt='Settings' title='Settings' id='tools' src='img\\setting_tools.png' " +
                                        "onclick='JMFinder.launchTools();' class='progRight'>");
                                 
                    JMDBlite.completeTask(task);
              }, function (err) {
                    alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    consoleFromSQL: function(task, SQL) {  
        JMDBlite.addTask(task);
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        //alert(results.rows.item(i).text);
                        //console.log(results.rows.item(i)['code']);
                        //console.log(results.rows.item(i)[0]);
                        console.log(results.rows.item(i));
                        
                        /*$.each(results.rows.item(i), function( index, value ) {
                          //alert( index + ": " + value );
                          console.log( index + ": " + value );
                        });*/
                    }

                    JMDBlite.completeTask(task);
              }, function (err) {
                    alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    listFromSQL: function(task, SQL, divID) {  
        $("#" + divID ).html("");
        JMDBlite.addTask(task);
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        //alert(results.rows.item(i).text);
                        //console.log(results.rows.item(i)['code']);
                        //console.log(results.rows.item(i)[0]);
                        
                        //console.log(results.rows.item(i));
                        
                        $("#" + divID ).append(
                          '<li id="' + results.rows.item(i).code + '">' +
                          '<span>&nbsp;&nbsp;'+
                          '<a class="linkTaskList" href="#" onclick="JMDBlite.showGridTable(\''+results.rows.item(i).code+'\', \''+results.rows.item(i).name+'\')" ' +
                          '<label>' + results.rows.item(i).name + '</label>&nbsp;&nbsp;&nbsp;' +
                          '<code>(' + results.rows.item(i).code + ')</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                          '</a>' +
                          '</span>' +
                          '</li>');

                        
                        /*$.each(results.rows.item(i), function( index, value ) {
                          //alert( index + ": " + value );
                          console.log( index + ": " + value );
                        });*/
                    }

              }, function (err) {
                    //alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              //alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    gridFromSQL: function(task, code, name, SQL, tableID) {  
        var thead = $("#" + tableID ).find("thead");
        var tbody = $("#" + tableID ).find("tbody");
        var tfoot = $("#" + tableID ).find("tfoot");
        
        thead.html("");
        tbody.html("");
        tfoot.html('<tr><th colspan="20" style="text-align:left"><a href="#" onclick="JMDBlite.addRowTable(\''+code+'\')">' + 
                   '&nbsp;<img src="img/add.png" style="vertical-align:middle">&nbsp;Add a Row</a></th></tr>');
        
        JMDBlite.addTask(task);
        
        //When the table is empty, we need to retrieve columns from sqlitemaster
        /*var tableHeader = "";
                        if(len == 0) {
                        
                        SELECT sql FROM sqlite_master
                        WHERE tbl_name = 'table_name' AND type = 'table'
                        }
*/
        db.transaction(function (tx) {
             tx.executeSql("SELECT sql FROM sqlite_master WHERE " +
                           "tbl_name = '" + code + "' AND type = 'table'", [], function (tx, results) {
                           
                    var tableContent = "<tr><th colspan='20'><h3 style='text-align:center'>" + 
                                        ( name == code ? code + " Table" : " Table "+name+" ("+code+")") + 
                                       '<a class="linkTaskListDelete" href="#" onclick="JMDBlite.deleteTable(\''+code+'\')" >' +
                                       '<img style="vertical-align:middle" alt="Delete '+code+' table" '+
                                       'title="Delete '+code+' table" src="img/delete32.png"></a>' +
                                       "</h3></th></tr>";

                    //var columnNames = results.rows.item(0).sql.replace(/^[^\(]+\(([^\)]+)\)/g, '$1').replace(/ [^,]+/g, '').split(',');
                    var columnNames = results.rows.item(0).sql;
                    columnNames = columnNames.replace(/CREATE TABLE/g, '');
                    columnNames = columnNames.replace(/varchar/g, '');
                    columnNames = columnNames.split(",");
                    columnNames[0] = columnNames[0].split("(")[1];
                    columnNames[columnNames.length-1] = columnNames[columnNames.length-1].split(")")[0];
                    columnNames = columnNames.join(',');
                    columnNames = columnNames.replace(/ /g, '');
                    columnNames = columnNames.split(",");
                      //console.log(columnNames);

                    tableContent += "<input id='columnNames' type='hidden' " + 
                                    "value='" + columnNames + "'>";
                    tableContent += "<tr>";
                    tableContent += "<th colspan='5' width='15%'>Actions</th>";
  
                    var len = columnNames.length;
                    for (i = 0; i < len; i++) {
                        //alert(results.rows.item(i).text);
                        //console.log(results.rows.item(i)['code']);
                        //console.log(results.rows.item(i)[0]);
                        
                        //console.log(columnNames[i]);
                          
                          
                          tableContent += "<th>" + columnNames[i] + "</th>";
                    }
                    
                    tableContent += "</tr>";
                    
                    thead.html(tableContent);
                    
                    tableContent = "";
                    
                    //
                    //Additional Empty Row for Insert for tfoot
                    //
                    tableContent += "<tr style='display:none' id='newRowHeader'>";
                    tableContent += "<th colspan='5' width='15%'>Actions</th>";
  
                    var len = columnNames.length;
                    for (i = 0; i < len; i++) {
                        //alert(results.rows.item(i).text);
                        //console.log(results.rows.item(i)['code']);
                        //console.log(results.rows.item(i)[0]);
                        
                        //console.log(columnNames[i]);
                          
                          
                          tableContent += "<th>" + columnNames[i] + "</th>";
                    }
                    
                    tableContent += "</tr>";


                    tableContent += "<tr style='display:none' id='newRowFields' >";
                    tableContent += "<th colspan='5' width='15%'>New Row:</th>";
  
                    var len = columnNames.length;
                    for (i = 0; i < len; i++) {
                        //alert(results.rows.item(i).text);
                        //console.log(results.rows.item(i)['code']);
                        //console.log(results.rows.item(i)[0]);
                        
                        //console.log(columnNames[i]);
                          
                          
                          if(columnNames[i] == 'status'){
                            tableContent += "<th><select style='color:#0000BB' " +
                                  'id="newRow_' + columnNames[i] + '" onchange="JMDBlite.statusColor(this)">' +
                                  '<option selected style="color:#0000BB" value="A">Active</option>' + 
                                  '<option style="color:#00BBBB" value="I">Inactive</option>' + 
                                  '<option style="color:#BB0000" value="R">Retired</option>' + 
                                '</select>';
                                
                            
                          }else{
                            tableContent += "<th><input id='newRow_" + columnNames[i] + "'></th>";
                          }
                    }
                    
                    tableContent += "</tr>";
                    
                    tableContent += '<tr style="display:none" id="newRowButtons">' +
                                    '<th colspan="20"><a href="#" id="saveNewRow" ' + 
                                    'onclick="JMDBlite.saveNewRow(\''+code+'\');">' +
                                    '<img src="img/diskette.png">Save</a></th></tr>';
                                       
                    tfoot.append(tableContent);
                    
                    //Additional for Edit - replace(/varchar/g, '');
                    tableContent = tableContent.replace(/New Row/g, 'Edit');
                    tableContent = tableContent.replace(/newRow/g, 'editRow');
                    tableContent = tableContent.replace(/saveNewRow/g, 'saveEditRow');
                    tfoot.append(tableContent);
                           
              }, function (err) {
                    //alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              //alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });
                        

        db.transaction(function (tx) {
              //alert(SQL);
              tx.executeSql(SQL, [], function (tx, results) {

                    var tableContent = "";
                    
                    /*var tableContent = "<br><h3 style='text-align:center'>Table "+name+" ("+code+") " +
                                       '<a class="linkTaskListDelete" href="#" onclick="JMDBlite.deleteTable(\''+code+'\')" >' +
                                       '<img style="vertical-align:middle" alt="Delete '+code+' table" title="Delete '+code+' table" src="img/delete32.png"></a>' +
                                       "</h3>";
                    */
                    //tableContent += '<a href="#" onclick="JMDBlite.addRowTable(\''+code+'\')">' + 
                    //                '&nbsp;<img src="img/add.png" style="vertical-align:middle">Add a Row</a>';
                    //tableContent += "<table class='tableGrid'>";

                    resultArray = results;
                    
                    var len = results.rows.length;
                    for (i = 0; i < len; i++) {
                        //alert(results.rows.item(i).text);
                        //console.log(results.rows.item(i)['code']);
                        //console.log(results.rows.item(i)[0]);
                        
                        //console.log(results.rows.item(i));
                        if(i == 99999) {
                          
                          //tableContent += "<thead><tr>";
                          tableContent += "<tr>";
                          tableContent += "<th colspan='5' width='15%'>Actions</th>";
                          
                          $.each(results.rows.item(i), function( index, value ) {
                                //console.log( index + ": " + value );
                                tableContent += "<th>" + index + "</th>";
                          });
                          
                          //tableContent += "</tr></thead><tbody>";
                          tableContent += "</tr>";

                        }
                        
                        tableContent += '<tr id="' + code + '_' + results.rows.item(i).code + '">';
                        tableContent += "<th colspan='5'>" +
                                        '<a class="linkTaskListEdit" href="#" ' +
                                        ' onclick="JMDBlite.editRowTable(\''+code+'\', \''+results.rows.item(i).code+'\')" >' +
                                        "<img src='img/pencil.png' title='Edit "+results.rows.item(i).code+" Row' "+
                                        "alt='Edit "+results.rows.item(i).code+" Row' ></a>" +
                                        '<a class="linkTaskListDelete" href="#" ' +
                                        ' onclick="JMDBlite.deleteRowTable(\''+code+'\', \''+results.rows.item(i).code+'\')" >' +
                                        "<img src='img/delete16.png' title='Delete "+results.rows.item(i).code+" Row' "+
                                        "alt='Delete "+results.rows.item(i).code+" Row' class='progRight'></a></th>";
                        
                        $.each(results.rows.item(i), function( index, value ) {
                              //console.log( index + ": " + value );
                              if(index == 'status'){
                              
                                var styleThis = (value =='A' ? "color:#0000BB" : (value =='I' ? "color:#00BBBB" : "color:#BB0000"));
                                
                                tableContent += "<td>" + 
                                '<select style="' + styleThis + '" ' +
                                  'id="'+code+'_'+results.rows.item(i).code+"_"+index+'" onchange="JMDBlite.statusChange(this)">' +
                                  '<option style="color:#0000BB" ' + (value =='A' ? " selected " : "") + 
                                  'value="A">Active</option>' + 
                                  '<option style="color:#00BBBB" ' + (value =='I' ? " selected " : "") + 
                                  'value="I">Inactive</option>' + 
                                  '<option style="color:#BB0000" ' + (value =='R' ? " selected " :"") + 
                                  'value="R">Retired</option>' + 
                                '</select>' +
                                "</td>";
                              } else {
                                tableContent += '<td id="'+code+'_'+index+'_'+i+'">' + value + "</td>";
                              }
                        });

                        tableContent += "</tr>";
                        
                        //last item to show
                        if(i == len-1999999) {
                          //tableContent += "</tbody>";
                        }
                        
                    }

                      //tableContent += "<tfooter><tr></tr></tfooter>";
                      //tableContent += "</table>";
                      
                      //$("#" + divID ).append(tableContent);
                      $("#" + tableID ).find("tbody").html(tableContent);

              }, function (err) {
                    //alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              //alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });
        
        /*$("#" + tableID ).find("tfoot").html( '<tr><th colspan="20" style="text-align:left"><a href="#" onclick="JMDBlite.addRowTable(\''+code+'\')">' + 
                                    '&nbsp;<img src="img/add.png" style="vertical-align:middle">Add a Row</a></th></tr>');
      */
    },
    runSQL: function(task, SQL) {  
        //console.log(SQL);
        JMDBlite.addTask(task);
        db.transaction(function (tx) {
              tx.executeSql(SQL, [], function (tx, results) {
              JMDBlite.completeTask(task);
              }, function (err) {
                    alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                    JMDBlite.errorTask(task);
                    return false;
              });
        }, function (err) {
              alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    runSQLBlock: function(task, SQL) {  
        JMDBlite.addTask(task);
        db.transaction(function (tx) {
              for (i = 0; i < SQL.length; i++) { 
                 tx.executeSql(SQL[i]);
                 task[2] = (i * 100) / SQL.length;
                 JMDBlite.updateTask(task);
              }
        }, function (err) {
              alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    },
    runSQLBlockWhenFirst: function(task, SQL, value) {  
        JMDBlite.addTask(task);
        db.transaction(function (tx) {
              tx.executeSql(SQL[0], [], function (tx, results) {
              if(results.rows.item(0).counter == value) {
                  for (i = 1; i < SQL.length; i++) { 
                     tx.executeSql(SQL[i]);
                     task[2] = (i * 100) / SQL.length;
                     JMDBlite.updateTask(task);
                  }
              }
              JMDBlite.completeTask(task);
          }, function (err) {
                alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
                JMDBlite.errorTask(task);
                return false;
          });              
        }, function (err) {
              alert(task[0] + ' Transaction Rolled Back caused by: ' + err.message );
              JMDBlite.errorTask(task);
              return false;
        });

    }

}
