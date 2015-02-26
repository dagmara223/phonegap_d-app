
$(document).on("pageinit","#userInfoPage", function(){
    $('#saveButton').click(function() {
        localStorage.setItem("name", $('#name').val());
		$("input[name*=sex]:checked").each(function() {
        	localStorage.setItem("sex", $(this).val());
    	});
		localStorage.setItem("age", $('#age').val());
		localStorage.setItem("height", $('#height').val());
		localStorage.setItem("weight", $('#weight').val());
		alert("ok");
    });
});

$(document).on("pageinit","#inputPage", function(){
    $('#chartButton').click(function() {
        localStorage.setItem("inputA", $('#inputA').val());
		localStorage.setItem("inputB", $('#inputB').val());
		localStorage.setItem("inputC", $('#inputC').val());
		localStorage.setItem("inputD", $('#inputD').val());
		localStorage.setItem("inputE", $('#inputE').val());
		localStorage.setItem("dateA", $('#dateA').val());
		localStorage.setItem("dateB", $('#dateB').val());
		localStorage.setItem("dateC", $('#dateC').val());
		localStorage.setItem("dateD", $('#dateD').val());
		localStorage.setItem("dateE", $('#dateE').val());
		window.location.hash = '#chartPage';
    	window.location.reload(true);
    });
});

$(document).on('pageshow',['#startPage', '#userInfoPage', '#inputPage', '#chartPage'], function() {
	var personName = localStorage.getItem("name");
	var personSex = localStorage.getItem("sex");
	var personAge = localStorage.getItem("age");
	var personHeight = localStorage.getItem("height");
	var personWeight = localStorage.getItem("weight");
	var personBMI = personWeight/((personHeight/100)*(personHeight/100))
    
	if(personName!=null){
		$('#username').html("imię: " + personName);
		$('#name').val(personName);
		$("input[value='"+ personSex +"']").attr('checked', true);
		
		$('#usersex').html("płeć: " + personSex);
	
		$('#userage').html("wiek: " + personAge + " lat");
		$('#age').val(personAge);
		$('#userheight').html("wzrost: " + personHeight + " cm");
		$('#height').val(personHeight);
		$('#userweight').html("waga: " + personWeight + " kg");
		$('#weight').val(personWeight);
		
		$('#BMI').html("BMI: " + personBMI.toFixed(2));	
    }
	
		var inputA = localStorage.getItem("inputA");
		$('#inputA').val(inputA);
		var inputB = localStorage.getItem("inputB");
		$('#inputB').val(inputB);
		var inputC = localStorage.getItem("inputC");
		$('#inputC').val(inputC);
		var inputD = localStorage.getItem("inputD");
		$('#inputD').val(inputD);
		var inputE = localStorage.getItem("inputE");
		$('#inputE').val(inputE);
		
		var dateA = localStorage.getItem("dateA");
		$('#dateA').val(dateA);
		var dateB = localStorage.getItem("dateB");
		$('#dateB').val(dateB);
		var dateC = localStorage.getItem("dateC");
		$('#dateC').val(dateC);
		var dateD = localStorage.getItem("dateD");
		$('#dateD').val(dateD);
		var dateE = localStorage.getItem("dateE");
		$('#dateE').val(dateE);

});

