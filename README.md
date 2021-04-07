<p align="center">
<img src="./atch_logo.svg" width="30%">
</p>
<p align="center">  Atch.js is a javascript library that manages file selection, previews, compression and uploads. </p>

## Methods: ##

### add_ui() ###
  ***Description*** 
  
  The .add_ui() method creates a html element for user to select and preview files.
  
  ***Syntax***
  
     Atch.add_ui({
         id:'input1',
         types:['pdf','txt','png','jpg'],
         colors : ['blue','green']
     });

  ***Parameters*** 
  
  id - Unique String required, to give id to the file UI.
     
  types - Array of file types required, current supported files are as follows : txt, pdf, jpeg, jpg, png, avi, mp4, mov
     
  colors - Array of two colors
  
   ***Examples***
  
    var image_input = Atch.add_ui({
        id:'image_input',
        types:['jpeg','png','jpg']
    });
    document.getElementById("imageForm").appendChild(image_input);
    
### send_it() ### 
***Description*** 
  
  The .send_it() method post files and all elements with name and value attribute.
  
  ***Syntax***
  
     Atch.send_it({
         form:'testForm',
         action:'post_files.php',
         stamp:'August 19, 2018' 
     });

  ***Parameters*** 
  
  form - Unique String required, id of a parent element contain all inputs to be processed. 
  
  action - A string, file to process the form data.
  
  stamp - A string, to watermark an image
 
  ***Examples***
  
    <form id="testForm" onsubmit="Atch.send_it({form:'testForm',action:'post_files.php'}); return false;">
        <input type="text" name="testText" value="Helo World">
        <input type="submit" value="Submit">
    </form>  
    
