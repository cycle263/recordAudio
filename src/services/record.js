import request from '../utils/request';
const requestOpts = (params) => {
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  }
};

export async function uploadAudio(params) {
  return request(`/uploadAudio.json`, {
    method: 'post',
    body: params,
  })
}

export async function audioReply(params) {
  return request(`/audioReply.json`, requestOpts(params))
}

export async function getAudio(params) {
  return request(`/getAudio.json`, requestOpts(params))
}
