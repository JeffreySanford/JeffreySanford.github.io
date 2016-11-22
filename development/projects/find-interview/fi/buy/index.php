<?php 
include "../configs/config.php" ; 
include "header.php";
$user->CheckAuth(True) ; 
$c_user = $user->GetUserInfo("id") ; 
?>


			
			
			
			 <div id="pricing-tables">
                <div class="container">
                   
                    <div class="row">
                        <div class="col-md-12">
                            <div class="sep-heading-container shc4 clearfix">
                                <h4>Pricing </h4>
                                <div class="sep-container">
                                    <div class="the-sep"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12 main-el">
                            <div class="pricing table alt-bg-color">
                                <div class="head"><h4>Single License</h4></div>
                                <div class="price">

                                    <div class="amount">59
                                        <div class="unit">$</div>
                                    </div>
                                    <h5>Monthly Payment</h5>
                                </div>
                                <div class="field">5 search Cap</div>
                                <div class="field">something else Cap</div>
                                <div class="field">something else</div>
                                <div class="field">something :D Included</div>
                                <div class="field">---</div>
                                <div class="field">---</div>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-xs-12 main-el">
                            <div class="pricing table alt-bg-color">
                                <div class="head"><h4>Double License</h4></div>
                                <div class="price">

                                    <div class="amount">79
                                        <div class="unit">$</div>
                                    </div>
                                    <h5>One Time Free</h5>
                                </div>
                                <div class="field">5 search Cap</div>
                                <div class="field">something else Cap</div>
                                <div class="field">something else</div>
                                <div class="field">something :D Included</div>
                                <div class="field">moree stufff </div>
                                <div class="field">---</div>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-xs-12 main-el">
                            <div class="pricing table alt-bg-color highlight">
                                <div class="head"><h4>Premium License</h4></div>
                                <div class="price">

                                    <div class="amount">299
                                        <div class="unit">$</div>
                                    </div>
                                    <h5>BEST OFFER </h5>
                                </div>
                                <div class="field">5 search Cap</div>
                                <div class="field">something else Cap</div>
                                <div class="field">something else</div>
                                <div class="field">something :D Included</div>
                                <div class="field">moree stufff </div>
                                <div class="field">Custom Email</div>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-xs-12 main-el">
                            <div class="pricing table alt-bg-color">
                                <div class="head"><h4>VIP License</h4></div>
                                <div class="price">

                                    <div class="amount">199
                                        <div class="unit">$</div>
                                    </div>
                                    <h5>one Time payment</h5>
                                </div>
                                <div class="field">5 search Cap</div>
                                <div class="field">something else Cap</div>
                                <div class="field">something else</div>
                                <div class="field">something :D Included</div>
                                <div class="field">moree stufff </div>
                                <div class="field">---</div>
                            </div>
                        </div>
                    </div>

                   
                    </div>

			
<center>

<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="RBHG6TMWFRLDW">
<table>
<tr><td><input type="hidden" name="on0" value="Type of the account">Type of the account</td></tr><tr><td><select name="os0">
	<option value="Basic">Basic $10.00 USD</option>
	<option value="Advanced">Advanced $30.00 USD</option>
	<option value="Ultimate">Ultimate $50.00 USD</option>
</select> </td></tr>
<tr><td><input type="hidden" name="on1" value="acc_id"></td></tr><tr><td><input type="hidden" name="os1" maxlength="200" value="<?php echo $c_user ; ?>"></td></tr>
</table>
<input type="hidden" name="currency_code" value="USD">
<input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
</center>
</br></br>
<?php 
include "footer.php";