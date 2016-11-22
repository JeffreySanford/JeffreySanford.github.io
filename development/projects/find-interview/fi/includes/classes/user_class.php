<?php


class user{
	 
	protected $lang;

    public function __construct() {
        global $lang;
        $this->lang = $lang;
    }


	function CountUsers($type = NULL){
    		if($type=="users"){
    			$sql = "SELECT * FROM users WHERE `permissions` = 'user' ; " ; 
    		}elseif($type=="rec"){
    			$sql = "SELECT * FROM users WHERE `permissions` = 'rec' ; " ;
    		}elseif($type=="applied"){
    			$sql = "SELECT * FROM apply_for_job ; " ;
    		}elseif($type=="jobs"){
    			$sql = "SELECT * FROM jobs ; " ; 
    		}
    		
    		$do_query = mysql_query($sql) ; 
    		$QueryCount=mysql_num_rows($do_query);
		return $QueryCount ; 
    	}
	
	
	
	function PwdReset($PRUsername,$PREmail){
		Global $functions ; 
		$PwdResetMsg = $this->lang['USER_PwdResetMsg'] ; 
		$PwdResetSuccess = "<center><a style='color:green;'>" . $this->lang['USER_PwdResetSuccess'] . "</a></center>" ; 
		$PwdResetError = "<center><a style='color:red;'>" . $this->lang['USER_PwdResetError'] . "</a></center>" ;
		
		$Stored_Email = $this->GetUserInfo("email",$PRUsername) ; 
		
		if($PREmail==$Stored_Email){
			$NewRandomPassword = $functions->RandomizeString() ; 
			$this->UpdateUserInfo("password",md5($NewRandomPassword),$PRUsername) ; 
			mail($Stored_Email,$this->lang['USER_PwdReset_Subject'],$PwdResetMsg . $NewRandomPassword) ; 
			return $PwdResetSuccess ; 
		} else { 
			return $this->PwdResetError ; 
		}
		
		
	}
	
	function Login($Username,$Password){
		
		Global $logs ; 
		$Password = md5($Password) ; 
		
		$sql="SELECT * FROM users WHERE ((username='$Username' and password='$Password') or (email='$Username' and password='$Password')) and (active=1) LIMIT 1 ;";
		$result=mysql_query($sql) ;

		$count=mysql_num_rows($result);
		
		if($count==1){
			session_start();
			if(filter_var($Username, FILTER_VALIDATE_EMAIL)){
			
				$_SESSION["user"] = $this->GetUserInfoByEmail("username",$Username) ;
			}else{
			
				$_SESSION["user"] = $Username ;
			}
			
			
			$logs->Log("Logged In");
			return True ; 
		} else { 
			return False ; 
		}
		
	}
	
	function Logout(){
		Global $logs;
		session_start();
		$logs->Log("Logged Out");
		$_SESSION["user"] = NULL ; 
		header('Location: ./index.php');
	}
	
	function CheckAuth($redirect = NULL){
		session_start();
		if (isset($_SESSION['user'])) { 
			$c_wrong_attempts = $this->GetUserInfo("c_wrong_attempts") ; 
			if($c_wrong_attempts > 9){
				$this->Logout(); 				
			}
			$continue = "okay" ; 
		} else {
			if($redirect==True){
				if (file_exists("../auth.php")) {
					$auth_file = '../auth.php' ; 
				} else {
					$auth_file = '../../auth.php' ; 
				}
				exit ('<META HTTP-EQUIV="Refresh" CONTENT="0; url=' . $auth_file  . '">') ; 
			}
		}
	}
	
	
	function OnlyFor($allowed,$exit_url){
		$get_permission = $this->GetUserInfo("permissions") ; 
		if($get_permission<>$allowed){
			header("location: " . $exit_url) ; 
			exit() ; 
		}
	}
	
