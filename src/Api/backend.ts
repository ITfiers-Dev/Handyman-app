import axios from 'axios';
//https://servicelearningapp.netlify.app/      //livelink
// const BASE_URL = 'https://script.google.com/macros/s/AKfycbw7UidIwjE8YCCF3aXNwAV1X-sxuuYfnc9L_nAqIyVD4VPIgmfmKuE-5OfuO3JH5mgV/exec'
const BASE_URL = 'https://script.google.com/macros/library/d/1r2e2wjzIMitYeV4Ivi6QiUH8gArPC2dCX1WhoqM9pXJI_ze9O4LU-m3T/1';

export const updateDBPost = async (payload:any) => {
  const res = await axios.post(
    BASE_URL,
    payload,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );

  if (res.status >= 200 && res.status < 400) {
    return res.data;
  }

  throw res.data.error;
};