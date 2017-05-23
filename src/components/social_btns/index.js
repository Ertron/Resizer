import { h, Component } from 'preact';
import style from './style.less';
import { Accordion, AccordionItem } from 'react-sanfona';
import { connect } from 'preact-redux';
import { social_objects } from '../../lib/social_buttons';

@connect(state => state)
export default class SocialButtons extends Component {
    render() {
        let changeSize = function(w, h, name, soc_name, that){
            if(w > that.props.file_props.width || h > that.props.file_props.height){
                console.log('bad size');
                return false;
            }
            that.props.dispatch({
                type: 'SOCIAL',
                params: {w: w, h: h, soc_name: soc_name, name: name}
            });
            that.props.dispatch({
                type: 'SET_CALCULATED_SIZES',
                params: {
                    soc_w: w,
                    soc_h: h,
                    img_w: that.props.file_props.width,
                    img_h: that.props.file_props.height
                }
            });
        };
        let buttonStyle = function (w, h, that, btn, btn_type_name, btn_soc_name, selected_soc_name) {
            let color = 'green';
            let border = '1px solid transparent';
            if(btn === btn_type_name && btn_soc_name === selected_soc_name){
                border = '1px solid grey';
            }
            if(w > that.props.file_props.width || h > that.props.file_props.height){
                color = 'red';
            }
            return{
                color: color,
                border: border
            }
        };
        let that = this;
        return (
            <Accordion>
                {
                    social_objects.map(function(ub) {
                        let buttons = ub.templates.map(function(button) {
                            return (
                                <p style={buttonStyle(button.width, button.height, that, button.type, that.props.social.name, ub.name, that.props.social.soc_name)}
                                   onClick={(e)=> changeSize(button.width, button.height, button.type, ub.name, that)}>{button.type}</p>
                            )
                        });

                        return (
                            <AccordionItem title={` ${ ub.name }`} slug={ub.name} key={ub.name}>
                                {buttons}
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        )
    }
}