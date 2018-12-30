This is a sample demo that fetches xml file, parses xml data and draws canvas depending on specific tags that xml file contains.

<h3> Definition: </h3>
Script fetches xml file from server and writes its content in text area. It also parses "job, "trigger" and "action" tags and writes their name values under associated headings. 

Script creates separate canvas element for each job (there is just one job in this task).

Triggers are drawn as circle with the following constraints:
	Circle's center point depends on number of triggers to fit all triggers on canvas. However, radius is hard-coded as 50. Therefore there is limitation on number of "triggers" could be drawn on canvas.

Action are drawn as rectangles for each action with the following constraints:
	Rectangle's center point depends on number of rectangles. Dimensions of rectangles are hard-coded as 100x50. Therefore there is limitation on number of "actions" could be drawn on canvas.

ES5 syntax is used to simplfy cross-browser issues.

<h3> Assumptions: </h3>

Script assumes that fetched xml file has "job", "trigger" and  "action" tags with "name" attributes in.


<h3> Limitations: </h3>

Hard-coded values = canvas: 600x400, CircleRadius = 50, RectangleDimensions: 100x50. Therefore, there are maximum number of shapes could be drawn (let's say if xml file has 20 "trigger" tag and 10 actions, then there will be shapes out of canvas area).

<h3> Dependencies: </h3>
There are no dependencies in the script.

<h3> Further Improvements: </h3>
The script can be rewritten in a class based fashion that allows users pass constructor data (such as URL to fetch data, canvas dimension, shapes' dimensions, different tags to be considered, colour etc.)

Every shape on canvas can show detailed information (i.e parameter key/values) as tooltip on hover. 

Canvas dimensions can be calculated depending on window size and could be responsive (i.e dynamically redraw on window size change event).