	function CheckRec($redirect = Null){
		$GetUserType = $this->GetUserInfo("permissions") ; 
		$GetValidThrough = $this->GetUserInfo("valid_through") ; 
		
		$GetValidThrough=strtotime($GetValidThrough);
		$dToday=strtotime(date("d-m-Y"));
		

		if($redirect==True){
			if($GetUserType=="rec"){
				if($GetValidThrough > $dToday){
					header('location: ./rec/') ; 
				}else{
					header('location: ../buy/') ; 
				}
			}else{
				if (file_exists("./user/")) {
					header('location: ./user/') ; 
				} else {
					header('location: ../user/') ; 
				}
			}
		}else{
			if($GetUserType=="rec"){
				if($GetValidThrough > $dToday){
					$continue = "okay" ; 
				}else{
					header('location: ../../buy/') ; 
				}
			}else{
				if (file_exists("../auth.php")) {
					header('location: ../auth.php') ; 
				} else {
					header('location: ../../auth.php') ; 
				}
				
			}		
		}
	}
	
	
	function CheckIfRegistered($Username,$Email,$Phone,$Password,$ConfirmPassword){
		
		
		$username_check_sql="SELECT * FROM users WHERE username='$Username' ;";
		$username_check_result=mysql_query($username_check_sql);
		
		$email_check_sql="SELECT * FROM users WHERE email='$Email' ;";
		$email_check_result=mysql_query($email_check_sql);
		
		$phone_check_sql="SELECT * FROM users WHERE phone='$Phone' ;";
		$phone_check_result=mysql_query($phone_check_sql);
		

		$username_check_result_count=mysql_num_rows($username_check_result);
		$email_check_result_count=mysql_num_rows($email_check_result);
		$phone_check_result_count=mysql_num_rows($phone_check_result);

		if($username_check_result_count==1){
			$Errors = $this->lang['USER_CheckIfRegisteredE1'] ; 
		}
		
		if($email_check_result_count==1){
			$Errors = $Errors . $this->lang['USER_CheckIfRegisteredE2'] ; 
		}
		
		if($phone_check_result_count==1){
			$Errors = $Errors . $this->lang['USER_CheckIfRegisteredE3'] ; 
		}
		
		if($Password<>$ConfirmPassword){
			$Errors = $Errors . $this->lang['USER_CheckIfRegisteredE4'] ; 
		}
		
		if($Errors<>Null){
			return $Errors ; 
		}
	
	}
	
	
	function Register($Username,$Email,$FirstName,$LastName,$Password,$ConfirmPassword,$Phone,$Address,$City,$Country,$image,$RegMod,$Permissions,$valid_through = NULL,$active,$date_of_birth,$sex,$act){
		Global $logs; 
		$CheckBeforeRegister = $this->CheckIfRegistered($Username,$Email,$Phone,$Password,$ConfirmPassword) ; 
		
		if($CheckBeforeRegister==$this->CheckIfRegisteredSuccess){
			$UnEncryptedPassword = $Password ; 
			$Password = md5($Password) ; 
			$register_query = "INSERT INTO `users` (`id`, `username`, `password`, `email`, `first_name`, `last_name`, `phone`, `address`, `city`, `country`, `last_seen`, `image`, `in_session`, `register_method`, `permissions`, `active`, `valid_through`, `sex`, `date_of_birth`, `activites`) VALUES (NULL, '$Username', '$Password', '$Email', '$FirstName', '$LastName', '$Phone', '$Address', '$City', '$Country', '', '$image', '0', '$RegMod', '$Permissions', $active, '$valid_through', '$sex', '$date_of_birth', '$act');";
			$do_register_query = mysql_query($register_query) ; 
			$logs->Log($Username . " Registered.");
			$TestLogin = $this->Login($Username,$UnEncryptedPassword) ; 
			if($TestLogin==True){
			header('Location: ./index.php');
			} else {
			return "Internal_Error #1" ; 
			}
		} else {
			return $CheckBeforeRegister ;
		}
		
		 
		
	}


	function GetUserInfoByID($field,$user = NULL){
		if($user==NULL){
		$user = $_SESSION['user'] ;  
		}
		
		$user_info_query = "SELECT *  FROM `users` WHERE `id` = '$user' LIMIT 1 ;" ; 
		$do_user_info_query = mysql_query($user_info_query) ; 

		while ($fetch_user_info= mysql_fetch_array($do_user_info_query)) {
					$requested_info = $fetch_user_info[$field] ;
		}
		
		return $requested_info ; 
	}



