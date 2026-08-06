import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Histórico de mudanças do Sampa Design System: o que existe hoje, e por que ainda não há um changelog publicado.',
};

export default function PaginaChangelog() {
  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Recursos', href: '/recursos/ferramentas' }, { titulo: 'Changelog' }]} />

      <h1>Changelog</h1>
      <p className="wiki-prosa__resumo">
        Ainda não existe changelog publicado. Esta página explica por quê, o que é possível
        acompanhar hoje e o que precisa acontecer para que ela deixe de ser um aviso e passe a ser
        um histórico.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Não há releases</p>
        <p>
          O repositório não tem nenhuma tag git, nenhum arquivo <code>CHANGELOG.md</code> e nenhuma
          versão publicada no npm. Os dois pacotes estão em <code>0.1.0</code> desde o início.
          Publicar um histórico agora seria inventá-lo.
        </p>
      </div>

      <h2 id="o-que-existe">O que dá para acompanhar hoje</h2>
      <div className="wiki-cartoes">
        <a
          className="wiki-cartao"
          href="https://github.com/victorupspace/sggdds/commits/main"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Histórico de commits ↗</span>
          <span className="wiki-cartao__descricao">
            Cada mudança de componente é um commit com o node do Figma que a originou.
          </span>
        </a>
        <a
          className="wiki-cartao"
          href="https://sggdds.vercel.app"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Storybook ↗</span>
          <span className="wiki-cartao__descricao">
            Publica automaticamente a versão mais recente da branch principal.
          </span>
        </a>
      </div>

      <h2 id="infraestrutura">A infraestrutura já existe</h2>
      <p>
        O repositório tem <a href="https://github.com/changesets/changesets" rel="noreferrer noopener" target="_blank">Changesets</a>{' '}
        configurado com acesso público e branch base <code>main</code>, e um workflow de release em{' '}
        <code>.github/workflows/release.yml</code>. Falta apenas a decisão de começar a usar.
      </p>

      <h2 id="o-que-falta">O que precisa ser decidido</h2>
      <ol>
        <li>
          <strong>Marco da primeira versão.</strong> O que precisa estar pronto para chamar de{' '}
          <code>1.0.0</code>.
        </li>
        <li>
          <strong>Ritmo de release.</strong> A cada mudança, quinzenal, ou por marco.
        </li>
        <li>
          <strong>O que entra no changelog público.</strong> Toda mudança, ou só as que afetam quem
          consome.
        </li>
        <li>
          <strong>Política de depreciação.</strong> Quanto tempo um componente marcado como
          depreciado continua funcionando.
        </li>
      </ol>

      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> política de versionamento e primeira release — fonte: time.
        Ver <Link href="/introducao/governanca">Governança</Link>. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
