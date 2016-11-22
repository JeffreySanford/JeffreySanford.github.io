<?php 
include 'header.php';	
?>

<body>
    <div class="container only">
        <div class="col-md-12 main-el">
                        <div class="col-md-12">
                            <div class="sep-heading-container shc4 clearfix">
                                <h4>Search Jobs</h4>
								<form action="process.php" method="post" name="SearchJobs" id="SearchJobs">
								<input type="hidden" name="cmd" id="cmd" value="SearchJobs" />
								<input class="form-control input-md" type="text" name="j_title" id="j_title" placeholder="Job Title, Example : Marketer, Reseller" />
								<button id="btnSearchJobs" name="btnSearchJobs" type="submit" class="btn btn-primary">Search Jobs</button>
								</form>
                                <div class="sep-container">
                                    <div class="the-sep"></div>
                                </div>
                            </div>
                        </div>
                            <div id="SearchJobsRes" name="SearchJobsRes" class="tablewrap">
							<?php 
							$c_user_id = $user->GetUserInfo("id") ; 
							echo $jobs->GetJobs() ;
							?>
                            </div>
        </div>
    </div>
	
<?php 
include 'footer.php';
?>
</body>
</html>