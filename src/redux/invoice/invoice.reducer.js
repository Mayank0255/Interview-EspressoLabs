import {
    GET_INVOICE,
    // GET_PRINT,
    POST_INVOICE,
    INVOICE_ERROR
} from "../types";

const initialState = {
    invoice: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_INVOICE:
            return {
                ...state,
                invoice: action.payload,
                loading: false
            };
        case POST_INVOICE:
            return {
                ...state,
                invoice: [ action.payload, ...state.invoice ],
                loading: false
            };
        case INVOICE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
