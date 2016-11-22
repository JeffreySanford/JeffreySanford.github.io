<?php

class Jobs{
	
	protected $lang;

    public function __construct() {
        global $lang;
        $this->lang = $lang;
    }
    
    

	
	function AddNewJob($c_user_id,$job_video,$job_title,$job_role,$job_location,$job_desc,$job_skills,$job_es,$job_degree,$job_exp,$job_clevel,$job_gender,$job_nat,$job_salary){
		Global $functions ; 
		$add_query = "INSERT INTO `jobs` (`id`, `user_id`, `job_title`, `job_video`, `job_role`, `job_location`, `job_desc`, `job_skills`, `job_es`, `job_degree`, `job_exp`, `job_clevel`, `job_gender`, `job_nat`, `job_salary`, `job_date`, `is_taken`, `taken_by`) VALUES (NULL, '$c_user_id', '$job_title', '$job_video', '$job_role', '$job_location', '$job_desc', '$job_skills', '$job_es', '$job_degree', '$job_exp', '$job_clevel', '$job_gender', '$job_nat', '$job_salary', NOW(), '0', '');" ; 
		$do_add_query = mysql_query($add_query) or die(mysql_error()) ; 
		
		return $functions->Say("Job Added Successfully. You'll be redirected in few seconds ...","3",True) ; 
		
	}
	
	
	
	
	function GetJobsPublic($title = NULL,$user_id = NULL,$limit = NULL){
		if($user_id<>""){
			$s_user_id = " AND (`user_id` = '$user_id') " ; 
		}
		
		if($title<>""){
			$s_title = " AND (`job_title` LIKE '%$title%') " ; 
		}
		
		if($limit<>""){
			$limit = 'LIMIT 0,' . $limit ; 
		}
		
		$GetOrdersQuery = "SELECT * FROM `jobs` WHERE (`is_taken` <> 7) $s_user_id $s_title ORDER BY `id` DESC $limit ;" ; 
		$DoGetOrdersQuery = mysql_query($GetOrdersQuery) or die(mysql_error()) ; 

		
		while ($fetch_info= mysql_fetch_array($DoGetOrdersQuery)) {
					$id = $fetch_info['id'] ;
					$job_title = $fetch_info['job_title'] ; 
					$job_date =  $fetch_info['job_date'] ; 
					$job_location =  $fetch_info['job_location'] ; 
					$job_desc =  $fetch_info['job_desc'] ; 
					$job_salary =  $fetch_info['job_salary'] ; 
					$return = $return . '<div class="sep-heading-container shc4 clearfix">' ; 
					$return = $return . '<h4><a href="job.php?id=' . $id . '" > ' . $job_title . ' </a></h4><div class="sep-container"><div class="the-sep"></div></div></div><div id="b-tabs-1"><div class="item"><div class="text">' ; 
					$return = $return . '<p class="italic">' . $job_desc . '</p><div class="col-sm-12 main-el" style="display:inline;"><div class="alert alert-noicon"><div class="text"><style>i{ padding-left:10px;}</style><i class="fa fa-location-arrow">' ; 
					$return = $return . '</i>' . $job_location . '<i class="fa fa-users">' ; 
					$return = $return . '</i>' . $job_date . '<i class="fa fa-dollar">' ; 
					$return = $return . '</i>' . $job_salary . '</div></div><div class="divider divider-1"></div></div></div></div></div>' ; 
					
					
		}
		
		return $return ; 
	
	}
	
	
	
	
	
