

function appStart() {

    pojemnik = document.querySelector('#pojemnik')
    canvas = document.querySelector('#plotno')
    ctx = canvas.getContext('2d')
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
    sliderContrast = document.querySelector('#contrast')
    sliderContrast.addEventListener('mousemove', contrastChange)

    sliderBrightness = document.querySelector('#brightness')
    sliderBrightness.addEventListener('mousemove', saturationChange)

    sliderSaturation = document.querySelector('#brightness')
    sliderSaturation.addEventListener('mousemove', saturationChange)

    img = document.createElement('img')
    img.src = imgURL
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load', function (e) {
        ctx.drawImage(e.target, 0, 0, 600, 400)
        starterImageData = ctx.getImageData(0, 0, 600, 400)
    })
}


function brightnessChange(e) {
    let id = starterImageData //ctx.getImageData(0,0,600,400)
    let vol = e.offsetX / e.target.clientWidth

    console.log(vol)
    for (let i = 0; i < id.data.length; i += 4) {
        id.data[i] = Math.floor(id.data[i] * vol) //r
        id.data[i + 1] = Math.floor(id.data[i + 1] * vol) //g
        id.data[i + 2] = Math.floor(id.data[i + 2] * vol) //b
    }
    ctx.putImageData(id, 0, 0)
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}