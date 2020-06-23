import { AnyAction } from 'redux';
import {
    headerState,
    handlerState,
    menuState,
    REQ_HEADER_LOGO,
    RCV_HEADER_LOGO,
    ERR_HEADER_LOGO,
    REQ_HEADER_MENU,
    RCV_HEADER_MENU,
    ERR_HEADER_MENU,
    TOGGLE_MENU_HANDLER,
    TOGGLE_HEADER_MENU
} from '../constants/header';

export const headerComponent = (state = headerState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const handlerComponent = (state = handlerState, action: AnyAction) => {
    switch (action.type) {
        case TOGGLE_MENU_HANDLER:
            return {
                ...state,
                toggled: !state.toggled
            };
        case REQ_HEADER_LOGO:
            return {
                ...state,
                loading: true,
                multimedia: null
            };
        case RCV_HEADER_LOGO:
            return {
                ...state,
                loading: !state.loading,
                multimedia: action.result.data.multimedia
            };
        case ERR_HEADER_LOGO:
            return {
                ...state
            };
        default:
            return state;
    }
};

export const menuComponent = (state = menuState, action: AnyAction) => {
    switch (action.type) {
        case TOGGLE_HEADER_MENU:
            return {
                ...state,
                toggled: !state.toggled
            };
        case REQ_HEADER_MENU:
            return {
                ...state,
                loading: true,
                page: null,
                content: null
            };
        case RCV_HEADER_MENU:
            return {
                ...state,
                loading: !state.loading,
                page: action.result.data.page,
                content: action.result.data.content
            };
        case ERR_HEADER_MENU:
            return {
                ...state
            };
        default:
            return state;
    }
};