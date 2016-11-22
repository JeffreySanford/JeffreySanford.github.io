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
            <h3 class="panel-title">Chat Sessions</h3>
            </div>
            <div class="panel-body">
				<br/>
				<form class="form-group" method="post" action="./process.php" id="SearchChat" >
					<input type="hidden" name="cmd" id="cmd" value="SearchChat" />
					
						<div class="col-md-6"><input id="room_id" name="room_id" placeholder="Search By Room ID" class="form-control input-md" type="text"></div>
					  
						<div class="col-md-6"><input id="partner1" name="partner1" placeholder="Search By Partner 1 ID" class="form-control input-md" type="text"></div>

						<div class="col-md-6"><input id="partner2" name="partner2" placeholder="Search By Partner 2 ID" class="form-control input-md" type="text"></div>

						<div class="col-md-6"><input id="limit" name="limit" placeholder="Limit, default is 300" class="form-control input-md" type="text"></div>
						
						<div class="col-md-10">
							<br/>
							<button type="submit" id="SearchChatBtn" name="SearchChatBtn" class="btn btn-primary">Search</button>
							<br/>
						</div>
				</form>
				<div id="SearchChatResponse" class="col-md-12"><?php echo $jobs->GetChatSessions() ; ?></div>
				
				
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