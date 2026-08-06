import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Padrões',
  description:
    'O que é um padrão no Sampa Design System, como ele se diferencia de um componente e de um template, e o índice dos nove padrões documentados.',
};

interface CartaoPadrao {
  titulo: string;
  href: string;
  descricao: string;
}

const PADROES: CartaoPadrao[] = [
  {
    titulo: 'Formulários',
    href: '/padroes/formularios',
    descricao:
      'Como pedir dados a alguém que está com pressa: etapas, rótulos, validação, mensagens de erro e confirmação.',
  },
  {
    titulo: 'Busca',
    href: '/padroes/busca',
    descricao:
      'O atalho de quem não conhece o caminho: campo, carregamento, resultado e o que fazer quando não há nada a mostrar.',
  },
  {
    titulo: 'Filtros',
    href: '/padroes/filtros',
    descricao: 'Reduzir uma lista já encontrada sem esconder da pessoa o que foi reduzido.',
  },
  {
    titulo: 'Tabela de dados',
    href: '/padroes/tabela-de-dados',
    descricao: 'Ler e comparar muitas linhas: ordenação, seleção, densidade e leitura em celular.',
  },
  {
    titulo: 'Login e identificação',
    href: '/padroes/login',
    descricao: 'Entrar no serviço e provar quem é, com o menor número de barreiras possível.',
  },
  {
    titulo: 'Feedback e erros',
    href: '/padroes/feedback-e-erros',
    descricao:
      'Dizer o que aconteceu, onde aconteceu e o que fazer agora — em alerta, notificação ou página inteira.',
  },
  {
    titulo: 'Estados vazios',
    href: '/padroes/estados-vazios',
    descricao:
      'A tela sem conteúdo é uma tela: separar “ainda não há nada”, “não encontramos” e “deu erro”.',
  },
  {
    titulo: 'Paginação',
    href: '/padroes/paginacao',
    descricao: 'Quebrar uma lista longa em pedaços e deixar claro onde a pessoa está.',
  },
  {
    titulo: 'Upload de arquivos',
    href: '/padroes/upload',
    descricao: 'Anexar documento sem perder o trabalho: formato, tamanho, progresso e remoção.',
  },
];

const CAMADAS: { camada: string; pergunta: string; exemplo: string; onde: string }[] = [
  {
    camada: 'Componente',
    pergunta: 'Com que peça eu construo?',
    exemplo: 'Um campo de texto com rótulo, texto de apoio e estado de erro.',
    onde: 'Existe em código, no Figma e no Storybook. É instalável.',
  },
  {
    camada: 'Padrão',
    pergunta: 'Como eu resolvo esta situação?',
    exemplo:
      'Um formulário de serviço público: quais peças entram, em que ordem, quando validar e o que dizer no erro.',
    onde: 'Existe só como documentação. Não é instalável, é seguido.',
  },
  {
    camada: 'Template',
    pergunta: 'Como fica a página inteira?',
    exemplo: 'A página de um serviço, do cabeçalho ao rodapé, com os padrões já posicionados.',
    onde: 'Existe só como documentação. Combina vários padrões numa página.',
  },
];

