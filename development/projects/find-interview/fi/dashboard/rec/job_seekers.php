<?php 
include 'header.php';
?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>

<body>

    <div class="container only">
        <div class="row">
           

 <div class="row">
                        <div class="col-md-12">
                            <div class="sep-heading-container shc4 clearfix">
                                <h4>Appliers</h4>
                                <div class="sep-container">
                                    <div class="the-sep"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 main-el">
                            <div id="GetAFR" name="GetAFR" class="tablewrap">
							
                            </div>
							
							<script language="javascript" type="text/javascript">
								$('#GetAFR').load('process.php?cmd=GetAppliesForRec');
								
								setInterval(function(){
									  $('#GetAFR').load('process.php?cmd=GetAppliesForRec');
								 },5000);	
							</script>
							
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