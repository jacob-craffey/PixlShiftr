// Displays the image from the file chooser.
function handleImage(e){
    console.log(e);
    var reader = new FileReader();
    reader.onload = function(event){
        img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

// Gives the image a glitch effect
function distort(newVal) {
    imgData = getImgData();
    var random;
    var i = 0;
       
    while (i < imgData.data.length) {
        random = (Math.floor(Math.random() * 2500) + 1) * 4;
        i += random;
        
        var x = Math.floor((i / 4) % canvas.width);
        var y = Math.floor((i / 4) / canvas.width);
        
        for (var j = 0; j < newVal; j++) {
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j))] = imgData.data[((Math.abs(y - newVal) * (imgData.width * 4)) + ((x * 4) + j))];
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j)) + 1] = imgData.data[((Math.abs(y - newVal) * (imgData.width * 4)) + ((x * 4) + j + 1))];
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j)) + 2] = imgData.data[((Math.abs(y - newVal) * (imgData.width * 4)) + ((x * 4) + j + 2))];
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j)) + 3] = imgData.data[((Math.abs(y - newVal) * (imgData.width * 4)) + ((x * 4) + j + 3))];
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

// Inverts the image's pixel color
function invert(){
    imgData = getImgData();
    var invertNum = 255;
    
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = invertNum - imgData.data[i];
        imgData.data[i+1] = invertNum - imgData.data[i+1];
        imgData.data[i+2] = invertNum - imgData.data[i+2];
        imgData.data[i+3] = invertNum;
    }
    ctx.putImageData(imgData, 0, 0);
}

/* Sorts the image's pixels from brightest to darkest.  
DISCLAIMER: The bubblesort algorithm is not ideal for this an am working
on implementing a more efficient algorithm such as merge-sort. */
function bubbleSort() {
    imgData = ctx.getImageData(0, 0, canvas.height, canvas.width);
    
    for (var n = 0; n < imgData.data.length; n+=4) {
        for (var i = 0; i < imgData.data.length - n - 4; i+=4) {
            var curRed = imgData.data[i];
            var curGreen = imgData.data[i+1];
            var curBlue = imgData.data[i+2];
            var curBright = (curRed + curGreen + curBlue) / 3;
            
            var nextRed = imgData.data[i+4];
            var nextGreen = imgData.data[i+5];
            var nextBlue = imgData.data[i+6];
            var nextBright = (nextRed + nextGreen + nextBlue) / 3;
            
            
            if (curBright < nextBright) {
                imgData.data[i] = nextRed;
                imgData.data[i+1] = nextGreen;
                imgData.data[i+2] = nextBlue;
                imgData.data[i+4] = curRed;
                imgData.data[i+5] = curGreen;
                imgData.data[i+6] = curBlue;
            }
        } 
       
    }
     ctx.putImageData(imgData, 0, 0);
    
}

// Returns the image to its original state.
function erase() {
    ctx.drawImage(img, 0 , 0);
}

function save() {
    canvas.toBlob(function(blob) {
        saveAs(blob, "PrettyPixlPic.png");
    });
}


// Returns the imageData for image.
function getImgData() {
    var imgData = ctx.getImageData(0, 0, parseInt(img.height)*2, parseInt(img.width)*2);
    return imgData;
}


var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var img;

