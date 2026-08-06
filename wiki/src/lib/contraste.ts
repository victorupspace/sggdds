/**
 * Cálculo de contraste segundo a WCAG 2.1 (relative luminance + contrast ratio).
 * Usado para auditar a paleta na própria Wiki, em vez de afirmar conformidade
 * sem medir.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function paraRgb(cor: string): Rgb | null {
  const limpa = cor.trim().toLowerCase();

  const hex = /^#([0-9a-f]{3,8})$/.exec(limpa);
  if (hex) {
    // O grupo de captura é obrigatório na regex, então hex[1] sempre existe
    // quando `hex` é truthy; o `?? ''` só satisfaz noUncheckedIndexedAccess.
    let d = hex[1] ?? '';
    if (d.length === 3) d = d.split('').map((c) => c + c).join('');
    if (d.length === 6) d += 'ff';
    if (d.length !== 8) return null;
    return {
      r: parseInt(d.slice(0, 2), 16),
      g: parseInt(d.slice(2, 4), 16),
      b: parseInt(d.slice(4, 6), 16),
      a: parseInt(d.slice(6, 8), 16) / 255,
    };
  }

  const rgba = /^rgba?\(([^)]+)\)$/.exec(limpa);
  if (rgba) {
    const partes = (rgba[1] ?? '').split(/[,/\s]+/).filter(Boolean).map(Number);
    const [r, g, b, a] = partes;
    if (partes.length < 3 || partes.some(Number.isNaN) || r === undefined || g === undefined || b === undefined) {
      return null;
    }
    return { r, g, b, a: a ?? 1 };
  }

  return null;
}

/** Achata uma cor com alfa sobre um fundo opaco. */
export function sobrepor(frente: Rgb, fundo: Rgb): Rgb {
  return {
    r: frente.r * frente.a + fundo.r * (1 - frente.a),
    g: frente.g * frente.a + fundo.g * (1 - frente.a),
    b: frente.b * frente.a + fundo.b * (1 - frente.a),
    a: 1,
  };
}

export function luminancia({ r, g, b }: Rgb): number {
  const canal = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

const BRANCO: Rgb = { r: 255, g: 255, b: 255, a: 1 };

export function razaoDeContraste(corA: string, corB: string): number | null {
  const a = paraRgb(corA);
  const b = paraRgb(corB);
  if (!a || !b) return null;

  const planaA = a.a < 1 ? sobrepor(a, BRANCO) : a;
  const planaB = b.a < 1 ? sobrepor(b, BRANCO) : b;
  const l1 = luminancia(planaA);
  const l2 = luminancia(planaB);
  const [maior, menor] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (maior + 0.05) / (menor + 0.05);
}

export type NivelWcag = 'AAA' | 'AA' | 'AA-grande' | 'reprova';

export function classificar(razao: number, textoGrande = false): NivelWcag {
  if (textoGrande) {
    if (razao >= 4.5) return 'AAA';
    if (razao >= 3) return 'AA';
    return 'reprova';
  }
  if (razao >= 7) return 'AAA';
  if (razao >= 4.5) return 'AA';
  if (razao >= 3) return 'AA-grande';
  return 'reprova';
}

export function formatarRazao(razao: number): string {
  return `${razao.toFixed(2).replace('.', ',')}:1`;
}

/** Versão curta para uso em cartão: sem casas decimais desnecessárias. */
export function formatarRazaoCurta(razao: number): string {
  const arredondado = Math.round(razao * 10) / 10;
  const texto = Number.isInteger(arredondado)
    ? String(arredondado)
    : arredondado.toFixed(1).replace('.', ',');
  return `${texto}:1`;
}

/** Contraste ideal de texto (preto ou branco) sobre um fundo. */
export function tintaLegivel(fundo: string): '#000000' | '#ffffff' {
  const comPreto = razaoDeContraste(fundo, '#000000') ?? 1;
  const comBranco = razaoDeContraste(fundo, '#ffffff') ?? 1;
  return comPreto >= comBranco ? '#000000' : '#ffffff';
}
