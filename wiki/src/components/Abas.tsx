'use client';

import { useId, useState } from 'react';

export interface Aba {
  id: string;
  rotulo: string;
  conteudo: React.ReactNode;
}

export function Abas({ abas }: { abas: Aba[] }) {
  const base = useId();
  const [ativa, setAtiva] = useState(abas[0]?.id);

  function aoTeclar(evento: React.KeyboardEvent<HTMLButtonElement>, indice: number) {
    const anterior = (indice - 1 + abas.length) % abas.length;
    const proxima = (indice + 1) % abas.length;
    const destino =
      evento.key === 'ArrowLeft' ? anterior : evento.key === 'ArrowRight' ? proxima : null;

    if (destino === null) return;

    const alvo = abas[destino];
    if (!alvo) return;

    evento.preventDefault();
    setAtiva(alvo.id);
    document.getElementById(`${base}-aba-${alvo.id}`)?.focus();
  }

  return (
    <div className="wiki-abas">
      <div aria-label="Seções do componente" className="wiki-abas__lista" role="tablist">
        {abas.map((aba, indice) => (
          <button
            aria-controls={`${base}-painel-${aba.id}`}
            aria-selected={ativa === aba.id}
            className="wiki-abas__gatilho"
            id={`${base}-aba-${aba.id}`}
            key={aba.id}
            onClick={() => { setAtiva(aba.id); }}
            onKeyDown={(e) => { aoTeclar(e, indice); }}
            role="tab"
            tabIndex={ativa === aba.id ? 0 : -1}
            type="button"
          >
            {aba.rotulo}
          </button>
        ))}
      </div>

      {abas.map((aba) => (
        <div
          aria-labelledby={`${base}-aba-${aba.id}`}
          className="wiki-abas__painel"
          hidden={ativa !== aba.id}
          id={`${base}-painel-${aba.id}`}
          key={aba.id}
          role="tabpanel"
          tabIndex={0}
        >
          {aba.conteudo}
        </div>
      ))}
    </div>
  );
}
