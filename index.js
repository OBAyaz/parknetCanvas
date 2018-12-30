var xhttp = new XMLHttpRequest();
var canvasData = {
    job: "",
    trigger: "",
    action: ""
};

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        processXmlData(this);
    }
};

xhttp.open("GET", "sample-1.xml", true);
xhttp.onerror = function () {
  alert("XMLHttpRequest error");
};
xhttp.send();

function processXmlData(xml) {

    var xmlDoc = xml.responseXML;
    var xmlText = new XMLSerializer().serializeToString(xmlDoc);
    var txt = "";

    document.getElementById("xmlTextArea").innerHTML = xmlText;
    
    
    for (var prop in canvasData){
        canvasData[prop] = xmlDoc.getElementsByTagName(prop);
    }
    
    for (var prop in canvasData) {
      for (var i = 0; i < canvasData[prop].length; i++) { 
        txt += canvasData[prop][i].getAttribute('name') + "<br>";
        }
        document.getElementById(prop).innerHTML = txt;
        txt = "";
    }
    createCanvas();
}

function createCanvas(){

    // Create separate canvas element for each job
    for(var i=0; i<canvasData.job.length; i++ ){

        // hotPoints will be used to draw lines later
        var hotPoints = [];

        var canv = document.createElement('canvas');
        canv.width  = 600;
        canv.height = 400;
        canv.id = canvasData.job[i].getAttribute('id');
        document.getElementById("canvasContainer").appendChild(canv);

        // Write Job Name on top of canvas
        var ctx = canv.getContext('2d');
        ctx.font = '24px serif';
        ctx.fillText(canvasData.job[i].getAttribute('name'), 275, 50);

        // Draw trigger circles next to each other
        for(var j=1; j<canvasData.trigger.length+1; j++){

            var dx = (600/(canvasData.trigger.length+1))*j;
            var dy = 150;
            var radius = 50;
            ctx.beginPath();
            ctx.arc(dx, dy, radius, 0, Math.PI * 2, true);
            ctx.stroke();

            // Add trigger's name
            ctx.font = '12px serif';
            ctx.fillText(canvasData.trigger[j-1].getAttribute('name'), dx-radius, dy);
            
            hotPoints.push({x: dx, y: dy+radius});
            
        }

        // Draw action boxes
        for (var k=1; k<canvasData.action.length+1; k++){

            var dx = (600/(canvasData.action.length+1))*k;
            var dy = 250;

            ctx.beginPath();
            ctx.moveTo(dx-50, dy);
            ctx.lineTo(dx+50, dy);
            ctx.lineTo(dx+50, dy+50);
            ctx.lineTo(dx-50, dy+50);
            ctx.closePath();
            ctx.stroke();

            // Add action's name
            ctx.fillText(canvasData.action[k-1].getAttribute('name'), dx-50, dy+25);

            // Draw Lines from triggers to actions
            for (var c = 0; c<hotPoints.length; c++) {
                ctx.beginPath();
                ctx.moveTo(hotPoints[c].x, hotPoints[c].y);
                ctx.lineTo(dx, dy);
                ctx.stroke();
            }
        }
    }
}
