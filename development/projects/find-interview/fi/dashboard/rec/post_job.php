<?php 
include 'header.php';
$JobVideo = $functions->SecureInput($_GET['v']) ; 


if($JobVideo<>""){
	$FullV = $functions->VideoName($JobVideo) ; 
	$FullV = $user_files_path . $JobsVideosPath . $FullV ; 

	if (file_exists($FullV)) {
		$continue = "okay" ; 
	} else {
		exit("Something went wrong, Error Code #AZ_PJ_1 <br/>") ;  // For debug add . $FullV 
	}
}

?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>

<body>
    
                   <div class="container only">
                        <div class="row">

                          <form class="form-horizontal" method="post" action="./process.php">
						  <input type="hidden" name="cmd" id="cmd" value="post_job" />
						  <input type="hidden" name="job_video" id="job_video" value="<?php echo $JobVideo ; ?>" />
<fieldset>

<!-- Form Name -->
<legend>Post Job</legend>

<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Job Title</label>  
  <div class="col-md-4">
  <input name="job_title" id="job_title" placeholder="Job title" class="form-control input-md" type="text">
   
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Job role</label>  
  <div class="col-md-4">
  <input name="job_role" id="job_role" class="form-control input-md" placeholder="Job role" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Job Location</label>  
  <div class="col-md-4">
  <input name="job_location" id="job_location" placeholder="Job location" class="form-control input-md" type="text">
   
  </div>
</div>


<div class="form-group">
  <label class="col-md-4 control-label" for="textarea">Job Description</label>
  <div class="col-md-4">                     
    <textarea class="form-control" name="job_desc" id="job_desc"></textarea>
  </div>
</div>



<div class="form-group">
  <label class="col-md-4 control-label" for="textarea">Skills</label>
  <div class="col-md-4">                     
    <textarea class="form-control" name="job_skills" id="job_skills"></textarea>
  </div>
</div>




<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Employment Status</label>  
  <div class="col-md-4">
  <input name="job_es" id="job_es" placeholder="Employment Status" class="form-control input-md" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Degree</label>  
  <div class="col-md-4">
  <input name="job_degree" id="job_degree" placeholder="Degree" class="form-control input-md" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Years of Experience</label>  
  <div class="col-md-4">
  <input name="job_exp" id="job_exp" placeholder="Years of Experience" class="form-control input-md" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Career Level</label>  
  <div class="col-md-4">
  <input name="job_clevel" id="job_clevel" placeholder="Career level" class="form-control input-md" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Gender</label>  
  <div class="col-md-4">
  <input name="job_gender" id="job_gender" placeholder="Gender" class="form-control input-md" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Nationality</label>  
  <div class="col-md-4">
  <input name="job_nat" id="job_nat" placeholder="Nationality" class="form-control input-md" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="textinput">Monthly Salary Range</label>  
  <div class="col-md-4">
  <input name="job_salary" id="job_salary" placeholder="Monthly Salary Range" class="form-control input-md" type="text">
   
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="singlebutton">-</label>
  <div class="col-md-4">
    <button id="singlebutton" name="singlebutton" type="submit" class="btn btn-primary">Submit</button>
  </div>
</div>




</fieldset>
</form>

                                </div>
                            </div>
                        </div>










    </div><?php 
            include 'footer.php';
            ?>
</body>
</html>