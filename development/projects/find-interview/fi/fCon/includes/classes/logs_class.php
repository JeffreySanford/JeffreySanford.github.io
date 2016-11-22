<?php

class Logs{

	function Log($event){
		$ip = $_SERVER['REMOTE_ADDR'] ; 
		$user = $_SESSION['user'] ; 
		mysql_query("INSERT INTO `logs` (`id`, `event`, `date`) VALUES (NULL, '$ip - $user - $event', NOW()); ");
	}

}

?>