import { h, Component } from 'preact';
import { connect } from 'preact-redux';

function cropIt(props){
    let canvas = document.getElementById('canvas');
    let hiddencanvas = document.getElementById('hiddencanvas');
    let context = canvas.getContext('2d');
    let context_hiddencanvas = hiddencanvas.getContext('2d');
    console.log('CANVAS : ', props);
    let imageObj = new Image();

    imageObj.onload = function() {
     // draw cropped image
        let test1 = (props.calc_params.width / props.crop_coord.w);
        console.error('test 1 : ', props.calc_params.width, ' s : ', props.crop_coord.x);
        let sourceX = - props.crop_coord.x; //отступ камеры по X
        let sourceY = - props.crop_coord.y; //отступ камеры по Y
        let sourceWidth = props.calc_params.width;
        let sourceHeight = props.calc_params.height;
        let destWidth = props.calc_params.width; // область отрисовки изображения (размер)
        let destHeight = props.calc_params.height; // область отрисовки изображения (размер)
        let destX = 0; // область отрисовки изображения (отступ по X)
        let destY = 0; // область отрисовки изображения (отступ по Y)
        canvas.width = props.social.w;
        canvas.height = props.social.h;
        hiddencanvas.width = props.calc_params.width;
        hiddencanvas.height = props.calc_params.height;
        console.info(sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        //context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        context.drawImage(imageObj, sourceX, sourceY, props.file_props.width, props.file_props.height, destX, destY, props.calc_params.width, props.calc_params.height);
        let url = canvas.toDataURL();
        let area = new Image();
        area.src = url;
        /*----------------------------------------------------------------------------*/
        //context_hiddencanvas.drawImage(imageObj, 0, 0,  props.calc_params.width,  props.calc_params.height, 0, 0, props.calc_params.width, props.calc_params.height);
        context_hiddencanvas.drawImage(imageObj, 0, 0,  props.file_props.width,  props.file_props.height, 0, 0, props.calc_params.width, props.calc_params.height);
        let hidden_c_url = hiddencanvas.toDataURL();
        let hid_img = document.getElementById('hiddenimg');
        //hid_img.src = hidden_c_url;
        /*----------------------------------------------------------------------------*/
        /*console.log(' context_hiddencanvas : ', context_hiddencanvas);*/
        /*let link = document.createElement('a');
        link.setAttribute('target','_blank');
        link.href = url;
        link.setAttribute('download', '');
        link.click();*/

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
            <canvas id="hiddencanvas">

            </canvas>
            <img id="hiddenimg" />
        </div>
        );
    }
}