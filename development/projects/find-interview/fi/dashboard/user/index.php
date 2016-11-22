<?php 
include 'header.php';

	$C_U_Video = $user->GetUserInfo("user_video") ; 
	$FullVideoPath = $user_files_path . $ProfileVideosPath . $C_U_Video ; 
	
?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>

<body>
    <div class="container only">
        <div class="row">
            <div class="col-sm-6 main-el">
                <div class="sep-heading-container shc4 clearfix">
					<h4>Change my video (Record a new video)</h4>
						
                    <div class="sep-container">
                        <div class="the-sep"></div>
						</div>
					</div>
					
			
                            <div class="col-xs-12"><a href="../../recorder/recorder.php?vtype=profile" class="button solid md blue"  style="padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px;">Click here to record a new video</a><br/><br/><br/> <h4> This video will be your main profile video, it's highly recommended to record a short (about 30 seconds) video.</h4></div>
            </div>

        <div class="row">
                <div class="col-sm-6 main-el">
                    <div class="sep-heading-container shc4 clearfix">
                        <h4>My Current Video</h4>

                        <div class="sep-container">
                            <div class="the-sep"></div>
                        </div>
                    </div>

					
					  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="640" height="480" data-setup="{}">
						<source src="<?php echo $FullVideoPath ; ?>" type='video/mp4' />
						<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
					  </video>
                    
                </div>
            </div>
        </div>

        <div class="col-md-12 main-el">
            <div id="GetMyRooms" name="GetMyRooms" class="tablewrap">
            </div>
							<script language="javascript" type="text/javascript">
								$('#GetMyRooms').load('process.php?cmd=GetMyRooms');
								
								setInterval(function(){
									  $('#GetMyRooms').load('process.php?cmd=GetMyRooms');
								 },5000);	
							</script>
							
        </div>
    </div><?php 
            include 'footer.php';
            ?>
</body>
</html>