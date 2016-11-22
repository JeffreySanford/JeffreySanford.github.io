Simple application o create a popup tha only displays once.

https://github.com/js-cookie/js-cookie


https://css-tricks.com/redirecting-to-a-splash-page-but-only-once-with-cookies/

main-pahe.html:

<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/js/cookie.js"></script>
<script type="text/javascript">
	$(function() {
		.... do stuff....
	});
</script>

sample-include:

$(function() {
	var COOKIE_NAME = 'splash-page-cookie';
	$go = $.cookie(COOKIE_NAME);
	if ($go == null) {
		$.cookie(COOKIE_NAME, 'test', { path: '/', expires: 6 
});
		window.location = "/splash.php"
	}
	else {
	}
});
