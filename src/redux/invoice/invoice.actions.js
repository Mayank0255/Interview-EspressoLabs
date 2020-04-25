import {
    GET_INVOICE,
    POST_INVOICE
} from "../types";


//GET INVOICE FROM API

export const getInvoice = () => dispatch => {
    fetch('http://ec2-13-231-224-159.ap-northeast-1.compute.amazonaws.com:8080/api/invoice')
        .then(res => res.json())
        .then(invoice =>
            dispatch({
                type: GET_INVOICE,
                payload: invoice
            })
        );
};

// export const getInvoice = () => async dispatch => {
//     try {
//         const res = await axios.get('http://ec2-13-231-224-159.ap-northeast-1.compute.amazonaws.com:8080/api/invoice');
//
//         dispatch({
//             type: GET_INVOICE,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: INVOICE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };

//POST INVOICE TO API

export const postInvoice = invoiceData => dispatch => {
    let body = JSON.stringify({
        html : invoiceData
    });

    fetch('http://ec2-13-231-224-159.ap-northeast-1.compute.amazonaws.com:8080/api/invoice/pdf/generate', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body
    })
        .then(res => res.json())
        .then(invoice =>
            dispatch({
                type: POST_INVOICE,
                payload: invoice
            })
        );
};

// export const postInvoice = formData => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     };
//     const body = JSON.stringify({
//         html: formData
//     });
//     try {
//         const res = await axios.post('http://ec2-13-231-224-159.ap-northeast-1.compute.amazonaws.com:8080/api/invoice/pdf/generate', body, config);
//         dispatch({
//             type: POST_INVOICE,
//             payload: res.data
//         });
//         // dispatch(setAlert('Post Created', 'success'));
//     } catch (err) {
//         dispatch({
//             type: INVOICE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };