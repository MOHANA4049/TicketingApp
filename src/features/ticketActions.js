import axios from "axios";
export const FETCH_TICKETS = 'FETCH_TICKETS';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';
export const DELETE_TICKET = 'DELETE_TICKET';

export const fetchTickets = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_TICKETS });
        try {
            const response = await axios.get('/data.json');
            const data = response.data;
            dispatch({ type: FETCH_TICKETS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_TICKETS_FAILURE, payload: error.message });
        }
    };
};

export const deleteTicket = (email) => ({
    type: DELETE_TICKET,
    payload: email,
});


export const editTicket = (ticket) => {
    return (dispatch) => {
        
        dispatch({
            type: 'EDIT_TICKET',
            payload: ticket,
        });
    };
};

export const addTicket = (ticket) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TICKET',
            payload: ticket,
        });
    };
};
