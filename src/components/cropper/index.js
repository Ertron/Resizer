import { h, Component } from 'preact';
import { connect } from 'preact-redux';

function cropIt(props){
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    console.log('CANVAS : ', props);
    let imageObj = new Image(props.calc_params.width, props.calc_params.height);

    imageObj.onload = function() {
     // draw cropped image
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = props.calc_params.width;
        let sourceHeight = props.calc_params.height;
        let destWidth = props.social.w;
        let destHeight = props.social.h;
        let destX = 0;
        let destY = 0;
        console.info(imageObj);

        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    };
    imageObj.src = props.file_props.url;
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
        console.log('CROPPER : ', this.props);
        return (
        <div style={{width: '100%', float: 'left'}}>
            <div onClick={(e)=> cropIt(this.props)}>BTN</div>
            <canvas id="canvas">

            </canvas>
        </div>
        );
    }
}