<?php 
include 'header.php';
	
	$j_id = $functions->SecureInput($_GET['id'] . $_POST['id']) ; 
	$C_U_Video = $jobs->GetJobInfo("job_video",$j_id) ; 
	
	$FullVideoPath = $user_files_path . $JobsVideosPath . $C_U_Video ; 
	$rec_id = $jobs->GetJobInfo("user_id",$j_id) ; 
	$C_C_Video = $user->GetUserInfoByID("user_video",$rec_id) ; 
	$FullCCVideo = $user_files_path . $ProfileVideosPath . $C_C_Video ; 
	$job_title = $jobs->GetJobInfo("job_title",$j_id) ; 
	$job_location = $jobs->GetJobInfo("job_location",$j_id) ; 
	$rec_name = $user->GetUserInfoByID("first_name",$rec_id) . " " . $user->GetUserInfoByID("last_name",$rec_id) ; 
	$job_desc = $jobs->GetJobInfo("job_desc",$j_id) ;
	$job_skills = $jobs->GetJobInfo("job_skills",$j_id) ;
	$job_es = $jobs->GetJobInfo("job_es",$j_id) ;
	$job_salary = $jobs->GetJobInfo("job_salary",$j_id) ;
	$job_degree = $jobs->GetJobInfo("job_degree",$j_id) ;
	$job_exp = $jobs->GetJobInfo("job_exp",$j_id) ;
	$CC_Location = $user->GetUserInfoByID("city",$rec_id) . "," . $user->GetUserInfoByID("country",$rec_id) ;
	$CC_Address = $user->GetUserInfoByID("address",$rec_id) ;  
?>	
           

  <div class="content">
                <div class="container">
                                <div class="row">
					
                   
 <div class="col-sm-10 main-el">
                           
                           <?php
                           
                           echo $jobs->GetJobsPublic();
                           
                           ?>
                           
                    </div>
                </div>
                    </div>
                </div>
            </div>

            </div>




<?php 
include 'footer.php';
?>