// Select the input file element
const fileInput = document.querySelector('#file-input');
var originalHeight, originalWidth;
// global variable to preserve original image data
// selecting the image canvas
var canvas = document.getElementById('my-image');
var ctx = canvas.getContext("2d");


const container = document.getElementById("imageContainer");
const colorPicker = document.getElementById("colorPicker");
const slider = document.querySelector('#radius-slider');
const image = document.querySelector('#my-image');

colorPicker.addEventListener("input", function () {
  const color = colorPicker.value;
  container.style.backgroundColor = color;
});


slider.addEventListener('input', () => {
  image.style.borderRadius = slider.value + '%';
});


// onchage event on loading of a file which will draw image and canvas for
// original image
$('#file-input').change(function () {
  var file = this.files[0];
  var image = new Image();

  // Load the image into the canvas and resize it
  var reader = new FileReader();
  reader.onload = function (event) {
    image.src = event.target.result;
    image.onload = function () {
      let width, height;
      originalHeight = image.height;
      originalWidth = image.width;
      if (image.width > image.height) {
        const widthRatio = 500 / image.width;
        width = 500;
        height = image.height * widthRatio;
        if (height > 500) {
          const heightRatio = 500 / height;
          height = 500;
          width = width * heightRatio;
        }
      } else {
        const heightRatio = 500 / image.height;
        height = 500;
        width = image.width * heightRatio;
        if (width > 500) {
          const widthRatio = 500 / width;
          width = 500;
          height = height * widthRatio;
        }
      }
      canvas.width = width;
      canvas.height = height;
      console.log(width, height);
      container.style.height = height + "px";
      container.style.width = width + "px";
      ctx.drawImage(image, 0, 0, width, height);
      originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
  };
  reader.readAsDataURL(file);
});







//add eventListner to JPG download button
// add event listener to button
document.getElementById("imageJPG").addEventListener("click", function () {
  if (canvas.height && canvas.width) {
    // create a new canvas element with the original aspect ratio of the uploaded image
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = originalWidth;
    downloadCanvas.height = originalHeight;

    // draw the uploaded image onto the new canvas, using the original width and height of the image
    const downloadCtx = downloadCanvas.getContext('2d');
    downloadCtx.fillStyle = container.style.backgroundColor;
    downloadCtx.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);
    downloadCtx.beginPath();
    downloadCtx.arc(slider.value / 2 + 10, slider.value / 2 + 10, slider.value / 2, 0, 2 * Math.PI);
    downloadCtx.closePath();
    downloadCtx.clip();
    downloadCtx.drawImage(canvas, 0, 0, downloadCanvas.width, downloadCanvas.height);

    // get the base64-encoded data URL of the new canvas
    const dataURL = downloadCanvas.toDataURL('image/jpeg', 0.8);

    // create a link element with the download attribute set to the desired filename and the href attribute set to the data URL of the new canvas
    const downloadLink = document.createElement('a');
    downloadLink.download = 'image.jpg';
    downloadLink.href = dataURL;

    // simulate a click on the link element to initiate the download
    downloadLink.click();
  }
});


// add eventListner to PNG download button
// add event listener to button
document.getElementById("imagePNG").addEventListener("click", function () {
  // get the canvas data as a JPG image
  if (canvas.height && canvas.width) {
    // create a new canvas element with the original aspect ratio of the uploaded image
    const downloadCanvas = document.createElement('canvas');
    downloadWidth = originalWidth;
    downloadHeight = originalHeight;
    downloadCanvas.width = originalWidth;
    downloadCanvas.height = originalHeight;

    // draw the uploaded image onto the new canvas, using the original width and height of the image
    const downloadCtx = downloadCanvas.getContext('2d');
    downloadCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, downloadWidth, downloadHeight);

    // get the base64-encoded data URL of the resized image
    const dataURL = downloadCanvas.toDataURL('image/png', 0.8);

    // create a link element with the download attribute set to the desired filename and the href attribute set to the data URL of the resized image
    const downloadLink = document.createElement('a');
    downloadLink.download = 'image.png';
    downloadLink.href = dataURL;

    // simulate a click on the link element to initiate the download
    downloadLink.click();
  }
});

