import { h, Component } from 'preact';
import { Accordion, AccordionItem } from 'react-sanfona';

export default class Test extends Component {

    render() {
        return (
            <Accordion>
                {[1, 2, 3, 4, 5].map((item) => {
                    return (
                        <AccordionItem title={`Item ${ item }`} slug={item} key={item}>
                            <div>
                                {`Item ${ item } content`}
                                {item === 3 ? <p><img
                                    src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif"/>
                                </p> : null}
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        );
    }
}