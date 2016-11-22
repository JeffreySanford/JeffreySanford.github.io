<?php
include "./configs/config.php" ; 
?>
<?php

$cmd = $_POST['cmd'] . $_GET['cmd'] ; 

if($cmd=="DoLogin"){

$LoginUsername = $functions->SecureInput($_POST['username']) ; 
$LoginPassword = $functions->SecureInput($_POST['password']) ; 

$login = $admin->Login($LoginUsername,$LoginPassword) ; 

if($login==True){
 header('Location: ./index.php');
 exit() ; 
} else {
	echo "<center><a style='color:red;'>Wrong Username/Password.</a></center>" ; 
}
}
?>

		<link rel="stylesheet" href="css/bootstrap.css">

<div class="container">    
        
    <div id="loginbox" class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> 
        
        <div class="row">                
            <div class="iconmelon">
            </div>
        </div>


<div class="panel panel-default">
  <div class="panel-body">
<form class="form-horizontal" method="post" action="auth.php">
<input type="hidden" name="cmd" id="cmd" value="DoLogin" />
<fieldset>
<div class="form-group">
  <label class="col-md-4 control-label" for="user">Username</label>  
  <div class="col-md-5">
  <input id="username" name="username" placeholder="Username" class="form-control input-md" required="" type="text">  
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="pass">Password</label>
  <div class="col-md-5">
    <input id="password" name="password" placeholder="Password" class="form-control input-md" required="" type="password">
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="login"></label>
  <div class="col-md-8">
    <button id="login" name="login" type="submit" class="btn btn-success">Login </button>
  </div>
</div>
</fieldset>
</form>
</div></div> 