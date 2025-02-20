import API from '../../constants/API_Constants';

export const fetch_list = (filters) => ({
    type: API.SEMINARS.LIST.FETCH,
    payload: { ...filters }
});

export const fetch_add = (formData) => ({
    type: API.SEMINARS.ADD.FETCH,
    payload: formData
});

export const fetch_details = (id) => ({
    type: API.SEMINARS.DETAILS.FETCH,
    payload: { id: id }
});

export const fetch_update = (formData) => ({
    type: API.SEMINARS.UPDATE.FETCH,
    payload: formData
});

export const fetch_update_status = (id, status) => ({
    type: API.SEMINARS.STATUS_UPDATE.FETCH,
    payload: { id: id, status: status }
});