<?php 
include('../ipnlistener.php');
include('../../../configs/config.php') ; 
$ipn_email = $functions->GetGeneralSetting("ipn_email") ; 


$NumOfDays = 40 ; 

$C_Valid = date("d-m-Y") ; 
$N_Valid = date('d-m-Y', strtotime($C_Valid. ' + ' . $NumOfDays . ' days'));


exit($ipn_email . "<br/>" . $C_Valid . "<br/>" . $N_Valid) ; 

?>