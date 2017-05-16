import { h, Component } from 'preact';
import style from './style.less';
import { Accordion, AccordionItem } from 'react-sanfona';
import { connect } from 'preact-redux';

@connect(state => state)
export default class SocialButtons extends Component {
    social_objects = [
        {
            name: "Facebook",
            templates: [
                {
                    type: 'Page Cover',
                    height: 400,
                    width: 450,
                },
                {
                    type: 'Profile Cover',
                    height: 250,
                    width: 450,
                },
                {
                    type: 'Profile Picture',
                    height: 450,
                    width: 250,
                },
                {
                    type: 'Linked Post',
                    height: 800,
                    width: 400,
                },
                {
                    type: 'Square Post',
                    height: 300,
                    width: 300,
                }
            ]
        },
        {
            name: "Twitter",
            templates: [
                {
                    type: 'Page Cover',
                    height: 500,
                    width: 400,
                },
                {
                    type: 'Profile Cover',
                    height: 200,
                    width: 200,
                },
                {
                    type: 'Profile Picture',
                    height: 400,
                    width: 350,
                },
                {
                    type: 'Linked Post',
                    height: 200,
                    width: 600,
                },
                {
                    type: 'Square Post',
                    height: 300,
                    width: 300,
                }
            ]
        }
    ];
    render() {
        let changeSize = function(w, h, that){
            console.info(' CHANGE SIZE w : ', w ,' h : ', h );
            if(w > that.props.file_props.width || h > that.props.file_props.height){
                console.log('bad size');
                return false;
            }
            that.props.dispatch({
                type: 'SOCIAL_SIZE',
                size: {w: w, h: h}
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
        let buttonStyle = function (w, h, that) {
            let color = 'green';
            if(w > that.props.file_props.width || h > that.props.file_props.height){
                color = 'red';
            }
            console.info(' buttonStyle w : ', w ,' h : ', h , ' WIDTH :  ', that.props.file_props.width ,' COLOR : ', color);
            return{
                color: color
            }
        };
        let that = this;
        let enable = true;
        return (
            <Accordion>
                {
                    this.social_objects.map(function(ub) {
                        let buttons = ub.templates.map(function(button) {
                            return (
                                <p style={buttonStyle(button.width, button.height, that)} onClick={(e)=> changeSize(button.width, button.height, that)}>{button.type}</p>
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