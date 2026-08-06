import Link from 'next/link';

import { Busca } from '@/components/Busca';
import { Icone, type NomeDeIcone } from '@/components/IconesHome';
import { MiniaturaComponente } from '@/components/MiniaturaComponente';
import { Revelar } from '@/components/Revelar';
import { listarComponentes, listarTokens, obterConteudoComponente } from '@/lib/dados';

const FIGMA = 'https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components';
const STORYBOOK = 'https://sggdds.vercel.app';

/**
 * Quatro acentos da identidade do Estado de São Paulo. Cada par
 * superfície/tinta foi conferido contra WCAG AA: vermelho 5,14:1,
 * azul 6,97:1, verde 6,58:1, amarelo 4,60:1.
 */
type Acento = 'vermelho' | 'azul' | 'verde' | 'amarelo';

export default function Home() {
  const componentes = listarComponentes();
  const tokens = listarTokens();
  const stories = componentes.reduce((total, c) => total + c.stories.length, 0);

  const numeros: { valor: string; rotulo: string; href: string; icone: NomeDeIcone; acento: Acento }[] =
    [
      {
        valor: String(componentes.length),
        rotulo: 'componentes',
        href: '/componentes/visao-geral',
        icone: 'componentes',
        acento: 'vermelho',
      },
      {
        valor: tokens.length.toLocaleString('pt-BR'),
        rotulo: 'design tokens',
        href: '/fundamentos/tokens',
        icone: 'tokens',
        acento: 'azul',
      },
      {
        valor: '2.193',
        rotulo: 'ícones',
        href: '/fundamentos/iconografia',
        icone: 'icones',
        acento: 'verde',
      },
      {
        valor: String(stories),
        rotulo: 'exemplos interativos',
        href: '/componentes/visao-geral',
        icone: 'exemplos',
        acento: 'amarelo',
      },
    ];

  const trilhas: {
    numero: string;
    titulo: string;
    texto: string;
    href: string;
    chamada: string;
    icone: NomeDeIcone;
    acento: Acento;
  }[] = [
    {
      numero: '01',
      titulo: 'Quem projeta',
      texto:
        'Comece pelos fundamentos, use a biblioteca do Figma e verifique se o componente já existe antes de desenhar um novo.',
      href: '/introducao/fluxo-de-criacao',
      chamada: 'Fluxo de criação',
      icone: 'projeta',
      acento: 'vermelho',
    },
    {
      numero: '02',
      titulo: 'Quem desenvolve',
      texto:
        'Instale a biblioteca, importe os tokens e confira o comportamento real de cada componente no Storybook.',
      href: '/introducao/fluxo-de-desenvolvimento',
      chamada: 'Fluxo de desenvolvimento',
      icone: 'desenvolve',
      acento: 'azul',
    },
    {
      numero: '03',
      titulo: 'Quem escreve',
      texto:
        'Padrões de escrita, vocabulário controlado e as regras de microcopy que valem dentro de cada componente.',
      href: '/conteudo/writing',
      chamada: 'Padrões de escrita',
      icone: 'escreve',
      acento: 'verde',
    },
    {
      numero: '04',
      titulo: 'Quem contrata e gere',
      texto:
        'O que é obrigatório entregar, como validar conformidade e como o sistema reduz custo de manutenção.',
      href: '/recursos/faq',
      chamada: 'Perguntas frequentes',
      icone: 'contrata',
      acento: 'amarelo',
    },
  ];

  // Amostra tirada dos dados reais, não de uma lista fixa. São os oito
  // componentes que têm miniatura desenhada, cobrindo as cinco categorias.
  const destaques = [
    'button',
    'text-input',
    'alert',
    'card',
    'breadcrumb',
    'checkbox',
    'data-table',
    'modal',
  ]
    .map((slug) => {
      const componente = componentes.find((c) => c.slug === slug);
      if (!componente) return null;
      const conteudo = obterConteudoComponente(slug);
      return {
        slug,
        nome: componente.name,
        categoria: conteudo?.categoria ?? '',
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const estado: { titulo: string; texto: string; icone: NomeDeIcone; acento: Acento }[] = [
    {
      titulo: 'Verificado contra o código',
      texto:
        'Toda prop, token e exemplo desta documentação é conferido automaticamente contra o código-fonte a cada publicação. Se o código muda e a documentação não, a verificação falha.',
      icone: 'verificado',
      acento: 'azul',
    },
    {
      titulo: 'Acessibilidade medida, não afirmada',
      texto:
        'As 86 páginas passam por auditoria automatizada com axe em navegador real, e a matriz de contraste da paleta é calculada a cada build.',
      icone: 'acessibilidade',
      acento: 'verde',
    },
    {
      titulo: 'Pendências à vista',
      texto:
        'Governança, versionamento e canais de suporte ainda dependem de definição. Cada pendência aparece na própria página em que faria falta.',
      icone: 'pendencias',
      acento: 'amarelo',
    },
  ];

  return (
    <div className="wiki-home">
      {/* ── Abertura ──────────────────────────────────────────────────── */}
      <Revelar aoCarregar className="wiki-home__capa" intervalo={0.07}>
        <div className="wiki-home__capa-texto">
          <p className="wiki-home__orgao" data-revelar>
            Governo do Estado de São Paulo · Prodesp
          </p>

          <h1 className="wiki-home__titulo" data-revelar>
            Sampa
            <br />
            Design System
          </h1>

          <p className="wiki-home__descricao" data-revelar>
            A documentação oficial do sistema de design dos serviços digitais do Estado. Reúne em um
            só lugar o que hoje está espalhado entre a biblioteca do Figma e o Storybook:
            fundamentos, componentes, padrões de uso e recursos de apoio.
          </p>

          <div className="wiki-home__busca" data-revelar>
            <Busca
              dica="Buscar componente, token ou padrão…"
              rotulo="Buscar na documentação"
              tamanho="grande"
            />
          </div>

          <div className="wiki-home__fontes" data-revelar>
            <a href={FIGMA} rel="noreferrer noopener" target="_blank">
              Biblioteca no Figma
              <Icone nome="externo" />
            </a>
            <a href={STORYBOOK} rel="noreferrer noopener" target="_blank">
              Storybook
              <Icone nome="externo" />
            </a>
          </div>
        </div>

        {/* Vitrine: os próprios componentes do sistema, à vista já na abertura. */}
        <div className="wiki-home__vitrine" data-revelar>
          {['button', 'alert', 'checkbox', 'text-input'].map((slug) => (
            <span className="wiki-home__vitrine-peca" key={slug}>
              <MiniaturaComponente slug={slug} />
            </span>
          ))}
        </div>
      </Revelar>

      {/* ── Números ───────────────────────────────────────────────────── */}
      <Revelar className="wiki-home__numeros" intervalo={0.05}>
        {numeros.map((n) => (
          <Link
            className={`wiki-home__numero wiki-home__numero--${n.acento}`}
            data-revelar
            href={n.href}
            key={n.rotulo}
          >
            <span className="wiki-home__numero-icone">
              <Icone nome={n.icone} />
            </span>
            <span className="wiki-home__numero-valor">{n.valor}</span>
            <span className="wiki-home__numero-rotulo">{n.rotulo}</span>
          </Link>
        ))}
      </Revelar>

      {/* ── Trilhas por perfil ────────────────────────────────────────── */}
      <section className="wiki-home__secao">
        <header className="wiki-home__secao-cabecalho">
          <h2 className="wiki-home__secao-titulo" id="por-onde-comecar">
            Por onde começar
          </h2>
          <p className="wiki-home__secao-apoio">
            O sistema serve a quatro perfis, e cada um entra por uma porta diferente.
          </p>
        </header>

        <Revelar className="wiki-home__trilhas" intervalo={0.06}>
          {trilhas.map((t) => (
            <Link
              className={`wiki-home__trilha wiki-home__trilha--${t.acento}`}
              data-revelar
              href={t.href}
              key={t.numero}
            >
              <span className="wiki-home__trilha-topo">
                <span className="wiki-home__trilha-icone">
                  <Icone nome={t.icone} />
                </span>
                <span className="wiki-home__trilha-numero">{t.numero}</span>
              </span>
              <span className="wiki-home__trilha-titulo">{t.titulo}</span>
              <span className="wiki-home__trilha-texto">{t.texto}</span>
              <span className="wiki-home__trilha-chamada">
                {t.chamada}
                <Icone nome="seta" />
              </span>
            </Link>
          ))}
        </Revelar>
      </section>

      {/* ── Vitrine de componentes ────────────────────────────────────── */}
      <section className="wiki-home__secao wiki-home__secao--vitrine">
        <header className="wiki-home__secao-cabecalho">
          <h2 className="wiki-home__secao-titulo" id="componentes">
            {componentes.length} componentes documentados
          </h2>
          <p className="wiki-home__secao-apoio">
            Cada página traz três abas: quando usar, diretrizes de design e referência técnica — com
            o componente rodando de verdade dentro da página.
          </p>
        </header>

        <Revelar className="wiki-home__destaques" intervalo={0.05}>
          {destaques.map((c) => (
            <Link
              className="wiki-home__destaque"
              data-revelar
              href={`/componentes/${c.slug}`}
              key={c.slug}
            >
              <span className="wiki-home__destaque-palco">
                <MiniaturaComponente slug={c.slug} />
              </span>
              <span className="wiki-home__destaque-rodape">
                <span className="wiki-home__destaque-nome">{c.nome}</span>
                <span className="wiki-home__destaque-categoria">{c.categoria}</span>
              </span>
            </Link>
          ))}
        </Revelar>

        <Link className="wiki-home__link-forte" href="/componentes/visao-geral">
          Ver o catálogo completo
          <Icone nome="seta" />
        </Link>
      </section>

      {/* ── Estado do sistema ─────────────────────────────────────────── */}
      <section className="wiki-home__secao wiki-home__secao--estado">
        <header className="wiki-home__secao-cabecalho">
          <h2 className="wiki-home__secao-titulo" id="estado">
            O estado real do sistema
          </h2>
          <p className="wiki-home__secao-apoio">
            Esta documentação mostra o que está pronto e o que ainda não está. Onde falta decisão,
            existe um aviso na página — nunca um texto inventado para preencher a lacuna.
          </p>
        </header>

        <Revelar className="wiki-home__estado" intervalo={0.06}>
          {estado.map((e) => (
            <div className={`wiki-home__estado-item wiki-home__estado-item--${e.acento}`} data-revelar key={e.titulo}>
              <span className="wiki-home__estado-icone">
                <Icone nome={e.icone} />
              </span>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </div>
          ))}
        </Revelar>
      </section>

      {/* ── Contribuição ──────────────────────────────────────────────── */}
      <section className="wiki-home__chamada">
        <div className="wiki-home__chamada-texto">
          <h2 className="wiki-home__chamada-titulo" id="contribuir">
            Falta alguma coisa?
          </h2>
          <p>
            Se você não encontrou o que precisava, isso é uma falha da documentação — e vale
            registrar. Propostas de componente, correções e dúvidas entram pelo mesmo caminho.
          </p>
        </div>
        <div className="wiki-home__chamada-acoes">
          <Link className="wiki-home__botao" href="/introducao/contribua">
            Como contribuir
          </Link>
          <Link className="wiki-home__botao wiki-home__botao--discreto" href="/recursos/suporte">
            Pedir ajuda
          </Link>
        </div>
      </section>
    </div>
  );
}
