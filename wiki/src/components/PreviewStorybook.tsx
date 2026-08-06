'use client';

import { useState } from 'react';

export interface StoryDisponivel {
  id: string;
  name: string;
  iframeUrl: string;
  docsUrl: string;
}

/**
 * Preview ao vivo: renderiza a story real do Storybook publicado dentro de um
 * iframe. É a solução recomendada enquanto o pacote não está publicado no npm —
 * o que aparece aqui é exatamente o componente rodando, não uma reprodução.
 */
export function PreviewStorybook({ stories }: { stories: StoryDisponivel[] }) {
  const [atual, setAtual] = useState(stories[0]);

  if (!atual) {
    return (
      <p className="wiki-pendente">
        ⚠️ PENDENTE: nenhuma story publicada para este componente — fonte: Storybook.
      </p>
    );
  }

  return (
    <div className="wiki-preview">
      {stories.length > 1 ? (
        <div className="wiki-preview__barra">
          <label className="wiki-visualmente-oculto" htmlFor="preview-story">
            Escolher exemplo
          </label>
          <select
            className="wiki-preview__seletor"
            id="preview-story"
            onChange={(e) => { setAtual(stories.find((s) => s.id === e.target.value) ?? stories[0]); }}
            value={atual.id}
          >
            {stories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <a
            className="wiki-preview__link"
            href={atual.iframeUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            Abrir isolado ↗
          </a>
        </div>
      ) : null}

      <iframe
        className="wiki-preview__quadro"
        loading="lazy"
        src={atual.iframeUrl}
        title={`Exemplo interativo: ${atual.name}`}
      />
    </div>
  );
}
