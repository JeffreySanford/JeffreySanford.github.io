<?php

class functions {
	
	function VideoName($v){
		Global $user; 
		$c_user_id = $user->GetUserInfo("id") ; 
		$c_user_name = $user->GetUserInfo("username") ; 
		$c_date = $v; 
		$video_name = $c_user_id . "-" . $c_user_name . "-" . $c_date . ".mp4"  ; 
		return $video_name ; 
	}
	
	
	
	function WhatIsThisBrowser(){
		$firefox = strpos($_SERVER["HTTP_USER_AGENT"], 'Firefox') ? true : false;
		$chrome = strpos($_SERVER["HTTP_USER_AGENT"], 'Chrome') ? true : false;
		
		if($firefox==True){
			return "firefox" ; 
		}elseif($chrome==True){
			return "chrome" ; 
		}else{
			return "unknown" ; 
		}
		
	}
		
	function GetGeneralSetting($name){
		
		$user_info_query = "SELECT *  FROM `settings_general` WHERE `name` = '$name' LIMIT 1 ;" ; 
		$do_user_info_query = mysql_query($user_info_query) ; 

		while ($fetch_user_info= mysql_fetch_array($do_user_info_query)) {
					$requested_info = $fetch_user_info['value'] ;
		}
		
		return $requested_info ; 
	}
	
	
	
	
	function Say($string,$size,$type){
		if($type==True){
			$color = '#3DA552' ; 
		}elseif($type==FALSE){
			$color = '#FF0000' ; 
		}else{
			$color = '#000000' ; 
		}
		
		return '<h' . $size . ' style="color:' . $color . ';" >' . $string . '</h' . $size . '><br/>' ; 
		
	}


	
	function StartForm($name,$action,$method,$upload = FALSE){
		
		if($upload==True){
			$upload = ' enctype="multipart/form-data"' ; 
		}else{
			$upload = "" ; 
		}
		
		return '<form name="' . $name . '" id="' . $name . '" action="' . $action . '" method="' . $method . '"' . $upload . '>' . "\r\n" ; 
	}	
	
	
	function EndForm(){ 
		return "</form>" ; 
	}
	
	function NewInput($type,$name,$value,$req = FALSE,$NL = FALSE,$PH = ""){
		if($req==True){
			$required = "required" ; 
		}
		
		$NewLine = "\r\n" ; 
		if($NL==True){
			$NewLine = "<br/>" . "\r\n" ; 
		}
		
		if($PH<>""){
			$PH = ' placeholder="' . $PH . '" ' ; 
		}
		
		return '<input type="' . $type . '" name="' . $name . '" id="' . $name . '" value="' . $value . '" ' . $PH . $required . '/>' . $NewLine ; 
	}

	function SecureInput($input) {
		$input = stripslashes($input); 
		$input = mysql_real_escape_string($input); 
		return $input ; 	
	}
	
	
	function RandomizeString($length = 16) {
		$characters = '0123456789';
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, strlen($characters) - 1)];
		}
		return $randomString;
	}
	
	function Language($lang = "ku"){
		if($lang=="ku"){
			$_SESSION["lang"] = "ku" ;
		}else{
			$_SESSION["lang"] = "en" ;
                     
		}
	}
	
	
	function EnglishOnlyCheckAndReturn($text){
		$GetCurrentLanguage = $_SESSION["lang"] ; 
		if($GetCurrentLanguage=="ku"){
			$text = preg_replace("/[^a-zA-Z0-9 ]+/", "", $text);
			return $text ; 
		}else{
			$string = preg_replace ( "/[^\x{0600}-\x{06FF}0-9 -]/u", "", $text );
			// $text2 = preg_replace("/[^a-zA-Z0-9]+/", "", $text);
			//$text = explode($text2, $text);
			//return $text[0] ; 
			return $string ; 
		}
		
		
	}
	
	
	function UploadProfilePicture($uploader_name,$ext_text = NULL){
			Global $ProfilePicturePath ; 
			$CurrentU = $_SESSION['user'] ; 
			
			$files_path = $ProfilePicturePath ; 
			if (!empty($_FILES[$uploader_name]["name"])) {

			$myFile = $_FILES[$uploader_name];
			if ($myFile["error"] !== UPLOAD_ERR_OK) {
				echo "<p>An error occurred.</p><a href='profile.php'>Click here to go back to the main page.</a>";
				exit;
			}

			// ensure a safe filename
			$name = preg_replace("/[^A-Z0-9._-]/i", "_", $myFile["name"]);

			// don't overwrite an existing file
			$i = rand();
			$parts = pathinfo($name);
			$name = "z-$CurrentU-$i.jpg" ; 

			while (file_exists($files_path . $name)) {
				$i++;
				$name = "z-$CurrentU-$i.jpg" ; 
			}
			
			// ---------------------------------------------------------------------------------
				
			
			// ---------------------------------------------------------------------------------

			// preserve file from temporary directory
			$success = copy($myFile["tmp_name"], $files_path . $name);
			if (!$success) {
				$name = "" ; 
				echo "<p>Unable to save file.</p><a href='profile.php'>Click here to go back to the main page.</a>";
				exit;
			}

			// set proper permissions on the new file
			chmod($files_path . $name, 0777);

			return $name . $ext_text ; 
		} else {
			return NULL ; 
		}
		
	}













}


?>