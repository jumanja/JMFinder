/*!
 * JMFinder Engine v0.1
 * https://jumanja.net/
 *
 * Copyright jumanja.net
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-03-03
 */

      //    var os = require('os');
      //    var gui = require('nw.gui');
      //   var win = nw.Window.get();
        
        /*var fs = require('fs');
var os = require('os');
document.write('You are running on ', os.platform());*/

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');

var exec;     // = require('child_process');

//JMFinder
// JMFinder.js
var JMFinder = {
    init: function() {
    
          $('#toolsContent').hide();
    //windos.showDevTools();
          document.onkeydown = function (pressed) {
              if ( pressed.ctrlKey === true && pressed.keyCode === 67 ) {
                  pressed.preventDefault();
                  // We can not create a clipboard, we have to receive the system clipboard
                  var clipboard = nw.Clipboard.get();

                  // Read from clipboard                  
                  clipboard.set(window.getSelection().toString()) ;

                  return false;
              //Check CTRL + F5 keys and hard refresh the page
              } else if ( pressed.ctrlKey === true && pressed.keyCode === 116 ) {
                  pressed.preventDefault();
                  //win.reloadDev();
                  location.reload();
                  
                  return false;
              //Check Shift + F5 keys and refresh ignoring cache
              } else if ( pressed.shiftKey === true && pressed.keyCode === 116 ) {
                  pressed.preventDefault();
                  //win.reloadIgnoringCache();
                  location.reload();
                  return false;
              //Check F5 key and soft refresh
              } else if ( pressed.keyCode === 116 ) {
                  pressed.preventDefault();
                  //win.reload();
                  location.reload();
                  return false;
              //Check F12 or Ctrl+Shift+I and display Webkit Dev Tools
              } else if ( pressed.keyCode === 123 || pressed.ctrlKey === true && pressed.shiftKey === true && pressed.keyCode === 73 ) {
                  pressed.preventDefault();
                  //win.showDevTools();
                  require('remote').getCurrentWindow().toggleDevTools();
                  return false;
              }
          }
          
            
            //overwrite contains to make it case insensitive
            $.expr[":"].contains = $.expr.createPseudo(function(arg) {
              return function( elem ) {
                  return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
              };
            });

          //end flipster
    },
    launchTools: function () {
        $('#toolsContent').toggle("slow");
        $('#content').toggle("slow");
    },
    launchHelp: function () {
        // Create a new window and get it
        //var new_win = nw.Window.open('help/index.html');
        const modalPath = path.join('file://', __dirname, 'help/index.html');
        let win = new BrowserWindow({ width: 400, height: 320 });
        win.on('close', function () { win = null });
        win.loadURL(modalPath);
        win.show();
    },
    launch: function(objid) {
         //alert("icon " + objid);
        var exec = require('child_process').exec($('#' + objid).val(),
        function (error, stdout, stderr) {
          if (error !== null) {
                        console.log('stdout: ' + stdout)
                        console.log('stderr: ' + stderr);
                        console.log('exec error: ' + error);

          }
        });
    },
    parseParams: function(miCadena, arguments) {
        var formatted = miCadena;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{'+i+'\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    },
    cleanTaskList: function() {
        $("#taskList").options  = [];
    },
    subeBarra: function(ext){
        //alert(ext);
        if($("#progressBar_" + ext)[0] != undefined){
         $("#progressBar_" + ext)[0].style.display = "block";
        }
    },
    bajaBarra: function(ext){
          //alert(ext);
        if($("#progressBar_" + ext)[0] != undefined){
         $("#progressBar_" + ext)[0].style.display = "none";
        }
    },
    actualizaBarra: function(){
        if($("#progressBar_" + ext)[0] != undefined){
         $("#progressBar_" + ext)[0].style.backgroundcolor = "#ccffaa";
        }
    },
    compareSelected: function(){
          var matches = [];
          $(".selbox:checked").each(function() {
                if(matches.length < 2) {
                    matches.push(this.title);
                }

                if(matches.length == 2) {
                        var linea = '"' + 
                              $('#folder').val() + '\\' + matches[0] + '" "' + 
                              $('#folder2').val() + '\\' +  matches[0] + '" "' ;
                              
                        //var exec = require('child_process').exec('"C:\\Program Files (x86)\\WinMerge\\WinMergeU.exe"  /ul /ur ' +
                        var exec = require('child_process').exec(
                                  JMFinder.parseParams($("#mergeSoftwareCmdline").val(), 
                                  [ $('#folder').val() + '\\' + matches[0],  
                                    $('#folder2').val() + '\\' +  matches[0] ]),
                        function (error, stdout, stderr) {
                          //$('#results').html('Encontrados:<br>');
                          
                                //console.log('stdout: ' + stdout);
                          //$('#results').append('<pre>' + stdout + '</pre>');
                          
                                //console.log('stderr: ' + stderr);
                          if (error !== null) {
                            console.log('stdout: ' + stdout)
                            console.log('stderr: ' + stderr);
                            console.log('exec error: ' + error);
                          }
                        });
                }
            });
    },
    clearResults: function(){

        $( "#cadena" ).val("");
        $( "#results" ).html( "" );
        $( "#results2" ).html( "" );
        $( "#folder2" ).val( "" );
        $( "label").css("color", "#FFFFFF");
    },
    clearSearch: function(){

        $( "#searchInSearch" ).val("");
        $( "#results li" ).css( "background-color", "white" ).css("display", "list-item");
        $( "#results2 li" ).css( "background-color", "white" ).css("display", "list-item");
    },
    searchInSearch: function(){
        $( "#results li" ).css( "background-color", "white" ).css("display", "none");
        $( "#results li:contains('" + $('#textInSearch').val() + "')" ).css( "background-color", "yellow" ).css("display", "list-item");
        $( "#results2 li" ).css( "background-color", "white" ).css("display", "none");
        $( "#results2 li:contains('" + $('#textInSearch').val() + "')" ).css( "background-color", "yellow" ).css("display", "list-item");
    },
    copyToClipCRM: function(){

        if($('#toCRMcheck').is(":checked")) {

            /*$('#toCRM').val( '//AR ' + $('#cadena').val() + String.fromCharCode(13) + String.fromCharCode(13) + 
                            $('#toCRM').val() + String.fromCharCode(13) + String.fromCharCode(13) + 
                            "Best Regards," + String.fromCharCode(13) + String.fromCharCode(13) + "Juan" ); */
                            
            $('#toCRM').val( '//AR ' + $('#cadena').val() + String.fromCharCode(13) + String.fromCharCode(13) + 
                            $('#toCRM').val() + String.fromCharCode(13) + String.fromCharCode(13) + 
                            $('#closingCRM').val().replace(/\{enter}/g, String.fromCharCode(13) + String.fromCharCode(13) ));
            // Load native UI library
            var gui = require('nw.gui');

            // We can not create a clipboard, we have to receive the system clipboard
            var clipboard = nw.Clipboard.get();

            // Read from clipboard
            //var text = clipboard.get('text');
            //console.log(text);

            // Or write something
            //clipboard.set('I love node-webkit :)', 'text');
            clipboard.set($('#toCRM').val()) ;

            // And clear it!
            //clipboard.clear();
            alert("Copied to Clipboard Ok");
        } else {
            alert("ToCRM checkbox is not checked. Clipboard was NOT updated");
        }

    },
    copyToClipboard: function(id, div, myFolder){
      // fileMatch
      //alert("fileMatchOpen :" + obj.title + ":" + obj.id);
        // Open URL with default browser.
        //nw.Shell.openExternal(e.target.href);
        var butObjClip = $('#clip_' + id);
        butObjClip.css( "color", "white" );
        butObjClip.css( "background-color", "navy" );
        
        var obj = document.getElementById(div.substr(1) + "-match_" + id);
        
        //var obj = $(div + "-match_" + id);
        var linea = obj.id.substr(obj.id.indexOf("_") + 1);
        //alert("fileMatchOpen Linea:" + linea);
        
        /*alert('echo ' +
            $(myFolder).val() + obj.title +
            '|clip');
          */  
        var exec = require('child_process').exec('echo ' +
            $(myFolder).val() + obj.title.substr(1) +
            '|clip',
        function (error, stdout, stderr) {
          //$('#results').html('Encontrados:<br>');
          
          //console.log('stdout: ' + stdout);
          //$('#results').append('<pre>' + stdout + '</pre>');
          
          //console.log('stderr: ' + stderr);
          if (error !== null) {
                        console.log('stdout: ' + stdout)
                        console.log('stderr: ' + stderr);
                        console.log('exec error: ' + error);

          }
        });

    },
    toogleAllCheck: function(obj){
        if(obj.checked){
           $(".selChk").prop('checked', true);
        } else {
           $(".selChk").prop('checked', false);
        }
    },
    navigateOpen: function(myFolder){
            var exec = require('child_process').exec('cute-files',
            function (error, stdout, stderr) {
              if (error !== null) {
                            console.log('stdout: ' + stdout)
                            console.log('stderr: ' + stderr);
                            console.log('exec error: ' + error);

              }
            });
    },
    fileMatchOpen: function(obj, myFolder){
            $("#" + obj.id).children().css( "color", "#F00000" );    
                
            var linea = obj.id.substr(obj.id.indexOf("_") + 1);

            //var exec = require('child_process').exec('c:\\windows\\system32\\cmd /c C:\\CSI\\notepad2_4.2.25_x64\\Notepad2.exe /g ' +
            var exec = require('child_process').exec(
                            JMFinder.parseParams(
                    $("#txtEditorCmdline").val(), 
                    [ linea, $(myFolder).val() + obj.title]),
            function (error, stdout, stderr) {
              if (error !== null) {
                            console.log('stdout: ' + stdout)
                            console.log('stderr: ' + stderr);
                            console.log('exec error: ' + error);

              }
            });
    },
    getFolderActual: function() {
        var searchFolderActual = "";
        if($('#folder2').val() == "") {
          searchFolderActual = '#folder';
        } else {
          searchFolderActual = '#folder2';
        }  
        return searchFolderActual;
    },
    searchBlockAll: function(){
        $(".selChk").each(function(index, value) {
           if( $( this ).attr("id") != 'extAll') { 
            JMFinder.searchBlock( $( this ).attr("id"),  $( this ).attr("value"));
           }
        });
    }, 
    searchBlock: function(ext, realext){
    
        var searchFolderActual = JMFinder.getFolderActual();
        //console.log(ext + ':' + realext);
        //console.log($('#ext' + ext).is(":checked"));
        //console.log(document.getElementById("label_" + ext).style);
        if($('#' + ext).is(":checked")) {

           document.getElementById("label_" + ext).style.color = "#0000FF";
           JMFinder.subeBarra(ext);

        } else {
          document.getElementById("label_" + ext).style.color = "#FFFFFF";
          JMFinder.bajaBarra(ext);
          return;
        }
        /*var realext = ext;
        if(realext == 'html') {
           realext = 'htm?';
        }
        if(realext == 'other') {
           realext = $('#extother').val();
        }
        */

        //var exec = require('child_process').exec('c:\\windows\\system32\\findstr /s /I /N /C:"' + $('#cadena').val() + '" "' + 
        /*    $('#results').append('<br><h5>Busando: ' + ext + '</h5>' + 
                JMFinder.parseParams(
                        $("#OSSearchCmdline").val(), 
                        [ $('#cadena').val(), $(searchFolderActual).val(),  realext])
            ); */
        var exec = require('child_process');
        exec.exec( 
                JMFinder.parseParams(
                    $("#OSSearchCmdline").val(), 
                    [ $('#cadena').val(), $(searchFolderActual).val(),  realext]) ,
            {maxBuffer: 1024 * 500},
        function (error, stdout, stderr) {
          if(stdout == '') {
            /*if(ext == 'htm?') {
               ext = 'html';
            }*/
            //If not contains ext
            /*if(~'java,js,css,xml,xslt,properties,sql'.indexOf(ext)){
               ext = 'other';
            }*/

            //$('#results').append('<br><h5>No encontrado en Tipo: ' + ext + '</h5>');
            /*$('#results').append('<br><h5>No encontrado en Tipo: ' + ext + '</h5>' + 
                JMFinder.parseParams(
                        $("#OSSearchCmdline").val(), 
                        [ $('#cadena').val(), $(searchFolderActual).val(),  realext])
            );*/
            document.getElementById("label_" + ext).style.color = "#FF0000";
            JMFinder.bajaBarra(ext);
            return;
          }
          
          var divResultActual = "";
          if($('#folder2').val() == "") {
            divResultActual = '#results';
          } else {
            divResultActual = '#results2';
          }  

          var searchFolderActual = JMFinder.getFolderActual();
          
          $(divResultActual).append('<br><h3>Tipo: ' + ext.substr(3) + '</h3><hr><ol>');
            
          var res = stdout.split("\n");
          
          var previousFile = '';
          for (i = 0; i < res.length; i++) { 
              var text = res[i];
              //var link = text.substr($('#folder').val().length);
              var link = text.substr($(searchFolderActual).val().length);
              
              var res2 = link.split(":");
              var res2file = res2[0].split("\\");
              
              
              var currentFile = res2file[res2file.length-1];

              if(res2[1] != undefined) {
                  
                  res2[2] = JMFinder.custReplace(res2[2]);
                  
                  var textoCond = "";
                  if(previousFile == currentFile) {

                                $(divResultActual).append(
                                       '<li>' + 
                                       '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
                                       '<a onclick="JMFinder.fileMatchOpen(this, \''+searchFolderActual+'\')" class="fileMatch" title="' + res2[0] + 
                                       '" id="'+divResultActual.substring(1)+'-match_' + res2[1] + '">' + 
                                       '<span class="hidden">' + currentFile + '</span>' +
                                       ' <span class="linea">(' + res2[1]  + ')</span></a> '+ 
                                       '<span>' + res2[2] + '</span></li>');

                  } else {

                                $(divResultActual).append(
                                       '<li>' +
                                       '<button id="clip_'+res2[1]+'" onclick="JMFinder.copyToClipboard(\''+res2[1]+'\', \''+divResultActual+'\', \''+searchFolderActual+'\')">^C</button>' + 
                                       '&nbsp;&nbsp;&nbsp;' + 
                                       '<input title="' + res2[0] + '" class="selbox" type="checkbox" id="'+divResultActual.substring(1)+'-check_' + res2[1]+'">' +
                                       '&nbsp;&nbsp;&nbsp;' + 
                                       '<a onclick="JMFinder.fileMatchOpen(this, \''+searchFolderActual+'\')" class="fileMatch" title="' + res2[0] + 
                                       '" id="'+divResultActual.substring(1)+'-match_' + res2[1] + '">' + 
                                       '<b>' + res2file[res2file.length-1] + '</b>' + 
                                       ' <span class="linea">(' + res2[1]  + ')</span></a> '+ res2[2] + '</li>');
                                       
                                if($('#toCRMcheck').is(":checked")) {
                                    $('#toCRM').val( $('#toCRM').val() + res2[0].substr(1).replace(/\\/g, '/') + String.fromCharCode(13));
                                }

                  }
                  
                  previousFile = currentFile;
              }
              
          }

          $(divResultActual).append('</ol></div>');
          
          if (error !== null) {
            console.log('exec error: ' + error + ' ' + stderr);
          }
            if(ext == 'htm?') {
               ext = 'html';
            }
          document.getElementById("label_" + ext).style.color = "#00FF00";
          JMFinder.bajaBarra(ext);
          
        });

      },
      search: function() {
          
            var divResultActual = "";
            if($('#folder2').val() == "") {
              divResultActual = '#results';
            } else {
              divResultActual = '#results2';
            }  

          $(divResultActual).html( '<i>'+$(JMFinder.getFolderActual()).val()+'</i><br><br>' );
          
          var previousC = "";
          if($('#toTimeSheet').is(":checked")) {
              /*previousC = "Dear " + $('#PManager').val() + 
                      ", Could you please coordinate TimeSheet Assignation of " + 
                      $('#hours').val() + " hour(s) under this AR ? Thanks in Advance.";*/

              previousC = JMFinder.parseParams( $('#salutationPManager').val().replace(/\{enter}/g, String.fromCharCode(13) + String.fromCharCode(13)), [ $('#PManager').val() , $('#hours').val() ]);
          }
          /*$('#toCRM').val(previousC + String.fromCharCode(13) + String.fromCharCode(13) + "Dear Boris," + String.fromCharCode(13) + String.fromCharCode(13) + 
                          "Could you please address for mirror update next filelist ? Thanks in advance :" + String.fromCharCode(13) + String.fromCharCode(13) +
                          $('#folderCRM').val() + String.fromCharCode(13) + String.fromCharCode(13));*/
          $('#toCRM').val(previousC + String.fromCharCode(13) + String.fromCharCode(13) + 
                          $("#salutationMirror").val().replace(/\{enter}/g, String.fromCharCode(13) + String.fromCharCode(13)) +
                          $('#folderCRM').val() + String.fromCharCode(13) + String.fromCharCode(13));
          
          
          JMFinder.searchBlockAll();
          
          /*JMFinder.searchBlock("js", "js");
          JMFinder.searchBlock("properties", "properties");
          JMFinder.searchBlock("html", "htm?");
          JMFinder.searchBlock("xml",  "xml?");
          JMFinder.searchBlock("xslt", "xslt");
          JMFinder.searchBlock("sql", "sql");
          JMFinder.searchBlock("css", "css");
          JMFinder.searchBlock("java", "java");
          JMFinder.searchBlock("other", $('#inputextother').val() );*/
          

      },
      showHideButton: function() {
           //Hide Search Button
           //alert('showHideButton executed');
           if($('#folder').val() == '') {
              //$('#search').attr("disabled", true).attr('class', 'button120disabled');
              $('#search').attr("disabled", true).attr('class', 'buttonCompareDisabled');
           }
           if($('#cadena').val() == '') {
              //$('#search').attr("disabled", true).attr('class', 'button120disabled');
              $('#search').attr("disabled", true).attr('class', 'buttonCompareDisabled');
           }
           
           if($('#cadena').val() != '') {
              if($('#folder').val() != '' ) {
                  //$('#search').attr("disabled", false).attr('class', 'button120');
                  $('#search').attr("disabled", false).attr('class', 'buttonCompare');
              }
           }
           
      },
      setProject: function(linkID, folder, folderCRM, pmanager) {
              //console.log('folder:' + folder);
              $('#projectsul').find('a').removeClass("active");
              $('#' + linkID).addClass("active");
              $('#folder').val(folder);
              $('#folderCRM').val(folderCRM);
              $('#PManager').val(pmanager);
      },
      folder: function(code) {
           //alert("Procesar: "  + code);
          
           //Folders
           if(code == 'BBVAMX'){
              $('#folder').val("C:\\eclipseprojects\\ClientTrade\\ClientTrade 6.0_env\\BBVA-Bancomer Mexico");
              $('#folderCRM').val("$SOS Path=$/ClientTrade/ClientTrade 6.0_env/BBVA-Bancomer Mexico");
              $('#PManager').val("Eduardo");   //Eduardo Campos
           }
           if(code == 'BBVACO'){
              $('#folder').val("C:\\eclipseprojects\\ClientTrade\\ClientTrade 5.0_release 5.5_env\\BBVA");
              $('#folderCRM').val("$SOS Path=$ClientTrade/ClientTrade 5.0_release 5.5_env BBVA/");
              $('#PManager').val("Alejandro");   //Alejandro Gómez - Ricardo Salcedo
           }
           if(code == 'BBVACO71old'){
              $('#folder').val("C:\\eclipseprojects\\ClientTrade\\ClientTrade 7.1");
              $('#folderCRM').val("$SOS Path=$/ClientTrade/ClientTrade 7.1/");
              $('#PManager').val("Joe");   //Jose Scarpelli -Internal ARs-
           }
           if(code == 'BBVACO71new'){
              $('#folder').val("C:\\eclipseprojects\\ClientTrade\\ClientTrade 7.1_env\\BBVA Colombia (LATAM)");
              $('#folderCRM').val("$SOS Path=$/ClientTrade/ClientTrade 7.1_env/BBVA Colombia (LATAM)/");
              $('#PManager').val("Alejandro");   //Alejandro Gómez - Ricardo Salcedo
           }
           if(code == 'OCCID'){
              $('#folder').val("C:\\eclipseprojects\\ClientTrade\\ClientTrade 6.0_env\\Banco de Occidente (OCCID)");
              $('#folderCRM').val("$SOS Path=$/ClientTrade/ClientTrade 6.0_env/Banco de Occidente (OCCID)");
              $('#PManager').val("Edgar");   //Edgar Gonzalez
           }
           if(code == 'BBVASP'){
              $('#folder').val("C:\\eclipseprojects\\ClientTrade\\ClientTrade 6.0_env\\BBVASP Phase B");
              $('#folderCRM').val("$SOS Path=$/ClientTrade/ClientTrade 6.0_env/BBVASP Phase B");
              $('#PManager').val("Alejandro");   //Alejandro Gómez
           }
           
           //80133347
           //801333

            JMFinder.showHideButton();
           //path
      },
      custReplace: function(str){

        str = str.replace("\"","'");
        str = str.replace("\:","-");
        str = str.replace("<","[");
        str = str.replace(">","]");
        
        //str = str.replace(">","]");
            
        //highlight
        //str = str.replace("abstract ", "<b>abstract</b> ");
        //str = str.replace("public ", "<b>public</b> ");
                  
        str = str.replace('{', '<b>{</b>');
        str = str.replace('}', '<b>}</b>');
        
        str = str.replace('= ', '<b>=</b> ');
        str = str.replace('+ ', '<b>+</b> ');
        str = str.replace('- ', '<b>-</b> ');
        str = str.replace('* ', '<b>*</b> ');
        
        
        str = str.replace('Object ', '<i>Object</i> ');
        str = str.replace('String ', '<i>String</i> ');
        str = str.replace('Integer ', '<i>Integer</i> ');
        str = str.replace('double ', '<i>double</i> ');
        str = str.replace('Double ', '<i>Double</i> ');
        
        
        str = str.replace('abstract ', '<b>abstract</b> ');
        str = str.replace('access ', '<b>access</b> ');
        str = str.replace('add ', '<b>add</b> ');
        str = str.replace('all ', '<b>all</b> ');
        str = str.replace('alter ', '<b>alter</b> ');
        str = str.replace('and ', '<b>and</b> ');
        str = str.replace('any ', '<b>any</b> ');
        str = str.replace('apply-imports ', '<b>apply-imports</b> ');
        str = str.replace('apply-templates ', '<b>apply-templates</b> ');
        str = str.replace('arguments ', '<b>arguments</b> ');
        str = str.replace('as ', '<b>as</b> ');
        str = str.replace('asc ', '<b>asc</b> ');
        str = str.replace('assert ', '<b>assert</b> ');
        str = str.replace('attribute ', '<b>attribute</b> ');
        str = str.replace('attribute-set ', '<b>attribute-set</b> ');
        str = str.replace('audit ', '<b>audit</b> ');
        str = str.replace('between ', '<b>between</b> ');
        str = str.replace('boolean ', '<b>boolean</b> ');
        str = str.replace('break ', '<b>break</b> ');
        str = str.replace('by ', '<b>by</b> ');
        str = str.replace('byte ', '<b>byte</b> ');
        str = str.replace('call-template ', '<b>call-template</b> ');
        str = str.replace('case ', '<b>case</b> ');
        str = str.replace('catch ', '<b>catch</b> ');
        str = str.replace('char ', '<b>char</b> ');
        str = str.replace('check ', '<b>check</b> ');
        str = str.replace('choose ', '<b>choose</b> ');
        str = str.replace('class ', '<b>class</b> ');
        str = str.replace('cluster ', '<b>cluster</b> ');
        str = str.replace('column ', '<b>column</b> ');
        str = str.replace('column_value ', '<b>column_value</b> ');
        str = str.replace('comment ', '<b>comment</b> ');
        str = str.replace('compress ', '<b>compress</b> ');
        str = str.replace('connect ', '<b>connect</b> ');
        str = str.replace('const ', '<b>const</b> ');
        str = str.replace('continue ', '<b>continue</b> ');
        str = str.replace('copy ', '<b>copy</b> ');
        str = str.replace('copy-of ', '<b>copy-of</b> ');
        str = str.replace('create ', '<b>create</b> ');
        str = str.replace('current ', '<b>current</b> ');
        str = str.replace('date ', '<b>date</b> ');
        str = str.replace('debugger ', '<b>debugger</b> ');
        str = str.replace('decimal ', '<b>decimal</b> ');
        str = str.replace('decimal-format ', '<b>decimal-format</b> ');
        str = str.replace('default ', '<b>default</b> ');
        str = str.replace('delete ', '<b>delete</b> ');
        str = str.replace('desc ', '<b>desc</b> ');
        str = str.replace('distinct ', '<b>distinct</b> ');
        str = str.replace('do ', '<b>do</b> ');
        str = str.replace('double ', '<b>double</b> ');
        str = str.replace('drop ', '<b>drop</b> ');
        str = str.replace('element ', '<b>element</b> ');
        str = str.replace('else ', '<b>else</b> ');
        str = str.replace('enum ', '<b>enum</b> ');
        str = str.replace('eval ', '<b>eval</b> ');
        str = str.replace('exclusive ', '<b>exclusive</b> ');
        str = str.replace('exists ', '<b>exists</b> ');
        str = str.replace('export ', '<b>export</b> ');
        str = str.replace('extends ', '<b>extends</b> ');
        str = str.replace('fallback ', '<b>fallback</b> ');
        str = str.replace('false ', '<b>false</b> ');
        str = str.replace('file ', '<b>file</b> ');
        str = str.replace('final ', '<b>final</b> ');
        str = str.replace('finally ', '<b>finally</b> ');
        str = str.replace('float ', '<b>float</b> ');
        str = str.replace('for ', '<b>for</b> ');
        str = str.replace('for-each ', '<b>for-each</b> ');
        str = str.replace('from ', '<b>from</b> ');
        str = str.replace('function ', '<b>function</b> ');
        str = str.replace('goto ', '<b>goto</b> ');
        str = str.replace('grant ', '<b>grant</b> ');
        str = str.replace('group ', '<b>group</b> ');
        str = str.replace('having ', '<b>having</b> ');
        str = str.replace('identified ', '<b>identified</b> ');
        str = str.replace('if ', '<b>if</b> ');
        str = str.replace('immediate ', '<b>immediate</b> ');
        str = str.replace('implements ', '<b>implements</b> ');
        str = str.replace('import ', '<b>import</b> ');
        str = str.replace('in ', '<b>in</b> ');
        str = str.replace('include ', '<b>include</b> ');
        str = str.replace('increment ', '<b>increment</b> ');
        str = str.replace('index ', '<b>index</b> ');
        str = str.replace('initial ', '<b>initial</b> ');
        str = str.replace('insert ', '<b>insert</b> ');
        str = str.replace('instanceof ', '<b>instanceof</b> ');
        str = str.replace('int ', '<b>int</b> ');
        str = str.replace('integer ', '<b>integer</b> ');
        str = str.replace('interface ', '<b>interface</b> ');
        str = str.replace('intersect ', '<b>intersect</b> ');
        str = str.replace('into ', '<b>into</b> ');
        str = str.replace('is ', '<b>is</b> ');
        str = str.replace('key ', '<b>key</b> ');
        str = str.replace('let ', '<b>let</b> ');
        str = str.replace('level ', '<b>level</b> ');
        str = str.replace('like ', '<b>like</b> ');
        str = str.replace('lock ', '<b>lock</b> ');
        str = str.replace('long ', '<b>long</b> ');
        str = str.replace('maxextents ', '<b>maxextents</b> ');
        str = str.replace('message ', '<b>message</b> ');
        str = str.replace('minus ', '<b>minus</b> ');
        str = str.replace('mlslabel ', '<b>mlslabel</b> ');
        str = str.replace('mode ', '<b>mode</b> ');
        str = str.replace('modify ', '<b>modify</b> ');
        str = str.replace('namespace-alias ', '<b>namespace-alias</b> ');
        str = str.replace('native ', '<b>native</b> ');
        str = str.replace('nested_table_id ', '<b>nested_table_id</b> ');
        str = str.replace('new ', '<b>new</b> ');
        str = str.replace('noaudit ', '<b>noaudit</b> ');
        str = str.replace('nocompress ', '<b>nocompress</b> ');
        str = str.replace('not ', '<b>not</b> ');
        str = str.replace('nowait ', '<b>nowait</b> ');
        str = str.replace('null ', '<b>null</b> ');
        str = str.replace('number ', '<b>number</b> ');
        str = str.replace('of ', '<b>of</b> ');
        str = str.replace('offline ', '<b>offline</b> ');
        str = str.replace('on ', '<b>on</b> ');
        str = str.replace('online ', '<b>online</b> ');
        str = str.replace('option ', '<b>option</b> ');
        str = str.replace('or ', '<b>or</b> ');
        str = str.replace('order ', '<b>order</b> ');
        str = str.replace('otherwise ', '<b>otherwise</b> ');
        str = str.replace('output ', '<b>output</b> ');
        str = str.replace('package ', '<b>package</b> ');
        str = str.replace('param ', '<b>param</b> ');
        str = str.replace('pctfree ', '<b>pctfree</b> ');
        str = str.replace('preserve-space ', '<b>preserve-space</b> ');
        str = str.replace('prior ', '<b>prior</b> ');
        str = str.replace('private ', '<b>private</b> ');
        str = str.replace('privileges ', '<b>privileges</b> ');
        str = str.replace('processing-instruction ', '<b>processing-instruction</b> ');
        str = str.replace('protected ', '<b>protected</b> ');
        str = str.replace('public ', '<b>public</b> ');
        str = str.replace('raw ', '<b>raw</b> ');
        str = str.replace('rename ', '<b>rename</b> ');
        str = str.replace('resource ', '<b>resource</b> ');
        str = str.replace('return ', '<b>return</b> ');
        str = str.replace('revoke ', '<b>revoke</b> ');
        str = str.replace('row ', '<b>row</b> ');
        str = str.replace('rowid ', '<b>rowid</b> ');
        str = str.replace('rownum ', '<b>rownum</b> ');
        str = str.replace('rows ', '<b>rows</b> ');
        str = str.replace('select ', '<b>select</b> ');
        str = str.replace('session ', '<b>session</b> ');
        str = str.replace('set ', '<b>set</b> ');
        str = str.replace('share ', '<b>share</b> ');
        str = str.replace('short ', '<b>short</b> ');
        str = str.replace('size ', '<b>size</b> ');
        str = str.replace('smallint ', '<b>smallint</b> ');
        str = str.replace('sort ', '<b>sort</b> ');
        str = str.replace('start ', '<b>start</b> ');
        str = str.replace('static ', '<b>static</b> ');
        str = str.replace('strictfp ', '<b>strictfp</b> ');
        str = str.replace('strip-space ', '<b>strip-space</b> ');
        str = str.replace('stylesheet ', '<b>stylesheet</b> ');
        str = str.replace('successful ', '<b>successful</b> ');
        str = str.replace('super ', '<b>super</b> ');
        str = str.replace('switch ', '<b>switch</b> ');
        str = str.replace('synchronized ', '<b>synchronized</b> ');
        str = str.replace('synonym ', '<b>synonym</b> ');
        str = str.replace('sysdate ', '<b>sysdate</b> ');
        str = str.replace('table ', '<b>table</b> ');
        str = str.replace('template ', '<b>template</b> ');
        str = str.replace('text ', '<b>text</b> ');
        str = str.replace('then ', '<b>then</b> ');
        str = str.replace('this ', '<b>this</b> ');
        str = str.replace('throw ', '<b>throw</b> ');
        str = str.replace('throws ', '<b>throws</b> ');
        str = str.replace('to ', '<b>to</b> ');
        str = str.replace('transform ', '<b>transform</b> ');
        str = str.replace('transient ', '<b>transient</b> ');
        str = str.replace('trigger ', '<b>trigger</b> ');
        str = str.replace('true ', '<b>true</b> ');
        str = str.replace('try ', '<b>try</b> ');
        str = str.replace('typeof ', '<b>typeof</b> ');
        str = str.replace('uid ', '<b>uid</b> ');
        str = str.replace('union ', '<b>union</b> ');
        str = str.replace('unique ', '<b>unique</b> ');
        str = str.replace('update ', '<b>update</b> ');
        str = str.replace('user ', '<b>user</b> ');
        str = str.replace('validate ', '<b>validate</b> ');
        str = str.replace('value-of ', '<b>value-of</b> ');
        str = str.replace('values ', '<b>values</b> ');
        str = str.replace('var ', '<b>var</b> ');
        str = str.replace('varchar ', '<b>varchar</b> ');
        str = str.replace('varchar2 ', '<b>varchar2</b> ');
        str = str.replace('variable ', '<b>variable</b> ');
        str = str.replace('view ', '<b>view</b> ');
        str = str.replace('void ', '<b>void</b> ');
        str = str.replace('volatile ', '<b>volatile</b> ');
        str = str.replace('when ', '<b>when</b> ');
        str = str.replace('whenever ', '<b>whenever</b> ');
        str = str.replace('where ', '<b>where</b> ');
        str = str.replace('while ', '<b>while</b> ');
        str = str.replace('with ', '<b>with</b> ');
        str = str.replace('with-param ', '<b>with-param</b> ');
        str = str.replace('yield ', '<b>yield</b> ');


        //$( "a:contains('" + $('#cadena').val() + "')" ).css( "text-decoration", "underline" );
        //highlight
        //$( "span:contains('" + $('#cadena').val() + "')" ).css( "background-color", "yellow" );
        
        $( "#inSearchSpan" ).removeClass();



        return str;
      }

}
