//test용 json db server 데이터

export async function loginUserApi(username, password) {
    const response = await fetch('http://localhost:5174/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if(!response.ok){
        throw new Error('login failed');
    }

    const users = await response.json();
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        throw new Error('login failed');
    }
    return response.json();
}