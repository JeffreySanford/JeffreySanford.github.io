<?php 
include 'header.php';
$id = $functions->SecureInput($_GET['id']) ; 
$cp_username = $user->GetUserInfoByID("username",$id) ; 
$last_seen = $user->GetUserInfoByID("last_seen",$id) ; 
$full_name = $user->GetUserInfoByID("first_name",$id) . " " . $user->GetUserInfoByID("last_name",$id) ; 
$country = $user->GetUserInfoByID("country",$id) ;
$dob = $user->GetUserInfoByID("date_of_birth",$id) ;
$address = $user->GetUserInfoByID("address",$id) ;
$gender = $user->GetUserInfoByID("sex",$id) ;
$email = $user->GetUserInfoByID("email",$id) ;
$activities = $user->GetUserInfoByID("activites",$id) ;
?>


<div class="container">
      <div class="row">
      <div class="col-md-5  toppad  pull-right col-md-offset-3 ">
         
       <br>
<p class=" text-info">Last Seen : <?php echo $last_seen ; ?> </p>
      </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
   
   
          <div class="panel panel-info">
            <div class="panel-heading">
              <h3 class="panel-title"><?php echo $full_name ; ?></h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="http://www.femto.it/wp-content/uploads/2014/04/default-user-avatar.png" class="img-circle img-responsive"> </div>
                
                <!--<div class="col-xs-10 col-sm-10 hidden-md hidden-lg"> <br>
                  
                </div>-->
                <div class=" col-md-9 col-lg-9 "> 
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>Username:</td>
                        <td><?php echo $cp_username ; ?></td>
                      </tr>
                      <tr>
                        <td>Country:</td>
                        <td><?php echo $country ; ?></td>
                      </tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td><?php echo $dob ; ?></td>
                      </tr>
                   
                         <tr>
                             <tr>
                        <td>Gender</td>
                        <td><?php echo $gender ; ?></td>
                      </tr>
                        <tr>
                        <td>Address</td>
                        <td><?php echo $address ; ?></td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td><?php echo $email ; ?></td>
                      </tr>
                        <td>Activities</td>
                        <td><?php echo $activities ; ?></td>
                           
                      </tr>
                     
                    </tbody>
                  </table>
                  

                </div>
              </div>
            </div>
                 
            
          </div>
        </div>
      </div>
    </div>

                            </div>
                        </div>










    </div><?php 
            include 'footer.php';
            ?>
</body>
</html>