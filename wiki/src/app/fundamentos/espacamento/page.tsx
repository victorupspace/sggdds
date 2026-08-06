import type { Metadata } from 'next';

import { Trilha } from '@/components/Trilha';
import { EscalaEspacamento, TabelaTokens } from '@/components/TokensVisuais';
import { listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Espaçamento',
  description:
    'Escala de espaçamento do Sampa Design System, como aplicar em densidade de interface e como consumir em Figma e código.',
};

export default function PaginaEspacamento() {
  const tokens = listarTokens();
  const espacos = tokens
    .filter((t) => t.cssVar.startsWith('--ds-primitive-spacing-'))
    .sort((a, b) => Number.parseFloat(a.valorResolvido) - Number.parseFloat(b.valorResolvido));
  const ateSessenta = espacos.filter((t) => Number.parseFloat(t.valorResolvido) <= 64);

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Fundamentos', href: '/fundamentos/visao-geral' }, { titulo: 'Espaçamento' }]}
      />

      <h1>Espaçamento</h1>
      <p className="wiki-prosa__resumo">
        O espaço entre elementos comunica relação: o que está perto pertence ao mesmo grupo, o que
        está longe é outro assunto. A escala do sistema tem {espacos.length} degraus e é a única
        fonte de medidas de respiro da interface.
      </p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Espaçamento inconsistente é o defeito mais comum e mais barato de evitar. Quando cada tela
        escolhe seu próprio respiro, o produto parece montado por pessoas diferentes — e, em
        serviço público, isso corrói a confiança de quem precisa saber que está no site certo.
      </p>

      <h2 id="escala">A escala</h2>
      <p>Barras proporcionais ao valor real de cada token.</p>
      <EscalaEspacamento tokens={ateSessenta} />

      <h2 id="regras">Regras de uso</h2>
      <ul>
        <li>
          <strong>4 e 6</strong> — dentro de um componente, entre ícone e rótulo.
        </li>
        <li>
          <strong>8 e 12</strong> — entre elementos irmãos próximos, como campo e mensagem de ajuda.
        </li>
        <li>
          <strong>16 e 24</strong> — respiro interno de cards, modais e blocos de conteúdo.
        </li>
        <li>
          <strong>32 e 40</strong> — entre seções de uma mesma página.
        </li>
        <li>
          <strong>48 e acima</strong> — separação de blocos maiores e margens de página.
        </li>
      </ul>
      <p>
        Não invente valores intermediários. Se 16 é pouco e 24 é muito, o problema quase sempre está
        no tamanho do conteúdo, não na escala.
      </p>

      <h2 id="densidade">Densidade</h2>
      <p>
        Formulários longos de serviço público pedem densidade menor (mais respiro) porque são
        preenchidos com atenção e, muitas vezes, sob estresse. Painéis internos e tabelas
        operacionais pedem densidade maior, porque quem usa passa o dia ali.
      </p>

      <h2 id="tabela">Todos os tokens</h2>
      <TabelaTokens mostrarOrigem={false} tokens={espacos} />

      <h2 id="uso-codigo">Como usar em código</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`.cartao {
  padding: var(--ds-primitive-spacing-24);
  display: flex;
  flex-direction: column;
  gap: var(--ds-primitive-spacing-12);
}`}</code>
      </pre>
    </div>
  );
}
