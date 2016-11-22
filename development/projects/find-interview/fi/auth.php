<?php 
include 'header.php';
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
$date_of_birth = $functions->SecureInput($_POST['date_of_birth']) ; 
$sex = $functions->SecureInput($_POST['sex']) ; 

$act = ",," ; 
$shift=$_POST['activities'];
if ($shift)
{
    foreach ($shift as $value)
    {
    	$value = $functions->SecureInput($value) ; 
        $act = $act . ",," . $value ; 
    }
}

$active = true ; 

?>
			

			
			  <div class="content">
                <div class="container">
				
				
<?php

if($cmd=="Logout"){

$user->Logout() ; 

}elseif($cmd=="PwdReset" or $cmd=="DoPwdReset"){

if($cmd=="DoPwdReset"){
$PwdResetUsername = $functions->SecureInput($_POST['username']) ; 
$PwdResetEmail = $functions->SecureInput($_POST['email']) ; 

$PwdResetResult = $user->PwdReset($PwdResetUsername,$PwdResetEmail) ; 
echo $functions->Say($PwdResetResult,"3",false) ; 
}elseif($cmd=="PwdReset"){
?>

<br/>
                        <div class="col-sm-6 main-el">
                            <div class="form login-form">
                                <div class="head main-text-color">
                                Reset Your Password.
                                </div>
<div class="form-group">
<br/>
<form method="post" action="auth.php">
<input type="hidden" name="cmd" id="cmd" value="DoPwdReset" />

  <input id="username" name="username" placeholder="<?php echo $lang['AUTH_USERNAME'] ; ?>" class="form-control input-md" required="" type="text">
	<br/>
  <input id="email" name="email" placeholder="<?php echo $lang['AUTH_EMAIL'] ; ?>" class="form-control input-md" required="" type="text">
    <button id="send" type="submit" name="send" class="btn btn-primary"><?php echo $lang['AUTH_SEND_NEW_PASSWORD'] ; ?></button>
</form>
</div>
</div>
<?php	
}
}else{
?>
				
				
				
				
				
				
                    <div class="row">
					<?php
					if($cmd=="DoReg"){	
						echo $user->Register($Username,$gEmail,$gFirstName,$gLastName,$Password,$ConfirmPassword,$Phone,$Address,$City,$Country,"",$gMethod,$AccType,NULL,$active,$date_of_birth,$sex,$act) ; 
					}elseif($cmd=="DoLogin"){
						
						$LoginUsername = $functions->SecureInput($_POST['username']) ; 
						$LoginPassword = $functions->SecureInput($_POST['password']) ; 
						
						$login = $user->Login($LoginUsername,$LoginPassword) ; 
						
						if($login==True){
						 header('Location: ./dashboard/');
						 exit() ; 
						} else {
							echo $functions->Say("Wrong username or password.","3",false) ;  
						}
					}
					
					?>

                        <div class="col-sm-6 main-el">
                            <div class="form login-form">
                                <div class="head main-text-color">
                                Login
                                </div>
                                <form action="auth.php" method="POST">
                                <input type="hidden" name="cmd" id="cmd" value="DoLogin" />
                                <input type="text" class="form-control main-form" name="username" placeholder="username *">
                                <input type="password" class="form-control main-form" name="password" placeholder="Password *">
                                <div class="buttons">
                                    <a class="button solid blue sm"><div class="over"><input type="submit" value="login"></div></a>
                                    <span class="lost main-text-color">
                                    (<a href="./auth.php?cmd=PwdReset">Lost Password?</a>)
                                    </span>

                                </div>
								</form>
                            </div>
                        </div>

                        
                       
			
                        <div class="col-sm-6 main-el">
                            <div class="form register-form">
                                <div class="head main-text-color">
                                Register
                                </div>
                                <form action="auth.php" method="POST">
                                <input type="hidden" name="cmd" id="cmd" value="DoReg" />
								<input type="hidden" name="method" id="method" value="<?php echo $gMethod ; ?>" />
                                <input type="text" name="first_name" class="form-control main-form" placeholder="First name *" value="<?php echo $gFirstName; ?>" required>
								<input type="text" name="last_name" class="form-control main-form" placeholder="Last name *" value="<?php echo $gLastName; ?>" required >

								<input type="text" name="email" class="form-control main-form" placeholder="Email Adress *" value="<?php echo $gEmail; ?>" required >
								<input type="text" name="username" class="form-control main-form" placeholder="Username *" required="" required>
                                <input type="password" name="password" class="form-control main-form" placeholder="Password *" required>
								<input type="password" name="confirmpassword" class="form-control main-form" placeholder="Re-Enter Password *" required>
		
                                <input type="text" name="address" class="form-control main-form"  placeholder="Address" required>

                                <input type="text" name="phone" class="form-control main-form" placeholder="phone number" required>
                                <input type="text" name="city" class="form-control main-form"  placeholder="City" required>
                                <input type="text" name="date_of_birth" id="date_of_birth" class="form-control main-form"  placeholder="Date of Birth" required>
                                <select type="text" name="country" class="form-control main-form"  placeholder="country" required>
 <option value="Jordan">Jordan</option>
 <option value="Iraq">Iraq</option>
</select></br> 
<select type="text" name="acctype" class="form-control main-form"  placeholder="Account type" required>
 <option value="user">Job Seeker</option>
 <option value="rce">Ricutier</option>
 </select> </br>
<select type="text" name="sex" class="form-control main-form"  placeholder="Account type" required>
 <option value="male">Male</option>
 <option value="female">Female</option>
 </select> </br>

<select multiple name="activities[]" id="activities[]" required>
  <option value="Outdoor Activities">Outdoor Activities</option>
  <option value="Explore Neighborhood">Explore Neighborhood</option>
  <option value="Offer Rides">Offer Rides</option>
  <option value="Arts & History">Arts & History</option>
  <option value="Food & Wine">Food & Wine</option>
  <option value="Gigs, Parties and Events">Gigs, Parties and Events</option>
  <option value="Nature & Adventure">Nature & Adventure</option>
  <option value="Classes, Workshops and Courses">Classes, Workshops and Courses</option>
  <option value="Interepretation & business help">Interepretation & business help</option>
</select>


    <script src="./includes/DateTimePicker/jquery.datetimepicker.js"></script>
    
    <script>
    	$('#date_of_birth').datetimepicker({
	  format:'Y-m-d'
	});
    </script>

    <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>
    
    


 </br>
					
                                <div class="row">
                                    
                                </div>

                                <div class="buttons">
                                    <a class="button solid blue sm"><div class="over"><input type="submit" value="register"></div></a>
                                </div>
                            </div>
                        </div>
                    </div>
					</form>
					
<?php
}
?>
                </div>
            </div>

			
			
			
			
			
<?php 
include 'footer.php';
?>