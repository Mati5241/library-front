import React, {useState} from 'react';

export const Test = () => {
    const [loginData, setLoginData] = useState({login: '', password: ''});
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const {accessToken} = await response.json();
                // Przechowaj token w stanie lub kontekście
                // np. setAccessToken(accessToken);
            } else {
                setError('Błędny login lub hasło');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas logowania', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Login"
                onChange={(e) => setLoginData({...loginData, login: e.target.value})}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
            <button onClick={handleLogin}>Zaloguj</button>
            {error && <p>{error}</p>}
        </div>
    );
};

