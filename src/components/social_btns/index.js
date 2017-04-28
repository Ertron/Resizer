import { h, Component } from 'preact';
import style from './style.less';
import { Accordion, AccordionItem } from 'react-sanfona';

export default class SocialButtons extends Component {
    social_objects = [
        {
            name: "Facebook",
            templates: [
                {
                    type: 'Page Cover',
                    height: 200,
                    width: 300,
                },
                {
                    type: 'Profile Cover',
                    height: 150,
                    width: 300,
                },
                {
                    type: 'Profile Picture',
                    height: 200,
                    width: 100,
                },
                {
                    type: 'Linked Post',
                    height: 50,
                    width: 100,
                },
                {
                    type: 'Square Post',
                    height: 100,
                    width: 100,
                }
            ]
        },
        {
            name: "Twitter",
            templates: [
                {
                    type: 'Page Cover',
                    height: 200,
                    width: 300,
                },
                {
                    type: 'Profile Cover',
                    height: 150,
                    width: 300,
                },
                {
                    type: 'Profile Picture',
                    height: 200,
                    width: 100,
                },
                {
                    type: 'Linked Post',
                    height: 50,
                    width: 100,
                },
                {
                    type: 'Square Post',
                    height: 100,
                    width: 100,
                }
            ]
        }
    ];
    render() {
        return (
            <Accordion>
                {
                    this.social_objects.map(function(ub) {

                        var buttons = ub.templates.map(function(button) {
                            return (
                                <p>{button.type}</p>
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