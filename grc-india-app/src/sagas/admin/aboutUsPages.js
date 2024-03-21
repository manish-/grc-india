import { reqToAPI } from '../../utils/API_utils';
import API from '../../constants/API_Constants';
import {
    put,
    select
} from 'redux-saga/effects';

export const fetch_list = function* (action) {
    yield put({
        type: API.ABOUT_US_PAGES.LIST.PENDING
    });
    try {
        const state = yield select();
        const accessToken = state.Authentication_Reducers.accessToken;
    
        let response = yield reqToAPI({
            url: `${API.ABOUT_US_PAGES.LIST.URL}`,
            method: "get",
            responseType: 'json',
            params: action.payload ,
            headers:{
                "content-type":"application/json",
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        yield put({
            type: API.ABOUT_US_PAGES.LIST.FULLFILLED,
            payload: response.data
        });
    } catch (error) {
        //console.log("error", { ...error });
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        //console.log('errorObject', errorObject.data);
        //console.log('error', error.message);
        yield put({
            type: API.ABOUT_US_PAGES.LIST.REJECTED,
            payload: errorObject.data
        });
    }
};

export const fetch_add = function* (action) {
    yield put({
        type: API.ABOUT_US_PAGES.ADD.PENDING
    });
    try {
        const state = yield select();
        const accessToken = state.Authentication_Reducers.accessToken;
        
        let formData = new FormData();
        formData.append("title", action.payload.title);
        formData.append("slug", action.payload.slug);
        formData.append("content", action.payload.content);
        formData.append("meta_title", action.payload.meta_title);
        formData.append("meta_description", action.payload.meta_description);
        formData.append("meta_keywords", action.payload.meta_keywords);        
        formData.append("status", action.payload.status);

        if (action.payload.bannerFile) {
            formData.append("banner", action.payload.bannerFile);
        }


        let response = yield reqToAPI({
            url: `${API.ABOUT_US_PAGES.ADD.URL}`,
            method: "post",
            responseType: 'json',
            data: formData,
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' }
        });
        yield put({
            type: API.ABOUT_US_PAGES.ADD.FULLFILLED,
            payload: response.data
        });
    } catch (error) {
        //console.log("error", { ...error });
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        //console.log('errorObject', errorObject.data);
        //console.log('error', error.message);
        yield put({
            type: API.ABOUT_US_PAGES.ADD.REJECTED,
            payload: errorObject.data
        });
    }
};

export const fetch_details = function* (action) {
    yield put({
        type: API.ABOUT_US_PAGES.DETAILS.PENDING
    });
    try {
        const state = yield select();
        const accessToken = state.Authentication_Reducers.accessToken;

        let response = yield reqToAPI({
            url: `${API.ABOUT_US_PAGES.DETAILS.URL}/${action.payload.id}`,
            method: "get",
            responseType: 'json',
            headers:{
                "content-type":"application/json",
                'Authorization': `Bearer ${accessToken}`
            }
        });
        yield put({
            type: API.ABOUT_US_PAGES.DETAILS.FULLFILLED,
            payload: response.data
        });
    } catch (error) {
        //console.log("error", { ...error });
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        //console.log('errorObject', errorObject.data);
        //console.log('error', error.message);
        yield put({
            type: API.ABOUT_US_PAGES.DETAILS.REJECTED,
            payload: errorObject.data
        });
    }
};

export const fetch_update = function* (action) {
    yield put({
        type: API.ABOUT_US_PAGES.UPDATE.PENDING
    });
    try {
        const state = yield select();
        const accessToken = state.Authentication_Reducers.accessToken;
console.log("action.payload.children",action.payload.children);
        let formData = new FormData();
        formData.append("pageId", action.payload.id);
        formData.append("title", action.payload.title);
        formData.append("slug", action.payload.slug);
        formData.append("content", action.payload.content);
        formData.append("meta_title", action.payload.meta_title);
        formData.append("meta_description", action.payload.meta_description);
        formData.append("meta_keywords", action.payload.meta_keywords);        
        formData.append("status", action.payload.status);
        formData.append("children", JSON.stringify(action.payload.children));
        formData.append("has_children", action.payload.has_children);

        if (action.payload.bannerFile) {
            formData.append("banner", action.payload.bannerFile);
        }


        let response = yield reqToAPI({
            url: `${API.ABOUT_US_PAGES.UPDATE.URL}`,
            method: "post",
            responseType: 'json',
            data: formData,
            headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' }
        });
        yield put({
            type: API.ABOUT_US_PAGES.UPDATE.FULLFILLED,
            payload: response.data
        });
    } catch (error) {
        //console.log("error", { ...error });
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        //console.log('errorObject', errorObject.data);
        //console.log('error', error.message);
        yield put({
            type: API.ABOUT_US_PAGES.UPDATE.REJECTED,
            payload: errorObject.data
        });
    }
};

export const fetch_update_status = function* (action) {
    yield put({
        type: API.ABOUT_US_PAGES.STATUS_UPDATE.PENDING
    });
    try {
        const state = yield select();
        const accessToken = state.Authentication_Reducers.accessToken;

        let response = yield reqToAPI({
            url: `${API.ABOUT_US_PAGES.STATUS_UPDATE.URL}`,
            method: "post",
            responseType: 'json',
            data: { ...action.payload },
            headers:{
                "content-type":"application/json",
                'Authorization': `Bearer ${accessToken}`
            }
        });
        yield put({
            type: API.ABOUT_US_PAGES.STATUS_UPDATE.FULLFILLED,
            payload: response.data
        });
    } catch (error) {
        //console.log("error", { ...error });
        const { response } = error;
        const { request, ...errorObject } = response; // take everything but 'request'
        //console.log('errorObject', errorObject.data);
        //console.log('error', error.message);
        yield put({
            type: API.ABOUT_US_PAGES.STATUS_UPDATE.REJECTED,
            payload: errorObject.data
        });
    }
};
