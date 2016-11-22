<?php 
include "./configs/config.php" ; 
$admin->CheckAuth(True) ; 
include "./theme/header.php";
?>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
			<?php
			$cmd = $_GET['cmd'] . $_POST['cmd'] ; 
			
			if($cmd==""){
			?>
			<div class="col-sm-12" name="OrdersPanel" id="OrdersPanel">
			<div class="panel panel-primary">
            <div class="panel-heading">
            <h3 class="panel-title">Apply Videos</h3>
            </div>
            <div class="panel-body">
				<br/>
				<form class="form-group" method="post" action="./process.php" id="SearchAV" >
					<input type="hidden" name="cmd" id="cmd" value="SearchAV" />
					
						<div class="col-md-6"><input id="job_id" name="job_id" placeholder="Search By Job ID" class="form-control input-md" type="text"></div>
					  
						<div class="col-md-6"><input id="user_id" name="user_id" placeholder="Search By User ID" class="form-control input-md" type="text"></div>

						<div class="col-md-6"><input id="video_id" name="video_id" placeholder="Search By Video ID" class="form-control input-md" type="text"></div>

						<div class="col-md-6"><input id="limit" name="limit" placeholder="Limit, default is 300" class="form-control input-md" type="text"></div>
						
						<div class="col-md-10">
							<br/>
							<button type="submit" id="SearchAVBtn" name="SearchAVBtn" class="btn btn-primary">Search</button>
							<br/>
						</div>
				</form>
				<div id="SearchAVResponse" class="col-md-12"><?php echo $jobs->GetAV() ; ?></div>
				
				
			</div>
			</div>
			</div>
			<?php
			}
			?>
			
			<?php include "./includes/z_scripts/admin_panel.js" ; ?>
			
			
			
    <!-- /#wrapper -->

    <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="js/plugins/metisMenu/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="js/plugins/morris/raphael.min.js"></script>
    <script src="js/plugins/morris/morris.min.js"></script>
    <script src="js/plugins/morris/morris-data.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="js/sb-admin-2.js"></script>
</body>
</html>