	function GetJobs($title = NULL,$user_id = NULL,$limit = NULL){
		if($user_id<>""){
			$s_user_id = " AND (`user_id` = '$user_id') " ; 
		}
		
		if($title<>""){
			$s_title = " AND (`job_title` LIKE '%$title%') " ; 
		}
		
		if($limit<>""){
			$limit = 'LIMIT 0,' . $limit ; 
		}
		
		$GetOrdersQuery = "SELECT * FROM `jobs` WHERE (`is_taken` <> 7) $s_user_id $s_title ORDER BY `id` DESC $limit ;" ; 
		$DoGetOrdersQuery = mysql_query($GetOrdersQuery) or die(mysql_error()) ; 

		$return = '<table class="table table-striped"><thead><tr><th>#</th><th>Title</th><th>Date</th><th>Location</th><th>Taken (0 = False / 1 = True)</th><th>-</th></tr></thead><tbody>' ; 
		while ($fetch_info= mysql_fetch_array($DoGetOrdersQuery)) {
					$id = $fetch_info['id'] ;
					$job_title = $fetch_info['job_title'] ; 
					$job_date =  $fetch_info['job_date'] ; 
					$job_location =  $fetch_info['job_location'] ; 
					$is_taken =  $fetch_info['is_taken'] ; 
					$return = $return . '<tr><th>' . $id . '</th><th>' . $job_title . '</th><th>' . $job_date . '</th><th>' . $job_location . '</th><th>' . $is_taken . '</th><th><a href="./jobs.php?cmd=edit_job&id=' . $id . '">Edit/Remove</a></th></tr>' ; 
		}
		
		return $return . '</tbody></table>' ; 
	
	}
	
	
	
	function GetJobInfo($field,$id){
		
		$user_info_query = "SELECT *  FROM `jobs` WHERE `id` = '$id' LIMIT 1 ;" ; 
		$do_user_info_query = mysql_query($user_info_query) ; 

		while ($fetch_user_info= mysql_fetch_array($do_user_info_query)) {
					$requested_info = $fetch_user_info[$field] ;
		}
		
		return $requested_info ; 
	}
	
	function ShowApply($uid,$jid){
		$CFD = $this->CheckForDuplicate($uid,$jid) ; 
		if($CFD==FALSE){
			$return = '<a class="button solid md blue" href="../../recorder/recorder.php?vtype=apply_for_job&id=' . $jid . '"><div class="over">Apply</div></a>' ; 
		}else{
			$return = "You've already applied to this job" ; 
		}
		
		return $return ; 
	}
	
	function CheckForDuplicate($uid,$jid){
		Global $user ; 
		$CheckCardQuery=mysql_query("SELECT * FROM apply_for_job WHERE (job_id='$jid') AND (user_id='$uid') ;");
		
		
		$CheckCardQueryCount=mysql_num_rows($CheckCardQuery);
			$return = False ;
		if($CheckCardQueryCount==1){
			$return = True ;  
		}
		
				
		return ($return); 
	}
	
	
	
	
	function ApplyForJob($uid,$jid,$vfile){
		$CFD = $this->CheckForDuplicate($uid,$jid) ; 
		if($CFD==FALSE){
			$apply_query = "INSERT INTO `apply_for_job` (`id`, `job_id`, `user_id`, `apply_video`) VALUES (NULL, '$jid', '$uid', '$vfile');" ; 
			$do_apply_query = mysql_query($apply_query) ; 
		}
		
		header("location: ../dashboard/user/job.php?id=" . $jid) ; 
		
	}


