
export async function getJSON(url: string) {
  try {
    const res = await fetch(url);
  
    if(!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

    console.log(res);

    const resJSON = await res.json();

    return resJSON;
  } catch(err) {
    throw err;
  }
}

export async function timeout(sec: number) {
  return new Promise((_, reject) => {
    setTimeout(reject, sec*1000);
  })
}

