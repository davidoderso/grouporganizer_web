
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../assets/Animated_bg';
import { API_URL } from '../assets/backend_api';
import '../components/test_login.css';
import '../components/themeBgAnimated.css';
interface RegisterData {
    first_name: string;
    username: string;
    email: string;
    password: string;
    birthday: Date;
    isChild: boolean;
};

export default function LoginPage() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();
    const [isRegisterActive, setIsRegisterActive] = useState(false);
    const [ShowForgot] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [forgotpassword, setForgotPassword] = useState(false);

    if (forgotpassword) {
        alert('Funktionalität ist in Entwicklung');
        console.log('Funktionalität fehlt');
    }
    async function checkLogIn(e: SubmitEvent) {
        e.preventDefault();
        console.log('u:', loginUsername, ' p:', loginPassword);
        const response = await fetch(`${API_URL}auth/login.php`, {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify({username: loginUsername, password: loginPassword}),
        });

        const data = await response.json();
        if (response.ok && data.success) {
            console.log('User:', data);
            localStorage.setItem('user', JSON.stringify({data}));
            navigate('/dashboard');
        } else {
            alert('Login fehlgeschlagen: '+ (data.message || 'Bitte prüfen Sie die Eingaben.'));
        }
    };

    async function handleRegister(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(firstname, registerUsername, registerPassword);
        if (!firstname || !registerUsername || !registerPassword) {
            alert('Bitte füllen Sie alle Pflichtfelder aus!');
            return;
        }

        const data: RegisterData = {
            first_name: firstname,
            username: registerUsername,
            email,
            password: registerPassword,
            birthday: birthdate ? new Date(birthdate) : new Date(),
            isChild: isChecked,
        };

        console.log("Registrierungsdata:", data);
        console.log("Registrierungsjson:", JSON.stringify(data));

        const response = await fetch(`${API_URL}auth/register.php`, {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify({first_name: firstname,
                username: registerUsername,
                email,
                password: registerPassword,
                birthday: birthdate ? new Date(birthdate) : new Date(),
                isChild: isChecked
            }),
        });

        const result = await response.json();
        console.log("response:", result);

        if (response.ok && result.success) {
            console.log('Registrierung erfolgreich:', result);
            alert('Registrierung erfolgreich, bitte melden Sie sich an.');
            navigate('/');
        } else {
            alert(
                'Registrierung fehlgeschlagen: ' +
                (result.message || 'Unbekannter Fehler')
            );
        }
    }

    return (
        <main className="auth-gesamt-con">
            <AnimatedBackground />

            <div className={`auth-container ${isRegisterActive ? "right-panel-active": "" }
                            ${ShowForgot ? "left-panel-activate" : "" }}`}
                            id="auth-container">
                {/* Registrierung */}
                <div className="form-container sign-up-container">
                    <form action="#" className="register-form" onSubmit={handleRegister}>
                        <h1>Registrierung</h1>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={firstname}
                            placeholder="Bitte Ihren Vornamen eingeben *"
                            onChange={(e) => setFirstname(e.target.value)}
                        />

                        <input
                            type="text"
                            name="username-register"
                            id="username-register"
                            value={registerUsername}
                            placeholder="Bitte geben Sie einen Benutzernamen ein *"
                            onChange={(e) => setRegisterUsername(e.target.value)}
                        />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Bitte eine E-Mail eingeben"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            name="password-register"
                            id="password-register"
                            value={registerPassword}
                            placeholder="Bitte setzen Sie ein Password *"
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />

                        <input
                            type="date"
                            name="birthdate"
                            id="birthdate"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />

                        <label htmlFor="is_child" style={{ marginTop: "12px", color: "white", display: "block" }}>
                        <input
                            type="checkbox"
                            name="is_child"
                            id="is_child"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        &nbsp; Kindaccount?
                        </label>
                        
                        <button type="submit">Registrieren</button>

                    </form>
                </div>
                {/* Login */}
                < div className={'form-container sign-in-container'}>
                    <form action="#" className="login-form" onSubmit={checkLogIn}>
                        <h2>Login</h2>
                        <input
                            type="text"
                            name="username-login"
                            id="username-login"
                            value={loginUsername}
                            placeholder='Benutzername'
                            onChange={(e) => setLoginUsername(e.target.value)} />

                        <input
                            type="password"
                            name="password-login"
                            id="password-login"
                            value={loginPassword}
                            placeholder='Password'
                            onChange={(e) => setLoginPassword(e.target.value)} />
                        
                        <button type="submit">Anmelden</button>
                            <button type="button"
                                    className="forgot-link"
                                    onClick={() => setForgotPassword(true)}
                                    style={{ background: "none", border: "none", color: "#23a2f6", textDecoration: "underline", cursor: "pointer", padding: 0 }}
                            >Passwort vergessen?</button>
                    </form>
                </div>
                {/* Password vergessen */}
                <div className={'form-container forgot-pw-container'}>
                    
                </div>

                {/* Diese Overlay ding */}
                <div className={'overlay-container'}>
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h3>Du hast doch ein Account?</h3>
                            <p>Dann log dich ein, bevor du dein Passwort vergessen hast</p>
                            <button className="ov-button" onClick={() => setIsRegisterActive(false)}>Einloggen</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h3>Willkommen</h3>
                            <p>Lass uns dir bei der Organisierung deiner Aufgaben helfen</p>
                            <button className="ov-button" onClick={() => setIsRegisterActive(true)}>Registrieren</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}