	function GetAppliesForRec($rec_id = NULL){
		Global $user,$now ; 
		
		if($rec_id==""){
			$rec_id = $user->GetUserInfo("id") ; 
		}
		
		$GetJobsOfRec = mysql_query("Select * from jobs where user_id = $rec_id ; ") ; 
		$j_ids = "0" ; 
		while ($fetch_info= mysql_fetch_array($GetJobsOfRec)) {
					$id = $fetch_info['id'] ;
					$j_ids = $j_ids . "," . $id ;
		}
		
		$set_current_date = strtotime($now) ; 
		$prev_t = $set_current_date-(120) ; 
		$next_t = $set_current_date+(120) ;  
		
		$current_t = date('m/d/Y h:i:s a', $set_current_date);
		$prev_t = date('m/d/Y h:i:s a', $prev_t);
		$next_t = date('m/d/Y h:i:s a', $next_t);
		
		$GetWhoAppliedToTheseJobs = mysql_query("SELECT apply_for_job.*, users.*,case (users.last_seen BETWEEN '$prev_t' AND '$next_t') when TRUE then 'yes' when FALSE then 'no' end as online FROM apply_for_job, users WHERE (apply_for_job.job_id in ($j_ids)) and (users.id = apply_for_job.user_id) ;") ; 

		$return = '<table class="table table-striped"><thead><tr><th>ID</th><th>Job Title</th><th>Job Seeker</th><th>Start Conversation</th></tr></thead><tbody>' ; 
		while ($fetch_info= mysql_fetch_array($GetWhoAppliedToTheseJobs)) {
					// $id = $fetch_info['user_id'] ;
					// $ap_ids = $ap_ids . "," . $id ;
					
					$apply_id = $fetch_info[0] ; 
					$job_id = $fetch_info['job_id'] ; 
					$user_id = $fetch_info['user_id'] ; 
					
					$job_title = $this->GetJobInfo("job_title",$job_id) ; 
					$ap_fullname = $fetch_info['first_name'] . " " . $fetch_info['last_name'] ; 
					$ap_username = $fetch_info['username'] ; 
					$online = $fetch_info['online'] ; 
					if($online=="no"){
						$online = "User is currently offline." ; 
					}else{
						$online = '<a href="../chat/chat.php?with=' . $user_id . '" class="button sm solid icon green"><div class="over"><i class="fa fa-play-circle-o"></i> Start/Resume</div></a>' ; 
					}
					$return = $return . '<tr><th>' . $apply_id . '</th><th>' . "<a href='./job.php?id=$job_id'>" . $job_title . '</a></th><th>' . "<a href='./profile.php?id=$user_id'>" . $ap_fullname . "($ap_username)" . '</a></th><th>' . $online . '</th></tr>' ; 
					
		}
		return $return . '</tbody></table>' ;
		
		
	}
	
	
	function GetApplies($j_id){
		Global $user,$user_files_path,$JobsVideosPath ; 
		$GA_Query = mysql_query("SELECT * FROM apply_for_job WHERE (job_id='$j_id') ;");
		
		$rt1 = '<div style="border-style:solid; border-type:solid; border-width:3px;"><center>' ; 
		$rt2 = '</center></div><br/>' ; 
		while ($fetch_info= mysql_fetch_array($GA_Query)) {
					$id = $fetch_info['id'] ;
					$user_id = $fetch_info['user_id'] ; 
					$apply_video =  $fetch_info['apply_video'] ; 
					$ap_full_name =  $user->GetUserInfoByID("first_name",$user_id) . " " . $user->GetUserInfoByID("last_name",$user_id) ; 
					$ap_username = $user->GetUserInfoByID("username",$user_id) ;  
					$FullVideoPath = $user_files_path . $JobsVideosPath . $apply_video ; 
					$return = $return . $rt1 . "<a href='profile.php?id=$user_id'>" . $ap_full_name . "($ap_username)</a><br/>" . '<video id="example_video_' . $user_id . '" class="video-js vjs-default-skin" controls preload="none" width="500" height="400" data-setup="{}"><source src="' . $FullVideoPath .  '" type="video/mp4" /><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video><br><a style="color:red;" href="' . $FullVideoPath . '">Download Video</a><br/>' .  $rt2 ;  
		}
		
		return $return ; 
		
	}

