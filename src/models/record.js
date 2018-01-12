import { uploadAudio, audioReply, getAudio } from '../services/record';

export default {
  namespace: 'record',

  state: {
    recordList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname.indexOf('/record') > -1) {
          dispatch({ type: 'clearRecordList' });
        }
      });
    },
  },

  effects: {
    *uploadAudio({ formdata, params }, { call, put, select }) {  // eslint-disable-line
      const { data: question } = yield call(uploadAudio, formdata);
      question.type = 'question';
      delete question.status;
      
      const { data: reply } = yield call(audioReply, { ...question, ...params, type: 'INIT'});
      reply.type = 'reply';
      delete reply.status;

      yield put({ type: 'mergeRecordList', payload: [question, reply]});
    },

    *getAudio({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getAudio, payload);
    },
  },

  reducers: {
    mergeRecordList(state, { payload }) {
      let { recordList: oldList } = state;
      const recordList = [...oldList, ...payload];
      return { ...state, recordList };
    },
    clearRecordList(state, { payload }) {
      return { ...state, recordList: [] };
    },
  },

};
