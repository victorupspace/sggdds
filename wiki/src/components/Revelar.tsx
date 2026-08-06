'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type ReactNode } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Revelação de conteúdo no tier "standard" recomendado para páginas de
 * apresentação: deslocamento de 24px, 500ms, `power2.out`.
 *
 * Regra que define a implementação: usamos `gsap.from()`, nunca opacidade zero
 * no CSS. Sem JavaScript — ou com JavaScript ainda carregando — o conteúdo já
 * está visível e indexável. A animação só retira de um estado inicial e
 * devolve ao estado natural.
 *
 * `prefers-reduced-motion` desliga tudo: o conteúdo aparece direto.
 */
export function Revelar({
  children,
  className,
  intervalo = 0.05,
  seletor = '[data-revelar]',
  aoCarregar = false,
}: {
  children: ReactNode;
  className?: string;
  /** Atraso entre um item e o próximo, em segundos. */
  intervalo?: number;
  seletor?: string;
  /** true para revelar no carregamento (herói); false para revelar ao rolar. */
  aoCarregar?: boolean;
}) {
  const escopo = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const alvos = gsap.utils.toArray<HTMLElement>(seletor);
      if (alvos.length === 0) return;

      const animacao = gsap.from(alvos, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power2.out',
        stagger: intervalo,
        ...(aoCarregar
          ? {}
          : {
              scrollTrigger: {
                trigger: escopo.current,
                start: 'top 88%',
                once: true,
              },
            }),
      });

      // Rede de segurança: documentação não pode depender de um gatilho de
      // rolagem para ser legível. Se em 4 segundos a revelação não começou —
      // impressão, captura de página inteira, leitor que não dispara scroll —
      // saltamos para o estado final.
      const rede = window.setTimeout(() => {
        if (animacao.progress() === 0) animacao.progress(1);
      }, 4000);

      return () => { window.clearTimeout(rede); };
    },
    { scope: escopo },
  );

  return (
    <div className={className} ref={escopo}>
      {children}
    </div>
  );
}
