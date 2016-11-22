<?php 
include "../../configs/config.php" ; 
$user->CheckAuth(True) ; 
$user->OnlyFor("user","../../auth.php") ; 
$user_files_path = "../" . $user_files_path ; 

?>

<!DOCTYPE html>
<html>

    <head>
        <title>FindInterview - a video says it all</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="./../../resources/font-awesome/css/font-awesome.min.css" rel="stylesheet">

        <link rel="stylesheet" href="./../../resources/fontello/fontello.css">
        <link rel="stylesheet" href="../../../css/animation.css">
        <link href="./../../includes/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <link type="text/css" href="./../../vendors/MEplayer/mediaelementplayer.min.css" rel="stylesheet" />
        <!-- REVOLUTION BANNER CSS SETTINGS -->
        <link rel="stylesheet" type="text/css" href="./../../vendors/rs-plugin/css/settings.css" media="screen" />
        <link href="./../../vendors/smoothdivscroll/smoothDivScroll.css" rel="stylesheet">
        <link rel="stylesheet" href="./../../vendors/magnific-popup/magnific-popup.css">
        <link rel="stylesheet" href="./../../css/aspect.css">
        <link rel="stylesheet" href="./../../css/style.css">
        <link rel="stylesheet" href="./../../css/responsive.css">

        <script type="text/javascript" src="./../../includes/modernizr/modernizr.custom.27667.js"></script>
                    <!--[if lt IE 9]>
                                <script type="text/javascript" src="./../../includes/html5shiv/html5shiv.js"></script>
                                <script type="text/javascript" src="./../../includes/respond/respond.min.js"></script>
                                <![endif]-->
		
		<script src="js/jquery-1.11.0.js"></script>
    </head>



    <body data-spy="scroll" data-target="#section-nav">
       
			<div id="StayAwake"></div>
			<script language="javascript" type="text/javascript">
				$('#StayAwake').load('process.php?cmd=ImAwake');
				
				setInterval(function(){
					  $('#StayAwake').load('process.php?cmd=ImAwake');
				 },5000);	
			</script>

            <header class="head-1">
               <div class="container menu-bar" role="navigation">
                    <div class="large-header">
                        <div class="navbar-header">
                            <a class="logo-box" href="#">
                                <img class="img-responsive" alt="findInterview" src="./../../images/metro-logo.png">
                            </a>
                        </div>


 <ul class="nav navbar-nav menu-1">
                               <li class="dropdown closed">
                                    <a href="./index.php">Home<span class="main-text-color light"></span> </a>
                                   
                                </li>




    <li class="dropdown closed">
                                    <a href="./jobs.php">Find a Job<span class="main-text-color light"></span> </a>
                                   
                                </li>

    <li class="dropdown closed">
                                    <a href="../../auth.php?cmd=Logout">Logout<span class="main-text-color light"></span> </a>
                                   
                                </li>
                   
            </header>