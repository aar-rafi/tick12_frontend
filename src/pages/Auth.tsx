import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

interface AuthProps {
    onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);

    return isLogin ? (
        <LoginForm
            onSuccess={onAuthSuccess}
            onRegisterClick={() => setIsLogin(false)}
        />
    ) : (
        <RegisterForm
            onSuccess={onAuthSuccess}
            onLoginClick={() => setIsLogin(true)}
        />
    );
};

export default Auth;
