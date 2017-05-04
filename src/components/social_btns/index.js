import { h, Component } from 'preact';
import style from './style.less';
import { Accordion, AccordionItem } from 'react-sanfona';
import { connect } from 'preact-redux';

@connect(state => state)
export default class SocialButtons extends Component {
    gav = function (x) {
        console.log('THIS X : ', this);
        return x;
    };
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
                    height: 400,
                    width: 700,
                },
                {
                    type: 'Linked Post',
                    height: 300,
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
                    height: 250,
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
        let raw = this.gav;
        let changeSize = function(w, h, that){
            console.log('W, H : ', that.gav(3));
            that.props.dispatch({
                type: 'SOCIAL_SIZE',
                size: {w: w, h: h}
            });
        };
        let that = this;
        return (
            <Accordion>
                {
                    this.social_objects.map(function(ub) {
                        let buttons = ub.templates.map(function(button) {
                            return (
                                <p onClick={(e)=> changeSize(button.width, button.height, that)}>{button.type}</p>
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