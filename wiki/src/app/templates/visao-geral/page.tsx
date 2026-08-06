import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarComponentes } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Templates',
  description:
    'O que é um template no Sampa Design System, como ele se diferencia de um padrão e de um componente, a moldura de página comum aos quatro templates e o índice deles.',
};

interface CartaoTemplate {
  titulo: string;
  href: string;
  descricao: string;
}

const TEMPLATES: CartaoTemplate[] = [
  {
    titulo: 'Landing de serviço',
    href: '/templates/landing-de-servico',
    descricao:
      'A porta de entrada: o que é o serviço, quem pode usar, que documentos são necessários e um único caminho para começar.',
  },
  {
    titulo: 'Página de serviço',
    href: '/templates/pagina-de-servico',
    descricao:
      'O serviço em si: passo a passo da solicitação, situação da etapa atual e acompanhamento por protocolo.',
  },
  {
    titulo: 'Formulário longo',
    href: '/templates/formulario-longo',
    descricao:
      'Várias etapas com stepper, salvamento a cada etapa, revisão antes do envio e comprovante no fim.',
  },
  {
    titulo: 'Painel',
    href: '/templates/painel',
    descricao:
      'Acompanhar muitos registros: filtros, tabela de dados, paginação e os estados de carregamento, vazio e erro.',
  },
];

const CAMADAS: { camada: string; pergunta: string; entrega: string; onde: string }[] = [
  {
    camada: 'Componente',
    pergunta: 'Com que peça eu construo?',
    entrega: 'Uma peça com props, estados e testes.',
    onde: 'Existe em código, no Figma e no Storybook. É instalável.',
  },
  {
    camada: 'Padrão',
    pergunta: 'Como eu resolvo esta situação?',
    entrega: 'A sequência de peças e as decisões que valem sempre.',
    onde: 'Existe só como documentação. Não é instalável, é seguido.',
  },
  {
    camada: 'Template',
    pergunta: 'Como fica a página inteira?',
    entrega: 'O arranjo das regiões da página, do cabeçalho ao rodapé.',
    onde: 'Existe só como documentação. Combina padrões e componentes numa página.',
  },
];

interface RegiaoMoldura {
  regiao: string;
  papel: string;
}

// Tupla de tamanho fixo: a tabela abaixo indexa MOLDURA[0..5] diretamente,
// então o tipo precisa garantir as seis posições em vez de um array solto.
const MOLDURA: [
  RegiaoMoldura,
  RegiaoMoldura,
  RegiaoMoldura,
  RegiaoMoldura,
  RegiaoMoldura,
  RegiaoMoldura,
] = [
  {
    regiao: 'Cabeçalho',
    papel:
      'Identifica o Estado e o portal, e concentra a navegação principal e o acesso à conta. É o mesmo em todas as páginas do serviço.',
  },
  {
    regiao: 'Trilha de navegação',
    papel:
      'Diz onde a pessoa está e como voltar. Aparece em toda página que não seja a raiz do serviço.',
  },
  {
    regiao: 'Conteúdo',
    papel: 'A única região que muda de template para template. É o que cada página desta seção descreve.',
  },
  {
    regiao: 'Rodapé',
    papel:
      'Fecha a página com navegação secundária, links legais, redes sociais e a informação institucional.',
  },
  {
    regiao: 'Retorno ao topo',
    papel: 'Aparece depois de uma rolagem longa e devolve a pessoa ao começo sem perder o contexto.',
  },
  {
    regiao: 'Aviso de cookies',
    papel: 'Comunica o uso de cookies na primeira visita, com aceite e gerenciamento de preferências.',
  },
];

