import { h, Component } from 'preact';
import { connect } from 'preact-redux';

function cropIt(props){
    let canvas = document.getElementById('canvas');
    let hiddencanvas = document.getElementById('hiddencanvas');
    let context = canvas.getContext('2d');
    let context_hiddencanvas = hiddencanvas.getContext('2d');
    let imageObj = new Image();
    let area = new Image();

    imageObj.onload = function() {
     // draw cropped image
        let sourceX = - props.crop_coord.x; //отступ камеры по X
        let sourceY = - props.crop_coord.y; //отступ камеры по Y
        let sourceWidth = props.calc_params.width;
        let sourceHeight = props.calc_params.height;
        let destWidth = props.calc_params.width; // область отрисовки изображения (размер)
        let destHeight = props.calc_params.height; // область отрисовки изображения (размер)
        let destX = 0; // область отрисовки изображения (отступ по X)
        let destY = 0; // область отрисовки изображения (отступ по Y)

        hiddencanvas.width = props.calc_params.width;
        hiddencanvas.height = props.calc_params.height;
        context_hiddencanvas.drawImage(imageObj, 0, 0, props.file_props.width, props.file_props.height, 0, 0, destWidth, destHeight);
        let hidden_c_url = hiddencanvas.toDataURL();

        area.onload = function() {

            canvas.width = props.social.w;
            canvas.height = props.social.h;

            context.drawImage(area, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            /*console.log(' context_hiddencanvas : ', context_hiddencanvas);*/
            let url = canvas.toDataURL();
            let link = document.createElement('a');
            link.setAttribute('target','_blank');
            link.href = url;
            link.setAttribute('download', '');
            link.click();
        };
        area.src = hidden_c_url;

    };
    imageObj.src = props.file_props.url;
}

@connect(state => state)
export default class Cropper extends Component {

    render() {
        return (
        <div style={{width: '100%', float: 'left'}}>
            <div onClick={(e)=> cropIt(this.props)}>BTN</div>
            <canvas style={{display: 'none'}} id="canvas">

            </canvas>
            <canvas style={{display: 'none'}} id="hiddencanvas">

            </canvas>
        </div>
        );
    }
}