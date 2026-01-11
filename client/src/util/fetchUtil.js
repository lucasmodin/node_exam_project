export async function fetchGet(endpoint) {
    try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
            credentials: 'include'
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.error
            }
        }

        return data;
    } catch (error) {
        console.log(error);
        return { error: "Network error" };
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
        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.error
            };
        }

        return data;
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.error
            };
        }

        return data;
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
        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.error
            };
        }

        return data;
    } catch (error) {
        console.log(error);
        return { error: "Network error" };
    }
}