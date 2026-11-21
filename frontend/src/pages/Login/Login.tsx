
import { useState, type FormEvent } from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
    isLoading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Preencha email e senha.");
      return;
    }

    try {
      await login({
        email: email.trim().toLowerCase(),
        password,
      });

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao realizar login."
      );
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <Link
          to="/"
          className="login-brand-logo"
        >
          <span className="login-brand-icon">
            <Sparkles size={23} />
          </span>

          <span>OmniAI</span>
        </Link>

        <div className="login-brand-content">
          <span className="login-brand-tag">
            AUTOMAÇÃO INTELIGENTE
          </span>

          <h1>
            Mais inteligência.
            <br />
            Menos complexidade.
          </h1>

          <p>
            Centralize operações, organize sua
            equipe e transforme a maneira
            como sua empresa trabalha.
          </p>

          <div className="login-benefits">
            <div className="login-benefit">
              <Workflow size={20} />

              <span>
                Processos mais organizados
              </span>
            </div>

            <div className="login-benefit">
              <ShieldCheck size={20} />

              <span>
                Gestão segura de usuários
              </span>
            </div>

            <div className="login-benefit">
              <Sparkles size={20} />

              <span>
                Tecnologia para evoluir
                com seu negócio
              </span>
            </div>
          </div>
        </div>

        <p className="login-brand-footer">
          © {new Date().getFullYear()} OmniAI
        </p>
      </section>

      <section className="login-form-panel">
        <div className="login-form-wrapper">
          <Link
            to="/"
            className="login-back-link"
          >
            ← Voltar para a Home
          </Link>

          <div className="login-form-header">
            <div className="login-form-icon">
              <LockKeyhole size={25} />
            </div>

            <h2>Bem-vindo de volta!</h2>

            <p>
              Entre com suas credenciais
              para acessar sua plataforma.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                htmlFor="email"
                className="form-label"
              >
                Email
              </label>

              <div className="login-input-wrapper">
                <Mail
                  size={19}
                  className="login-input-icon"
                />

                <input
                  id="email"
                  type="email"
                  className="form-input login-input"
                  placeholder="seuemail@empresa.com"
                  autoComplete="username"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="form-label"
              >
                Senha
              </label>

              <div className="login-input-wrapper">
                <LockKeyhole
                  size={19}
                  className="login-input-icon"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-input login-input login-password-input"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="login-error"
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary login-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Entrando..."
                : "Entrar na plataforma"}

              {!isLoading && (
                <ArrowRight size={19} />
              )}
            </button>
          </form>

          <div className="login-help">
            <p>
              Ainda não possui acesso?
            </p>

            <Link to="/#contato">
              Entre em contato com o OmniAI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
