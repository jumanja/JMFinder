-- JMFinder Exported DATA 

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