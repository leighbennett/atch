/*
 * Atch.js v1.0.0
 * Copyright 2021 Leigh Bennett.
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.Atch = global.Atch || {}));
}
(this, function (exports) { 'use strict';
const version = "1.0.0";
   
    let css = 
        "<style>"+
           ".atch{ "+
                "margin: 0.5em 5%; "+
                "border: 0.1em solid; "+
                "padding: 1%; "+
                "width: 80%; "+
                "display: flex; "+
                "flex-wrap: wrap; "+
                "position: relative; "+
           "} "+
           ".addFileBtn { "+
                "display: flex-inline; "+
                "flex: 23%; "+
                "border: 0.3rem dashed; "+ 
                "border-radius: 0.3rem; "+
                "max-width: 10vw; "+
                "height: 10vw; "+
                "line-height: 9.5vw; "+
                "margin: 1%; "+
                "font-size: 10rem; "+
                "text-align: center; "+
           "} "+
           ".fileHolder { "+
                "margin: 1%; "+
                "display: inline-flex; "+
                "flex: 23%; "+
                "word-break: break-all; "+
                "width: 10vw; "+
                "max-width: 23%; "+
           "} "+
           ".removeBtn { "+
                "width: 40px; "+
                "height: 40px; "+
                "background-repeat: no-repeat; "+
                "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABzklEQVRYhc1XPa7CMAzOBkeAQ3AEpE6gmBExNGFAnAF2kDgAVEhU/JwFdWNgQkqiwgJi6A5ipHlD+evjQRMeKFjyEsX5vji2YyOkKCuMUz4tYEHB5QQ8bsOS26V9pLDkBDxBwfVpAa8wTqmemyjzaj7LCB4IAjtBQCrqjhE8mFfz2ZeBpzUrzWixwwkcNIBjygkcGC12pjUrrQXOKlaGU5i9CnxHhMKMVayMEviCQk4QvH0X+FXxdkEhl3jzz4BfSTz0xLRmpd/p9mfP8WdMMFrsfBr8rIwWOzHweTWf/U+0a3uBwCGWoqc8f2jg18ty3WooA2zaTenXy8+9QPAAIRRVOJFQZDbtppRhKINJPxE8mPSlDEMVwrsVxink0wJWudX54GDsPN4zdpSJCgLSpwWMBAVX1bUXgNE9iWDkJBK8Uwou4gQ8nQAKRo6Ux6MMRr2btd5pTQM8CkYPcRuWOkYxwGFXBsPuHSFlAjYsEbdLe11DQSACDsPI7cOutn1EoLT/BgKmn8B0EBpPQ+OFSKUUr1sN7VK8aTeT9u4uzavKZ6RwYIyw8mf0Fd+x8YbkK1oy403pWYy25beeMDaY3MaEsdHsVowNp7/lU+P5D2jITHnpp3wYAAAAAElFTkSuQmCC); "+
            "} "+
            "#disablebackground { "+
                "position: fixed; "+
                "top: 0px; "+
                "display: flex; "+
                "justify-content: center; "+
                "align-items: center; "+
                "background-color: #333333; "+
                "min-height: 100%; "+
                "min-width: 100%; "+
                "background: rgba(51,51,51,0.7); "+
                "z-index: 99999999 !important; "+ 
            "} "+
            ".progress-circle { "+
                  "fill:transparent; "+
                  "stroke: #EEE; "+
                  "stroke-width: 10; "+
                  "stroke-dasharray: 255; "+
                  "-webkit-transition:stroke-dashoffset ease-out .4s; "+
                  "-moz-transition:stroke-dashoffset ease-out .4s; "+
                  "-ms-transition:stroke-dashoffset ease-out .4s; "+
                  "transition:stroke-dashoffset ease-out .4s; "+
            "} "+
            "@media only screen and (max-width: 768px) { "+
                ".atch { "+
                    "width: 98%; "+
                    "margin: 0px; "+
                "} "+
                ".addFileBtn { "+
                    "flex: 43%; "+ 
                    "min-width: 43%; "+
                    "height: 38vw; "+
                    "font-size: 5rem; "+
                    "line-height: 35vw; "+
                "} "+
                ".fileHolder { "+
                    "flex: 43%; "+
                    "max-width: 43%; "+
                "} "+
            "} "+    
        "</style>";
    document.write(css);

    function add_ui(options) {
        if(validate_parameters(options)) {
            // Icon to prompt user to click to add files
            let f =
            "<div class=\"addFileBtn\" "+  
            "style=\"color:"+ options.colors[0] +";\""+
            "onmouseover=\"this.style.color='"+ options.colors[1] +"'\" "+
            "onmouseout=\"this.style.color='"+ options.colors[0] +"'\" "+
            "onclick=\"event.stopPropagation(); Atch.action_input('"+options.id+"',['"+options.types.join("','")+"']);\"> "+
                "+"+
            "</div>";
            // Div that hold all the hidden inputs,add file icon and preview images
            let d = document.createElement("div");
            d.id = options.id;
            d.className = "atch"; 
            d.style.borderColor = options.colors[0]; 
            d.innerHTML = f;
            return d;
        }
        return;
    } 

    function validate_parameters(options) {
        const supported_files = ['txt','pdf','jpeg','jpg','png','avi','mp4','mov'];
        let pass = true;
        // Check parameter 'i' is a unique string
        if (typeof(options.id) == "string") {
            if(document.getElementById(options.id) != null) {
                pass = false;	  	
                console.error("Atch.js found an element with the id of '"+options.id+"' has allready being used within this DOM.");
            }	
        } else {
            pass = false;
            console.error("Atch.js was expecting id to be a unique string");
        // Check parameter 'a' is an array of supported file types 	
        } 
        if (!Array.isArray(options.types)) {
            pass = false;
            console.error("Atch.js was expecting types to be an array of file types");
        } else {
            for (let a_idx=0; a_idx < options.types.length; a_idx++) {
                if (!supported_files.includes(options.types[a_idx])) {
                    pass = false;
                    console.error(options.types[a_idx] + " is not a supported file type within Atch.js");
                }			
            }
        }
        if (Array.isArray(options.colors)) {
            if (options.colors.length == 2) {
                if (typeof(options.colors[0]) == "string" && typeof(options.colors[1]) == "string" ) {
                    //Use colors set 
                } else {
                    console.warn("Atch.js was expecting colors to be an array of two colors");
                    options.colors = ['black','white'];
                }
            } else {
                console.warn("Atch.js was expecting colors to be an array of two colors");
                options.colors = ['black','white'];
            }    
        } else {
            console.warn("Atch.js uses default colors of black and white if colors are not set");
            options.colors = ['black','white'];
        }
        return pass;
    }

    function action_input(i,a) {
        let d = document.getElementById(i);	 
        let h_i = document.createElement("input");
        h_i.type= "file";
        h_i.style= "display:none;";
        h_i.accept = "."+(a.join(',.'));
        h_i.multiple = "true";
        h_i.onchange = function(event){
            event.stopPropagation(); 
            inputChange(this);
        };
        d.appendChild(h_i);
        h_i.click();	
    }

    function inputChange(i_s) {
        if(i_s.files.length > 0) { 
            let previewArea = i_s.parentNode;
            for(let f = 0; f < i_s.files.length; f++) {
                let file = URL.createObjectURL(i_s.files[f]);
                if(/\.(txt|pdf)$/i.test(i_s.files[f].name)) {
                    let file_type = ((i_s.files[f].name).split(".")[1]).toUpperCase();
                    let fileDiv = document.createElement("div");
                    fileDiv.onclick = function(){ window.open(file); };
                    fileDiv.className = "file";
                    fileDiv.className = "fileHolder";
                    fileDiv.src = file;
                    fileDiv.innerHTML =
                       "<div class=\"removeBtn\" onclick=\"remove_file(this);\"></div>"+
                       "<svg viewBox=\"0 0 400 450\" xml:space=\"preserve\">"+
                            "<g>"+
                               "<path fill=\"#1a8cff\" "+
                                   "d=\"M345.6,78.8l-0.4-0.4V78l-76-76l-0.4-0.4c0,0-0.4,0-0.4-0.4c0,0-0.4,0-0.4-0.4C266.8,0,265.6,0,264,0H75.6 "+
                                   "c-7.2,0-14,2.8-18.8,7.6L56.4,8c-4.8,4.8-8,12-8,19.2v340.4c0,7.6,3.2,14.4,8,19.2c4.8,4.8,12,8,19.2,8h243.6 "+
                                   "c7.6,0,14.4-3.2,19.2-8s8-12,8-19.2V82.8C346.4,81.2,346,80,345.6,78.8z M271.6,28.8L316.8,74h-33.2c-3.2,0-6.4-1.2-8.4-3.6 "+
                                   "c-2-2-3.6-5.2-3.6-8.4V28.8z M329.2,367.6c0,2.8-1.2,5.2-3.2,7.2s-4.4,3.2-7.2,3.2H75.6c-2.8,0-5.2-1.2-7.2-2.8 "+
                                   "c-2-2-2.8-4.4-2.8-7.2V26.8c0-2.8,1.2-5.2,3.2-7.2l0.4-0.4c2-1.6,4.4-2.8,6.8-2.8h179.2v45.2c0,8,3.2,15.2,8.8,20.8 "+
                                   "c5.2,5.2,12.8,8.4,20.8,8.4h44.4V367.6z\"/>"+
                                "<text x=\"100\" y=\"250\" fill=\"#1a8cff\" font-size=\"80\">"+ file_type +"</text>"+
                            "</g>"+
                            "<text x=\"0\" y=\"440\" fill=\"#1a8cff\" font-size=\"40\">"+ i_s.files[f].name +"</text>"+
                       "</svg>";
                    previewArea.appendChild(fileDiv);
                }else if(/\.(avi|mp4|mov)$/i.test(i_s.files[f].name)){
                    let src =  URL.createObjectURL(i_s.files[f]);
                    let newVideo = document.createElement("div");
                    newVideo.className = "fileHolder";
                    newVideo.innerHTML =
                        "<div class=\"removeBtn\" onclick=\"remove_file(this);\"></div>"+
                        "<video class=\"file\" style=\"width:95%; padding: 0%; border:1px solid #fff;\" controls=\"controls\" preload=\"metadata\">"+ 
                            "<source src=\""+ src +"\" type=\"video/mp4\">"+
                        "</video>";
                    previewArea.appendChild(newVideo); 
                }else if(/\.(jpeg|png|jpg)$/i.test(i_s.files[f].name)){
                    let reader = new FileReader();
                    reader.addEventListener("load", function() {
                        let src = this.result;
                        let newImageDiv = document.createElement("div");
                        newImageDiv.className = "fileHolder";
                        newImageDiv.onclick =  function(){ window.open(file); };
                        newImageDiv.innerHTML=
                            "<div class=\"removeBtn\" onclick=\"event.stopPropagation(); remove_file(this);\"></div>"+
                            "<div style=\"width:95%;\" "+
                                "onclick=\"window.open('"+file+"');\" >"+
                                "<img class=\"file\" src=\""+ src +"\" style=\"height: auto; width:100%;\">"+
                            "</div>";
                        previewArea.appendChild(newImageDiv); 
                    }, false);
                    reader.readAsDataURL(i_s.files[f]);
                }
            }    
        }
        i_s.remove();
    };

    window.remove_file = function(file){
        file.parentElement.remove();
    } 

    async function send_it(options){
       let formData = new FormData();  
       let attachment_inputs = document.getElementsByClassName("atch");
       for(let inputs = 0; inputs < attachment_inputs.length; inputs++){
           let input_name = attachment_inputs[inputs].id;
           let files = attachment_inputs[inputs].getElementsByClassName("file");
           for(let file = 0; file < files.length; file++){
               if(files[file].tagName == "IMG"){
                   await compressed_image(input_name+"["+file+"]", files[file].src, send_request,formData,options.stamp);
               }else{
                   formData.append(input_name+"["+file+"]", files[file].src, String(input_name[file]));
               } 
           }
       }    
       let form_inputs = document.getElementById(options.form).querySelectorAll("input");
       for(let i = 0; i < form_inputs.length;i++){
          formData.append(form_inputs[i].name, form_inputs[i].value);
       }
       send_request();
       function send_request(){
            let disablebackground = document.createElement("div");
            disablebackground.id = "disablebackground";
            disablebackground.innerHTML = 
               "<svg version=\"1.1\" width=\"25vw\" height=\"25vw\" viewBox=\"0 0 100 100\" xml:space=\"preserve\">"+
                  "<g>"+  
                      "<circle r=\"40\" cx=\"50\" cy=\"50\" fill=\"transparent\" stroke-width=\"10\" stroke=\"#39dd92\"></circle> "+
                      "<circle r=\"40\" cx=\"50\" cy=\"50\" class=\"progress-circle\" stroke-width=\"10\"></circle>"+
                      "<text id=\"progress-text\" x=\"50%\" y=\"50%\" text-anchor=\"middle\" fill=\"#39dd92\" dy=\".3em\">0%</text>"+
                  "</g>"+       
               "</svg>";
            document.body.appendChild(disablebackground);
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.upload.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    let percentComplete = evt.loaded / evt.total;
                    document.getElementById("progress-text").textContent = 100-percentComplete+"%";
                    let progress = parseInt( 255 - (percentComplete*2.55) )
                    document.querySelectorAll('.progress-circle')[0].style.strokeDashoffset = progress;
                }
            }, false);
            xmlHttp.onreadystatechange = function(){
                if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
                    document.getElementById("progress-text").textContent = "100%";
                    document.querySelectorAll('.progress-circle')[0].style.strokeDashoffset = 255;
                    for(let key of formData.keys()){
                        formData.delete(key);
                    }
                }
            };
            xmlHttp.open("POST", options.action ,true); 
            xmlHttp.send(formData);
       }
    };   

    function compressed_image(name, file, send_request,formData,imageStamp) {
        return new Promise((accept) => {
            let img = new Image();
            img.src = file;
            let max = 1000;
            let w = img.naturalWidth;
            let h = img.naturalHeight;
            let r;
            if(w>max) {     
                r = max/w;
                w = w*r;
                h = h*r;
            }
            if(h>max){
                r = max/h;
                h = h*r;
                w = w*r;
            }
            let canvas = document.createElement('canvas');
            canvas.width = w + 50;document.createElement('link')
            canvas.height = h + 50;
            let ctx = canvas.getContext("2d");
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, w+50 ,h+80);
                ctx.drawImage(img,30,40, w, h);
            if(imageStamp != null){
                let ctxf = canvas.getContext("2d");
                    ctxf.fillStyle= "black";
                    ctxf.font="14px Arial Black ";
                    ctxf.fillText(imageStampText,20,20);
            }    
            let dataURL = canvas.toDataURL('image/jpeg',1.0 );
            let blob = dataURItoBlob(dataURL);
            let filename = "compressed_image_"+Math.random().toString(36).substr(2, 9)+".jpeg";
            let imagefile = new File([blob],filename,{type:'image/jpeg'});
            formData.append(name,imagefile ,filename);
            accept();
        });    
    }

    function dataURItoBlob(dataURI){
        let byteString;
        if(dataURI.split(',')[0].indexOf('base64') >= 0){
            byteString = atob(dataURI.split(',')[1]);
        }else{
            byteString = unescape(dataURI.split(',')[1]);
        }
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let ia = new Uint8Array(byteString.length);
        for(let i = 0; i < byteString.length; i++){
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type:mimeString});
    }

exports.add_ui = add_ui;
exports.action_input = action_input; 
exports.send_it = send_it;
exports.version = version;    
}));
