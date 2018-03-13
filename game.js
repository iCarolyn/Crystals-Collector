$(document).ready(function() {

	crystals = ['crystal1.png','crystal2.png','crystal3.png','crystal4.png'];

	var counter = 0;
	var wins = 0;
	var losses = 0;
	$('#win').text(wins);
	$('#loss').text(losses);
	
	newCrystals();
	newGame();

	function newCrystals () {
		var numbers = []
			while(numbers.length < 4){
			  var randomnumber = Math.ceil(Math.random()*12)
			  var collectedAll = false;
			  for (var i=0; i< numbers.length; i++){
				if (numbers[i] == randomnumber){
					collectedAll = true; break
				}
			  }
			  if(!collectedAll)numbers[numbers.length]=randomnumber;
			}
		console.log(numbers);		

        // For each iteration, we will create an imageCrystal
		for (i = 0; i < numbers.length; i++) {
			var imgCrystal = $('<img>');
			imgCrystal.attr('data-num', numbers[i]);
			imgCrystal.attr('src', crystals[i]);
			imgCrystal.attr('alt', 'crystals');
			imgCrystal.addClass('crystal-image');
			$('#crystals').append(imgCrystal);
		}
	}

	function newGame() {

		counter = 0;
		$('#yourScore').text(counter);

		function randomIntFromInterval(min,max){
		   	return Math.floor(Math.random()*(max-min+1)+min);
			}

		var computerGuess = randomIntFromInterval(19,120);

		$('.value').text(computerGuess);

     // This time, our click event applies to every single crystal on the page. 
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
		$('.crystal-image').on('click', function(){
		    counter = counter + parseInt($(this).data('num'));
       
        // All of the same game win-lose logic applies. So the rest remains unchanged.
		    $('#yourScore').text(counter);

		    if (counter == computerGuess){
		      $('#status').html('You won! &#9786;').removeClass('alert-primary alert-danger').addClass('alert-success');
		      wins ++;
		      $('#win').text(wins);
		      // console.log(wins)
		      $('#crystals').empty();
		      newCrystals();
		      newGame();
		        
		    } else if ( counter > computerGuess){
		        $('#status').html('You lost! &#9785;').removeClass('alert-primary alert-success').addClass('alert-danger');
		        losses ++;
		        $('#loss').text(losses);
		        // console.log(losses)
		        $('#crystals').empty();
		        newCrystals();
		        newGame();
		    }
		});
	}

});