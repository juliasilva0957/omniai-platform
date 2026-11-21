import { useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Bot, Building2, CheckCircle2, ChevronDown, Clock3, Database, FileCheck2, GitBranch, Headphones, Layers3, LockKeyhole, Mail, Menu, MessageCircle, MessagesSquare, Send, ShieldCheck, Sparkles, Users, Workflow, X } from 'lucide-react';
import './Home.css';

const benefits = [
  { icon: Clock3, title: 'Mais tempo para o que importa', description: 'Reduza tarefas repetitivas e libere sua equipe para atividades estratégicas.' },
  { icon: Layers3, title: 'Informações organizadas', description: 'Reúna solicitações, conversas e registros em fluxos mais claros.' },
  { icon: ShieldCheck, title: 'Controle por empresa', description: 'Cada organização tem seu próprio ambiente, usuários e permissões.' },
  { icon: FileCheck2, title: 'Acompanhamento e rastreabilidade', description: 'Estruture aprovações e históricos para acompanhar cada etapa do processo.' },
];

const integrations = [
  { icon: MessagesSquare, title: 'Canais de atendimento', description: 'Centralização de mensagens e acompanhamento de conversas.', tag: 'Em desenvolvimento' },
  { icon: GitBranch, title: 'APIs e sistemas internos', description: 'Conexão com ferramentas e processos já utilizados pela empresa.', tag: 'Planejado' },
  { icon: Database, title: 'Dados e registros', description: 'Organização de informações para apoiar decisões e automações.', tag: 'Em desenvolvimento' },
];

