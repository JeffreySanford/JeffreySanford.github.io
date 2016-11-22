<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">


<div class="container">    
        
    <div id="loginbox" class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> 
        
     

<div class="panel panel-default">
  <div class="panel-body">
<form class="form-horizontal" method="post" action="auth.php">
<input type="hidden" name="cmd" id="cmd" value="DoLogin"/>
<fieldset>
<div class="form-group">
  <label class="col-md-4 control-label" for="user">Username</label>  
  <div class="col-md-5">
  <input id="username" name="username" placeholder="Username" class="form-control input-md" required="" type="text">  
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="pass">Password</label>
  <div class="col-md-5">
    <input id="password" name="password" placeholder="Password" class="form-control input-md" required="" type="password">
  </div>
</div>
<div class="form-group">
  <label class="col-md-4 control-label" for="login"></label>
  <div class="col-md-8">
    <button id="login" name="login" type="submit" class="btn btn-success">Login </button>
  </div>
</div>
</fieldset>
</form>
</div></div> 