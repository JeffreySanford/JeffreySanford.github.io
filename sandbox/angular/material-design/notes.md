Factory to return all the blog posts from an artist or product listing.

Created for the ravenwood studios but will be used in other sites.



	


	1. controller will call the returnBlog factory
  	  a. controller will know $scope.user or $scope.product
	  b. function receives as blogIdent
	  c. matches the owner of the blog to the current query
 	  d. returns a objBlog containing all the items in the blog

	2. controller passes this to the view in $scope
	  (perhaps use John Papa's view model function)
	  a. view will use data binding to bind objBlog to an input box to filter articles
	  b. show all blog pots in material design cards


	/** receives the user or product **/

	function returnBlog (blogIdent) {
		$.get('/api/blog')
		// create a return object
		intObjBlog = 0;
		for each (obj in dataObject) {
			if (data.Ident === blogIdent) {
				objBlog[intObjBlog] = obj; 
			}
		}
		return objBlog;
	}


/api/blog =  {
	blogIdent: "sam",
	ownerType: "artist",
	owner: "sam",
	title: "title
},
	blogIdent: "mirror",
	ownerType: "product",
        owner: "sam",
}
	