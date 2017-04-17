-- JMFinder Exported DATA 
DELETE FROM config;
INSERT INTO config VALUES ( "OSSearchCmdline" , "Operating System Search and Command Line" , "Path" , "findstr /s /I /N /C:"{0}" "{1}\*.{2}"" , "A" );
INSERT INTO config VALUES ( "closingCRM" , "Text for Closing CRM" , "Text" , "Best Regards,{enter}Juan.{enter}" , "A" );
INSERT INTO config VALUES ( "javaEditorSoftware" , "Java Editor Software" , "Link" , ""C:\eclipse\eclipse.exe"" , "A" );
INSERT INTO config VALUES ( "mergeEditorSoftware" , "Merge Editor Software" , "Link" , ""C:\Program Files (x86)\WinMerge\WinMergeU.exe"" , "A" );
INSERT INTO config VALUES ( "mergeSoftwareCmdline" , "Merge Software Path and Command Line" , "Path" , ""C:\Program Files (x86)\WinMerge\WinMergeU.exe" /ul /ur "{0}" "{1}"" , "A" );
INSERT INTO config VALUES ( "salutationMirror" , "Text for Mirror Update" , "Text" , "Dear Boris,{enter}Could you please address for mirror update next filelist ? Thanks in advance :{enter}" , "A" );
INSERT INTO config VALUES ( "salutationPManager" , "Text for PManager" , "Text" , "Dear {0}, Could you please coordinate TimeSheet Assignation of {1} hour(s) under this AR ? Thanks in Advance." , "A" );
INSERT INTO config VALUES ( "textEditorSoftware" , "Text Editor Software" , "Link" , ""C:\CSI\notepad2_4.2.25_x64\Notepad2.exe"" , "A" );
INSERT INTO config VALUES ( "txtEditorCmdline" , "Text Editor Software Path and Command Line" , "Path" , ""C:\CSI\notepad2_4.2.25_x64\Notepad2.exe" /g {0} "{1}"" , "A" );


DELETE FROM filetypes;
INSERT INTO filetypes VALUES ( "css" , "css" , "A" );
INSERT INTO filetypes VALUES ( "html" , "htm?" , "A" );
INSERT INTO filetypes VALUES ( "java" , "java" , "A" );
INSERT INTO filetypes VALUES ( "js" , "js" , "A" );
INSERT INTO filetypes VALUES ( "log" , "log*" , "A" );
INSERT INTO filetypes VALUES ( "other" , "*" , "A" );
INSERT INTO filetypes VALUES ( "properties" , "properties" , "A" );
INSERT INTO filetypes VALUES ( "sql" , "sql" , "A" );
INSERT INTO filetypes VALUES ( "xml" , "xml" , "A" );
INSERT INTO filetypes VALUES ( "xslt" , "xslt" , "A" );


DELETE FROM help;
INSERT INTO help VALUES ( "acercade" , "jmanjarres@banktrade.com" , "A" );


DELETE FROM pmanagers;
INSERT INTO pmanagers VALUES ( "agomez" , "Alejandro" , "A" );
INSERT INTO pmanagers VALUES ( "avanegas" , "Adriana" , "A" );
INSERT INTO pmanagers VALUES ( "ecampos" , "Eduardo" , "A" );
INSERT INTO pmanagers VALUES ( "egonzale" , "Edgar" , "A" );
INSERT INTO pmanagers VALUES ( "rsalcedo" , "Ricardo" , "A" );


DELETE FROM projects;
INSERT INTO projects VALUES ( "BBVACO55" , "BBVA COL 5.5" , "CO" , "agomez" , "C:\eclipseprojects\ClientTrade\ClientTrade 5.0_release 5.5_env\BBVA" , "$SOS Path=$ClientTrade/ClientTrade 5.0_release 5.5_env BBVA/" , "3" , "A" );
INSERT INTO projects VALUES ( "BBVACO71" , "BBVA COL 7.1 NEW" , "CO" , "agomez" , "C:\eclipseprojects\ClientTrade\ClientTrade 7.1_env\BBVA Colombia (LATAM)" , "$SOS Path=$/ClientTrade/ClientTrade 7.1_env/BBVA Colombia (LATAM)/" , "1" , "A" );
INSERT INTO projects VALUES ( "BBVACO71OLD" , "BBVA COL 7.1 OLD" , "CO" , "agomez" , "C:\eclipseprojects\ClientTrade\ClientTrade 7.1" , "$SOS Path=$/ClientTrade/ClientTrade 7.1/" , "8" , "I" );
INSERT INTO projects VALUES ( "BBVAMX" , "BBVA MX 6.0" , "MX" , "ecampos" , "C:\eclipseprojects\ClientTrade\ClientTrade 6.0_env\BBVA-Bancomer Mexico" , "$SOS Path=$/ClientTrade/ClientTrade 6.0_env/BBVA-Bancomer Mexico" , "5" , "A" );
INSERT INTO projects VALUES ( "BBVASP" , "BBVA SP 6.0" , "ES" , "agomez" , "C:\eclipseprojects\ClientTrade\ClientTrade 6.0_env\BBVASP Phase B" , "$SOS Path=$/ClientTrade/ClientTrade 6.0_env/BBVASP Phase B" , "2" , "A" );
INSERT INTO projects VALUES ( "OCCID" , "OCCID 6.0" , "CO" , "egonzale" , "C:\eclipseprojects\ClientTrade\ClientTrade 6.0_env\Banco de Occidente (OCCID)" , "$SOS Path=$/ClientTrade/ClientTrade 6.0_env/Banco de Occidente (OCCID)" , "4" , "A" );


DELETE FROM tables;
INSERT INTO tables VALUES ( "config" , "Config" , "A" );
INSERT INTO tables VALUES ( "filetypes" , "File types" , "A" );
INSERT INTO tables VALUES ( "help" , "Help" , "A" );
INSERT INTO tables VALUES ( "pmanagers" , "Project Managers" , "A" );
INSERT INTO tables VALUES ( "projects" , "Projects" , "A" );
INSERT INTO tables VALUES ( "tables" , "Tables" , "A" );