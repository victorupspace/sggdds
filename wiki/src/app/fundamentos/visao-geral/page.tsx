import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarTokens, metaTokens } from '@/lib/dados';
import { NAV_ESTATICA } from '@/lib/nav';

export const metadata: Metadata = {
  title: 'Fundamentos',
  description:
    'O que são os fundamentos do Sampa Design System, por que eles vêm antes dos componentes e o que cada uma das páginas da seção resolve.',
};

/** Uma frase por página. As rotas vêm de NAV_ESTATICA — nenhuma é escrita aqui. */
const DESCRICOES: Record<string, string> = {
  '/fundamentos/tokens':
    'O que é um token, como as camadas se encadeiam e como o mesmo valor viaja do Figma até o CSS.',
  '/fundamentos/cor':
    'Marca, neutras e utilitárias, com a matriz de contraste WCAG calculada sobre o valor real de cada token.',
  '/fundamentos/tipografia':
    'Plus Jakarta Sans como única família: escala de tamanhos, pesos, altura de linha e regras de leitura.',
  '/fundamentos/espacamento':
    'A escala de respiro da interface e o que cada degrau significa em densidade.',
  '/fundamentos/grid-e-layout':
    'Colunas, margens e pontos de quebra — incluindo as três respostas divergentes que o sistema dá hoje sobre breakpoints.',
  '/fundamentos/iconografia':
    'Os 2.193 ícones do sistema, a convenção de nome do Material Symbols e o que ainda não está declarado sobre licença.',
  '/fundamentos/logo-e-marca':
    'O vetor oficial, as versões para fundo claro e escuro e o limite de uso do vermelho da marca.',
  '/fundamentos/elevacao-e-sombra':
    'Os seis níveis de sombra, o que cada um comunica e por que eles só existem no código.',
  '/fundamentos/borda-e-raio':
    'Cinco degraus de raio e quatro larguras de borda: quando cada um se aplica e o que não misturar.',
  '/fundamentos/motion':
    'Duração, atraso e o defeito de origem que hoje deixa o movimento sem unidade e sem easing.',
  '/fundamentos/acessibilidade':
    'O que o sistema já garante, o que depende de quem implementa e o que ainda não foi decidido.',
};

const DECISOES_ABERTAS: { fundamento: string; emAberto: string }[] = [
  {
    fundamento: 'Grid e layout',
    emAberto:
      'Três definições de breakpoint convivem: os tokens bp-xs/sm/md/lg, o CSS real dos componentes e a página Grids do Storybook. Nenhuma foi eleita a oficial.',
  },
  {
    fundamento: 'Grid e layout',
    emAberto:
      'Não existe token de largura máxima de container nem regra publicada de centralização de página.',
  },
  {
    fundamento: 'Elevação e sombra',
    emAberto:
      'Os seis tokens de sombra vêm de web-extras.tokens.json, que existe só no código e não tem collection no Figma.',
  },
  {
    fundamento: 'Motion',
    emAberto:
      'As durações apontam no Figma para variables de espaçamento e saem como número sem unidade. Não existe nenhum token de easing.',
  },
  {
    fundamento: 'Iconografia',
    emAberto:
      'A licença dos ícones não está declarada em lugar nenhum, e 135 ícones gravam o peso como "300.svg" em vez de "300".',
  },
  {
    fundamento: 'Logo e marca',
    emAberto:
      'Não existe manual de marca: nem área de proteção, nem versão monocromática, nem regra de tamanho mínimo.',
  },
  {
    fundamento: 'Cor',
    emAberto:
      'Dois vermelhos de marca convivem. #FF161F não atinge AA para texto normal; #C50007 atinge. A separação entre marca gráfica e texto precisa ser confirmada pelo time.',
  },
  {
    fundamento: 'Acessibilidade',
    emAberto:
      'O nível de conformidade WCAG assumido pelo sistema não está declarado, e três fontes internas divergem.',
  },
];

