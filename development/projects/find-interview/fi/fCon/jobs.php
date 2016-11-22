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
            <h3 class="panel-title">Jobs</h3>
            </div>
            <div class="panel-body">
				<br/>
				<form class="form-group" method="post" action="./process.php" id="SearchJobs" >
					<input type="hidden" name="cmd" id="cmd" value="SearchJobs" />
					
						<div class="col-md-6"><input id="userid" name="userid" placeholder="Search By User ID" class="form-control input-md" type="text"></div>
					  
						<div class="col-md-6"><input id="title" name="title" placeholder="Search By Title" class="form-control input-md" type="text"></div>

						<div class="col-md-6"><input id="limit" name="limit" placeholder="Limit, default is 300 job" class="form-control input-md" type="text"></div>
						
						<div class="col-md-10">
							<br/>
							<button type="submit" id="searchjobsbtn" name="searchjobsbtn" class="btn btn-primary">Search</button>
							<br/>
						</div>
				</form>
				<div id="SearchJobsResponse" class="col-md-12"><?php echo $jobs->GetJobs() ; ?></div>
				
				
			</div>
			</div>
			</div>
			<?php
			}elseif($cmd=="edit_job"){
				$user_id = $functions->SecureInput($_GET['id']) ; 
				echo $jobs->EditJob($user_id);
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