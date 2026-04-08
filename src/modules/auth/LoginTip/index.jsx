import './style.css';

function LoginTip({ cartao, password }) {
  return (
    <p className="login-hint">
          Carteirinha: <strong>{cartao}</strong> | Senha:
          <strong>{password}</strong>
    </p>
  )
}

export default LoginTip;