// Arquitetura exagonal
// Ports e Adapters

export const HttpClient = async (
  url: RequestInfo | URL,
  options: RequestInit,
  body?: object
) => {
  
  return await fetch(url, {
   
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    body: body ? JSON.stringify(body) : null,
  }).then(async (response) => {
    const {data} = await response.json();
    
    return {
      
      ok: response.ok,
      data: data,
    };
  });
};
