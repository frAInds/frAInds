//test용 json db server 데이터

export async function loginUserApi(username, password) {
    try{
        const response = await fetch('http://localhost:5173/account/sign-in', {
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

        const users = await response.json(); // 응답 파싱


        const user = users.find(user => user.username === username && user.password === password);
            if (!user) {
                throw new Error('Login failed: No matching user found');
            }

            return user; // user 객체 반환 또는 로그인 성공 처리
    } catch (error) {
        console.error('Login Error:', error.message);
        throw error;
    }
}