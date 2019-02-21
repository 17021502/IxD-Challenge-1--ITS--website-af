document.getElementsByClassName('menutoggle')[0].onclick = function() {
	var menu = document.getElementById('menu');
	if (menu.className == "active"){
		menu.className = "inactive";
		} else {
			menu.className = "active";
		}	
}



'use strict';
/*
* TESLA HUD BY Tameem Imamdad timamdad@hawk.iit.edu
GitHub: https://github.com/tameemi/tesla-speedometer
*/

let dev = false;
//let t0 = 0;
//let t1 = 0;

     var c = document.getElementById("snelheidsmeter");
        c.width = 500;
        c.height = 500;

        var ctx = c.getContext("2d");

        //De onderstaande regel zorgt voor de 'schaal' van de hele meter
        ctx.scale(1,1);

        // De onderstaande regels geven de snelheid een blauwe kleur.
        var speedGradient = ctx.createLinearGradient(0, 500, 0, 0);
        speedGradient.addColorStop(0, '#00b8fe');
        speedGradient.addColorStop(1, '#41dcf4');

        
        // De onderstaande functie zorgt dat de wijzer kleur, vorm en positie krijgt en ook met de snelheid mee draait.
        function snelheidWijzer(rotation) {
            ctx.lineWidth = 2; 				//Dit zorgt voor de dikte van de wijzer
            ctx.save();
            ctx.translate(250, 250);		//coördinaten voor de positie van de wijzer
            ctx.rotate(rotation);			// Dit zorgt ervoor dat de wijzer met de snelheid mee draait.
            ctx.strokeRect(-130 / 2 + 170, -1 / 2, 135, 5);
            ctx.restore();
            rotation += Math.PI / 180;
        }


        function snelheidsNaalden(rotation, width, speed) {
            ctx.lineWidth = width;

            ctx.save();
            ctx.translate(250, 250);		//coördinaten voor de positie van de naaldjes
            ctx.rotate(rotation);			//Dit zorgt ervoor dat de naalden met de hele meter meedraaien 
            ctx.strokeRect(-20 / 2 + 220, -1 / 2, 20, 1);
            //ctx.strokeRect(-20 / 2 + 220, -1 / 2, 20, 1);
            ctx.restore();

            // POSITIE VAN DE NUMMERS BINNEN DE METER (De volgende 2 regels)
            let x = (250 + 180 * Math.cos(rotation));
            let y = (250 + 180 * Math.sin(rotation));
			ctx.font = "700 20px Open Sans";	//Grootte en lettertype van de cijfers om de wijzer
            ctx.fillText(speed, x, y);
            rotation += Math.PI / 180;
        }

        function berekenSnelheidsMeter(x, a, b) {
            let degree = (a - b) * (x) + b;
            let radian = (degree * Math.PI) / 180;
            return radian <= 3 ? radian : 3;
        }



        function drawSpeedo(speed, gear, rpm, topSpeed) {
            if (speed == undefined) {
                return false;
            }


            ctx.clearRect(0, 0, 500, 500);

            ctx.beginPath();

            // DE ACHTERGROND KLEUR VAN DE METER
            ctx.fillStyle = 'black';

            // DE POSITIE VAN DE METER
            ctx.arc(250, 250, 250, 0, 2 * Math.PI);
            ctx.fill();
            ctx.save()
            ctx.restore();
            ctx.fillStyle = "#FFF";
            ctx.stroke();

            
            //De volgende regels zorgen voor de cirkel in het midden van de meter
            ctx.beginPath();
            ctx.strokeStyle = "lightblue";				//Dit zorgt voor de kleur van de binnenste cirkel en de naaldjes eromheen.
            ctx.lineWidth = 5;							//Dit zorgt voor de dikte van de binnenste cirkel.
            ctx.arc(250, 250, 100, 0, 2 * Math.PI);		//Dit zorgt voor de positie en vorm van de cirkel (als een halve of een kwart cirkel of niet)
            ctx.stroke();

            //De volgende regels gaan over de rand van de meter. Zo is er een buitenste cirkel
            ctx.beginPath();
            ctx.lineWidth = 5;							//Dit zorgt voor de dikte van de buitenste cirkel
            ctx.arc(250, 250, 240, 0, 2 * Math.PI);		//Dit zorgt voor de positie en vorm van de uitenste cirkel (de reand).
            ctx.stroke();



            //De volgende regels gaan over KM/H-tekst onder de teller
            ctx.font = "700 40px Open Sans";			//Dit zorgt voor de lettertype en groote
            ctx.fillText("KM/H", 200, 260);				//Dit zorgt voor de coördinaten van de KM/H-tekst	



            ctx.fillStyle = "#FFF";
            for (var i = 10; i <= Math.ceil(topSpeed / 20) * 20; i += 10) {
                console.log();
                snelheidsNaalden(berekenSnelheidsMeter(i / topSpeed, 140.07888, 34.3775) * Math.PI, i % 20 == 0 ? 3 : 1, i%20 == 0 ? i : '');
                               
            }

            	
            // De onderste regels gaan over het blauwe veld die de wijzer volgt.
            ctx.beginPath();
            ctx.strokeStyle = "#41dcf4";		//De kleur van het veld
            ctx.lineWidth = 25;					//De dikte van het veld
            ctx.shadowBlur = 30;				//De dikte van de schaduw van het veld 
            ctx.shadowColor = "#00c6ff";		//De kleur van de schaduw


            ctx.strokeStyle = speedGradient;
            ctx.arc(250, 250, 228, .6 * Math.PI, berekenSnelheidsMeter(speed / topSpeed, 83.07888, 34.3775) * Math.PI);
            ctx.stroke();
            ctx.beginPath();

   
            //De onderste regels gaan over de elementen om de hele meter (denk aan de schaduw van de hele meter)
            ctx.stroke();
            ctx.shadowBlur = 10;


            ctx.strokeStyle = '#41dcf4';
            snelheidWijzer(berekenSnelheidsMeter(speed / topSpeed, 83.07888, 34.3775) * Math.PI);


           
        }


