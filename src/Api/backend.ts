import axios from 'axios';
//https://servicelearningapp.netlify.app/      //livelink
// const BASE_URL = 'https://script.google.com/macros/s/AKfycbw7UidIwjE8YCCF3aXNwAV1X-sxuuYfnc9L_nAqIyVD4VPIgmfmKuE-5OfuO3JH5mgV/exec'
const BASE_URL = 'https://script.google.com/macros/s/AKfycby0g4asaMbVLdxUOXRWR63FhfAv38fDRjTXXAcktlZRBzW9QMziwu1smIPYkpTsPadr/exec';

export const updateDBPost = async (payload:any) => {
  console.log("payload",payload)
  const res = await axios.post(
    BASE_URL,
    payload,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
  console.log("res",res)
  if (res.status >= 200 && res.status < 400) {
    return res.data;
  }

  throw res.data.error;
};