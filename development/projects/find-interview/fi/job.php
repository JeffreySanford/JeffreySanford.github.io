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
           

                <div class="container">
                                <div class="row">
                   
						<div class="col-sm-12 main-el">
                            <div class="sep-heading-container shc4 clearfix">
					                            <div class="call ">
                                <h4><a> <?php echo $job_title ; ?> </a> <small>  <i class="fa fa-location-arrow"></i>  <?php echo $job_location ; ?> 
                               <i class="fa fa-users"></i>  <?php echo $rec_name ; ?> </small></h4>
                           

							</div></div></div>
 <div class="col-sm-6 col-item main-el"><div class="jumbotron">
                            <h5 class="medium">Job Description</h5>
                            <p><?php echo $job_desc ; ?></p>
                        </div>  </div>
						
 <div class="col-sm-6 col-item main-el"><div class="jumbotron">
                            <h5 class="medium">Skills</h5>
                            <p><?php echo $job_skills ; ?></p>
                        </div></div>
						
 <div class="col-sm-12 main-el"><div class="jumbotron">
                            <h2 class="medium">Job Details</h2> <div class="divider divider-2"></div>



<!--- job video is here ---> 
<!--- next video tag is for profile video of the company ---><div class="row">
                        <div class="col-sm-6 col-item main-el">
                            <h5 class="medium"></h5>
                           
                            <h5>Job Location: <?php echo $job_location ; ?></h5>
                            <h5>Employment Status: <?php echo $job_es ; ?>  </h5>
                            <h5>Monthly Salary Range: <?php echo $job_salary ; ?> </h5>
                            <h5>Degree: <?php echo $job_degree ; ?> </h5>
                            <h5>Years of Experience: <?php echo $job_exp ; ?> </h5>
                        </div>

                        <div class="col-sm-6 col-item main-el">
                            <h5 class="medium">Job Video</h5>
                            

                           


					  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="500" height="400" data-setup="{}">
						<source src="<?php echo $FullVideoPath ; ?>" type='video/mp4' />
						<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
					  </video>
                        </div>
                    </div>
 </div>


                  </div>                      
						
</div></div>  



						</div>

 <div class="row">
                        <div class="col-md-12 col-item main-el">
                            <div class="call ">
                                <h3 class="main-text-color">Do you have enough skills for the job!</h3>
                                <p>Start recording your 30-second  video by click the following button,please mention what makes the employ interested to call you back for the job!</p>
                                
								<a> <?php echo $ShowApply ; ?> </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
           </div>



                <div class="container">
                                <div class="row">
   <div class="call ">
<div class="col-md-14 col-item main-el">

                                <h4><a href="#1" >Company Profile </a></h4>
<div class="row">
                <div class="col-sm-5 main-el">
<div class="jumbotron">
                            <h2 class="medium">Company Details</h2> <div class="divider divider-2"></div>


                            <p>Company Location: <?php echo $CC_Location ; ?> </p>
                            <p>Address: <?php echo $CC_Address ; ?> </p></br>
</div>
						

						</div>

                        
					

					  <video id="example_video_2" class="video-js vjs-default-skin" controls preload="none" width="500" height="400" data-setup="{}">
						<source src="<?php echo $FullCCVideo ; ?>" type='video/mp4' />
						<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
					  </video>
                    
                </div>
            </div>




                            </div>
                        </div>
 </div> </div> </div>

</div>



<?php 
include 'footer.php';
?>