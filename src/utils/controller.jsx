import { API_DUMMY } from "./baseURL";

export const getAllData = async (path, setPath) => {
    try {
        const response = await fetch(`${API_DUMMY}/${path}`, {
          method: 'GET'
        });
          if (response.ok) {
              const data = await response.json();
              setPath(data)
          }
      } catch (err) {
          console.log(err);
      }
  };