export default function PaginaFundamentos() {
  const tokens = listarTokens();
  const meta = metaTokens() as {
    colecoes: { arquivo: string; camada: string; tokenCount: number }[];
  };

  const grupo = NAV_ESTATICA.find((g) => g.titulo === 'Fundamentos');
  const paginas = (grupo?.itens ?? []).filter((i) => i.href !== '/fundamentos/visao-geral');
  const totalPaginas = grupo?.itens.length ?? 0;

  const camadas = new Set(tokens.map((t) => t.camada)).size;
  const cores = tokens.filter((t) => t.tipo === 'color').length;
  const medidas = tokens.filter((t) => t.tipo === 'dimension').length;

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Fundamentos' }]} />

      <h1>Fundamentos</h1>
      <p className="wiki-prosa__resumo">
        Fundamentos são as decisões que valem para tudo: cor, tipografia, espaço, borda, sombra,
        movimento, ícone e marca. Eles não desenham nenhuma tela sozinhos — mas nenhuma tela do
        Sampa Design System existe sem eles. Todo componente do sistema é uma combinação dessas
        decisões.
      </p>

      <h2 id="o-que-sao">O que são fundamentos</h2>
      <p>
        Um fundamento é uma escolha feita uma vez e reutilizada em todo lugar. Qual é o vermelho do
        Estado. Qual é a família tipográfica. Quanto respiro separa dois blocos. Qual raio arredonda
        um card. Cada uma dessas respostas está guardada como <strong>token</strong> — um valor com
        nome — e é o token, não o valor literal, que entra no Figma e no código.
      </p>
      <p>
        A consequência prática é direta: quem constrói uma tela não escolhe medidas, escolhe
        significados. Em vez de decidir se este cinza é <code>#f5f5f5</code> ou{' '}
        <code>#f0f0f0</code>, a pessoa aplica <code>color/border/neutral/default</code> e segue.
      </p>

      <h2 id="por-que-antes">Por que vêm antes dos componentes</h2>
      <p>
        Componente é consequência, não ponto de partida. O botão do sistema não tem uma altura
        própria: ele tem a altura que a escala de espaçamento define. Não tem uma cor própria: usa a
        cor semântica de marca. Não tem um raio próprio: usa um degrau da escala de raio. Trocar um
        fundamento propaga para todos os componentes de uma vez; trocar componente por componente
        não propaga para lugar nenhum.
      </p>
      <p>
        Ler os fundamentos antes também evita o erro mais caro do sistema, que é inventar um valor
        intermediário porque a escala pareceu não servir. Quando a escala não serve, o problema
        quase sempre está no conteúdo ou na hierarquia — e essa conversa é diferente de escolher um
        número novo.
      </p>

      <h2 id="inventario">O inventário</h2>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{tokens.length.toLocaleString('pt-BR')}</span>
          <span className="wiki-numero__rotulo">tokens publicados</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{meta.colecoes.length}</span>
          <span className="wiki-numero__rotulo">coleções de origem</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{camadas}</span>
          <span className="wiki-numero__rotulo">camadas de token</span>
        </div>
      </div>
      <p>
        Desses {tokens.length.toLocaleString('pt-BR')} tokens, {cores.toLocaleString('pt-BR')} são
        de cor e {medidas.toLocaleString('pt-BR')} são medidas — tamanho, espaço, raio, largura de
        borda e duração. O detalhamento de cada coleção está em{' '}
        <Link href="/fundamentos/tokens">Design tokens</Link>.
      </p>

      <h2 id="paginas">As páginas desta seção</h2>
      <p>
        A seção tem {totalPaginas} páginas: esta visão geral e mais {paginas.length} fundamentos.
        Cada uma documenta os tokens reais daquele assunto, as regras de uso e as decisões que ainda
        estão em aberto.
      </p>
      <div className="wiki-cartoes">
        {paginas.map((pagina) => (
          <Link className="wiki-cartao" href={pagina.href} key={pagina.href}>
            <span className="wiki-cartao__titulo">{pagina.titulo}</span>
            <span className="wiki-cartao__descricao">{DESCRICOES[pagina.href] ?? ''}</span>
          </Link>
        ))}
      </div>

      <h2 id="ordem-de-leitura">Em que ordem ler</h2>
      <p>
        Se você está chegando agora, comece por{' '}
        <Link href="/fundamentos/tokens">Design tokens</Link>: sem entender a cadeia de camadas, as
        outras páginas viram listas de valores. Depois siga por{' '}
        <Link href="/fundamentos/cor">Cor</Link>,{' '}
        <Link href="/fundamentos/tipografia">Tipografia</Link> e{' '}
        <Link href="/fundamentos/espacamento">Espaçamento</Link>, que respondem por quase toda a
        aparência de uma tela. As demais páginas podem ser consultadas por demanda.
      </p>

      <h2 id="regra">A regra que vale para todos</h2>
      <p>
        Nenhum valor de cor, medida, raio ou tipografia é escrito à mão — nem no Figma, nem no
        código. Se o valor de que você precisa não existe como token, isso não autoriza inventá-lo:
        é sinal de que falta uma decisão de sistema. O caminho é registrar a lacuna e pedir a
        decisão, não contornar.
      </p>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Fundamento não é sugestão</p>
        <p>
          Fornecedores contratados e times de produto consomem os mesmos tokens que os componentes
          do sistema consomem. Uma tela que usa valores próprios pode até parecer correta isolada,
          mas quebra no primeiro ajuste de identidade — e obriga alguém a caçar valores literais
          espalhados por vários repositórios.
        </p>
      </div>

      <h2 id="decisoes-abertas">O que ainda não está decidido</h2>
      <p>
        Esta documentação registra o sistema como ele é hoje, não como gostaríamos que fosse. As
        divergências abaixo são reais e afetam quem constrói agora. Cada uma está registrada em{' '}
        <code>LACUNAS.md</code> (o que falta) ou <code>INCONSISTENCIAS.md</code> (o que diverge).
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Decisões em aberto nos fundamentos
          </caption>
          <thead>
            <tr>
              <th scope="col">Fundamento</th>
              <th scope="col">Decisão em aberto</th>
            </tr>
          </thead>
          <tbody>
            {DECISOES_ABERTAS.map((d) => (
              <tr key={d.emAberto}>
                <td>
                  <strong>{d.fundamento}</strong>
                </td>
                <td>{d.emAberto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o compromisso de nível de conformidade WCAG do Sampa Design
        System não está declarado em nenhum documento oficial, e três fontes internas divergem sobre
        ele. Enquanto isso não for decidido, esta wiki reporta as razões de contraste medidas e a
        classificação WCAG 2.1 de cada par, sem afirmar um nível de conformidade do sistema — fonte:
        time. Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
