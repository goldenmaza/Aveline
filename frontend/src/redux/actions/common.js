import { Dispatch } from 'redux';
import {
    REQ_PAGE_CONTENT,
    RCV_PAGE_CONTENT,
    ERR_PAGE_CONTENT
} from '../constants/common';

export const getPageContent = () => (dispatch: Dispatch) => {
    dispatch({ type: REQ_PAGE_CONTENT });

    //TODO: Refactor to a file with request constants...
    const requestBody = {
        query: `
            query {
                page {
                    id
                    route
                    paragraphs {
                        id
                        heading
                        text
                        collage {
                            id
                            src
                            alt
                            title
                        }
                        subparagraphs {
                            id
                            heading
                            text
                            collage {
                                id
                                src
                                alt
                                title
                            }
                            subsubparagraphs {
                                id
                                heading
                                text
                                collage {
                                    id
                                    src
                                    alt
                                    title
                                }
                            }
                        }
                    }
                }
            }
        `
    };
    //TODO: Refactor to a file with options constants...
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };

    fetch(process.env.REACT_APP_SERVER_API_ADDRESS, options)
        .then(promise => {
            return promise.json();
        })
        .then(result => dispatch({
            result, type: RCV_PAGE_CONTENT
        }))
        .catch(() => dispatch({
            type: ERR_PAGE_CONTENT
        }));
};
