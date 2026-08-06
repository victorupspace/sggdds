import type { Metadata } from 'next';

import { ListaDoDont, Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { formatarRazao, razaoDeContraste } from '@/lib/contraste';
import { listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Logo e marca',
  description:
    'As duas versões publicadas do logo do Governo do Estado de São Paulo, usos corretos e incorretos, área de proteção, tamanho mínimo e a relação entre a cor da marca e a cor de interface.',
};

/** Proporção real do vetor publicado: viewBox 0 0 217 29. */
const LARGURA_VETOR = 217;
const ALTURA_VETOR = 29;
const PROPORCAO_VETOR = LARGURA_VETOR / ALTURA_VETOR;

export default function PaginaLogoEMarca() {
  const tokens = listarTokens();
  const valor = (nome: string) => tokens.find((t) => t.cssVar === nome)?.valorResolvido ?? '';

  const corMarca = valor('--ds-brand-color-brand-red');
  const corInterface = valor('--ds-brand-color-brand-red-primary');

  const contrasteMarca = razaoDeContraste(corMarca, '#ffffff');
  const contrasteInterface = razaoDeContraste(corInterface, '#ffffff');

  const tokensMarca = tokens.filter((t) => t.valorResolvido.toLowerCase() === '#ff161f');
  const tokensInterface = tokens.filter((t) => t.valorResolvido.toLowerCase() === '#c50007');

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Fundamentos', href: '/fundamentos/visao-geral' },
          { titulo: 'Logo e marca' },
        ]}
      />

      <h1>Logo e marca</h1>
      <p className="wiki-prosa__resumo">
        O logo é a assinatura do Estado numa tela. Quem chega a um serviço público precisa
        reconhecer, em menos de um segundo, que está num site oficial. Por isso o logo tem forma
        fixa, cor fixa e espaço próprio — e não é um elemento decorativo que cada produto ajusta.
      </p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Marca de governo carrega uma função prática: separa o serviço oficial da falsificação. Um
        logo esticado, recolorido ou colado sobre uma foto sem contraste enfraquece exatamente o
        sinal que a pessoa usa para confiar na página. As regras abaixo existem para proteger esse
        sinal, não para uniformizar estética.
      </p>

      <h2 id="versoes">As duas versões publicadas</h2>
      <p>
        Existem hoje <strong>duas versões</strong> do logo nesta Wiki, ambas em SVG, ambas com o
        mesmo desenho e a mesma proporção. A escolha depende exclusivamente do fundo.
      </p>

      <div className="wiki-cartoes">
        <div className="wiki-cartao">
          <span className="wiki-cartao__titulo">Fundo claro</span>
          <span className="wiki-cartao__descricao">
            <code>/logo-spgov.svg</code>
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '96px',
              marginBlockStart: '16px',
              padding: '24px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid #e5e5e5',
            }}
          >
            <img
              alt="Governo do Estado de São Paulo - Prodesp"
              height={29}
              src="/logo-spgov.svg"
              style={{ inlineSize: '100%', maxInlineSize: '217px', blockSize: 'auto' }}
              width={217}
            />
          </div>
        </div>

        <div className="wiki-cartao">
          <span className="wiki-cartao__titulo">Fundo escuro</span>
          <span className="wiki-cartao__descricao">
            <code>/logo-spgov-inverse.svg</code>
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '96px',
              marginBlockStart: '16px',
              padding: '24px',
              borderRadius: '8px',
              background: '#181818',
            }}
          >
            <img
              alt="Governo do Estado de São Paulo - Prodesp"
              height={29}
              src="/logo-spgov-inverse.svg"
              style={{ inlineSize: '100%', maxInlineSize: '217px', blockSize: 'auto' }}
              width={217}
            />
          </div>
        </div>
      </div>

      <h3 id="especificacao">Especificação dos arquivos</h3>
      <Tabela
        cabecalho={['Arquivo', 'Fundo', 'Cor do símbolo', 'Cor do texto', 'viewBox']}
        legenda="Especificação técnica das duas versões do logo publicadas na Wiki"
        linhas={[
          [
            <code key="claro">/logo-spgov.svg</code>,
            'Claro (branco e cinzas claros)',
            <code key="c1">{corMarca.toUpperCase()}</code>,
            <code key="c2">#292929</code>,
            <code key="c3">{`0 0 ${LARGURA_VETOR} ${ALTURA_VETOR}`}</code>,
          ],
          [
            <code key="escuro">/logo-spgov-inverse.svg</code>,
            'Escuro (preto, cinzas escuros, vermelho da marca)',
            <code key="e1">{corMarca.toUpperCase()}</code>,
            <code key="e2">#FFFFFF</code>,
            <code key="e3">{`0 0 ${LARGURA_VETOR} ${ALTURA_VETOR}`}</code>,
          ],
        ]}
      />
      <p>
        O cinza <code>#292929</code> da versão clara é o mesmo valor de{' '}
        <code>--ds-semantic-text-style-content-color-typography-secondary</code>. O símbolo mantém{' '}
        <code>{corMarca.toUpperCase()}</code> nas duas versões — a marca gráfica não muda de cor
        conforme o fundo, só o texto muda.
      </p>
      <p>
        Os dois arquivos carregam <code>role=&quot;img&quot;</code> e um{' '}
        <code>aria-label</code> com o nome por extenso. Ao inserir o logo com{' '}
        <code>&lt;img&gt;</code>, repita o nome no <code>alt</code>; ao usá-lo como link para a
        home, o nome acessível do link é esse texto.
      </p>

      <h2 id="cores">A cor da marca e a cor de interface</h2>
      <p>
        O sistema exporta dois vermelhos com nomes quase idênticos, e a diferença entre eles é de
        acessibilidade, não de gosto.
      </p>
      <Tabela
        cabecalho={['Token', 'Valor', 'Sobre branco', 'WCAG AA (texto normal)', 'Tokens que resolvem para ela']}
        legenda="Comparação entre a cor da marca e a cor de interface"
        linhas={[
          [
            <code key="t1">--ds-brand-color-brand-red</code>,
            <code key="v1">{corMarca.toUpperCase()}</code>,
            contrasteMarca ? formatarRazao(contrasteMarca) : '—',
            <strong key="r1">reprova</strong>,
            `${tokensMarca.length} tokens`,
          ],
          [
            <code key="t2">--ds-brand-color-brand-red-primary</code>,
            <code key="v2">{corInterface.toUpperCase()}</code>,
            contrasteInterface ? formatarRazao(contrasteInterface) : '—',
            'passa',
            `${tokensInterface.length} tokens`,
          ],
        ]}
      />

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">A regra: uma cor para a marca, outra para a interface</p>
        <p>
          <code>{corMarca.toUpperCase()}</code> é a cor do <strong>logotipo</strong>. Logotipo é
          exceção explícita das WCAG 2.1: o critério 1.4.3 (contraste mínimo) não se aplica a texto
          que faz parte de uma marca. Por isso o símbolo pode manter esse vermelho.{' '}
          <code>{corInterface.toUpperCase()}</code> é a cor de <strong>interface</strong>: texto,
          links, botões, ícones funcionais e bordas. Essa separação é a regra que esta documentação
          adota e que ainda precisa de confirmação do time — ver{' '}
          <a href="/fundamentos/cor">Cor</a> para a matriz completa e para os tokens de texto que
          hoje ainda apontam para a cor da marca.
        </p>
      </div>

      <h2 id="area-de-protecao">Área de proteção</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe regra formal de área de proteção — nenhum manual de
        marca, nenhuma nota no Figma, nenhum arquivo no repositório define a margem mínima ao redor
        do logo — fonte: time / marca. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p>
        Até que a regra oficial exista, esta documentação trabalha com uma medida derivada da
        própria geometria do vetor: <strong>margem livre igual à altura do logo aplicado</strong>,
        nos quatro lados. Se o logo é renderizado com 26px de altura, nada — texto, ícone, borda,
        foto, outro logo — entra numa faixa de 26px ao redor dele.
      </p>
      <p>
        Isso é uma <strong>proposta desta documentação, não uma definição oficial</strong>. Não use
        esse número em peça impressa nem em material institucional sem validar com a área
        responsável pela marca.
      </p>

      <h2 id="tamanho-minimo">Tamanho mínimo</h2>
      <p>
        A proporção do vetor é fixa: {LARGURA_VETOR} × {ALTURA_VETOR}, ou{' '}
        {PROPORCAO_VETOR.toFixed(2).replace('.', ',')}:1. Largura e altura andam sempre juntas.
      </p>
      <Tabela
        cabecalho={['Aplicação real hoje', 'Altura', 'Largura correspondente']}
        legenda="Tamanhos em que o logo é efetivamente renderizado no sistema"
        linhas={[
          [
            'Cabeçalho desta Wiki (.wiki-header__logo)',
            '26px',
            `${Math.round(26 * PROPORCAO_VETOR)}px`,
          ],
          [
            <>
              PNG do repositório do Design System (<code>logo-spgov-default.png</code>)
            </>,
            '20px',
            '140px (o próprio arquivo)',
          ],
        ]}
      />
      <p>
        Tomando a menor aplicação existente como piso: <strong>não reduza abaixo de 20px de
        altura em tela</strong>. Abaixo disso o texto do logo deixa de ser legível e o símbolo vira
        uma mancha vermelha.
      </p>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O PNG e o SVG não têm a mesma proporção</p>
        <p>
          O PNG de 140×20 do repositório dá 7,00:1; o vetor publicado dá{' '}
          {PROPORCAO_VETOR.toFixed(2).replace('.', ',')}:1. Ou os dois ativos não são o mesmo
          desenho, ou o PNG tem margem embutida. Enquanto isso não for resolvido,{' '}
          <strong>use o SVG</strong> — ele é a origem vetorial exportada do Figma.
        </p>
      </div>

      <h2 id="usos">Usos corretos e incorretos</h2>
      <ListaDoDont
        pares={[
          {
            faca: 'Use os arquivos SVG publicados, sem alterar nada dentro deles.',
            naoFaca:
              'Redesenhar, redigitar o texto, recriar o símbolo ou recortar o logo de uma captura de tela.',
            porque:
              'O vetor é a origem. Qualquer recriação introduz diferença de desenho entre produtos do mesmo governo.',
          },
          {
            faca: 'Redimensione mantendo a proporção travada, largura e altura juntas.',
            naoFaca: 'Esticar, achatar, inclinar, rotacionar ou aplicar sombra e contorno.',
            porque:
              'A distorção é o defeito de marca mais visível e o mais fácil de evitar: basta travar a proporção no editor.',
          },
          {
            faca: 'Escolha a versão pelo fundo: clara em fundo claro, inversa em fundo escuro.',
            naoFaca:
              'Recolorir o logo para combinar com a página, aplicar gradiente, ou usar a versão clara sobre fundo escuro.',
            porque:
              'As duas versões existem exatamente para cobrir os dois casos. Não há uma terceira cor autorizada.',
          },
          {
            faca: 'Aplique sobre superfície lisa e de contraste suficiente.',
            naoFaca:
              'Colar o logo sobre foto, vídeo, textura ou área de baixo contraste sem uma faixa sólida por trás.',
            porque:
              'Sobre imagem, o símbolo vermelho e o texto perdem separação do fundo — e o logo deixa de cumprir a função de identificar o site como oficial.',
          },
          {
            faca: 'Use o logo como assinatura no cabeçalho e no rodapé.',
            naoFaca:
              'Usar o logo como ícone de botão, marcador de lista, favicon improvisado, bullet ou elemento decorativo repetido.',
            porque:
              'Nesses tamanhos o texto some. Para uso em escala de ícone é preciso uma versão reduzida — que não existe (ver pendências).',
          },
          {
            faca: 'Deixe a área de proteção livre em volta.',
            naoFaca:
              'Encostar texto, botão, borda ou outro logo no limite do vetor, ou empilhar o logo dentro de um selo apertado.',
            porque:
              'Sem respiro o logo é lido como parte do conteúdo, não como assinatura institucional.',
          },
          {
            faca: 'Descreva o logo no alt com o nome por extenso quando ele for informativo.',
            naoFaca:
              'Deixar o alt vazio no logo do cabeçalho, ou escrever apenas "logo" e "imagem".',
            porque:
              'Quem usa leitor de tela precisa saber de qual órgão é o site. No link para a home, esse texto é o nome acessível do link.',
          },
        ]}
      />

      <h2 id="uso-codigo">Como usar em código</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`{/* fundo claro */}
<img
  src="/logo-spgov.svg"
  alt="Governo do Estado de São Paulo - Prodesp"
  width={${LARGURA_VETOR}}
  height={${ALTURA_VETOR}}
  style={{ blockSize: '26px', inlineSize: 'auto' }}
/>

{/* fundo escuro: troque o arquivo, nunca a cor */}
<img src="/logo-spgov-inverse.svg" alt="Governo do Estado de São Paulo - Prodesp" />`}</code>
      </pre>
      <p>
        Defina apenas uma das duas dimensões (normalmente a altura) e deixe a outra em{' '}
        <code>auto</code>. Assim a proporção nunca é quebrada por engano.
      </p>

      <h2 id="downloads">Onde baixar</h2>
      <p>
        Os dois arquivos vetoriais estão em <a href="/recursos/downloads">Downloads</a>, junto com
        os demais ativos do sistema. Baixe sempre de lá: é a única origem que esta documentação
        mantém atualizada.
      </p>

      <h2 id="pendencias">Pendências</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe manual de marca formal. Área de proteção, tamanho
        mínimo, versões autorizadas, uso sobre imagem, coassinatura com outras marcas e aplicação em
        peça impressa não estão definidos em lugar nenhum — fonte: time / área responsável pela
        marca. Tudo o que esta página propõe sobre esses pontos é regra de trabalho, não norma.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe versão monocromática publicada (positiva e negativa
        em uma só cor), nem versão reduzida para uso em escala de ícone — fonte: Figma / marca. Sem
        elas, não há aplicação autorizada para fax, carimbo, gravação, favicon e avatar de perfil.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a versão para fundo claro (<code>/logo-spgov.svg</code>) foi
        <strong> derivada automaticamente</strong> da versão para fundo escuro exportada do Figma —
        os oito traços brancos do texto foram recoloridos para <code>#292929</code> e o fundo escuro
        do quadro de origem foi removido. O desenho não foi validado pela área responsável pela
        marca — fonte: marca. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> há PNG de logo duplicado no repositório do Design System:{' '}
        <code>images/logo-spgov-default.png</code> e{' '}
        <code>packages/react/src/components/Header/assets/logo-spgov-default.png</code> são byte a
        byte idênticos (mesmo md5). Existe ainda um terceiro PNG,{' '}
        <code>logo-portal-de-servicos.png</code> (464×111), consumido pelo componente Header e não
        citado em nenhum inventário — não se sabe se faz parte do sistema de marca ou se é ativo de
        um produto específico — fonte: repo + time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> {tokensMarca.length} tokens resolvem para{' '}
        <code>{corMarca.toUpperCase()}</code>, e parte deles é de texto e de ícone — onde a exceção
        de logotipo das WCAG não vale. A decisão de repontar esses tokens para{' '}
        <code>{corInterface.toUpperCase()}</code> depende do time — fonte: time. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
