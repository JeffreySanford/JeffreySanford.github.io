<?php
session_start();
// added in v4.0.0
require_once 'autoload.php';
use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
use Facebook\Entities\AccessToken;
use Facebook\HttpClients\FacebookCurlHttpClient;
use Facebook\HttpClients\FacebookHttpable;
// init app with app id and secret
FacebookSession::setDefaultApplication( '1599685076951961','4d803ba3977d37aa66bd355264fd8d74' );
// login helper with redirect_uri
    $helper = new FacebookRedirectLoginHelper('http://www.findinterview.com/fi/includes/fb/fbconfig.php' );
	
try {
  $session = $helper->getSessionFromRedirect();
} catch( FacebookRequestException $ex ) {
  // When Facebook returns an error
} catch( Exception $ex ) {
  // When validation fails or other local issues
}
// see if we have a session
if ( isset( $session ) ) {
  
  // graph api request for user data
  $request = new FacebookRequest( $session, 'GET', '/me?fields=id,first_name,last_name,name,email&' );
  $response = $request->execute();
  // get response
		$graphObject = $response->getGraphObject();
     	$fbid = $graphObject->getProperty('id');              // To Get Facebook ID
		$first_name = $graphObject->getProperty('first_name');              // To Get Facebook ID
 	    $last_name = $graphObject->getProperty('last_name'); // To Get Facebook full name
	    $femail = $graphObject->getProperty('email');    // To Get Facebook email ID
	/* ---- Session Variables -----*/
	//    $_SESSION['FBID'] = $fbid;           
    //    $_SESSION['FIRSTNAME'] = $first_name;
	//	$_SESSION['LASTNAME'] = $last_name;
	//    $_SESSION['EMAIL'] =  $femail;
    /* ---- header location after session ----*/

  header("Location: ../../auth.php?method=facebook&first_name=" . $first_name . "&last_name=" . $last_name . "&email=" . $femail . "&fbid=" . $fbid);
  // echo '<meta http-equiv="refresh" content="0;URL=' . "'http://thetudors.example.com/'" . '" />' ; 
} else {
  $loginUrl = $helper->getLoginUrl(array('scope' => 'email'));
 header("Location: ".$loginUrl);
}
?>