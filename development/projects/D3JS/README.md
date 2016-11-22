# Developer Working Interview
Hey there! We're glad you made it in for your interview at Column Five! If you haven't yet, grab yourself something to drink and make yourself comfortable. If there's anything we can do for you, please let us know.

## What you will be doing
These excercises aim to evaluate your abilities as a front-end web developer capable of creating some basic front-end visualizations using HTML, SVG, JavaScript, and CSS. You will be building data visualizations from an external data resource (JSON files). The JSON files have already been prepared and reside in the `data` directory. The file associated with each deliverable is listed with the item, you'll need to fetch this file via AJAX in order to render the data. This will simulate the use of an external API to fetch data from a database.

## What we're evaluating
There aren't necccessarily any incorrect methods to doing any of the tasks--granted they're completed. We're looking at which solutions you choose to use and how effectively that solution completes the task. For example: Are you going to use an MVVM framework to take advantage of view models or just have jQuery plop the values into the DOM. Both will accomplish the same goal and both would be considered correct, but what is the reason you chose one over the other? That is a question you should be prepared to answer.

## How long you have
**If you are remote:** You have 3 days to complete this project

**If you are in the office:** Have it done, or make significant progress by the time you leave. If you aren't quite complete by the time you leave, finish it within 24 hours.

## Preparation
The front-end has been set up as a simple empty HTML file containing references to [jQuery](http://jquery.com), [Knockout](http://knockoutjs.com), [D3](http://d3js.org) and [Bootstrap](http://getbootstrap.com). If you want to use any other frameworks, you are more than welcome. If you aren't sure which frameworks to use, we encourage you to use the ones we've provided as that is primarily what we use here if you don't know which ones to pick. You are not required to use all of the frameworks that have been included.


## "Rules" (they're more guidelines than actual rules)
* You may use any reference material you wish (eg: Stackoverflow, API documentation, etc). **Seriously, you won't be judged poorly for doing this. We do it all the time and find that it helps us learn new tricks.**
* You may use any tools you wish (eg: IDE's, editors, workbenches, etc.)
* You may use **any frameworks you wish** *(seriously, if you know of better frameworks or are more familiar with one versus any that we listed, use it)*. If you're lost on which framework to choose, we recommend you stick to the following based on what we use here (using any extensions/plugins to the frameworks is also completely acceptable):
  * [Bootstrap](http://getbootstrap.com)
  * [jQuery](http://jquery.com)
  * [Knockout](http://knockoutjs.com)
  * [D3](http://d3js.org)

## Ready? Let's get started!
We need some visualizations created from a few JSON files. We don't neccessarily expect completion of every item on this list. We suggest doing the ones you are confident with first and then going back and doing the more difficult ones later.

* Create a simple numerical display that shows the total number of respondents... *yeah this one is just a simple number, nothing fancy--unless you want to do some kind of neat ticker that counts up to the number of respondents when the page loads ;)* See the `data/count.json` file for the data.
* Create a table of the top 5 countries based on the number of respondents from each country. Each row in the table should show the country as well as the number of respondents from that country. See the `data/top5.json` file for the data.
* Create a chart visualization showing the number of responses for each day during the month of November 2013. The type of chart is up to you, but we recommend a line or area chart. See the `data/firstmonth.json` file for the data.
* Create a vertical bar (column) chart showing the number of responses grouped by the respondent's occupation. See the `data/occupations.json` file for the data.

## Did we confuse you?
If you get confused or stuck on a problem because of an assumption, let us know and we'll clarify it for you. If you get stuck on a problem because of difficulty, move on to a different one, we don't neccessarily expect them to be done in order.