export default function PaginaVisaoGeralPadroes() {
  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Padrões' }]} />

      <h1>Padrões</h1>
      <p className="wiki-prosa__resumo">
        Um padrão é a resposta documentada para uma situação que se repete em serviços do Estado:
        preencher um formulário, procurar alguma coisa, corrigir um erro. Ele não entrega código
        novo — organiza os componentes que já existem numa sequência que funciona.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Toda esta seção é conteúdo novo</p>
        <p>
          Antes desta Wiki não havia nenhum padrão documentado no Sampa Design System — nem no
          Figma, nem no Storybook, nem em documento interno. Cada página desta seção é uma proposta
          desta documentação, escrita a partir da API real dos componentes, e precisa ser validada
          pelo time antes de virar norma. Enquanto isso não acontece, cada página traz o selo{' '}
          <span className="wiki-selo wiki-selo--rascunho">rascunho para validação</span>.
        </p>
      </div>

      <h2 id="o-que-e">O que é um padrão</h2>
      <p>
        Componente responde “com que peça eu construo”. Padrão responde “como eu resolvo esta
        situação”. São perguntas diferentes, e a segunda é a que aparece primeiro no trabalho real:
        ninguém começa um projeto precisando de um campo de texto, começa precisando pedir o CPF de
        alguém sem que essa pessoa desista no meio.
      </p>
      <p>
        Um padrão descreve a <strong>composição</strong> (que componentes entram e qual o papel de
        cada um), a <strong>ordem</strong> (o que a pessoa vê primeiro, depois, por último) e as{' '}
        <strong>decisões</strong> que valem sempre (quando validar, onde mostrar o erro, o que
        nunca fazer). Ele é prescritivo de propósito: dois serviços do Estado que resolvem a mesma
        situação devem resolvê-la do mesmo jeito.
      </p>

      <h2 id="camadas">Padrão, componente e template</h2>
      <p>
        As três camadas se empilham. Um template usa padrões; um padrão usa componentes; um
        componente usa tokens. Quem estiver em dúvida sobre onde documentar algo pode usar a
        pergunta da segunda coluna.
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
              <th scope="col">Exemplo</th>
              <th scope="col">Onde vive</th>
            </tr>
          </thead>
          <tbody>
            {CAMADAS.map((linha) => (
              <tr key={linha.camada}>
                <th scope="row">{linha.camada}</th>
                <td>{linha.pergunta}</td>
                <td>{linha.exemplo}</td>
                <td>{linha.onde}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A distinção prática é esta: <strong>componente você instala</strong> — ele tem props, tem
        teste, tem uma página em <Link href="/componentes/visao-geral">Componentes</Link>.{' '}
        <strong>Padrão você segue</strong> — ele não tem props, tem regras. Se você se pegar
        escrevendo uma prop nova numa página desta seção, o lugar era outro.
      </p>

      <h2 id="por-que">Por que padrões existem</h2>
      <p>
        Componentes sozinhos não garantem uma boa experiência. É possível montar um formulário
        ilegível usando só componentes acessíveis: basta pedir dado demais, validar na tecla errada
        e escrever “campo inválido” no erro. O componente cuida da peça; o padrão cuida da
        sequência.
      </p>
      <ul>
        <li>
          <strong>Reduz decisão repetida.</strong> Cada equipe que monta um formulário decide de
          novo onde mostrar o erro. São dezenas de decisões idênticas, tomadas em separado, com
          resultados diferentes.
        </li>
        <li>
          <strong>Torna o serviço previsível.</strong> Quem já usou um serviço do Estado aprende o
          funcionamento. Se o próximo serviço se comporta igual, o aprendizado é reaproveitado. Se
          se comporta diferente, a pessoa recomeça do zero.
        </li>
        <li>
          <strong>Move a acessibilidade para antes do código.</strong> Foco depois do envio, resumo
          de erro, ordem de leitura: nada disso é resolvido por um componente isolado. É resolvido
          na composição — ou seja, no padrão.
        </li>
        <li>
          <strong>Encurta a revisão.</strong> Uma proposta que segue o padrão é revisada pelo que
          tem de específico, não pelo que já foi decidido.
        </li>
        <li>
          <strong>Expõe lacunas do sistema.</strong> Escrever um padrão revela o que falta. É
          assim que se descobre que não existe componente de sugestão de busca — e o vazio vira
          item de trabalho em vez de improviso em cada produto.
        </li>
      </ul>

      <h2 id="lista">Os nove padrões</h2>
      <p>
        Comece por <Link href="/padroes/formularios">Formulários</Link>: é o padrão mais usado em
        serviço público e o que mais decide se a pessoa conclui ou abandona.
      </p>
      <div className="wiki-cartoes">
        {PADROES.map((padrao) => (
          <Link className="wiki-cartao" href={padrao.href} key={padrao.href}>
            <span className="wiki-cartao__titulo">{padrao.titulo}</span>
            <span className="wiki-cartao__descricao">{padrao.descricao}</span>
          </Link>
        ))}
      </div>

      <h2 id="estrutura">Como cada página é organizada</h2>
      <p>
        Todas as páginas desta seção seguem a mesma ordem, para que dê para pular direto ao trecho
        que interessa:
      </p>
      <ol>
        <li>
          <strong>O problema</strong> — a situação real que o padrão resolve, do ponto de vista de
          quem usa o serviço.
        </li>
        <li>
          <strong>Quando usar</strong> e <strong>quando não usar</strong> — o limite do padrão.
        </li>
        <li>
          <strong>Composição</strong> — que componentes entram e qual o papel de cada um.
        </li>
        <li>
          <strong>Anatomia do fluxo</strong> — os passos em ordem, como a pessoa os vive.
        </li>
        <li>
          <strong>Regras</strong> — as decisões que valem sempre.
        </li>
        <li>
          <strong>Do &amp; don&apos;t</strong> — pares de comparação com o motivo.
        </li>
        <li>
          <strong>Acessibilidade</strong> — o que verificar especificamente neste padrão.
        </li>
        <li>
          <strong>Erros comuns</strong> — o que costuma dar errado e como corrigir.
        </li>
      </ol>

      <h2 id="como-usar">Como usar um padrão</h2>
      <p>
        Leia o padrão antes de abrir o Figma, não depois. A maior parte das decisões que ele
        descreve é de estrutura e de conteúdo — muda o texto do erro, a ordem das perguntas, o
        momento da validação. Refazer isso depois do layout pronto custa mais do que fazer certo na
        primeira vez.
      </p>
      <p>
        Se o seu caso não couber no padrão, não force. Escreva o que precisou mudar e por quê, e
        traga para o time: ou o padrão precisa de uma exceção documentada, ou falta um padrão novo.
        Divergir em silêncio é o que produz dois serviços que se comportam de formas diferentes
        pelo mesmo motivo.
      </p>

      <h2 id="pendencias">O que ainda falta</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> validação dos nove padrões por design e engenharia, e
        definição de quem aprova mudanças nesta seção — fonte: time. Nenhum padrão desta seção
        passou por revisão formal, e não existe processo publicado de aprovação. Registrado em{' '}
        <code>LACUNAS.md</code>. Ver{' '}
        <Link href="/introducao/governanca">Governança</Link>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> exemplos navegáveis dos padrões — fonte: time. O Storybook
        publica componentes isolados, não composições. Não existe hoje nenhuma referência montada
        de formulário, busca ou tabela que possa ser aberta e testada. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
