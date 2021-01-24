import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Content from '../../../../components/common/Content';
import store from '../../../../redux/store';

// TODO: Refactor to a central location for both component tests and storybook stories...
const stateLevel = process.env.REACT_APP_DOC_CONTENT_LEVEL;

export const ContentComponent = () =>
<Provider store={store}>
    <BrowserRouter>
        <Content />
    </BrowserRouter>
</Provider>;

export default {
    title: '/Common',
    component: ContentComponent
}