	function StartRoom($partner1,$partner2){
		$roomkey = md5($partner1 . "|azzzzzz|" . $partner2) ; 
		$start_room_query = mysql_query("INSERT INTO interviews( partner_1, partner_2, room_key, start_date ) SELECT * FROM ( SELECT '$partner1', '$partner2', '$roomkey', NOW( )) AS tmp WHERE NOT EXISTS ( SELECT * FROM interviews WHERE ( (partner_1 = '$partner1' AND partner_2 = '$partner2') OR (partner_1 = '$partner2' AND partner_2 = '$partner1')))LIMIT 1 ; ") ; 
		
		$get_room_key = mysql_query("SELECT * FROM interviews WHERE ((partner_1 = '$partner1' AND partner_2 = '$partner2') OR (partner_1 = '$partner2' AND partner_2 = '$partner1')) ; ") ; 
		
		while ($fetch_info= mysql_fetch_array($get_room_key)) {
					$return = $fetch_info['room_key'] ; 
		}
		
		return $return ; 
		
	}
	
	function RejectRoom($partner1,$partner2){
		$remove_query = mysql_query("DELETE FROM interviews WHERE ((partner_1 = '$partner1' AND partner_2 = '$partner2') OR (partner_1 = '$partner2' AND partner_2 = '$partner1')) ; ") ; 
		header("location: ../") ; 
	}
	
