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
