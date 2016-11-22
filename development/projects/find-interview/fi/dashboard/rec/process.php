<?php 
include "../../configs/config.php" ; 
$user->CheckAuth(True) ; 
$user->CheckRec(False) ; 
$user_files_path = "../" . $user_files_path ; 
$c_user_id = $user->GetUserInfo("id") ; 

$cmd = $functions->SecureInput($_GET['cmd'] . $_POST['cmd']) ; 

if($cmd=="post_job"){
	$job_video = $functions->SecureInput($_POST['job_video']);
	$job_video = $functions->VideoName($job_video) ; 
	$job_title = $functions->SecureInput($_POST['job_title']);
	$job_role = $functions->SecureInput($_POST['job_role']);
	$job_location = $functions->SecureInput($_POST['job_location']);
	$job_desc = $functions->SecureInput($_POST['job_desc']);
	$job_skills = $functions->SecureInput($_POST['job_skills']);
	$job_es = $functions->SecureInput($_POST['job_es']);
	$job_degree = $functions->SecureInput($_POST['job_degree']);
	$job_exp = $functions->SecureInput($_POST['job_exp']);
	$job_clevel = $functions->SecureInput($_POST['job_clevel']);
	$job_gender = $functions->SecureInput($_POST['job_gender']);
	$job_nat = $functions->SecureInput($_POST['job_nat']);
	$job_salary = $functions->SecureInput($_POST['job_salary']);
	
	header( "refresh:5;url=index.php" );
	echo $jobs->AddNewJob($c_user_id,$job_video,$job_title,$job_role,$job_location,$job_desc,$job_skills,$job_es,$job_degree,$job_exp,$job_clevel,$job_gender,$job_nat,$job_salary) ; 
	
}elseif($cmd=="GetAppliesForRec"){
	echo $jobs->GetAppliesForRec() ;
}




?>