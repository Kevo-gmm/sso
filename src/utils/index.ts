export const domain_url = "https://srv.control.trade";

export const sendReq = async (body: { [x: string]: string | boolean | number | undefined | string[] }, endpoint: string, method: string = "POST") => {
  const fullPath = window.location.href;
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "X-Original-URL": fullPath,
  };

  const res = await fetch(`${domain_url}/${endpoint}`, { method, headers, body: JSON.stringify(body) });
  const data = await res.json();
  return { data, res };
};

export const getReq = async (endpoint: string) => {
  const fullPath = window.location.href;
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "X-Original-URL": fullPath,
  };
  const res = await fetch(`${domain_url}/${endpoint}`, { headers });

  const data = await res.json();
  return { data, res };
};
