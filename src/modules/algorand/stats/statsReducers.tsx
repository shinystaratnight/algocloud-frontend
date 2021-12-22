import actions from 'src/modules/algorand/stats/statsActions';

const initialData = {
  loading: false,
  historyData: []
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    console.log(payload.data);
    return {
      ...state,
      loading: false,
      historyData: payload.data,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false
    };
  }

  return state;
};