function setSpeed () {
  let speedM = 0;
  let gear = 0;
  let rpm = 0;
   setInterval(function(){
     if (speedM > 1070){
        speedM = 1060;
      }

     speedM++;
     if (speedM < 1){
       
     }
        drawSpeedo(speedM,gear,rpm,500);

   }, 2);
  
}

document.addEventListener('DOMContentLoaded', function() {

    //setInterval(setSpeed, 2000)
    //renderCanvas();
  setSpeed();
    //drawSpeedo(120,4,.8,160);
}, false);



function brandstofpercentage(){
	var item = document.getElementById("brandstofpercentageteller");
	var width = 10;
		var id = setInterval(frame,30);		//Hiermee bepaal ik de snelheid waarmee de bar zich opvult
		function frame(){
		if (width >= 76){					//Hiermee bepaal ik de percentage tot waar de bar zich opvult
		clearInterval(id);
		}else{
			width++;
			item.style.width = width + '%';		//Hiermee zorg ik ervoor dat de percentage-teken achter de nummer komt te staan
			item.innerHTML = width * 1 + '%';
		}
	}
}





//De onderstaande regels regelen de functies van de dynamische zwaartekracht grafiek

window.onload = function () {

var dps = []; // dataPoints
var chart = new CanvasJS.Chart("zwaartekrachtGrafiek", {
    axisY: {
        includeZero: false
    },
	axisX: {
		title: "Tijd in (s)"
	}, 
	axisY: {
		title: "Zwaarte kracht in (G)"
	},     
    data: [{
        type: "line",
        dataPoints: dps
    }]
});

var xVal = -2;
var yVal = 5; 
var updateInterval = 1000;
var dataLength = 5; // number of dataPoints visible at any point

var updateChart = function (count) {

    count = count || 1;

    for (var j = 0; j < count; j++) {
        yVal = 1 + Math.random();
        dps.push({
            x: xVal,
            y: yVal
        });
        xVal++;
    }

    if (dps.length > dataLength) {
        dps.shift();
    }

    chart.render();
};

updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);

}

var myVar = setInterval(myTimer, 2000);

function myTimer(){
document.getElementById("G-force-tekst").innerHTML =
Math.floor(Math.random() * 7) + 1;
}






//De onderstaande regels regelen de de animatie van de voorraden percentage grafiek.
(function(document) {
  var _bars = [].slice.call(document.querySelectorAll('.binnenste-bar'));
  _bars.map(function(bar, index) {
    setTimeout(function() {
    	bar.style.width = bar.dataset.percent;
    }, index * 1000);
    
  });
})(document)


//De odnerstaande regels regelen de verstreken tijd 
window.setInterval((function(){
   var start = Date.now();
   var textNode = document.createTextNode('0');
   document.getElementById('seconds').appendChild(textNode);
   return function() {
        textNode.data = Math.floor((Date.now()-start)/1000);
        };
   }()), 1000);









