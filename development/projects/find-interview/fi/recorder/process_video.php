<?php 
include "../configs/config.php" ; 
$user->CheckAuth(True) ; 


echo "Please wait while we're processing your video ..." ; 

$vtype = $functions->SecureInput($_GET['vtype']) ; 
$vlink = $functions->SecureInput($_GET['vlink']) ; 
$c_user_id = $user->GetUserInfo("id") ; 
$c_user_name = $user->GetUserInfo("username") ; 
$c_date = date("-Y_m_d_H_i_s"); 
$encoded_date = urlencode($c_date) ; 

$video_name = $c_user_id . "-" . $c_user_name . "-" . $c_date . ".mp4"  ; 
if($vtype=="profile"){
	$VFolder = $ProfileVideosPath ; 
	$download_file = file_put_contents($user_files_path . $VFolder . $video_name, fopen($vlink, 'r')); 
	$user->UpdateUserInfo("user_video",$video_name) ; 
	header("location: ../dashboard/") ;
}elseif($vtype=="post_job"){
	$VFolder = $JobsVideosPath ; 
	$download_file = file_put_contents($user_files_path . $VFolder . $video_name, fopen($vlink, 'r')); 
	header("location: ../dashboard/rec/post_job.php?v=" . $encoded_date) ; 
}elseif($vtype=="apply_for_job"){
	$VFolder = $JobsVideosPath ; 
	$GetJobID = $functions->SecureInput($_GET['id']) ; 
	$download_file = file_put_contents($user_files_path . $VFolder . $video_name, fopen($vlink, 'r')); 
	$jobs->ApplyForJob($c_user_id,$GetJobID,$video_name) ; 
}

 
?>