	function GetMyRooms(){
		Global $user ; 
		$my_id = $user->GetUserInfo("id") ; 
		$getrooms = mysql_query("SELECT * FROM interviews WHERE (partner_1 = '$my_id' or partner_2 = '$my_id') ; ") ;
		
		$return = '<table class="table table-striped"><thead><tr><th>Partner 1</th><th>Partner 2</th><th>Date Started</th><th>Action</th></tr></thead><tbody>' ; 
		while ($fetch_info= mysql_fetch_array($getrooms)) {

					$partner1_id = $fetch_info['partner_1'] ; 
					$partner2_id = $fetch_info['partner_2'] ; 
					$date_started = $fetch_info['start_date'] ; 
					
					$partner1_name = $user->GetUserInfoByID("first_name",$partner1_id) . " " . $user->GetUserInfoByID("last_name",$partner1_id) . "(" . $user->GetUserInfoByID("username",$partner1_id) . ")" ; 
					$partner2_name = $user->GetUserInfoByID("first_name",$partner2_id) . " " . $user->GetUserInfoByID("last_name",$partner2_id) . "(" . $user->GetUserInfoByID("username",$partner2_id) . ")" ; 
					 
					$my_id = $user->GetUserInfo("id") ; 
					if($partner1_id==$my_id){
						$with = $partner2_id ; 
					}else{
						$with = $partner1_id ; 
					}
					
					$chat_button = '<a href="../chat/chat.php?with=' . $with . '" class="button sm solid icon green"><div class="over"><i class="fa fa-play-circle-o"></i> Start/Resume</div></a>' ; 
					$reject_button = '<a href="../chat/chat.php?cmd=reject&with=' . $with . '" class="button sm solid icon red"><div class="over"><i class="fa fa-play-circle-o"></i> Reject/Delete</div></a>' ; 
					$return = $return . '<tr><th>' . $partner1_name . '</th><th>' . $partner2_name . '</th><th>' . $date_started . '</th><th>' . $chat_button . $reject_button . '</th></tr>' ; 
					
		}
		return $return . '</tbody></table>' ;
		
	}
	
	
	function EditJob($id){	
		
		
		$GetOrdersQuery = "SELECT * FROM `jobs` WHERE `id` = $id ;" ; 
		$DoGetOrdersQuery = mysql_query($GetOrdersQuery) ; 
		
		
		
		
		while ($fetch_info= mysql_fetch_array($DoGetOrdersQuery)) {
					$id = $fetch_info['id'] ;
					$user_id = $fetch_info['user_id'] ; 
					$job_title =  $fetch_info['job_title'] ; 
					$job_role =  $fetch_info['job_role'] ; 
					$job_location =  $fetch_info['job_location'] ; 
					$job_desc =  $fetch_info['job_desc'] ; 
					$job_skills =  $fetch_info['job_skills'] ;
					$job_es =  $fetch_info['job_es'] ;
					$job_degree =  $fetch_info['job_degree'] ;
					$job_exp = $fetch_info['job_exp'] ;
					$job_clevel = $fetch_info['job_clevel'] ;
					$job_gender = $fetch_info['job_gender'] ;
					$job_nat = $fetch_info['job_nat'] ;
					$job_salary = $fetch_info['job_salary'] ;
					
					$return = '<div class="panel panel-success"><div class="panel-heading"><h3 class="panel-title">#' . $id . ' - ' . $job_title . '</h3></div><div class="panel-body">' ; 
					$return = $return . '<form action="process.php" name="EditJob" id="EditJob" method="post"><input type="hidden" name="cmd" id="cmd" value="EditJob" /><input type="hidden" name="id" id="id" value="' . $id . '" />' ; 
					$return = $return . '<br/> ' ; 
					$return = $return . 'Rec ID (User ID) : <input id="user_id" name="user_id" placeholder="User ID" class="form-control input-md" type="text" value="' . $user_id . '" disabled/>' ; 
					$return = $return . 'Job Title : <input id="job_title" name="job_title" placeholder="Title" class="form-control input-md" type="text" value="' . $job_title . '"/>' ; 
					$return = $return . 'Job Role : <input id="job_role" name="job_role" placeholder="Job Role" class="form-control input-md" type="text" value="' . $job_role . '"/>' ; 
					$return = $return . 'Job Location : <input id="job_location" name="job_location" placeholder="Job Location" class="form-control input-md" type="text" value="' . $job_location . '"/>' ; 
					$return = $return . 'Job Description : <textarea input id="job_desc" name="job_desc" placeholder="Description" class="form-control input-md">' . $job_desc . '</textarea>' ; 
					$return = $return . 'Job Skills : <input id="job_skills" name="job_skills" placeholder="Skills" class="form-control input-md" type="text" value="' . $job_skills . '"/>' ; 
					$return = $return . 'Job E.S : <input id="job_es" name="job_es" placeholder="" class="form-control input-md" type="text" value="' . $job_es . '"/>' ; 
					$return = $return . 'Job Degree : <input id="job_degree" name="job_degree" placeholder="Degree" class="form-control input-md" type="text" value="' . $job_degree . '"/>' ; 
					$return = $return . 'Job Experience : <input id="job_exp" name="job_exp" placeholder="Experience" class="form-control input-md" type="text" value="' . $job_exp . '"/>' ; 
					$return = $return . 'Carrier Level : <input id="job_clevel" name="job_clevel" placeholder="Level" class="form-control input-md" type="text" value="' . $job_clevel . '"/>' ; 
					$return = $return . 'Job Gender : <input id="job_gender" name="job_gender" placeholder="Gender" class="form-control input-md" type="text" value="' . $job_gender . '"/>' ; 
					$return = $return . 'Nationality : <input id="job_nat" name="job_nat" placeholder="" class="form-control input-md" type="text" value="' . $job_nat . '"/>' ; 
					$return = $return . 'Salary : <input id="job_salary" name="job_salary" placeholder="Salary" class="form-control input-md" type="text" value="' . $job_salary . '"/>' ; 
					 
					$return = $return . '<button type="submit" id="editjobbtn" name="editjobbtn" class="btn btn-primary">Save</button></form></div><a href="./process.php?cmd=Remove&remove_type=job&id=' . $id . '"> <button id="remove" name="remove" class="btn btn-danger">Remove</button></a></div></div>' ; 
					return $return ; 
					
					
					
		}
		
		
	
	}
	
	function RemoveJob($id){
		$remove_query = mysql_query("DELETE FROM `jobs` WHERE `id` = $id ;"); 
	}
	
	function RemoveChat($id){
		$remove_query = mysql_query("DELETE FROM `interviews` WHERE `id` = $id ;"); 
	}
	
