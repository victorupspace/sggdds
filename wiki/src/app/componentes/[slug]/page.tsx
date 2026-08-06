import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { Abas } from '@/components/Abas';
import { Codigo, ListaDoDont, Pendente, Rascunho, Tabela } from '@/components/Blocos';
import { PreviewStorybook } from '@/components/PreviewStorybook';
import { Trilha } from '@/components/Trilha';
import {
  figmaDoComponente,
  listarComponentes,
  obterComponente,
  obterConteudoComponente,
  urlCodigoFonte,
  urlFigma,
  urlStorybookDocs,
  type ComponenteExtraido,
  type ConteudoComponente,
} from '@/lib/dados';

export function generateStaticParams() {
  return listarComponentes().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const componente = obterComponente(slug);
  if (!componente) return {};
  return {
    title: componente.name,
    description: componente.oneLiner ?? `Documentação do componente ${componente.name}.`,
  };
}

const ROTULOS_STATUS: Record<string, { texto: string; classe: string }> = {
  estavel: { texto: 'Estável', classe: 'wiki-selo--estavel' },
  beta: { texto: 'Beta', classe: 'wiki-selo--beta' },
  'em-revisao': { texto: 'Em revisão', classe: 'wiki-selo--revisao' },
  depreciado: { texto: 'Depreciado', classe: 'wiki-selo--neutro' },
};

function nomeDoPacote() {
  return '@government/design-system';
}

/* ── Aba 1 ─────────────────────────────────────────────────────────────────── */