const examples = [
  { number: '01', icon: Headphones, title: 'Atendimento organizado', category: 'Relacionamento', steps: ['Uma mensagem chega por um canal conectado', 'A conversa é registrada e direcionada', 'A equipe acompanha o atendimento em um só lugar'] },
  { number: '02', icon: FileCheck2, title: 'Solicitações e aprovações', category: 'Operações', steps: ['Um colaborador registra uma solicitação', 'O responsável recebe a demanda para análise', 'A decisão e o histórico ficam registrados'] },
  { number: '03', icon: Bot, title: 'Rotinas automatizadas', category: 'Produtividade', steps: ['Um evento inicia o fluxo', 'As regras definidas orientam as próximas ações', 'A execução pode ser acompanhada por registros'] },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [contactFeedback, setContactFeedback] = useState('');
  const [copied, setCopied] = useState(false);

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Contato OmniAI — ${form.company || form.name}`);
    const body = encodeURIComponent(`Nome: ${form.name}\nEmpresa: ${form.company}\nEmail: ${form.email}\n\nMensagem:\n${form.message}`);
    // Configure o email oficial em VITE_CONTACT_EMAIL antes de publicar.
    const recipient = import.meta.env.VITE_CONTACT_EMAIL;
    if (!recipient) {
      setContactFeedback('Canal de contato ainda não configurado. Defina VITE_CONTACT_EMAIL no arquivo .env do frontend.');
      return;
    }
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setContactFeedback('Seu aplicativo de email será aberto com a mensagem preenchida. Confirme o envio por lá.');
  }

  function closeMenu() { setMenuOpen(false); }

  return (
    <div className="omni-home">
      <header className="omni-header">
        <div className="omni-container omni-header-inner">
          <a href="#inicio" className="omni-logo" onClick={closeMenu} aria-label="OmniAI, início"><span className="omni-logo-mark"><Sparkles size={21} strokeWidth={2.2} /></span><span>Omni<span>AI</span></span></a>
          <nav className={`omni-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
            <a href="#sobre" onClick={closeMenu}>Sobre</a><a href="#beneficios" onClick={closeMenu}>Benefícios</a><a href="#integracoes" onClick={closeMenu}>Integrações</a><a href="#exemplos" onClick={closeMenu}>Exemplos</a><a href="#contato" onClick={closeMenu}>Contato</a>
            <a className="omni-mobile-login" href="/login" onClick={closeMenu}>Entrar na plataforma <ArrowUpRight size={16} /></a>
          </nav>
          <a href="/login" className="omni-header-cta">Acessar plataforma <ArrowUpRight size={16} /></a>
          <button type="button" className="omni-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </header>

      <main>
        <section className="omni-hero" id="inicio">
          <div className="omni-hero-glow omni-hero-glow-one" /><div className="omni-hero-glow omni-hero-glow-two" />
          <div className="omni-container omni-hero-grid">
            <div className="omni-hero-copy">
              <span className="omni-eyebrow"><Sparkles size={14} /> INTELIGÊNCIA PARA O SEU NEGÓCIO</span>
              <h1>Seu negócio mais <em>conectado.</em> Seus processos mais <span>inteligentes.</span></h1>
              <p>O OmniAI é uma plataforma em desenvolvimento para reunir operações, organizar atendimentos e transformar tarefas repetitivas em fluxos mais simples e eficientes.</p>
              <div className="omni-hero-actions"><a className="omni-button omni-button-primary" href="#contato">Conheça o OmniAI <ArrowRight size={18} /></a><a className="omni-button omni-button-ghost" href="#exemplos">Veja como funciona <ArrowUpRight size={17} /></a></div>
              <div className="omni-hero-note"><span className="omni-hero-note-icon"><ShieldCheck size={16} /></span> Plataforma multiempresa com autenticação e controle de acesso</div>
            </div>
            <div className="omni-hero-visual" aria-label="Ilustração conceitual do painel OmniAI">
              <div className="omni-visual-orbit orbit-one" /><div className="omni-visual-orbit orbit-two" />
              <div className="omni-dashboard-mock">
                <div className="omni-mock-sidebar"><span className="omni-mock-brand"><Sparkles size={17} /></span><span className="omni-mock-nav-active"><Layers3 size={15} /></span><span><MessageCircle size={15} /></span><span><Workflow size={15} /></span><span><Users size={15} /></span></div>
                <div className="omni-mock-content"><div className="omni-mock-top"><span>Visão geral <small>Prévia ilustrativa</small></span><span className="omni-mock-avatar">OA</span></div><div className="omni-mock-welcome">Tudo em um só lugar <span>✦</span></div><div className="omni-mock-stats"><div><span>Conversas</span><strong>1.284</strong><small>↗ +12,5%</small></div><div><span>Fluxos</span><strong>24</strong><small>↗ +8,2%</small></div></div><div className="omni-mock-chart"><div className="omni-mock-chart-title">Atividade dos processos <span>Últimos 7 dias</span></div><svg viewBox="0 0 320 130" role="img" aria-label="Gráfico ilustrativo de atividade"><defs><linearGradient id="omniGraph" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#A230A4" stopOpacity=".25" /><stop offset="100%" stopColor="#A230A4" stopOpacity="0" /></linearGradient></defs><path d="M0 111 C30 105 40 65 72 83 S120 98 148 62 S195 87 220 46 S272 59 320 12 L320 130 L0 130Z" fill="url(#omniGraph)" /><path d="M0 111 C30 105 40 65 72 83 S120 98 148 62 S195 87 220 46 S272 59 320 12" fill="none" stroke="#A230A4" strokeWidth="3" strokeLinecap="round" /></svg></div></div>
              </div>
              <div className="omni-floating-card omni-floating-card-one"><span className="omni-float-icon"><CheckCircle2 size={18} /></span><span><strong>Fluxo concluído</strong><small>Processo organizado</small></span></div>
              <div className="omni-floating-card omni-floating-card-two"><span className="omni-float-icon omni-float-icon-pink"><Bot size={18} /></span><span><strong>Automação</strong><small>Menos tarefas manuais</small></span></div>
            </div>
          </div>
          <a className="omni-scroll-hint" href="#sobre">Explore a plataforma <ChevronDown size={16} /></a>
        </section>

        <section className="omni-section omni-about" id="sobre"><div className="omni-container omni-about-grid"><div><span className="omni-section-label">01 / SOBRE NÓS</span><h2>Mais clareza para trabalhar. <span>Mais espaço para crescer.</span></h2></div><div className="omni-about-copy"><p>O <strong>OmniAI</strong> nasce da ideia de que a tecnologia deve simplificar a rotina das empresas — e não criar mais complexidade.</p><p>Nossa proposta é conectar informações, pessoas e processos em um ambiente único, com recursos de automação e acompanhamento que evoluirão junto com a plataforma.</p><a href="#beneficios" className="omni-text-link">Descubra os benefícios <ArrowRight size={17} /></a></div></div></section>

        <section className="omni-section omni-benefits" id="beneficios"><div className="omni-container"><div className="omni-section-heading"><span className="omni-section-label">02 / POR QUE O OMNIAI?</span><h2>Menos trabalho manual.<br /><span>Mais possibilidades.</span></h2><p>Uma base pensada para ajudar empresas a organizar sua operação e evoluir seus processos.</p></div><div className="omni-benefits-grid">{benefits.map(({ icon: Icon, title, description }, index) => <article className="omni-benefit-card" key={title}><span className="omni-benefit-index">0{index + 1}</span><span className="omni-benefit-icon"><Icon size={25} strokeWidth={1.7} /></span><h3>{title}</h3><p>{description}</p><span className="omni-benefit-bottom" /></article>)}</div></div></section>

        <section className="omni-section omni-integrations" id="integracoes"><div className="omni-container"><div className="omni-integrations-heading"><div><span className="omni-section-label">03 / CONEXÕES</span><h2>Uma plataforma.<br /><span>Muitas conexões.</span></h2></div><p>Estamos estruturando o OmniAI para integrar canais e sistemas à rotina da sua empresa. Conheça as frentes previstas para a evolução do produto.</p></div><div className="omni-integrations-grid">{integrations.map(({ icon: Icon, title, description, tag }) => <article className="omni-integration-card" key={title}><span className="omni-integration-icon"><Icon size={28} strokeWidth={1.7} /></span><span className="omni-integration-tag">{tag}</span><h3>{title}</h3><p>{description}</p><span className="omni-integration-arrow"><ArrowUpRight size={20} /></span></article>)}</div><p className="omni-disclaimer"><LockKeyhole size={15} /> Disponível atualmente na API: autenticação, gerenciamento de empresas e usuários, permissões e isolamento de dados. As integrações exibidas acima ainda não estão disponíveis para uso.</p></div></section>

        <section className="omni-section omni-examples" id="exemplos"><div className="omni-container"><div className="omni-section-heading"><span className="omni-section-label">04 / NA PRÁTICA</span><h2>Imagine o que sua equipe<br /><span>poderá fazer.</span></h2><p>Exemplos conceituais de fluxos que queremos viabilizar no OmniAI.</p></div><div className="omni-examples-grid">{examples.map(({ number, icon: Icon, title, category, steps }) => <article className="omni-example-card" key={number}><div className="omni-example-top"><span>{number} / {category}</span><Icon size={26} /></div><h3>{title}</h3><ol>{steps.map((step, i) => <li key={step}><span>{i + 1}</span><p>{step}</p></li>)}</ol><div className="omni-example-footer"><span>Exemplo de uso planejado</span><ArrowUpRight size={18} /></div></article>)}</div></div></section>

        <section className="omni-cta"><div className="omni-container omni-cta-inner"><div><span className="omni-section-label">O FUTURO DA SUA OPERAÇÃO</span><h2>Ideias maiores.<br /><em>Processos mais simples.</em></h2><p>Vamos conversar sobre como o OmniAI pode evoluir para atender às necessidades da sua empresa.</p></div><a className="omni-button omni-button-light" href="#contato">Entre em contato <ArrowRight size={18} /></a><Sparkles className="omni-cta-decoration" size={230} strokeWidth={.5} /></div></section>

        <section className="omni-section omni-contact" id="contato"><div className="omni-container omni-contact-grid"><div className="omni-contact-copy"><span className="omni-section-label">05 / CONTATO</span><h2>Vamos construir<br /><span>algo incrível?</span></h2><p>Quer saber mais sobre o projeto, acompanhar sua evolução ou conversar sobre possíveis aplicações? Envie uma mensagem.</p><div className="omni-contact-detail"><span><Mail size={20} /></span><div><strong>Fale com o OmniAI</strong><small>Preencha o formulário ao lado</small></div></div><div className="omni-contact-detail"><span><Building2 size={20} /></span><div><strong>Para empresas de todos os tamanhos</strong><small>Uma solução pensada para crescer com você</small></div></div></div><form className="omni-contact-form" onSubmit={handleContact}><div className="omni-form-heading"><h3>Envie sua mensagem</h3><p>Conte um pouco sobre você e sua empresa.</p></div><div className="omni-form-row"><label>Seu nome<input required maxLength={100} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Como podemos chamar você?" /></label><label>Email profissional<input required type="email" maxLength={160} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="voce@empresa.com" /></label></div><label>Empresa<input maxLength={120} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Nome da sua empresa" /></label><label>Mensagem<textarea required rows={4} maxLength={3000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Como podemos ajudar?" /></label><button type="submit" className="omni-button omni-button-primary omni-contact-submit">Preparar email <Send size={17} /></button>{contactFeedback && <p className="omni-form-feedback" role="status">{contactFeedback}</p>}<p className="omni-form-note">O formulário abre seu aplicativo de email. Nenhum dado é enviado diretamente pelo site.</p></form></div></section>
      </main>
      <footer className="omni-footer"><div className="omni-container omni-footer-top"><div><a href="#inicio" className="omni-logo omni-footer-logo"><span className="omni-logo-mark"><Sparkles size={19} /></span><span>Omni<span>AI</span></span></a><p>Conectando pessoas, processos e possibilidades.</p></div><div className="omni-footer-links"><a href="#sobre">Sobre</a><a href="#beneficios">Benefícios</a><a href="#integracoes">Integrações</a><a href="#contato">Contato</a></div></div><div className="omni-container omni-footer-bottom"><span>© {new Date().getFullYear()} OmniAI. Projeto em desenvolvimento.</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
    </div>
  );
}
