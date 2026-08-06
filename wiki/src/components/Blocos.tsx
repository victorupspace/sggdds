import type { ReactNode } from 'react';

export function Pendente({ oQueFalta, fonte }: { oQueFalta: string; fonte: string }) {
  return (
    <p className="wiki-pendente">
      ⚠️ <strong>PENDENTE:</strong> {oQueFalta} — fonte: {fonte}. Registrado em{' '}
      <code>LACUNAS.md</code>.
    </p>
  );
}

export function Rascunho() {
  return (
    <span className="wiki-selo wiki-selo--rascunho" title="Conteúdo aguardando validação do time">
      rascunho para validação
    </span>
  );
}

export function Tabela({
  cabecalho,
  linhas,
  legenda,
}: {
  cabecalho: string[];
  linhas: ReactNode[][];
  legenda?: string;
}) {
  return (
    <div className="wiki-tabela-rolagem" tabIndex={0}>
      <table className="wiki-tabela">
        {legenda ? <caption className="wiki-visualmente-oculto">{legenda}</caption> : null}
        <thead>
          <tr>
            {cabecalho.map((titulo) => (
              <th key={titulo} scope="col">
                {titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, indice) => (
            <tr key={indice}>
              {linha.map((celula, coluna) => (
                <td key={coluna}>{celula}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ListaDoDont({
  pares,
}: {
  pares: { faca: string; naoFaca: string; porque: string }[];
}) {
  return (
    <div className="wiki-dodont">
      {pares.map((par) => (
        <div className="wiki-dodont__par" key={par.faca}>
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>{par.faca}</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>{par.naoFaca}</p>
          </div>
          <p className="wiki-dodont__porque">{par.porque}</p>
        </div>
      ))}
    </div>
  );
}

export function Codigo({ children, linguagem }: { children: string; linguagem?: string }) {
  return (
    <pre className="wiki-codigo" tabIndex={0} data-linguagem={linguagem}>
      <code>{children}</code>
    </pre>
  );
}
