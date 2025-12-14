export async function fetchGet(endpoint) {
    try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return { error: "network error" };
    }
}

export async function fetchPost(endpoint, body) {
    try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }); 
        return await response.json();
    } catch (error) {
        console.log(error);
        return { error: "Network error" };
    }
}

export async function fetchPatch(endpoint, body) {
    try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return { error: "Network error" };
    }
}

export async function fetchDelete(endpoint){
    try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
            method: 'DELETE',
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return { error: "Network error" };
    }
}