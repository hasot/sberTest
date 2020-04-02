import axios from 'axios';

export const get = url => {
  async function axiosCall() {
    try {
      let res = await axios.get(`${process.env.API_URL}/api/${url}`, {});
      return checkRequestResult(res);
    } catch (err) {
      return checkRequestResult(err.response);
    }
  }

  return axiosCall();
};

export const checkRequestResult = response => {
  if (response.status === 200) {
    return response.data;
  }

  if (response.data.code === 400) {
    alert('Error');
    return response.data;
  }

  if (response.status === 401) {
    alert('D');
  }
  if (response.status === 404) {
    alert('Server Error');
  }
  if (response.status >= 500 || response.status === 403) {
    alert('Server Error');
  }
  return response.data;
};
