<?php
include "./configs/config.php" ; 
$admin->CheckAuth(True) ; 



$cmd = $_GET['cmd'] . $_POST['cmd'] ; 
if($cmd=="SearchOrders"){

$username = $functions->SecureInput($_POST['username']) ; 
$id = $functions->SecureInput($_POST['id']) ; 
$status = $functions->SecureInput($_POST['status']) ; 
$type = $functions->SecureInput($_POST['type']) ; 
$date_from = "20" . $functions->SecureInput($_POST['date_from']) ; 
$date_to= "20" . $functions->SecureInput($_POST['date_to']) ; 
$last_update= "20" . $functions->SecureInput($_POST['last_update']) ; 
$limit= $functions->SecureInput($_POST['limit']) ; 
$export= $functions->SecureInput($_POST['export']) ; 
$location = $functions->SecureInput($_POST['location']) ; 

echo $orders->GetOrders($username,$id,$status,$type,$date_from,$date_to,$limit,$export,$location,$last_update) ; 

}elseif($cmd=="EditOrder"){
$id = $functions->SecureInput($_POST['id']);

// Log the process
$logs->Log("Updated Order : " . $id);

$orders->UpdateOrderInfo("original_link",$functions->SecureInput($_POST['original_link']),$id);
$o_username = $functions->SecureInput($_POST['username']) ; 
$orders->UpdateOrderInfo("username",$o_username,$id);
$orders->UpdateOrderInfo("item_name",$functions->SecureInput($_POST['item_name']),$id);
$orders->UpdateOrderInfo("item_color",$functions->SecureInput($_POST['item_color']),$id);
$orders->UpdateOrderInfo("item_size",$functions->SecureInput($_POST['item_size']),$id);
$orders->UpdateOrderInfo("item_model",$functions->SecureInput($_POST['item_model']),$id);
$orders->UpdateOrderInfo("item_specs",$functions->SecureInput($_POST['item_specs']),$id);
$orders->UpdateOrderInfo("delivery",$functions->SecureInput($_POST['delivery']),$id);

$quantity = $functions->SecureInput($_POST['quantity']) ; 
$orders->UpdateOrderInfo("quantity",$quantity,$id);

$original_price = $functions->SecureInput($_POST['original_price']) ; 
$orders->UpdateOrderInfo("original_price",$original_price,$id);

$pounds = $functions->SecureInput($_POST['pounds']) ; 
$orders->UpdateOrderInfo("pounds",$pounds,$id);

$shipping_price = $functions->SecureInput($_POST['shipping_price']) ; 
$commission_price = $functions->SecureInput($_POST['commission_price']) ; 
$one=1;
if ($pounds<26){
	$pre_total = $pounds * 7 ; 
	}elseif($pounds>25 && $pounds <51){
	$pre_total = $pounds * 6 ;
	}elseif($pounds >50 && $pounds <101){
	$pre_total = $pounds * 5 ;
	}elseif($pounds >100 && $pounds <301){
	$pre_total = $pounds * 4 ;
	}elseif($pounds >300){
	$pre_total = $pounds * 3 ;
	}else{
	echo "It's secured ,stop trying ";
	}

if($shipping_price==""){
$shipping_price = $pre_total ; 
}


$orders->UpdateOrderInfo("shipping_price",$shipping_price,$id);


$pre_total = ($original_price * $quantity) + $shipping_price ; 

if($commission_price==""){
if ($pre_total>199){
$commission_price = $original_price * 0.025 ; 

}else{
$commission_price = 4 ;
}
}
$orders->UpdateOrderInfo("commission_price",$commission_price,$id);

$total_price = $original_price + $shipping_price + $commission_price ; 

$ba_expire = $user->GetUserInfo("ba_expire",$o_username) ; 
$ba_blocked = $user->GetUserInfo("ba_blocked",$o_username) ; 

$today = date("Y-m-d",time()); 

$ba_expire = strtotime($ba_expire) ; 
$today = strtotime($today) ; 

if($ba_expire < $today){
$nothing_happened = $nothing_happened ;
}else{
if($ba_blocked <> "0"){
$nothing_happened = $nothing_happened ; 
}else{
$ba_discount = $functions->GetSettings('ba_discount') ;
$total_price = $total_price - ($total_price * ($ba_discount / 100)) ; 
}
}



$orders->UpdateOrderInfo("total_price",$total_price,$id);
$orders->UpdateOrderInfo("notes",$functions->SecureInput($_POST['notes']),$id);
$orders->UpdateOrderInfo("date_placed",$functions->SecureInput($_POST['date_placed']),$id);

$o_status = $functions->SecureInput($_POST['status']) ; 
$orders->UpdateOrderInfo("status",$o_status,$id);
if($o_status=="7"){
$current_credits = $user->GetUserInfo("credits",$o_username) ; 
$new_credits = $current_credits + $total_price ; 
$o_user_id = $user->GetUserInfo("id",$o_username) ; 
$user->UpdateUserInfo("credits",$new_credits,$o_user_id) ; 
}

echo "<h5 style='color:green;'>Success</h5>" ; 

}elseif($cmd=="SearchUsers"){


$username = $functions->SecureInput($_POST['username']) ; 
$email = $functions->SecureInput($_POST['email']) ; 
$phone = $functions->SecureInput($_POST['phone']) ; 
echo $user->GetUsers($username,$email,$phone) ; 

}elseif($cmd=="SearchJobs"){


$user_id = $functions->SecureInput($_POST['userid']) ; 
$title = $functions->SecureInput($_POST['title']) ; 
$limit = $functions->SecureInput($_POST['limit']) ; 
echo $jobs->GetJobs($title,$user_id,$limit) ; 


}elseif($cmd=="SearchChat"){


$room_id = $functions->SecureInput($_POST['room_id']) ; 
$partner1 = $functions->SecureInput($_POST['partner1']) ; 
$partner2 = $functions->SecureInput($_POST['partner2']) ; 
$limit = $functions->SecureInput($_POST['limit']) ; 
echo $jobs->GetChatSessions($room_id,$partner1,$partner2,$limit) ; 


}elseif($cmd=="SearchAV"){


$job_id = $functions->SecureInput($_POST['job_id']) ; 
$user_id = $functions->SecureInput($_POST['user_id']) ; 
$video_id = $functions->SecureInput($_POST['video_id']) ; 
$limit = $functions->SecureInput($_POST['limit']) ; 
echo $jobs->GetAV($job_id,$user_id,$video_id,$limit) ; 


}elseif($cmd=="EditUser"){

$id = $functions->SecureInput($_POST['id']);

// Log the process
$logs->Log("Updated User : " . $id);
$user->UpdateUserInfo("email",$functions->SecureInput($_POST['email']),$id);
$user->UpdateUserInfo("full_name",$functions->SecureInput($_POST['full_name']),$id);
$user->UpdateUserInfo("phone",$functions->SecureInput($_POST['phone']),$id);
$user->UpdateUserInfo("address",$functions->SecureInput($_POST['address']),$id);
$user->UpdateUserInfo("city",$functions->SecureInput($_POST['city']),$id);
$user->UpdateUserInfo("country",$functions->SecureInput($_POST['country']),$id);
$user->UpdateUserInfo("active",$functions->SecureInput($_POST['active']),$id);
$user->UpdateUserInfo("valid_through",$functions->SecureInput($_POST['valid_through']),$id);
$user->UpdateUserInfo("sex",$functions->SecureInput($_POST['sex']),$id);
$user->UpdateUserInfo("date_of_birth",$functions->SecureInput($_POST['date_of_birth']),$id);
$user->UpdateUserInfo("activites",$functions->SecureInput($_POST['activites']),$id);

$new_password = $functions->SecureInput($_POST['password']);
if($new_password<>""){
$user->UpdateUserInfo("password",md5($new_password),$id);
}

header( "refresh:3;url=./users.php?cmd=edit_user&id=" . $id );
echo "<h3 style='color:green;'>Success. Redirecting you in 3 seconds ...</h3>" ;

}elseif($cmd=="EditJob"){

$id = $functions->SecureInput($_POST['id']);

// Log the process
$logs->Log("Updated Job : " . $id);
$jobs->UpdateJobInfo("job_title",$functions->SecureInput($_POST['job_title']),$id);
$jobs->UpdateJobInfo("job_role",$functions->SecureInput($_POST['job_role']),$id);
$jobs->UpdateJobInfo("job_location",$functions->SecureInput($_POST['job_location']),$id);
$jobs->UpdateJobInfo("job_desc",$functions->SecureInput($_POST['job_desc']),$id);
$jobs->UpdateJobInfo("job_skills",$functions->SecureInput($_POST['job_skills']),$id);
$jobs->UpdateJobInfo("job_es",$functions->SecureInput($_POST['job_es']),$id);
$jobs->UpdateJobInfo("job_degree",$functions->SecureInput($_POST['job_degree']),$id);
$jobs->UpdateJobInfo("job_exp",$functions->SecureInput($_POST['job_exp']),$id);
$jobs->UpdateJobInfo("job_clevel",$functions->SecureInput($_POST['job_clevel']),$id);
$jobs->UpdateJobInfo("job_gender",$functions->SecureInput($_POST['job_gender']),$id);
$jobs->UpdateJobInfo("job_nat",$functions->SecureInput($_POST['job_nat']),$id);
$jobs->UpdateJobInfo("job_salary",$functions->SecureInput($_POST['job_salary']),$id);


header( "refresh:3;url=./jobs.php?cmd=edit_job&id=" . $id );
echo "<h3 style='color:green;'>Success. Redirecting you in 3 seconds ...</h3>" ;

}elseif($cmd=="EditGeneralSettings"){

$functions->UpdateSettings("ba_reqpoints",$functions->SecureInput($_POST['ba_reqpoints']));
$functions->UpdateSettings("ba_days",$functions->SecureInput($_POST['ba_days']));
$functions->UpdateSettings("ba_daystogive",$functions->SecureInput($_POST['ba_daystogive']));
$functions->UpdateSettings("ba_discount",$functions->SecureInput($_POST['ba_discount']));

header( "refresh:3;url=./settings.php" );
echo "<h3 style='color:green;'>Success. Redirecting you in 3 seconds ...</h3>" ;

}elseif($cmd=="GenerateCards"){
$value = $functions->SecureInput($_POST['card_type']) ; 
$quantity = $functions->SecureInput($_POST['quantity']) ;

// Log the process
$logs->Log("Generated " . $quantity . " - Value : " . $value);
echo $cards->GenerateCards($value,$quantity);

}elseif($cmd=="SearchItems"){

$category = $functions->SecureInput($_POST['cat_id']) ; 
$title = $functions->SecureInput($_POST['title']) ; 
$status = $functions->SecureInput($_POST['status']) ; 

echo $shopcenter->GetItems($category,$title,$status);
}elseif($cmd=="EditItem"){

$id = $functions->SecureInput($_POST['id']);

// Log the process
$logs->Log("Updated Item : " . $id);

$shopcenter->UpdateItemInfo("title",$functions->SecureInput($_POST['title']),$id);
$shopcenter->UpdateItemInfo("price",$functions->SecureInput($_POST['price']),$id);
$shopcenter->UpdateItemInfo("delivery_time",$functions->SecureInput($_POST['delivery_time']),$id);
$shopcenter->UpdateItemInfo("model",$functions->SecureInput($_POST['model']),$id);
$shopcenter->UpdateItemInfo("color",$functions->SecureInput($_POST['color']),$id);
$shopcenter->UpdateItemInfo("size",$functions->SecureInput($_POST['size']),$id);
$shopcenter->UpdateItemInfo("description",$functions->SecureInput($_POST['description']),$id);
$shopcenter->UpdateItemInfo("video",$functions->SecureInput($_POST['video']),$id);
$shopcenter->UpdateItemInfo("cat_id",$functions->SecureInput($_POST['cat_id']),$id);
$shopcenter->UpdateItemInfo("status",$functions->SecureInput($_POST['status']),$id);

echo "<h3 style='color:green;'>Success.</h3>" ; 
}elseif($cmd=="NewItem"){

$final_link1 = $functions->Upload("file1","|") ; 
if($final_link1==NULL){
echo("<a style='color:red;'>Please select an image</a>") ; 
exit;
}

$final_link2 = $functions->Upload("file2","|") ; 
$final_link3 = $functions->Upload("file3","|") ; 
$final_link4 = $functions->Upload("file4","|") ; 
$final_link5 = $functions->Upload("file5","|") ; 
$final_link6 = $functions->Upload("file6","|") ; 
$final_link7 = $functions->Upload("file7","|") ; 
$final_link8 = $functions->Upload("file8","|") ; 
$final_link9 = $functions->Upload("file9","|") ; 
$final_link10 = $functions->Upload("file10","|") ; 



$title = $functions->SecureInput($_POST['title']) ; 

// Log the process
$logs->Log("Created Item : " . $title);


$model = $functions->SecureInput($_POST['model']) ; 
$color = $functions->SecureInput($_POST['color']) ; 
$size = $functions->SecureInput($_POST['size']) ; 
$description = $functions->SecureInput($_POST['description']) ; 
$cat_id = $functions->SecureInput($_POST['cat_id']) ; 
$price = $functions->SecureInput($_POST['price']) ; 
$delivery_time = $functions->SecureInput($_POST['delivery_time']) ; 
$video = $functions->SecureInput($_POST['video']) ; 
$status = $functions->SecureInput($_POST['status']) ; 

$photos = $final_link1 . $final_link2 . $final_link3 . $final_link4 . $final_link5 . $final_link6 . $final_link7 . $final_link8 . $final_link9 . $final_link10; 




$shopcenter->NewItem($title,$model,$color,$size,$description,$cat_id,$price,$delivery_time,$photos,$video,$status); 
echo "<h3 style='color:green;'>Success. Redirecting you in 3 seconds ...</h3>" ;
header( "refresh:3;url=./items.php" );

}elseif($cmd=="Remove"){
$remove_type = $functions->SecureInput($_GET['remove_type']) ; 
$id = $functions->SecureInput($_GET['id']) ; 
if($remove_type=="user"){
$user->RemoveUser($id) ; 
$rm_location = "./users.php";  
}elseif($remove_type=="job"){
$jobs->RemoveJob($id) ; 
$rm_location = "./jobs.php";  
}elseif($remove_type=="chat"){
$jobs->RemoveChat($id) ; 
$rm_location = "./chat_sessions.php";  
}elseif($remove_type=="av"){
$jobs->RemoveAV($id) ; 
$rm_location = "./apply_videos.php"; 
}
// Log the process
$logs->Log("Removed " . $remove_type . " : " . $id);
echo "<h3 style='color:green;'>Success. Redirecting you in 3 seconds ...</h3>" ;
header( "refresh:3;url=$rm_location" );

}elseif($cmd=="AddNewCategory"){
$new_title = $functions->SecureInput($_POST['title']) ; 
$new_parent = $functions->SecureInput($_POST['new_cat_id']) ; 
if(($new_parent == "") or ($new_parent == "Main")){
$new_parent = NULL ; 
}
$categories->AddCategory($new_title,$new_parent); 
echo "<h3 style='color:green;'>Success. Redirecting you in 5 seconds ...</h3>" ;
header( "refresh:5;url=./categories.php" );
}elseif($cmd=="ChangeParentNameCategory"){
$old_cat_id = $functions->SecureInput($_POST['old_cat_id']) ; 
$new_title = $functions->SecureInput($_POST['title']) ; 
$new_parent = $functions->SecureInput($_POST['new_cat_id']) ; 
if($new_title<>""){
$categories->UpdateCategory("name",$new_title,$old_cat_id) ; 
}
if($new_parent<>""){
if($new_parent == "Main"){
$new_parent = NULL ; 
}
$categories->UpdateCategory("parents","-" . $new_parent . "-|",$old_cat_id) ; 
}
echo "<h3 style='color:green;'>Success. Redirecting you in 5 seconds ...</h3>" ;
header( "refresh:5;url=./categories.php" );
}elseif($cmd=="RemoveCategory"){

$old_cat_id = $functions->SecureInput($_POST['old_cat_id']) ; 
$categories->RemoveCategory($old_cat_id);
echo "<h3 style='color:green;'>Success. Redirecting you in 5 seconds ...</h3>" ;
header( "refresh:5;url=./categories.php" );
}elseif($cmd=="NewCatSliderImage"){

$final_img_link = $functions->Upload("ImageFile") ; 
if($final_img_link==NULL){
echo("<a style='color:red;'>Please select an image</a>") ; 
exit;
}

$c_id = $functions->SecureInput($_POST['cat_id']) ; 
$hyperlink = $functions->SecureInput($_POST['hyperlink']) ; 
$shopcenter->NewSliderImage($final_img_link,$c_id,$hyperlink) ; 

echo "<h3 style='color:green;'>Success. Redirecting you in 2 seconds ...</h3>" ;
header( "refresh:2;url=./categories_slider.php" );


}elseif($cmd=="ChangeCatSliderImageCat"){
$id = $functions->SecureInput($_POST['id']) ; 
$c_id = $functions->SecureInput($_POST['cat_id']) ; 
$shopcenter->ChangeImageCat($id,$c_id) ; 
echo "<h3 style='color:green;'>Success. Redirecting you in 2 seconds ...</h3>" ;
header( "refresh:2;url=./categories_slider.php" );
}elseif($cmd=="RemoveCSliderImage"){
$id = $functions->SecureInput($_GET['id']) ;
$shopcenter->RemoveSliderImage($id) ; 
echo "<h3 style='color:green;'>Success. Redirecting you in 2 seconds ...</h3>" ;
header( "refresh:2;url=./categories_slider.php" );
}elseif($cmd=="RequestExcelFile"){
$date = $functions->SecureInput($_POST['date']) ;
$orders->RequestExcelFile($date) ; 
}elseif($cmd=="SetCategoryImage"){
$id = $functions->SecureInput($_POST['cat_id']) ;
$final_img_link = $functions->Upload("CategoryImage") ; 

$categories->UpdateCategory("image",$final_img_link,$id) ; 
echo "<h3 style='color:green;'>Success. Redirecting you in 2 seconds ...</h3>" ;
header( "refresh:2;url=./categories_image.php" );
}elseif($cmd=="Blocking"){
$id = $functions->SecureInput($_GET['id']) ; 
$user->UpdateUserInfo("active",$functions->SecureInput($_GET['attempts']),$id);
echo "<h3 style='color:green;'>Success. Redirecting you in 3 seconds ...</h3>" ;
$bl_location = "./users.php?cmd=edit_user&id=" . $id ; 
header( "refresh:3;url=$bl_location" );
}elseif($cmd=="CardStatus"){
$serial_number = $functions->SecureInput($_POST['serial_number']) ; 
$username = $functions->SecureInput($_POST['username']) ; 
echo $cards->CardStatus($serial_number,$username) ; 
}elseif($cmd=="SearchNotifications"){
$title = $functions->SecureInput($_POST['title']) ; 
$active = $functions->SecureInput($_POST['active']) ; 
echo $notifications->Search($title,$active) ; 
}elseif($cmd=="SaveNotification"){
$id = $functions->SecureInput($_POST['id']) ; 
$title = $functions->SecureInput($_POST['title']) ; 
$text = $functions->SecureInput($_POST['text']) ; 
$active = $functions->SecureInput($_POST['active']) ; 
$notifications->UpdateInfo("title",$title,$id) ; 
$notifications->UpdateInfo("text",$text,$id) ; 
$notifications->UpdateInfo("active",$active,$id) ; 
header("location: ./notifications.php") ; 
}elseif($cmd=="AddNotification"){
$title = $functions->SecureInput($_POST['n_title']) ; 
$text = $functions->SecureInput($_POST['n_text']) ; 
$notifications->AddNotification($title,$text) ; 
}

?>