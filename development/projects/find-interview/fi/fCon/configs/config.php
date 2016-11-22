<?php
@ob_start();
session_start();

//encoding stuff
 header('Content-type: text/html; charset=utf-8'); 
 
// database info
$host="localhost"; // Host name
$username="ahmedbas_fi"; // Mysql username
$password="E.bR{pURvK{k"; // Mysql password
$db_name="ahmedbas_fi"; // Database name

//paths 
$files_path = "./files/uploads/" ; 
$ProfilePicturePath = "../files/profilepictures/" ; 
$VideosPath = "../files/videos/" ; 
$user_files_path = "../user_files/" ; 
$ProfileVideosPath = "/Videos/Profile/" ; 
$JobsVideosPath = "/Videos/Jobs/" ; 

//time varibles
$now = date('m/d/Y h:i:s a', time());
$d_now = date('m/d/Y');
$c_db_date = date('Y-m-d ', time());

// Connect to server and select databse.
$con = mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

// ... (creating a connection to mysql) ...

mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $con);

// error reporting 
error_reporting(E_ALL ^ E_NOTICE);

// Load Logs Class And Start $logs Control
include dirname(__FILE__) . DIRECTORY_SEPARATOR . "../includes/classes/logs_class.php" ; 
$logs = new Logs ; 

// Load Admin Class And Start $admin Control
include dirname(__FILE__) . DIRECTORY_SEPARATOR . "../includes/classes/admin_class.php" ; 
$admin = new admin ; 

//Load Functions Class And Select Language
include dirname(__FILE__) . DIRECTORY_SEPARATOR . "../includes/classes/functions_class.php" ; 
$functions = new functions ; 
$new_lang = $_GET['lang'] ; 
if($new_lang<>""){
$functions->Language($new_lang);
}elseif($new_lang=="" and $_SESSION["lang"]==""){
$functions->Language($new_lang);
}
include dirname(__FILE__) . DIRECTORY_SEPARATOR . "../includes/lang/" . $_SESSION["lang"] . ".php" ; 


// Load User Class And Start New $User Control 
include dirname(__FILE__) . DIRECTORY_SEPARATOR . "../includes/classes/user_class.php" ; 
$user = new user; 


// Load Jobs Class And Start New $Jobs Control 
include dirname(__FILE__) . DIRECTORY_SEPARATOR . "../includes/classes/jobs_class.php" ; 
$jobs = new jobs; 

?>