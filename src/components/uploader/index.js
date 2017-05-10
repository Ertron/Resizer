import { h, Component } from 'preact';

import TargetBox from './TargetBox';
import { connect } from 'preact-redux';
import { NativeTypes } from 'react-dnd-html5-backend';

@connect(state => state)
export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.handleFileDrop = this.handleFileDrop.bind(this);

        this.state = { droppedFiles: [] };
    }

    handleFileDrop(item, monitor) {
        if (monitor) {
            const droppedFile = monitor.getItem().files[0];
            var reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image;
                img.onload = ()=> {
                    this.props.dispatch({
                        type: 'ADD_FILE',
                        fileprops: {
                            url: event.target.result,
                            width: img.width,
                            height: img.height,
                        }
                    });
                };

                img.src = event.target.result;
            };
            reader.readAsDataURL(droppedFile);

            this.setState({ droppedFile });
        }
    }

    render() {
        const { FILE } = NativeTypes;
        const { droppedFiles } = this.state;

        return (
            <div>
                <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
                {/*<FileList files={droppedFiles} />*/}
            </div>
        );
    }
}