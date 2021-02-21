export async function getNumberUsers() {
    const response = await fetch('/api/numberParticipants');
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})  
    });

    return await response.json();
}

export async function removeUser(data) {
    console.log("test");
    const response = await fetch(`/api/removeUser`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})  
    });
    return await response.json();
}