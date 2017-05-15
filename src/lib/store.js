import { createStore } from 'redux';
import calculateSizes from '../utils/calculate_sizes_v2';

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
    SET_CALCULATED_SIZES: ({calc_params, ...state}, { params }) => ({
        calc_params: calculateSizes(params.soc_w, params.soc_h, params.img_w, params.img_h),
        ...state
    } ),
    SET_CROP_OFFSET: ({crop_coord, ...state}, { coords }) => ({
        crop_coord: coords,
        ...state
    } ),
};

const INITIAL = {
    file_props: {url: '', width: '', height: ''},
    is_loading: false,
    social: {w: 200, h: 200},
    calc_params: {width: 200, height: 200, indent_left: 0, indent_top: 0},
    crop_coord: {x : 0, y: 0}
};

export default createStore((state, action) => (
    action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