$(function(){
	// wykres
	var width = $(window).width();
	var height = $(window).height();

	$("#mychart").css("width", width*0.8);
	$("#mychart").css("height", height*0.8);
	
	$(".ct-chart").css("width", width*0.9);
	$(".ct-chart").css("height", height*0.70);
	
	var inputA = localStorage.getItem("inputA");
	var inputB = localStorage.getItem("inputB");
	var inputC = localStorage.getItem("inputC");
	var inputD = localStorage.getItem("inputD");
	var inputE = localStorage.getItem("inputE");
	
	var dateA = localStorage.getItem("dateA");
	var dateB = localStorage.getItem("dateB");
	var dateC = localStorage.getItem("dateC");;
	var dateD = localStorage.getItem("dateD");
	var dateE = localStorage.getItem("dateE");
	
	
	var lowPoint = (Math.min(inputA, inputB, inputC, inputD, inputE))-5;
	
	var data = {
		// A labels array that can contain any sort of values
		labels: [dateA, dateB, dateC, dateD, dateE],
		// Our series array that contains series objects or in this case series data arrays
		series: [
			[inputA, inputB, inputC, inputD, inputE]
			//,[55, 55, 55, 55, 55]
		]
	};

	// Create a new line chart object where as first parameter we pass in a selector
	// that is resolving to our chart container element. The Second parameter
	// is the actual data object.
	var chart = new Chartist.Line('.ct-chart', data, {
	  low: lowPoint, //start
	  showArea: true,
	  //showPoint: false,
	  axisX: {
    	//offset: 50
		},
  	  axisY: {
    	//offset: 80
		//scaleMinSpace: 100,
		labelInterpolationFnc: function(value) {
			return ( value % 5 === 0 ) ? value : '';
		}
	  }
	});
		
	var seq = 0,
  	delays = 80,
  	durations = 1;
	
	chart.on('created', function() {
  		seq = 0;
	});

	// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
	chart.on('draw', function(data) {
	  seq++;
	
	  if(data.type === 'line') {
		// If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
		data.element.animate({
		  opacity: {
			// The delay when we like to start the animation
			begin: seq * delays + 1000,
			// Duration of the animation
			dur: durations,
			// The value where the animation should start
			from: 0,
			// The value where it should end
			to: 1
		  }
		});
	  } else if(data.type === 'label' && data.axis === 'x') {
		data.element.animate({
		  y: {
			begin: seq * delays,
			dur: durations,
			from: data.y + 100,
			to: data.y,
			// We can specify an easing function from Chartist.Svg.Easing
			easing: 'easeOutQuart'
		  }
		});
	  } else if(data.type === 'label' && data.axis === 'y') {
		data.element.animate({
		  x: {
			begin: seq * delays,
			dur: durations,
			from: data.x - 100,
			to: data.x,
			easing: 'easeOutQuart'
		  }
		});
	  } else if(data.type === 'point') {
		data.element.animate({
		  x1: {
			begin: seq * delays,
			dur: durations,
			from: data.x - 10,
			to: data.x,
			easing: 'easeOutQuart'
		  },
		  x2: {
			begin: seq * delays,
			dur: durations,
			from: data.x - 10,
			to: data.x,
			easing: 'easeOutQuart'
		  },
		  opacity: {
			begin: seq * delays,
			dur: durations,
			from: 0,
			to: 1,
			easing: 'easeOutQuart'
		  }
		});
	  } else if(data.type === 'grid') {
		// Using data.axis we get x or y which we can use to construct our animation definition objects
		var pos1Animation = {
		  begin: seq * delays,
		  dur: durations,
		  from: data[data.axis + '1'] - 30,
		  to: data[data.axis + '1'],
		  easing: 'easeOutQuart'
		};
	
		var pos2Animation = {
		  begin: seq * delays,
		  dur: durations,
		  from: data[data.axis + '2'] - 100,
		  to: data[data.axis + '2'],
		  easing: 'easeOutQuart'
		};
	
		var animations = {};
		animations[data.axis + '1'] = pos1Animation;
		animations[data.axis + '2'] = pos2Animation;
		animations['opacity'] = {
		  begin: seq * delays,
		  dur: durations,
		  from: 0,
		  to: 1,
		  easing: 'easeOutQuart'
		};
	
		data.element.animate(animations);
	  }
	});
		
	chart.on('draw', function(data) {
	  if(data.type === 'line' || data.type === 'area') {
		data.element.animate({
		  d: {
			begin: 2000 * data.index,
			dur: 2000,
			from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
			to: data.path.clone().stringify(),
			easing: Chartist.Svg.Easing.easeOutQuint
		  }
		});
	  }
	});
	
	/*
	$(window).on('resize', function() {
	  chart.update();
	});
	*/
});