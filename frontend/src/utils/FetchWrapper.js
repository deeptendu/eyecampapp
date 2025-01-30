// src/utils/fetchWrapper.js
export default async function fetchWithAlert(url, options = {}) {
    try {
      const response = await fetch(url, options);
      console.log('api url'+url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      alert(`API Error: ${error.message}`);
      throw error; // Re-throw the error for further handling
    }
  }
  