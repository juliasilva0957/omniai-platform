
import {
  Building2,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <span className="dashboard-eyebrow">
          VISÃO GERAL
        </span>

        <h1>
          Olá, {user?.name?.split(" ")[0]}!
          <span> 👋</span>
        </h1>

        <p>
          Bem-vindo à sua área de trabalho
          no OmniAI.
        </p>
      </div>

      <section className="dashboard-cards">
        <article className="dashboard-info-card">
          <div className="dashboard-card-icon">
            <UserRound size={23} />
          </div>

          <span>Seu perfil</span>

          <h3>
            {user?.role === "ADMIN"
              ? "Administrador"
              : "Usuário"}
          </h3>

          <p>
            Permissões associadas à sua conta.
          </p>
        </article>

        <article className="dashboard-info-card">
          <div className="dashboard-card-icon">
            <Building2 size={23} />
          </div>

          <span>Empresa vinculada</span>

          <h3>
            Empresa #{user?.companyId}
          </h3>

          <p>
            Identificador da empresa autenticada.
          </p>
        </article>

        <article className="dashboard-info-card">
          <div className="dashboard-card-icon">
            <ShieldCheck size={23} />
          </div>

          <span>Autenticação</span>

          <h3>Sessão ativa</h3>

          <p>
            Acesso autenticado por JWT.
          </p>
        </article>
      </section>

      <section className="dashboard-intro-card">
        <div className="dashboard-intro-icon">
          <Sparkles size={28} />
        </div>

        <div>
          <h2>
            Seu espaço de trabalho está pronto!
          </h2>

          <p>
            A base de autenticação do OmniAI já
            está integrada ao frontend. Em breve,
            você poderá gerenciar usuários,
            configurações da empresa e fluxos
            de automação por aqui.
          </p>
        </div>
      </section>
    </main>
  );
}