	function UpdateJobInfo($field,$new_value,$user){
		
		$update_query="UPDATE `jobs` SET `$field` = '$new_value' WHERE `id` = '$user' ;";
		$do_update_query=mysql_query($update_query);
		
	}
	
	
	
	function GetChatSessions($room_id = NULL,$partner1 = NULL,$partner2 = NULL,$limit = NULL){
		if($room_id<>""){
			$room_id = " AND (`id` = '$room_id') " ; 
		}
		
		if($partner1<>""){
			$partner1 = " AND (`partner_1` = '$partner1') " ; 
		}
		
		if($partner2<>""){
			$partner2 = " AND (`partner_2` = '$partner2') " ; 
		}
		
		if($limit<>""){
			$limit = 'LIMIT 0,' . $limit ; 
		}
		
		$GetOrdersQuery = "SELECT * FROM `interviews` WHERE (`id` <> '-7') $room_id $partner1 $partner2 ORDER BY `id` DESC $limit ;" ; 
		$DoGetOrdersQuery = mysql_query($GetOrdersQuery) or die(mysql_error()) ; 

		$return = '<table class="table table-striped"><thead><tr><th>#</th><th>Partner 1</th><th>Partner 2</th><th>Start Date</th><th>-</th></tr></thead><tbody>' ; 
		while ($fetch_info= mysql_fetch_array($DoGetOrdersQuery)) {
					$id = $fetch_info['id'] ;
					$partner_1 = $fetch_info['partner_1'] ; 
					$partner_2 =  $fetch_info['partner_2'] ; 
					$start_date =  $fetch_info['start_date'] ;  
					$return = $return . '<tr><th>' . $id . '</th><th>' . $partner_1 . '</th><th>' . $partner_2 . '</th><th>' . $start_date . '</th><th>' . $is_taken . '</th><th><a href="./process.php?cmd=Remove&remove_type=chat&id=' . $id . '"> <button id="remove" name="remove" class="btn btn-danger">Remove</button></a></th></tr>' ; 
		}
		
		return $return . '</tbody></table>' ; 
	
	}
	
	
	function GetAV($job_id = NULL,$user_id = NULL,$video_id = NULL,$limit = NULL){
		if($job_id<>""){
			$job_id = " AND (`job_id` = '$job_id') " ; 
		}
		
		if($user_id<>""){
			$user_id = " AND (`user_id` = '$user_id') " ; 
		}
		
		if($video_id<>""){
			$video_id = " AND (`id` = '$video_id') " ; 
		}
		
		if($limit<>""){
			$limit = 'LIMIT 0,' . $limit ; 
		}
		
		$GetOrdersQuery = "SELECT * FROM `apply_for_job` WHERE (`id` <> '-7') $job_id $user_id $video_id ORDER BY `id` DESC $limit ;" ; 
		$DoGetOrdersQuery = mysql_query($GetOrdersQuery) or die(mysql_error()) ; 

		$return = '<table class="table table-striped"><thead><tr><th>Video ID</th><th>Job ID</th><th>User ID</th><th>Download Video</th><th>Remove</th></tr></thead><tbody>' ; 
		while ($fetch_info= mysql_fetch_array($DoGetOrdersQuery)) {
					$id = $fetch_info['id'] ;
					$job_id = $fetch_info['job_id'] ; 
					$user_id =  $fetch_info['user_id'] ; 
					$apply_video =  $fetch_info['apply_video'] ;  
					$return = $return . '<tr><th>' . $id . '</th><th>' . $job_id . '</th><th>' . $user_id . '</th><th><a href="./' . $apply_video . '"> <button id="download" name="download" class="btn btn-success">Download</button></a></th><th><a href="./process.php?cmd=Remove&remove_type=chat&id=' . $id . '"> <button id="remove" name="remove" class="btn btn-danger">Remove</button></a></th></tr>' ; 
		}
		
		return $return . '</tbody></table>' ; 
	
	}
	
}

?>