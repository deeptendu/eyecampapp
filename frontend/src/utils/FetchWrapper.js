// src/utils/fetchWrapper.js
export default async function fetchWithAlert(url, options = {}) {
    try {
      const baseURl="https://eyecampapp.onrender.com";

      const response = await fetch(`${baseURl}${url}`, options);
      //console.log(`api url,${baseURl}${url}`);
      if (!response.ok) {
        const errorBody = await response.json();
        //console.log(response)
        throw new Error(JSON.stringify({ 
          status: response.status, 
          message: response.statusText, 
          body: errorBody 
        }));
      }
  
      return await response.json();
    } catch (error) {
      const errorDetails = JSON.parse(error.message);
      // console.error("Error Status:", errorDetails.status);
      // console.error("Error Message:", errorDetails.message);
      // console.error("Error Body:", errorDetails.body);
      if(errorDetails?.body?.error && !Array.isArray(errorDetails.body.error)){
        alert(`${errorDetails.body.error}`);
      }
      throw error;
    }
  }
  