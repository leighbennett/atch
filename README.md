<p align="center">
<img src="./atch_logo.svg" width="30%">
</p>
<p align="center">  Atch.js is a javascript library that manages file selection, previews, compression and uploads. </p>

## Methods: ##

### add_ui() ###
  ***Description*** 
  
  The .add_ui() method creates a html element for user to select files.
  
  ***Syntax***
  
     Atch.add_ui({
         id:'input1',
         types:['pdf','txt','png','jpg'],
         colors : ['blue','green']
     });

  ***Parameters*** 
  
  **id**
     Unique string 
  **types**
     Array of file types
  **colors**   
     Array of two colors
  
 
  ***Examples***
  
    var image_input = Atch.add_ui({
        id:'image_input',
        types:['jpeg','png','jpg']
    });
    document.getElementById("imageForm").appendChild(image_input);
    
### send_it() ### 
***Description*** 
  
  The .add_ui() method creates a html element for user to select files.
  
  ***Syntax***
  
     Atch.add_ui({
         id:'input1',
         types:['pdf','txt','png','jpg'],
         colors : ['blue','green']
     });

  ***Parameters*** 
  
  **id**
     Unique string 
  **types**
     Array of file types
  **colors**   
     Array of two colors
  
 
  ***Examples***
  
    var image_input = Atch.add_ui({
        id:'image_input',
        types:['jpeg','png','jpg']
    });
    document.getElementById("imageForm").appendChild(image_input);
