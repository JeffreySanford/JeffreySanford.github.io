<?php 
include 'header.php';

$dob = $functions->SecureInput($_POST['dob']) ; 
$sex = $functions->SecureInput($_POST['sex']) ; 
$country = $functions->SecureInput($_POST['country']) ; 
$activities = $_POST['activities'] ; 

if( ($dob <> "") or ($sex <> "") or ($activities <> "") or ($country <> "") ){

if($activities <> ""){

foreach($activities as $ac){
$act = $act . " " . $ac ; 
} 

}

}

$search_for_users = $user->RecSearchForUsers($dob,$sex,$activities,$country) ; 

?>
<!DOCTYPE html>
<html>
<head>
    <title>Search for job-seekers</title>
</head>

<style>

.wrap{
  margin:3em auto;
  width:90%;
  min-width:450px;
}

.option{
  width:100%;
  background:#fff;
  position:relative;
  font-family: 'Roboto', sans-serif;
  color:#333;
  margin:10px 0px;
  padding:0px;
  border-radius: 5px;
  box-shadow:0 0 5px 0 #999; 
  border-bottom: 2px solid #869BA3;
  padding-bottom:0.2em;

}

.option h2{
  font-weight:300;
  font-size:2.5em;
  padding:0.3em;
  color:#333;
}

.sub-info{
  padding:1em;
}

.cell{
  width:49%;
  display:inline-block;
  vertical-align: top;
}

.results .fa,.dropdown-menu .fa{
  text-align:center !important;
  font-size:1.3em !important;
  width:1.4em !important;
}
.over{
  overflow:visible;
}

.right{
  float:right;
}

.clear{
  display:inline-block;
  clear:both;
}


.ng-enter {
  -webkit-transition: 0.2s;
  transition: 0.2s;
  
  opacity:1;
}

.ng-enter-active {
  margin-left: 0;
}

.ng-leave {
  -webkit-transition: 0.2s;
  transition: 0.2s;
  

}

.ng-leave-active {
  opacity:0;
  
}

.ng-move {
  -webkit-transition: 0.2s;
  transition:0.2s;
  opacity:0;

}

.ng-move-active {
  opacity:1;
}
map{
  width:100%;
  height:15em;
}

.appear{
  opacity:0;
  transition: 0.2s;
}
.option:hover .appear{
  opacity:1;
}

[ng-cloak].splash {
    opacity:1 !important;
    display:block;
}
.splash {
    opacity:0;
    display:none;
}
.btn{
  margin:-1px;
}
.unstyled{
  background:transparent !important;
}

</style>

   
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
 
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  </head>
   
  
  <body>  
    <div class='wrap'>
      
      <div class="splash" ng-cloak="">
      
      </div>

      <div ng-cloak="">
      

      <div class='option'>
       
      <div class="sub-info">
        <div class='row'>
		<form action="search.php" method="post">
<div class="col-md-3"></div>
           <div class="col-md-3">
     

             <input type="text" ng-model="search" class="form-control" name="dob" id="dob" placeholder="Date of Birth"/>
             </div>


         <div class="col-md-6">
         

<select multiple="" name="activities[]" id="activities[]">
  <option value="Outdoor Activities">Outdoor Activities</option>
  <option value="Explore Neighborhood">Explore Neighborhood</option>
  <option value="Offer Rides">Offer Rides</option>
  <option value="Arts &amp; History">Arts &amp; History</option>
  <option value="Food &amp; Wine">Food &amp; Wine</option>
  <option value="Gigs, Parties and Events">Gigs, Parties and Events</option>
  <option value="Nature &amp; Adventure">Nature &amp; Adventure</option>
  <option value="Classes, Workshops and Courses">Classes, Workshops and Courses</option>
  <option value="Interepretation &amp; business help">Interepretation &amp; business help</option>
</select>
 
           
        <span class='clear'>
          <select name="sex" id="sex" class="form-control">
<option value="">Male/Female</option>
<option value="male">Male</option>
  <option value="female">Female</option>
          </select>
        </span>
        
        <span class='clear'>
        <select type="text" name="country" class="form-control main-form" placeholder="country">
        	 <option value="">Country</option>
		 <option value="Jordan">Jordan</option>
		 <option value="Iraq">Iraq</option>
	</select>
	</span>
        
<button type="submit" class='btn btn-success'>
            <i class="fa fa-plus-circle" ></i>
                         
 Search
          </button> 
  
        </div>
          </form>
      
        </div>
          
      </div> 
      </div> 
      
      
      
     <div class='wrap'>
      
      <div class="splash" ng-cloak="">
      
      </div>

      <div ng-cloak="">
      

      <div class='option'>
       
 
     
      <div class='sub-info'>


</br></br>

<style>
.glyphicon-lg
{
    font-size:4em
}
.info-block
{
    border-right:5px solid #E6E6E6;margin-bottom:25px
}
.info-block .square-box
{
    width:100px;min-height:110px;margin-right:22px;text-align:center!important;background-color:#676767;padding:20px 0
}
.info-block.block-info
{
    border-color:#20819e
}
.info-block.block-info .square-box
{
    background-color:#20819e;color:#FFF
}</style>
               
               
               
               <?php 
               		echo $search_for_users ; 
               ?> 
          
          
          </div> </div> 



            </div>





              
      </div></div></div></div>
    
    <script src="../../includes/DateTimePicker/jquery.datetimepicker.js"></script>
    
    <script>
    	$('#dob').datetimepicker({
	  format:'Y-m-d'
	});
    </script>

    <!-- jQuery Version 1.11.0 -->
    <script src="../../js/jquery-1.11.0.js"></script>
         





          
      </div> 
      </div> 


</div>
<?php 
            include 'footer.php';
            ?>
</body>
</html>