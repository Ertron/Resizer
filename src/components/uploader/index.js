import { h, Component } from 'preact';
import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import { connect } from 'preact-redux';

@connect(state => state)
@DragDropContext(HTML5Backend)
export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.handleFileDrop = this.handleFileDrop.bind(this);

        this.state = { droppedFiles: [] };
    }

    handleFileDrop(item, monitor) {
        if (monitor) {
            const droppedFiles = monitor.getItem().files;
            var reader = new FileReader();
            reader.onload = (event) => {
                this.props.dispatch({
                    type: 'ADD_FILE',
                    url: event.target.result
                });
            };
            reader.readAsDataURL(droppedFiles[0]);
            this.setState({ droppedFiles });
        }
    }

    render() {
        const { FILE } = NativeTypes;
        const { droppedFiles } = this.state;

        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
                    {/*<FileList files={droppedFiles} />*/}
                </div>
            </DragDropContextProvider>
        );
    }
}