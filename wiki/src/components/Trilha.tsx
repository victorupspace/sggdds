import Link from 'next/link';

export interface PassoTrilha {
  titulo: string;
  href?: string;
}

export function Trilha({ passos }: { passos: PassoTrilha[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="wiki-trilha">
      <ol>
        <li>
          <Link href="/">Início</Link>
        </li>
        {passos.map((passo, indice) => (
          <li key={passo.titulo}>
            <span aria-hidden="true">/</span>{' '}
            {passo.href && indice < passos.length - 1 ? (
              <Link href={passo.href}>{passo.titulo}</Link>
            ) : (
              <span aria-current="page">{passo.titulo}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
