function getFasta(fastaFile){
    $.get(fastaFile,function(data){
    	var lines = data.split("\n"); //split file by lines
    	var geneTitleArray = [];
    	var geneArray = [];
    	var geneTitleArrayIndex = 0;
    	//console.log("line length:" + lines.length);

    	for(var lineIndex = 0, lineLength = lines.length; lineIndex < lineLength; ++lineIndex){
    		if(lines[lineIndex].indexOf(">") == -1){ //if part of sequence, add nucleotides to geneArray
    			if(lines[lineIndex] != ""){ //skip any blank lines
    				var splitLine = lines[lineIndex].split("");//split the lines by character, i.e., by nucleotide
    				for(var splitLineIndex = 0, splitLineLength = splitLine.length; splitLineIndex < splitLineLength; ++splitLineIndex){
   						geneArray.push(splitLine[splitLineIndex]);
   					}
    			}
   			}else{ //if is a title, add whole title to geneArray and geneTitleArray for reference
   				var currentTitle = lines[lineIndex];
   				geneTitleArray.push(currentTitle);
   				geneArray.push(currentTitle);
    			geneTitleArrayIndex++;		
    		}
    	}

    	//Commented out lines are for testing purpsoses and are not necessary otherwise

    	// console.log("GeneTitleArray Contents: " + geneTitleArray); //Make sure the first 11 elements in the geneArray are the correct genes
   		// for(first=0; first < 10; ++first){ 
   		// 	console.log("The nucleotide at" + first + " is: " +geneArray[first+1]);
   		// }
   		// console.log("Let's test to see if the last 11 nucleotides are correctly parsed..."); //Make sure the last 11 elements in the geneArray are the correct genes
   		// for(last = 5163214; last > last-10; --last){
   		// 	console.log("The nucleotide at " + last + " is: " + geneArray[last]);
   		// }
    	// console.log("Length of gene array: " + geneArray.length);



    	var geneArrayLength = geneArray.length; //declare a constant geneArray length
      var arrayForJSON = []; //declare array for JSON to be generated from
      //var myJSON = []; //declare blank JSON

      var items = {
        "items": [];
      }
      var idCount = 0;
      var contigCount = 0;
      for(var geneArrayIndex = 0; geneArrayIndex < geneArrayLength - 1; geneArrayIndex++) //go through geneArray creating arrayForJSON
      {
        if(geneArray[geneArrayIndex].indexOf(">") > -1 && contigCount == 0){
          var nucleotide = 
          {
          "name": geneArray[geneArrayIndex];
          "label": geneArray[geneArrayIndex];
          "id": idCount;
          }
          idCount++;
        }
        
        if(geneArray[geneArrayIndex].indexOf(">") > -1)
        {
          var name =
          {
            "name": geneArray[geneArrayIndex] //add sequence titles to JSON
          };
          items.push(name);
        }
        else{
          var label =
          {
            "label": geneArray[geneArrayIndex] //add nucleotides to JSON
            "id": idCount;
            idCount++;
          };
          items.push(sequenceNucleotide);
        }
      }
      // console.log(arrayForJSON[0]);
      console.log(arrayForJSON[55]);
      console.log(arrayForJSON.length);
      // console.log("Donezo");
      return arrayForJSON;

    //below lines are for displaying the first ten indices of the geneArray for testing purposes and can be disregarded otherwise.

	// var fastaDiv = $("#fastaDiv"); //declare constant for the div you'll add your parsed data to
  // 		for(var x = 0; x < geneArrayLength; x++) //create a new DOM element for each element of the geneArray for simple visualization purposes
  // 		{
  //  			if(x>10){ //test that the first ten nucleotides display correctly
  //  				console.log("Hi: " + x);
  //  				break;
  //  			}

  //  			var pElement = document.createElement('p');
  //  			console.log(pElement);
  //   		pElement.innerHTML = geneArray[x];
  //   		fastaDiv.append(pElement	);
  //   		pElement = null; //set pElement to null so that it is not visible to the next iteration of the loop.
  //   	}
    }); 
}
