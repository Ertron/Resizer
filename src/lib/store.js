import { createStore } from 'redux';

const ACTIONS = {
    ADD_FILE: ({ file_props, ...state}, { fileprops }) => ({
        file_props: fileprops,
        ...state
    } ),
    SHOW_LOADING: ({is_loading, ...state}, { is_loading: rendType }) => ({
        is_loading: rendType,
        ...state
    } ),
    IS_OVERED: ({is_overed, ...state}, { is_overed: rendType }) => ({
        is_overed: rendType,
        ...state
    } ),
    SOCIAL_SIZE: ({social, ...state}, { size }) => ({
        social: size,
        ...state
    } ),
    SET_OFFSET: ({offset, ...state}, { params }) => ({
        offset: params,
        ...state
    } ),
};

const INITIAL = {
    file_props: {url: '', width: '', height: ''},
    is_loading: false,
    social: {w: 200, h: 200}
};

export default createStore((state, action) => (
    action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
