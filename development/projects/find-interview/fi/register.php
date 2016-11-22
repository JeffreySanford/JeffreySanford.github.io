<?php
include "./configs/config.php" ; 

$cmd = $functions->SecureInput($_GET['cmd'] . $_POST['cmd']) ; 
$gMethod = $functions->SecureInput($_GET['method'] . "_" . $_GET['fbid'] . $_GET['liid'] . $_POST['method']) ; 
$gFirstName = $functions->SecureInput($_GET['first_name'] . $_POST['first_name']) ; 
$gLastName = $functions->SecureInput($_GET['last_name'] . $_POST['last_name']) ; 
$gEmail = $functions->SecureInput($_GET['email'] . $_POST['email']) ;  
$Username = $functions->SecureInput($_POST['username']) ;  
$Password = $functions->SecureInput($_POST['password']) ;  
$ConfirmPassword = $functions->SecureInput($_POST['confirmpassword']) ;  
$Phone = $functions->SecureInput($_POST['phone']) ;  
$Address = $functions->SecureInput($_POST['address']) ;  
$City = $functions->SecureInput($_POST['city']) ;  
$Country = $functions->SecureInput($_POST['country']) ;  
$AccType = $functions->SecureInput($_POST['acctype']) ;

	if($AccType=="rec"){
		$active = false ; 
	}else{
		$active = true ; 
	}

if($cmd=="DoReg"){	
	echo $user->Register($Username,$gEmail,$gFirstName,$gLastName,$Password,$ConfirmPassword,$Phone,$Address,$City,$Country,"",$gMethod,$AccType,NULL,$active) ; 
}


echo $RegResults ; 
echo $functions->StartForm("register","register.php","post") ; 
echo $functions->NewInput("hidden","cmd","DoReg") ; 
echo $functions->NewInput("hidden","method",$gMethod) ; 
echo $functions->NewInput("text","first_name",$gFirstName,True,True,"First Name") ; 
echo $functions->NewInput("text","last_name",$gLastName,True,True,"Last Name") ; 
echo $functions->NewInput("text","email",$gEmail,True,True,"Email") ; 
echo $functions->NewInput("text","username","",True,True,"Username") ; 
echo $functions->NewInput("password","password","",True,True,"Password") ; 
echo $functions->NewInput("password","confirmpassword","",True,True,"Confirm Password") ; 
echo $functions->NewInput("text","phone","",True,True,"Phone") ; 
echo $functions->NewInput("text","address","",True,True,"Address") ; 
echo $functions->NewInput("text","city","",True,True,"City") ; 
echo $functions->NewInput("text","country","",True,True,"Country") ; 
echo $functions->NewInput("text","acctype","",True,True,"Account Type : user / rec") ; 

echo $functions->NewInput("submit","submit","",False,True) ; 
echo $functions->EndForm() ; 
	
?>