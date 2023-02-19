// Arquitetura exagonal
// Ports e Adapters

export const HttpClient = async (
  url: RequestInfo | URL,
  options: RequestInit,
  body?: object
) => {
  
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  }).then(async (response) => {
    const responseJSON = await response.json();
    return {
      
      ok: response.ok,
      body: responseJSON.data,
    };
  });
};