function VisaoGeral({
  dados,
  conteudo,
}: {
  dados: ComponenteExtraido;
  conteudo: ConteudoComponente | null;
}) {
  return (
    <div className="wiki-prosa">
      <h2 id="preview">Exemplo interativo</h2>
      <PreviewStorybook stories={dados.stories} />

      <h2 id="quando-usar">Quando usar</h2>
      {conteudo?.quandoUsar.length ? (
        <>
          <Rascunho />
          <ul>
            {conteudo.quandoUsar.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : (
        <Pendente
          fonte="time (editorial)"
          oQueFalta={`orientação de quando usar o ${dados.name}`}
        />
      )}

      <h2 id="quando-nao-usar">Quando não usar</h2>
      {conteudo?.quandoNaoUsar.length ? (
        <ul>
          {conteudo.quandoNaoUsar.map((item) => (
            <li key={item.texto}>
              {item.texto}
              {item.alternativa ? (
                <>
                  {' '}
                  <em>Em vez disso, use {item.alternativa}.</em>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <Pendente fonte="time (editorial)" oQueFalta="orientação de quando não usar" />
      )}

      <h2 id="anatomia">Anatomia</h2>
      {conteudo?.anatomia.length ? (
        <Tabela
          cabecalho={['#', 'Parte', 'Descrição']}
          legenda={`Partes do ${dados.name}`}
          linhas={conteudo.anatomia.map((p) => [
            String(p.numero),
            <strong key={p.parte}>{p.parte}</strong>,
            p.descricao,
          ])}
        />
      ) : (
        <Pendente
          fonte="Figma (frame anotado) + time"
          oQueFalta="diagrama de anatomia numerado"
        />
      )}

      <h2 id="variantes">Variantes</h2>
      {dados.variants.length ? (
        <Tabela
          cabecalho={['Propriedade', 'Valores']}
          legenda="Variantes disponíveis"
          linhas={dados.variants.map((v) => [
            <code key={v.prop}>{v.prop}</code>,
            v.values.map((valor) => (
              <code key={valor} style={{ marginInlineEnd: 8 }}>
                {valor}
              </code>
            )),
          ])}
        />
      ) : (
        <p>
          Este componente não expõe eixos de variante. <Pendente fonte="time" oQueFalta="confirmação de que a ausência de variantes é intencional" />
        </p>
      )}

      <h2 id="tamanhos">Tamanhos</h2>
      {conteudo?.tamanhos ? (
        <p>{conteudo.tamanhos}</p>
      ) : dados.props.some((p) => p.name === 'size') ? (
        <p>
          Definidos pela propriedade <code>size</code>:{' '}
          {dados.props
            .find((p) => p.name === 'size')
            ?.values?.map((v) => (
              <code key={v} style={{ marginInlineEnd: 8 }}>
                {v}
              </code>
            ))}
          .
        </p>
      ) : (
        <Pendente
          fonte="Figma + time"
          oQueFalta="definição de tamanhos (o componente não expõe propriedade de tamanho)"
        />
      )}

      <h2 id="estados">Estados</h2>
      {dados.states.length ? (
        <ul>
          {dados.states.map((estado) => (
            <li key={estado}>
              <code>{estado}</code>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          O componente não implementa estados interativos — não há seletor de <code>:hover</code>,{' '}
          <code>:focus-visible</code> ou <code>disabled</code> no seu CSS.
        </p>
      )}

      <h2 id="responsivo">Comportamento responsivo</h2>
      {conteudo?.responsivo ? <p>{conteudo.responsivo}</p> : null}
      {dados.responsive.length ? (
        <Tabela
          cabecalho={['Consulta de mídia', 'Efeito']}
          legenda="Comportamento responsivo"
          linhas={dados.responsive.map((r) => [<code key={r.query}>{r.query}</code>, r.effect])}
        />
      ) : (
        <p>
          O CSS deste componente não declara nenhuma regra <code>@media</code>: ele se adapta pelo
          fluxo do container onde está inserido.
        </p>
      )}

      <h2 id="do-dont">Do &amp; don&apos;t</h2>
      {conteudo?.dosDonts.length ? (
        <>
          <Rascunho />
          <ListaDoDont pares={conteudo.dosDonts} />
        </>
      ) : (
        <Pendente fonte="time (editorial) + validação de design" oQueFalta="pares de do & don't" />
      )}
    </div>
  );
}

/* ── Aba 2 ─────────────────────────────────────────────────────────────────── */

function SaibaMais({
  dados,
  conteudo,
}: {
  dados: ComponenteExtraido;
  conteudo: ConteudoComponente | null;
}) {
  return (
    <div className="wiki-prosa">
      <h2 id="conteudo-e-escrita">Conteúdo e escrita</h2>
      {conteudo?.conteudoEEscrita.length ? (
        <ul>
          {conteudo.conteudoEEscrita.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <Pendente fonte="time (editorial)" oQueFalta="regras de escrita dentro do componente" />
      )}

      <h2 id="hierarquia">Hierarquia e posicionamento</h2>
      {conteudo?.hierarquia.length ? (
        <ul>
          {conteudo.hierarquia.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <Pendente fonte="time (editorial)" oQueFalta="orientação de hierarquia e posicionamento" />
      )}

      <h2 id="combinacoes">Combinação com outros componentes</h2>
      {conteudo?.combinacoes.length ? (
        <ul>
          {conteudo.combinacoes.map((c) => (
            <li key={c.componente}>
              {c.slug ? (
                <Link href={`/componentes/${c.slug}`}>{c.componente}</Link>
              ) : (
                <strong>{c.componente}</strong>
              )}
              : {c.relacao}
            </li>
          ))}
        </ul>
      ) : (
        <Pendente fonte="time (editorial)" oQueFalta="relações com outros componentes" />
      )}

      <h2 id="tokens">Tokens aplicados</h2>
      {dados.cssCustomProperties.length ? (
        <>
          <p>
            Variáveis internas do componente e o token do Design System que cada uma resolve. Os
            comentários vêm do próprio CSS e citam o nome original da variable no Figma.
          </p>
          <Tabela
            cabecalho={['Variável do componente', 'Valor', 'Origem']}
            legenda={`Tokens do ${dados.name}`}
            linhas={dados.cssCustomProperties.map((p) => [
              <code key={p.name}>{p.name}</code>,
              <code key={`${p.name}-v`}>{p.value}</code>,
              p.comment ?? '—',
            ])}
          />
        </>
      ) : null}

      <h3 id="tokens-consumidos">Tokens consumidos ({dados.tokensUsed.length})</h3>
      {dados.tokensUsed.length ? (
        <ul className="wiki-lista-tokens">
          {dados.tokensUsed.map((t) => (
            <li key={t}>
              <code>{t}</code>
            </li>
          ))}
        </ul>
      ) : (
        <p>Este componente não consome tokens diretamente no seu CSS.</p>
      )}

      <h2 id="acessibilidade">Acessibilidade</h2>
      <Tabela
        cabecalho={['Aspecto', 'Implementação']}
        legenda="Acessibilidade"
        linhas={[
          [
            'Papéis ARIA',
            dados.accessibility.roles.length
              ? dados.accessibility.roles.map((r) => (
                  <code key={r} style={{ marginInlineEnd: 8 }}>
                    {r}
                  </code>
                ))
              : 'Usa elementos semânticos nativos, sem papel explícito.',
          ],
          [
            'Atributos ARIA',
            dados.accessibility.ariaAttributes.length
              ? dados.accessibility.ariaAttributes.map((a) => (
                  <code key={a} style={{ marginInlineEnd: 8 }}>
                    {a}
                  </code>
                ))
              : '—',
          ],
          [
            'Teclado',
            dados.accessibility.keyboardInteractions.length
              ? dados.accessibility.keyboardInteractions.join('; ')
              : 'Comportamento nativo do elemento.',
          ],
          [
            'Teste automatizado',
            dados.tests.a11yFile
              ? `${dados.tests.a11yCount ?? 0} verificações com axe em ${dados.tests.a11yFile.split('/').pop()}`
              : 'Sem suíte axe — registrado em LACUNAS.md.',
          ],
        ]}
      />
      {dados.accessibility.notes.length ? (
        <ul>
          {dados.accessibility.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}

      <h2 id="exemplos">Exemplos práticos</h2>
      {conteudo?.exemplos.length ? (
        <>
          <Rascunho />
          {conteudo.exemplos.map((e) => (
            <div key={e.titulo}>
              <h3>{e.titulo}</h3>
              <p>
                <strong>Contexto:</strong> {e.contexto}
              </p>
              <p>
                <strong>Como fica:</strong> {e.comoFica}
              </p>
            </div>
          ))}
        </>
      ) : (
        <Pendente
          fonte="time (editorial)"
          oQueFalta="dois casos de uso em contexto de serviço público"
        />
      )}

      <h2 id="erros-comuns">Erros comuns</h2>
      {conteudo?.errosComuns.length ? (
        <Tabela
          cabecalho={['Erro', 'Consequência', 'Correção']}
          legenda="Erros comuns"
          linhas={conteudo.errosComuns.map((e) => [e.erro, e.consequencia, e.correcao])}
        />
      ) : (
        <Pendente fonte="time (editorial)" oQueFalta="lista de erros comuns" />
      )}
    </div>
  );
}

/* ── Aba 3 ─────────────────────────────────────────────────────────────────── */

function CodigoEUtilitarios({
  dados,
  conteudo,
}: {
  dados: ComponenteExtraido;
  conteudo: ConteudoComponente | null;
}) {
  const pacote = nomeDoPacote();
  const principal = dados.exports[0] ?? dados.name;
  const par = figmaDoComponente(dados.slug);

  return (
    <div className="wiki-prosa">
      <h2 id="instalacao">Instalação</h2>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O pacote ainda não está publicado</p>
        <p>
          Os comandos abaixo são a forma definitiva de instalação e passam a valer assim que{' '}
          <code>{pacote}</code> for publicado no registro npm. Até lá, consuma a biblioteca pelo
          repositório — ver <Link href="/recursos/instalacao">Instalação</Link>.
        </p>
      </div>
      <Codigo linguagem="bash">{`npm install ${pacote}`}</Codigo>

      <h2 id="import">Importação</h2>
      <Codigo linguagem="tsx">{`import { ${dados.exports.join(', ')} } from '${pacote}';
import '${pacote}/styles.css';`}</Codigo>

      <h2 id="uso-minimo">Uso mínimo</h2>
      <Codigo linguagem="tsx">{snippetMinimo(dados, principal)}</Codigo>

      <h2 id="api">API</h2>
      {dados.props.length ? (
        <Tabela
          cabecalho={['Propriedade', 'Tipo', 'Valores', 'Padrão', 'Obrigatória', 'Descrição']}
          legenda={`Propriedades do ${dados.name}`}
          linhas={dados.props.map((p) => [
            <code key={p.name}>{p.name}</code>,
            <code key={`${p.name}-t`}>{p.type}</code>,
            p.values?.length
              ? p.values.map((v) => (
                  <code key={v} style={{ marginInlineEnd: 6 }}>
                    {v}
                  </code>
                ))
              : '—',
            p.default ? <code key={`${p.name}-d`}>{p.default}</code> : '—',
            p.required ? 'Sim' : 'Não',
            p.description ?? '—',
          ])}
        />
      ) : (
        <p>Este componente não recebe propriedades.</p>
      )}

      <h2 id="eventos">Eventos e callbacks</h2>
      {dados.callbacks.length ? (
        <Tabela
          cabecalho={['Nome', 'Assinatura', 'Descrição']}
          legenda="Eventos"
          linhas={dados.callbacks.map((c) => [
            <code key={c.name}>{c.name}</code>,
            <code key={`${c.name}-s`}>{c.signature}</code>,
            c.description ?? '—',
          ])}
        />
      ) : (
        <p>Este componente não emite eventos.</p>
      )}

      <h2 id="slots">Slots e composição</h2>
      {dados.slots.length ? (
        <Tabela
          cabecalho={['Slot', 'Tipo', 'Descrição']}
          legenda="Slots"
          linhas={dados.slots.map((s) => [
            <code key={s.name}>{s.name}</code>,
            <code key={`${s.name}-t`}>{s.type}</code>,
            s.description ?? '—',
          ])}
        />
      ) : (
        <p>Este componente não aceita conteúdo por composição.</p>
      )}

      <h2 id="css">Classes e variáveis CSS expostas</h2>
      <h3 id="css-classes">Classes ({dados.cssClasses.length})</h3>
      <ul className="wiki-lista-tokens">
        {dados.cssClasses.map((c) => (
          <li key={c}>
            <code>.{c}</code>
          </li>
        ))}
      </ul>
      <h3 id="css-vars">Variáveis ({dados.cssCustomProperties.length})</h3>
      {dados.cssCustomProperties.length ? (
        <ul className="wiki-lista-tokens">
          {dados.cssCustomProperties.map((p) => (
            <li key={p.name}>
              <code>{p.name}</code>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma variável customizável exposta.</p>
      )}

      <h2 id="exemplos-codigo">Exemplos por variante</h2>
      {dados.stories.length ? (
        <Tabela
          cabecalho={['Exemplo', 'Ver no Storybook']}
          legenda="Stories publicadas"
          linhas={dados.stories.map((s) => [
            s.name,
            <a href={s.iframeUrl} key={s.id} rel="noreferrer noopener" target="_blank">
              abrir ↗
            </a>,
          ])}
        />
      ) : null}

      <h2 id="notas">Notas de implementação e limitações</h2>
      {conteudo?.notasImplementacao?.length || dados.pendencias.length ? (
        <ul>
          {conteudo?.notasImplementacao?.map((n) => <li key={n}>{n}</li>)}
          {dados.pendencias.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma limitação registrada.</p>
      )}

      <h2 id="links">Links diretos</h2>
      <ul>
        <li>
          <a
            href={dados.stories[0] ? urlStorybookDocs(storyDocsId(dados)) : '#'}
            rel="noreferrer noopener"
            target="_blank"
          >
            Documentação no Storybook ↗
          </a>
        </li>
        <li>
          {par ? (
            <a href={par.figmaUrl} rel="noreferrer noopener" target="_blank">
              Componente no Figma ↗ ({par.figmaName}, {par.figmaNodeId})
            </a>
          ) : dados.figmaReferences[0] ? (
            <a
              href={urlFigma(dados.figmaReferences[0].node)}
              rel="noreferrer noopener"
              target="_blank"
            >
              Node do Figma citado no código ↗
            </a>
          ) : (
            'Sem componente correspondente publicado no Figma.'
          )}
        </li>
        <li>
          <a href={urlCodigoFonte(dados.sourceDir)} rel="noreferrer noopener" target="_blank">
            Código-fonte no repositório ↗
          </a>
        </li>
      </ul>
    </div>
  );
}

function storyDocsId(dados: ComponenteExtraido) {
  const primeira = dados.stories[0];
  if (!primeira) return '';
  return `${primeira.id.split('--')[0]}--docs`;
}

function snippetMinimo(dados: ComponenteExtraido, principal: string) {
  const obrigatorias = dados.props.filter((p) => p.required).slice(0, 4);
  const atributos = obrigatorias
    .map((p) => {
      if (p.type === 'string') return `${p.name}="${p.values?.[0] ?? 'Texto'}"`;
      if (p.type === 'boolean') return p.name;
      if (p.values?.length) return `${p.name}="${p.values[0]}"`;
      return `${p.name}={/* ${p.type} */}`;
    })
    .join(' ');

  const temFilhos = dados.slots.some((s) => s.name === 'children');
  return temFilhos
    ? `<${principal}${atributos ? ` ${atributos}` : ''}>\n  Conteúdo\n</${principal}>`
    : `<${principal}${atributos ? ` ${atributos}` : ''} />`;
}

/* ── Página ────────────────────────────────────────────────────────────────── */

export default async function PaginaComponente({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dados = obterComponente(slug);
  if (!dados) notFound();

  const conteudo = obterConteudoComponente(slug);
  const par = figmaDoComponente(slug);
  const status = conteudo?.status ? ROTULOS_STATUS[conteudo.status] : null;

  return (
    <article>
      <Trilha
        passos={[
          { titulo: 'Componentes', href: '/componentes/visao-geral' },
          { titulo: dados.name },
        ]}
      />

      <header className="wiki-prosa">
        <div className="wiki-cabecalho-componente">
          <h1>{dados.name}</h1>
          {status ? <span className={`wiki-selo ${status.classe}`}>{status.texto}</span> : null}
        </div>
        <p className="wiki-prosa__resumo">
          {conteudo?.resumo ?? dados.oneLiner ?? 'Componente do Sampa Design System.'}
        </p>

        <div className="wiki-links-topo">
          {par ? (
            <a
              className="wiki-header__link-externo"
              href={par.figmaUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              Ver no Figma ↗
            </a>
          ) : null}
          {dados.stories[0] ? (
            <a
              className="wiki-header__link-externo"
              href={urlStorybookDocs(storyDocsId(dados))}
              rel="noreferrer noopener"
              target="_blank"
            >
              Ver no Storybook ↗
            </a>
          ) : null}
          <a
            className="wiki-header__link-externo"
            href={urlCodigoFonte(dados.sourceDir)}
            rel="noreferrer noopener"
            target="_blank"
          >
            Código-fonte ↗
          </a>
        </div>
      </header>

      <Abas
        abas={[
          {
            id: 'visao-geral',
            rotulo: 'Visão geral',
            conteudo: <VisaoGeral conteudo={conteudo} dados={dados} />,
          },
          {
            id: 'saiba-mais',
            rotulo: 'Saiba mais',
            conteudo: <SaibaMais conteudo={conteudo} dados={dados} />,
          },
          {
            id: 'codigo',
            rotulo: 'Código e utilitários',
            conteudo: <CodigoEUtilitarios conteudo={conteudo} dados={dados} />,
          },
        ]}
      />

      <footer className="wiki-rodape-pagina">
        <dl>
          <div>
            <dt>Status</dt>
            <dd>{status?.texto ?? 'a definir'}</dd>
          </div>
          <div>
            <dt>Versão de introdução</dt>
            <dd>a definir</dd>
          </div>
          <div>
            <dt>Responsável</dt>
            <dd>a definir</dd>
          </div>
          <div>
            <dt>Testes</dt>
            <dd>
              {dados.tests.unitCount ?? 0} unitários
              {dados.tests.a11yCount ? ` · ${dados.tests.a11yCount} axe` : ' · sem axe'}
            </dd>
          </div>
        </dl>
        <a
          href={`https://github.com/victorupspace/sggdds/issues/new?title=${encodeURIComponent(
            `Wiki: melhoria em ${dados.name}`,
          )}`}
          rel="noreferrer noopener"
          target="_blank"
        >
          Sugerir melhoria ↗
        </a>
      </footer>
    </article>
  );
}
