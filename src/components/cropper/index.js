import { h, Component } from 'preact';
import { connect } from 'preact-redux';

function cropIt(){
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    console.log('CANVAS : ', context);
    let imageObj = new Image();

    imageObj.onload = function() {
     // draw cropped image
        let sourceX = 150;
        let sourceY = 0;
        let sourceWidth = 150;
        let sourceHeight = 150;
        let destWidth = sourceWidth;
        let destHeight = sourceHeight;
        let destX = canvas.width / 2 - destWidth / 2;
        let destY = canvas.height / 2 - destHeight / 2;

        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    };
    imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
     /*let sourceX = 150;
     let sourceY = 0;
     let sourceWidth = 150;
     let sourceHeight = 150;
     let destWidth = sourceWidth;
     let destHeight = sourceHeight;
     let destX = canvas.width / 2 - destWidth / 2;
     let destY = canvas.height / 2 - destHeight / 2;

     context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
     };
     imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';*/
}

@connect(state => state)
export default class Cropper extends Component {


    render() {
        console.log('CROPPER : ', this);
        return (
        <div style={{width: '100%', float: 'left'}}>
            <div onClick={(e)=> cropIt()}>BTN</div>
            <canvas id="canvas">

            </canvas>
        </div>
        );
    }
}