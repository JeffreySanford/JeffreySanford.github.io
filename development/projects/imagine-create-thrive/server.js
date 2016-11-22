var launcher = require('simple-autoreload-server');
 
var server = launcher({
  port: 8008,
  root: './',
  listDirectory: true,
  watch: /\.(png|js|html|json|swf)$/i,
  forceReload: [/\.json$/i, "static.swf"]
});
