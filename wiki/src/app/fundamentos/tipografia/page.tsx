import type { Metadata } from 'next';

import { Trilha } from '@/components/Trilha';
import { EspecimeTipografico, TabelaTokens } from '@/components/TokensVisuais';
import { listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Tipografia',
  description:
    'Plus Jakarta Sans é a única família do Sampa Design System. Escala, pesos, altura de linha e regras de uso responsivo.',
};

export default function PaginaTipografia() {
  const tokens = listarTokens();
  const tamanhos = tokens
    .filter((t) => t.cssVar.startsWith('--ds-primitive-typography-font-size-'))
    .sort((a, b) => Number.parseFloat(a.valorResolvido) - Number.parseFloat(b.valorResolvido));
  const pesos = tokens.filter((t) => t.cssVar.startsWith('--ds-primitive-typography-font-weight-'));
  const alturas = tokens.filter((t) => t.cssVar.startsWith('--ds-primitive-typography-line-height-'));
  const familias = tokens.filter((t) => t.cssVar.includes('font-family'));

  const amostras = [
    { rotulo: 'Display', tamanho: '40px', peso: '600', exemplo: 'Agende seu atendimento' },
    { rotulo: 'Título 1', tamanho: '30px', peso: '600', exemplo: 'Consulta de protocolo' },
    { rotulo: 'Título 2', tamanho: '22px', peso: '600', exemplo: 'Documentos necessários' },
    { rotulo: 'Título 3', tamanho: '18px', peso: '600', exemplo: 'Antes de começar' },
    {
      rotulo: 'Corpo',
      tamanho: '16px',
      peso: '500',
      exemplo:
        'Leve um documento oficial com foto no dia do atendimento. Sem ele, não é possível concluir o serviço.',
    },
    {
      rotulo: 'Apoio',
      tamanho: '14px',
      peso: '500',
      exemplo: 'O prazo de análise é de até 5 dias úteis.',
    },
    { rotulo: 'Legenda', tamanho: '12px', peso: '500', exemplo: 'Atualizado em 6 de agosto de 2026' },
  ];

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Fundamentos', href: '/fundamentos/visao-geral' }, { titulo: 'Tipografia' }]}
      />

      <h1>Tipografia</h1>
      <p className="wiki-prosa__resumo">
        O Sampa Design System usa <strong>uma única família tipográfica: Plus Jakarta Sans</strong>.
        Uma só família reduz o peso da página, elimina inconsistência entre produtos e torna a
        leitura previsível para quem navega entre serviços diferentes do Estado.
      </p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Serviço público é lido com pressa, em celular, muitas vezes por quem tem baixa visão ou
        pouca familiaridade com interfaces. Texto pequeno demais, entrelinha apertada ou hierarquia
        confusa não são problemas estéticos: são barreiras de acesso a um direito.
      </p>

      <h2 id="familia">A família</h2>
      <TabelaTokens mostrarOrigem={false} tokens={familias} />
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Nenhuma outra família é permitida</p>
        <p>
          Ocorrências de Inter encontradas em componentes do Figma foram normalizadas para Plus
          Jakarta Sans na implementação. Rawline não é usada em nenhuma parte do sistema. Se um
          arquivo do Figma apresentar outra família, isso é um defeito a corrigir na origem.
        </p>
      </div>

      <h2 id="especime">Espécime</h2>
      <p>Renderizado com a fonte real, nos tamanhos que o sistema publica.</p>
      <EspecimeTipografico amostras={amostras} />

      <h2 id="escala">Escala de tamanhos</h2>
      <p>
        {tamanhos.length} tamanhos publicados, de {tamanhos[0]?.valorResolvido} a{' '}
        {tamanhos[tamanhos.length - 1]?.valorResolvido}. Use os tamanhos como degraus: não crie
        valores intermediários.
      </p>
      <TabelaTokens tokens={tamanhos} />

      <h2 id="pesos">Pesos</h2>
      <p>
        Regra prática: <strong>600 para títulos</strong>, <strong>500 para corpo e rótulos</strong>,{' '}
        400 apenas para textos longos de leitura corrida. Peso 700 fica reservado para ênfase
        pontual dentro de um título.
      </p>
      <TabelaTokens tokens={pesos} />

      <h2 id="alturas">Altura de linha</h2>
      <TabelaTokens tokens={alturas} />

      <h2 id="regras">Regras de uso</h2>
      <ul>
        <li>
          Nunca reduza o corpo de texto abaixo de 14px. O padrão de leitura é 16px.
        </li>
        <li>
          Limite a largura da linha entre 45 e 75 caracteres. Linhas muito longas fazem o olho
          perder a próxima linha.
        </li>
        <li>
          Um título não deve depender só de tamanho: use peso e espaço acima para marcar hierarquia.
        </li>
        <li>
          Não use caixa alta em frases inteiras — apenas em rótulos curtos, e com espaçamento entre
          letras.
        </li>
        <li>
          Não centralize texto corrido. Alinhamento à esquerda é mais fácil de ler.
        </li>
      </ul>

      <h2 id="responsivo">Comportamento responsivo</h2>
      <p>
        Títulos grandes reduzem em telas estreitas; o corpo de texto não muda. Na própria Wiki, o
        título principal cai de 44px para 32px abaixo de 640px, enquanto o corpo permanece em 16px.
      </p>

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        Os estilos de texto estão na biblioteca <strong>Foundations</strong>. Aplique o estilo, não
        o tamanho solto — assim a mudança de escala se propaga.
      </p>

      <h2 id="uso-codigo">Como usar em código</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`.titulo-secao {
  font-family: var(--ds-primitive-typography-font-family-plus-jakarta-sans);
  font-size: var(--ds-primitive-typography-font-size-22);
  font-weight: var(--ds-primitive-typography-font-weight-semi-bold);
  line-height: var(--ds-primitive-typography-line-height-28);
}`}</code>
      </pre>

      <h2 id="pendencias">Pendência conhecida</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe uma escala tipográfica composta publicada (display,
        heading, body, label, caption) ligando tamanho, peso e altura de linha em estilos nomeados —
        fonte: time. Os {tamanhos.length} tamanhos existem soltos. As agrupações mostradas no
        espécime acima são uma proposta desta documentação, não uma definição oficial. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
