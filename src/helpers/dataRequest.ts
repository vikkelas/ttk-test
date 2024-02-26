async function getData<T>(url:string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json() as Promise<T>;
}

export {getData}