export default function PaginaVisaoGeralTemplates() {
  const componentes = listarComponentes();

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Templates' }]} />

      <h1>Templates</h1>
      <p className="wiki-prosa__resumo">
        Um template é o arranjo de uma página inteira: quais regiões existem, em que ordem elas
        aparecem e quais dos {componentes.length} componentes entram em cada uma. Ele não entrega
        código novo — mostra como os padrões já documentados se encaixam numa tela real, do
        cabeçalho ao rodapé.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Toda esta seção é conteúdo novo</p>
        <p>
          Não existe hoje nenhum template documentado no Sampa Design System — nem no Figma, nem no
          Storybook, nem em documento interno. Os quatro templates abaixo são proposta desta
          documentação, escrita a partir da API real dos componentes, e precisam ser validados pelo
          time antes de virar norma. Enquanto isso não acontece, cada página traz o selo{' '}
          <span className="wiki-selo wiki-selo--rascunho">rascunho para validação</span>.
        </p>
      </div>

      <h2 id="o-que-e">O que é um template</h2>
      <p>
        Componente responde “com que peça eu construo”. Padrão responde “como eu resolvo esta
        situação”. Template responde <strong>“como fica a página inteira”</strong>. É a pergunta que
        aparece na hora de abrir o Figma: existe um formulário, existe uma tabela, existe um aviso —
        e agora, o que vem primeiro?
      </p>
      <p>
        Um template descreve três coisas. As <strong>regiões</strong> da página, na ordem vertical em
        que a pessoa as encontra. O <strong>conteúdo</strong> de cada região, dito em linguagem de
        serviço, não de layout. E os <strong>componentes</strong> que montam cada região, com link
        para a página de cada um. Nada além disso: template não define cor, não define espaçamento e
        não cria prop nova.
      </p>

      <h2 id="camadas">Template, padrão e componente</h2>
      <p>
        As três camadas se empilham. Um template usa padrões; um padrão usa componentes; um
        componente usa tokens. Em caso de dúvida sobre onde documentar algo, use a pergunta da
        segunda coluna.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Diferença entre componente, padrão e template
          </caption>
          <thead>
            <tr>
              <th scope="col">Camada</th>
              <th scope="col">Responde a</th>
              <th scope="col">O que entrega</th>
              <th scope="col">Onde vive</th>
            </tr>
          </thead>
          <tbody>
            {CAMADAS.map((linha) => (
              <tr key={linha.camada}>
                <th scope="row">{linha.camada}</th>
                <td>{linha.pergunta}</td>
                <td>{linha.entrega}</td>
                <td>{linha.onde}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Um template não substitui os <Link href="/padroes/visao-geral">padrões</Link>. Ele diz que a
        região “formulário” existe e onde ela fica; as regras de validação, rótulo e mensagem de
        erro continuam em <Link href="/padroes/formularios">Formulários</Link>. Ler o template sem
        ler o padrão produz uma página bem organizada e mal escrita.
      </p>

      <h2 id="lista">Os quatro templates</h2>
      <p>
        Eles cobrem a jornada de um serviço na ordem em que ela acontece: a pessoa descobre o
        serviço, entra nele, preenche o que for pedido e depois acompanha o que enviou.
      </p>
      <div className="wiki-cartoes">
        {TEMPLATES.map((template) => (
          <Link className="wiki-cartao" href={template.href} key={template.href}>
            <span className="wiki-cartao__titulo">{template.titulo}</span>
            <span className="wiki-cartao__descricao">{template.descricao}</span>
          </Link>
        ))}
      </div>

      <h2 id="moldura">A moldura comum</h2>
      <p>
        Os quatro templates compartilham a mesma moldura. Só a região de conteúdo muda. Descrever a
        moldura uma vez aqui evita repetir a mesma tabela quatro vezes e deixa claro o que{' '}
        <strong>não</strong> é decisão de cada página.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Regiões comuns aos quatro templates e o papel de cada uma
          </caption>
          <thead>
            <tr>
              <th scope="col">Região</th>
              <th scope="col">Papel</th>
              <th scope="col">Componente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{MOLDURA[0].regiao}</th>
              <td>{MOLDURA[0].papel}</td>
              <td>
                <Link href="/componentes/header">Header</Link>, com{' '}
                <Link href="/componentes/meganav">Meganav</Link> quando há muitas áreas
              </td>
            </tr>
            <tr>
              <th scope="row">{MOLDURA[1].regiao}</th>
              <td>{MOLDURA[1].papel}</td>
              <td>
                <Link href="/componentes/breadcrumb">Breadcrumb</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">{MOLDURA[2].regiao}</th>
              <td>{MOLDURA[2].papel}</td>
              <td>varia por template</td>
            </tr>
            <tr>
              <th scope="row">{MOLDURA[3].regiao}</th>
              <td>{MOLDURA[3].papel}</td>
              <td>
                <Link href="/componentes/footer">Footer</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">{MOLDURA[4].regiao}</th>
              <td>{MOLDURA[4].papel}</td>
              <td>
                <Link href="/componentes/back-to-top">BackToTop</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">{MOLDURA[5].regiao}</th>
              <td>{MOLDURA[5].papel}</td>
              <td>
                <Link href="/componentes/cookie-consent-banner">CookieConsentBanner</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        O Header e o Footer trazem conteúdo padrão quando as props não são informadas — quatro itens
        de navegação de exemplo, itens utilitários de busca, tradução e acessibilidade, e quatro
        seções de rodapé. <strong>Esse conteúdo padrão é demonstração</strong>: um serviço real
        precisa passar <code>navigationItems</code>, <code>utilityItems</code> e{' '}
        <code>sections</code> com o conteúdo dele.
      </p>

      <h2 id="estrutura">Como cada página é organizada</h2>
      <p>As quatro páginas seguem a mesma ordem, para que dê para pular direto ao trecho útil:</p>
      <ol>
        <li>
          <strong>Para que serve</strong> — a situação em que este arranjo é o certo, e aquela em
          que ele é o errado.
        </li>
        <li>
          <strong>Estrutura da página</strong> — a tabela de regiões, na ordem vertical, com o
          conteúdo e os componentes de cada uma.
        </li>
        <li>
          <strong>Grade e responsividade</strong> — como o arranjo se comporta ao estreitar a tela,
          usando os pontos de quebra que os componentes realmente implementam.
        </li>
        <li>
          <strong>Variações</strong> — as versões legítimas do mesmo template e o que muda em cada
          uma.
        </li>
        <li>
          <strong>Erros comuns</strong> — o que costuma dar errado, o efeito e a correção.
        </li>
      </ol>

      <h2 id="como-usar">Como usar um template</h2>
      <ul>
        <li>
          <strong>Comece pela tabela de estrutura.</strong> Escreva o conteúdo de cada região antes
          de desenhar qualquer coisa. Se uma região fica vazia, ela não entra na página.
        </li>
        <li>
          <strong>Não invente região.</strong> Se o seu serviço precisa de algo que não está na
          tabela, isso é um sinal: ou cabe numa região existente, ou é assunto para o time.
        </li>
        <li>
          <strong>Leia o padrão citado.</strong> O template posiciona o formulário; quem manda no
          formulário é <Link href="/padroes/formularios">Formulários</Link>.
        </li>
        <li>
          <strong>Um objetivo por página.</strong> Toda página desta seção tem uma ação principal.
          Duas ações primárias competindo é o defeito mais comum de composição.
        </li>
        <li>
          <strong>Verifique no estreito primeiro.</strong> A moldura muda em 768px (Header) e em
          720px (Footer); a região de conteúdo muda em pontos próprios de cada componente.
        </li>
      </ul>

      <h2 id="acessibilidade">O que a composição precisa garantir</h2>
      <p>
        Estes pontos não são resolvidos por nenhum componente isolado — só existem quando a página
        inteira é montada:
      </p>
      <ul>
        <li>
          <strong>Um <code>h1</code> por página</strong>, e a hierarquia de títulos sem pular nível.
          Hero, Card e ActionCard têm prop de nível de título justamente para isso:{' '}
          <code>headingLevel</code>.
        </li>
        <li>
          <strong>Ordem do DOM igual à ordem visual.</strong> Ao reorganizar colunas, não use{' '}
          <code>order</code> do flexbox para trocar a sequência do conteúdo.
        </li>
        <li>
          <strong>Foco visível e previsível</strong> ao percorrer a página inteira só com Tab, na
          ordem em que ela é lida.
        </li>
        <li>
          <strong>Cobertura automatizada é parcial.</strong> Dos {componentes.length} componentes,
          13 têm teste axe. Nenhum componente de moldura — Header, Footer, Breadcrumb, BackToTop —
          tem, com exceção de CookieConsentBanner e Meganav. Ver{' '}
          <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
        </li>
      </ul>

      <h2 id="pendencias">O que ainda falta</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> validação dos quatro templates por design e engenharia, e
        definição de quem aprova mudanças nesta seção — fonte: time. Nenhum template desta seção
        passou por revisão formal. Registrado em <code>LACUNAS.md</code>. Ver{' '}
        <Link href="/introducao/governanca">Governança</Link>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existem frames de template na biblioteca do Figma nem
        composições no Storybook — fonte: Figma (biblioteca Web Components) e Storybook. O Storybook
        publica componentes isolados; não há nenhuma página montada que possa ser aberta, medida ou
        copiada. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de layout de página — nem container com
        largura máxima, nem grade de colunas, nem região de conteúdo principal. Também não existe
        token de largura máxima de página, e os três grids publicados são do tipo{' '}
        <em>Stretch</em>. Cada produto monta a moldura por conta. Ver{' '}
        <Link href="/fundamentos/grid-e-layout">Grid e layout</Link> — fonte: decisão de Design.
        Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
