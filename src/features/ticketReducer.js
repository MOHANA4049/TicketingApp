import { FETCH_TICKETS, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_FAILURE, DELETE_TICKET } from './ticketActions';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TICKETS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case DELETE_TICKET:
            return {
                ...state,
                data: state.data.filter(ticket => ticket.Email !== action.payload),
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'EDIT_TICKET':
            return {
                ...state,
                data: state.data.map(ticket =>
                    ticket.Email === action.payload.Email ? action.payload : ticket
                ),
            };
        case 'ADD_TICKET':
            return { ...state, data: [...state.data, action.payload] };
        default:
            return state;
    }
};

export default ticketReducer;
