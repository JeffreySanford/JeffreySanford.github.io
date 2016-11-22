<?php 
include "../../configs/config.php" ; 
$user->CheckAuth(True) ; 
$user->OnlyFor("user","../../auth.php") ; 
$user_files_path = "../" . $user_files_path ; 
$c_user_id = $user->GetUserInfo("id") ; 

$cmd = $functions->SecureInput($_GET['cmd'] . $_POST['cmd']) ; 

if($cmd=="SearchJobs"){
	$j_title = $functions->SecureInput($_POST['j_title']);
	$j_user = $functions->SecureInput($_GET['j_user']);
	
	echo $jobs->GetJobs($j_title,$j_user) ;
}elseif($cmd=="ImAwake"){
	$user->UpdateUserInfo("last_seen",$now) ; 
}elseif($cmd=="GetMyRooms"){
	echo $jobs->GetMyRooms() ; 
}




?>