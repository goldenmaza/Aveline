import React, { Component } from 'react';

import Heading from './Heading';
import Collage from './Collage';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: null,
            content: null,
            multimedia: null,
            level: process.env.REACT_APP_DOC_CONTENT_LEVEL
        };
    }

    componentDidMount() {
        const requestBody = {
            query: `
                query {
                    page (hidden: false) {
                        id
                        tag
                    }
                    content (hidden: false) {
                        id
                        page
                        heading
                        text
                    }
                    multimedia (hidden: false) {
                        id
                        page
                        content
                        src
                        alt
                        title
                    }
                }
            `
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        };
        fetch(process.env.REACT_APP_SERVER_API_ADDRESS, options).then(promise => {
            return promise.json();
        }).then(result => {
            this.setState({
                page: result.data.page,
                content: result.data.content,
                multimedia: result.data.multimedia,
                loading: false
            });
        });
    }

    render() {
        if (this.state.loading) {
            return (<div></div>); // Refactor to display loading animation...
        } else {
            const { level, page, content, multimedia } = this.state;
            const { tag, children } = this.props;
            const sections = [];
            let collection = [];

            page.forEach(p => {
                content.forEach(c => {
                    if (p.id === c.page && p.tag === tag) {
                        const id = p.tag + c.id;
                        multimedia.forEach(m => {
                            if (m.content !== null && p.id === m.page && c.id === m.content) {
                                collection.push(m);
                            }
                        });
                        sections.push(
                            <section key={id}>
                                <div id={id} className='contentContainer'>
                                    <Heading level={level} label={c.heading} />
                                    <p>
                                        {c.text}
                                    </p>
                                    <Collage collection={collection} />
                                </div>
                                { children }
                            </section>
                        );
                    }
                    collection = [];
                });
            });

            if (sections.length === 0) { // Contact page specific
                page.forEach(p => {
                    if (p.tag === tag) {
                        const id = p.tag;
                        sections.push(
                            <section key={id}>
                                <div id={id} className='contentContainer'>
                                </div>
                                { children }
                            </section>
                        );
                    }
                });
            }

            return (
                <>
                    { sections }
                </>
            );
        }
    }
}

export default Content;