	function GetUserInfo($field,$user = NULL){
		if($user==NULL){
		$user = $_SESSION['user'] ;  
		}
		
		$user_info_query = "SELECT *  FROM `users` WHERE `username` = '$user' LIMIT 1 ;" ; 
		$do_user_info_query = mysql_query($user_info_query) ; 

		while ($fetch_user_info= mysql_fetch_array($do_user_info_query)) {
					$requested_info = $fetch_user_info[$field] ;
		}
		
		return $requested_info ; 
	}
	
	
	function GetUserInfoByEmail($field,$user){

		
		$user_info_query = "SELECT *  FROM `users` WHERE `email` = '$user' LIMIT 1 ;" ; 
		$do_user_info_query = mysql_query($user_info_query) ; 

		while ($fetch_user_info= mysql_fetch_array($do_user_info_query)) {
					$requested_info = $fetch_user_info[$field] ;
		}
		
		return $requested_info ; 
	}
	
	function GetUserProfilePicture($user=NULL){
		Global $ProfilePicturePath ; 
		if($user==NULL){
		$user = $_SESSION['user'] ;  
		}
		
		$Picture = $this->GetUserInfo("ProfilePicture",$user) ; 
		if($Picture==""){
			$Picture="Default.jpg" ; 
		}
		
		$return = $ProfilePicturePath . $Picture ; 
		return $return ; 

	}
	
	
	function UpdateUserInfo($field,$new_value,$user = NULL){
		if($user==NULL){
		$user = $_SESSION['user'] ;  
		}
		
		$update_query="UPDATE `users` SET `$field` = '$new_value' WHERE `users`.`username` = '$user' ;";
		$do_update_query=mysql_query($update_query);
		
	}
	
	
	function PrintUserPublicInfo($User = NULL){
		$return = $return . $this->lang['User_PrintUserPublicInfo_FullName'] . " : " . $this->GetUserInfo("full_name") . "<br/>" ; 
		$return = $return . $this->lang['AUTH_USERNAME'] . " : " . $this->GetUserInfo("username") . "<br/>" ; 
		$return = $return . $this->lang['AUTH_EMAIL'] . " : " . $this->GetUserInfo("email") . "<br/>" ; 
		$return = $return . $this->lang['AUTH_PHONE_NUMBER'] . " : " . $this->GetUserInfo("phone") . "<br/>" ; 
		$return = $return . $this->lang['AUTH_ADDRESS'] . " : " . $this->GetUserInfo("address") . "<br/>" ; 
		$return = $return . $this->lang['AUTH_CITY'] . " : " . $this->GetUserInfo("city") . "<br/>" ; 
		return $return ; 	
	}
	
	
	
	function RecSearchForUsers($dob = NULL,$sex = NULL,&$act = NULL,$country = NULL){
	
		if($sex<>""){
			$sex = "AND (`sex` = '$sex')" ; 
		}
		
		if($country<>""){
			$country = "AND (`country` = '$country')" ; 
		}
		
		if($dob <>""){
			$dob = "AND (DATE(date_of_birth) <= '$dob') " ; 
		}
		
		if($act <> ""){
			foreach($act as $ac){
				$activites = $activites . "AND (`activites` LIKE '%$ac%')" ; 
			}
		}
		
		
		$user_info_query = "SELECT *  FROM `users` WHERE (`permissions` = 'user') $sex $dob $activites $country LIMIT 500 ;" ; 
		$do_user_info_query = mysql_query($user_info_query) or die(mysql_error()); 

		while ($fetch_user_info= mysql_fetch_array($do_user_info_query)) {
					$return = $return . '<div class="info-block block-info clearfix"><div class="square-box pull-left"><span class="glyphicon glyphicon-user glyphicon-lg"></span></div>' ; 
					$id = $fetch_user_info['id'] ;
					$name = $fetch_user_info['first_name'] . " " . $fetch_user_info['last_name'] ; 
					$address = $fetch_user_info['address'] . " , " . $fetch_user_info['city'] ; 
					$email = $fetch_user_info['email'] ; 
					
					$return = $return . '<h5>' . $name . '</h5><h5>' . $address . '</h5><h5>' . $email . '</h5>' ; 
					$return = $return . '<a href="profile.php?id=' . $id . '"><button type="submit" class="btn btn-success" style="margin-left:70%;"><i class="fa fa-plus-circle" ></i>View Profile</button></a> </hr>  </div>' ; 
		}
		
		return $return ; 
	}

	
	
	
	
	
	
	
}

?>