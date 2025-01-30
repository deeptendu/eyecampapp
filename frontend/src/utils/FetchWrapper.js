// src/utils/fetchWrapper.js
export default async function fetchWithAlert(url, options = {}) {
    try {
      const baseURl="https://eyecampapp.onrender.com";

      const response = await fetch(`${baseURl}${url}`, options);
      console.log(`api url,${baseURl}${url}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.log(`res opt`+JSON.stringify(options));
      alert(`API Error: ${error.message}`);
      throw error; // Re-throw the error for further handling
    }
  }
  