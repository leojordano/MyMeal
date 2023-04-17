import React, {
  FormEvent,
  useState,
  useContext,
  useEffect,
  useRef
} from 'react';
import { AxiosError } from 'axios';
import { getAuth, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import TextInput from '../../Components/Inputs/Text/TextInput';
import { InfinitySpin } from 'react-loader-spinner';
import { loginValidate, passwordValidate } from '../../helpers/validations';
import { AuthContext } from '../../Contexts/Auth';
import { BsGoogle } from 'react-icons/bs';
import FirebaseModel from '../../Service/FirebaseModel';

import Logo from '../../assets/images/logo.png';
import './styles.scss';

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { authenticateUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>('123456');
  const [email, setEmail] = useState<string>('dev@test.com');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [inFirebaseRun, setInFirebaseRun] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        setLoading(true);
        authenticateUser(user, await user.getIdToken());
      }
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (inFirebaseRun) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [inFirebaseRun]);

  const loginHandle = (loginType: string = 'emailAndPassword') => {
    setLoading(true);

    const loginByGoogle = () => {
      try {
        FirebaseModel.loginByGoogleAccount(authenticateUser, setInFirebaseRun);
      } catch (e: any | AxiosError) {
        console.log(e.response);
        setError(e.response?.data?.message ?? 'Erro ao conectar ao servidor');
      }
    };

    const loginByEmailAndPassword = () => {
      try {
        FirebaseModel.loginByEmailAndPassword(
          email,
          password,
          authenticateUser,
          setInFirebaseRun
        );
      } catch (err) {
        console.error(err);
      }
    };

    if (loginType === 'emailAndPassword') {
      loginByEmailAndPassword();
    } else if (loginType === 'googleLogin') {
      loginByGoogle();
    } else {
      loginByEmailAndPassword();
    }

    setLoading(false);
  };

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!loginValidate(email) || !passwordValidate(password)) {
      return setError('Preencha os dados');
    }
    loginHandle();
  };

  return (
    <div className="container" id="login-page">
      <img src={Logo} alt="logo" />
      <p className="title">
        Realizar Login em <span>Pizzaria Jordano</span>
      </p>

      <form ref={formRef} onSubmit={formSubmit}>
        {!!error && <p className="error">{error}</p>}

        <TextInput
          label="E-mail"
          setValue={setEmail}
          value={email}
          validation={loginValidate}
        />

        <TextInput
          type="password"
          label="Senha"
          setValue={setPassword}
          value={password}
          validation={passwordValidate}
        />

        <button className="btn btn-primary" type="submit">
          Entrar
        </button>
      </form>

      <button
        onClick={() => loginHandle('googleLogin')}
        className="btn btn-secundary mt-16px"
        type="button"
      >
        <BsGoogle />
      </button>

      <a href="#">Esqueceu a senha? Click aqui para recuperar</a>

      {loading && (
        <div className="loading-container">
          <InfinitySpin width="200" color="#f58433" />
        </div>
      )}
    </div>
  );
}
