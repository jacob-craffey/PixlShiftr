function handleImage(e){
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

function distort(newVal) {
    imgData = getImgData();
    pixels = [];
    var random = (Math.floor(Math.random() * 2500) + 1) * 4;
    var i = 0;
       
    while (i < imgData.data.length) {
        random = (Math.floor(Math.random() * 2500) + 1) * 4;
        i += random;
        
        var x = Math.floor((i / 4) % canvas.width);
        var y = Math.floor((i / 4) / canvas.width);
        
        console.log(x + ', ' + y);
        
        for (var j = 0; j < newVal; j++) {
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j))] = imgData.data[(((y - newVal) * (imgData.width * 4)) + ((x * 4) + j))];
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j)) + 1] = imgData.data[(((y - newVal) * (imgData.width * 4)) + ((x * 4) + j + 1))];
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j)) + 2] = imgData.data[(((y - newVal) * (imgData.width * 4)) + ((x * 4) + j + 2))];
            imgData.data[((y * (imgData.width * 4)) + ((x * 4) + j)) + 3] = imgData.data[(((y - newVal) * (imgData.width * 4)) + ((x * 4) + j + 3))];
        }
    }
    
    
    
    ctx.putImageData(imgData, 0, 0);
}


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

function erase() {
    ctx.drawImage(img, 0 , 0);
}

function getImgData() {
    var imgData = ctx.getImageData(0, 0, parseInt(img.height)*2, parseInt(img.width)*2);
    return imgData;
}

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var img;


