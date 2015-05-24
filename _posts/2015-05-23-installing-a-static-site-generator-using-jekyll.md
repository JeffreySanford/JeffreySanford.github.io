---
layout:     post
title:      Notes for Deployment
date:       2015-05-23 20:48:00 UTC
summary:    These are the notes for the initial deployment of Jekyll with the carte noire template
categories: jekyll
thumbnail: jekyll
tags:
 - thumbnails
 - carte noire
---

Using Jekyll as a static page generator for a blog.  Create a blogging system that only uses markdown as a constant for the creation of pages.

{% highlight ruby linenos %}
gem install jekyll
jekyll new my-awesome-site
cd my-awesome-site
jekyll serve
{% endhighlight %}
Now browse to http://localhost:4000 and viola! Instant blog site!


This installs the most basic jekyll enviroment with the basic default template.

There are templates available that are quite well done.  This blog is
using the theme <a href="https://github.com/jacobtomlinson/carte-noire">
Carte Noire </a> by Jacob Tomlinson.  You can follow him on<a href="http://www.twitter.com/_jacobtomlinson"> Twitter </a>as well.  Other themes can be found at<a href="http://jekyllthemes.org/"> Jekyll Themes</a>.


