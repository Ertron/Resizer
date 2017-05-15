import { h, Component } from 'preact';
import { connect } from 'preact-redux';

function cropIt(props){
    let canvas = document.getElementById('canvas');
    let testimg = document.getElementById('testimg');
    let { left, top } = props;
    left = left - props.calc_params.indent_left;
    top = top - props.calc_params.indent_top;
    if(left < - props.calc_params.indent_left * 2){
        left = - props.calc_params.indent_left * 2;
    }
    if(left > 0){
        left = 0;
    }
    if(top < - props.calc_params.indent_top * 2){
        top = - props.calc_params.indent_top * 2;
    }
    if(top > 0){
        top = 0;
    }
    let context = canvas.getContext('2d');
    console.log('CANVAS : ', props);
    let imageObj = new Image();

    imageObj.onload = function() {
     // draw cropped image
        let sourceX = left; //отступ камеры по X
        let sourceY = top; //отступ камеры по Y
        let sourceWidth = imageObj.width;
        let sourceHeight = imageObj.height;
        let destWidth = props.calc_params.width; // область отрисовки изображения (размер)
        let destHeight = props.calc_params.height; // область отрисовки изображения (размер)
        let destX = 0; // область отрисовки изображения (отступ по X)
        let destY = 0; // область отрисовки изображения (отступ по Y)
        canvas.width = props.social.w;
        canvas.height = props.social.h;
        console.info(sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
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