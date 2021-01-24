import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../../../../components/header/Menu';
import store from '../../../../redux/store';

export const MenuComponent = () =>
<Provider store={store}>
    <BrowserRouter>
        <Menu />
    </BrowserRouter>
</Provider>;

export default {
    title: '/Header',
    component: MenuComponent,
    decorators: [(Story) => <div class='storybook'><Story/></div>]
}
