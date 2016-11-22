<?php


class admin{

	
	function Login($Username,$Password){
		Global $logs;
		$Password = md5($Password) ; 
		
		$sql="SELECT * FROM admins WHERE username='$Username' and password='$Password'";
		$result=mysql_query($sql);
		
		

		$count=mysql_num_rows($result);

		if($count==1){
			session_start();
			$_SESSION["user"] = $Username ; 
			$_SESSION["email"] = $this->GetAdminInfo("email",$Username) ; 
			$_SESSION["password"] = $Password ; 
			$_SESSION["permissions"] = $this->GetAdminInfo("permissions",$Username) ; 
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
		$_SESSION["email"] = NULL ; 
		$_SESSION["password"] = NULL ; 
		$_SESSION["permissions"] = NULL ; 
		header('Location: ./auth.php');
	}
	
	function CheckAuth($redirect = NULL){
		session_start();
		if (isset($_SESSION['user'])) { 
			$continue = "okay" ; 
		} else {
			if($redirect==True){
				exit ('<META HTTP-EQUIV="Refresh" CONTENT="0; url=./auth.php">') ; 
			}
		}
	}


	function GetAdminInfo($field,$user = NULL){
		if($user==NULL){
		$user = $_SESSION['user'] ;  
		}
		
		$user_info_query = "SELECT *  FROM `admins` WHERE `username` = '$user' LIMIT 1 ;" ; 
		$do_user_info_query = mysql_query($user_info_query) ; 

		while ($fetch_user_info= mysql_fetch_array($do_user_info_query)) {
					$requested_info = $fetch_user_info[$field] ;
		}
		
		return $requested_info ; 
	}
	
	
	function UpdateAdminInfo($field,$new_value,$user = NULL){
		if($user==NULL){
		$user = $_SESSION['user'] ;  
		}
		
		$update_query="UPDATE `users` SET `$field` = '$new_value' WHERE `users`.`username` = '$user' ;";
		$do_update_query=mysql_query($update_query);
		
	}
	

	
	
	
	
	
	
	
}

?>