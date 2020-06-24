import React, { Component } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Heading from '../common/Heading';
import Slider from './Slider';

import {
    getResources
} from '../../redux/actions/home';

class Slideshow extends Component {//TODO: Rename to Presenter and modify source code to be able to play video files...
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getResources();
    }

    render() {
        const { loading, multimedia, level, label } = this.props;
        if (loading) {
            return (<div></div>); // Refactor to display loading animation...
        } else {
            const sources = [];
            multimedia.forEach(m => {
                sources.push({
                    id: m.id,
                    src: m.src,
                    alt: m.alt,
                    title: m.title
                });
            });
            return (
                <section>
                    <Heading hidden={true} level={level} label={label} />
                    {sources.length > 0 &&
                        <Slider sources={sources} />
                    }
                </section>
            );
        }
    }
}

const mapStateToProps = state => ({
    loading: state.slideshowComponent.loading,
    multimedia: state.slideshowComponent.multimedia,
    level: state.slideshowComponent.level,
    label: state.slideshowComponent.label
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getResources
    }, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Slideshow));
