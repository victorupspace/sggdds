import type { CSSProperties, ReactNode } from 'react';

/**
 * Shared scaffolding for the SwiftUI and Android showcase stories.
 *
 * Storybook runs in the browser and cannot execute SwiftUI or Android code, so
 * these stories render a **token-driven visual reference** (the shared web
 * rendering, which the native components are built to match) inside a decorative
 * device frame, next to the real native source — the source of truth. The banner
 * makes that contract explicit. The frames are purely aesthetic.
 */

type Platform = 'SwiftUI' | 'Android';

interface DeviceSpec {
  name: string;
  width: number;
  bezel: number;
  radius: number;
  screenRadius: number;
  statusHeight: number;
  screenMinHeight: number;
}

const device: Record<Platform, DeviceSpec> = {
  SwiftUI: { name: 'iPhone 17 Pro Max', width: 300, bezel: 12, radius: 56, screenRadius: 44, statusHeight: 44, screenMinHeight: 460 },
  Android: { name: 'Samsung Galaxy S26', width: 300, bezel: 8, radius: 38, screenRadius: 32, statusHeight: 32, screenMinHeight: 470 },
};

const platformAccent: Record<Platform, string> = {
  SwiftUI: '#0a84ff',
  Android: '#3ddc84',
};

export function NativeNote({ platform }: { platform: Platform }) {
  return (
    <div
      style={{
        borderInlineStart: `4px solid ${platformAccent[platform]}`,
        background: 'var(--ds-primitive-color-neutral-grey-100, #f5f5f5)',
        borderRadius: 8,
        color: 'var(--ds-primitive-color-soft-black, #292929)',
        fontSize: 13,
        lineHeight: 1.5,
        boxSizing: 'border-box',
        width: '100%',
        padding: '12px 16px',
      }}
    >
      <strong>Referência visual gerada a partir dos tokens.</strong> Esta pré-visualização
      é o rendering web compartilhado dentro de um frame de {device[platform].name} (apenas
      estética). O componente {platform} foi construído para espelhá-la, mas este não é o
      runtime {platform} — a fonte da verdade é o código nativo abaixo.
    </div>
  );
}

function StatusBar({ height }: { height: number }) {
  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height,
    flex: '0 0 auto',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--ds-primitive-color-soft-black, #292929)',
    padding: '0 22px',
  };
  return (
    <div style={style}>
      <span>9:41</span>
      <span style={{ letterSpacing: 1.5 }}>● ● ● ▮</span>
    </div>
  );
}

export function DeviceFrame({ platform, children }: { platform: Platform; children: ReactNode }) {
  const spec = device[platform];

  const notch =
    platform === 'SwiftUI' ? (
      <div
        style={{
          position: 'absolute',
          top: spec.bezel + 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 104,
          height: 30,
          background: '#050506',
          borderRadius: 18,
          zIndex: 2,
        }}
      />
    ) : (
      <div
        style={{
          position: 'absolute',
          top: spec.bezel + 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 11,
          height: 11,
          background: '#050506',
          borderRadius: '50%',
          zIndex: 2,
          boxShadow: '0 0 0 2px #1a1a1c',
        }}
      />
    );

  return (
    <div
      style={{
        position: 'relative',
        width: spec.width + spec.bezel * 2,
        padding: spec.bezel,
        background: 'linear-gradient(150deg, #3a3a3d, #101012)',
        borderRadius: spec.radius,
        boxShadow: '0 18px 40px rgba(0,0,0,0.28), inset 0 0 0 2px #050506',
      }}
    >
      {notch}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: spec.screenMinHeight,
          background: 'var(--ds-primitive-color-white, #ffffff)',
          borderRadius: spec.screenRadius,
          overflow: 'hidden',
        }}
      >
        <StatusBar height={spec.statusHeight} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 16,
            padding: '24px 22px 40px',
            fontFamily:
              'var(--ds-primitive-typography-font-family-plus-jakarta-sans), Inter, system-ui, sans-serif',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// --- Lightweight syntax highlighting (no dependency) -------------------------

type Language = 'Swift' | 'Kotlin' | 'XML';

interface Rule {
  type: keyof typeof tokenColor;
  re: RegExp;
}

const tokenColor = {
  comment: '#6a9955',
  string: '#ce9178',
  keyword: '#569cd6',
  type: '#4ec9b0',
  property: '#dcdcaa',
  number: '#b5cea8',
  attr: '#9cdcfe',
  punctuation: '#9aa0a6',
  plain: '#e6e6e6',
} as const;

const codeRules = (keywords: string): Rule[] => [
  { type: 'comment', re: /\/\/[^\n]*/y },
  { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
  { type: 'keyword', re: new RegExp(`\\b(?:${keywords})\\b`, 'y') },
  { type: 'property', re: /\.[A-Za-z_][A-Za-z0-9_]*/y },
  { type: 'type', re: /\b[A-Z][A-Za-z0-9_]*\b/y },
  { type: 'number', re: /\b\d+(?:\.\d+)?\b/y },
  { type: 'punctuation', re: /[{}()[\].,:;=&|]/y },
];

const ruleSets: Record<Language, Rule[]> = {
  Swift: codeRules('let|var|func|struct|class|enum|true|false|nil|self|in|if|else|return|public|private|init'),
  Kotlin: codeRules('val|var|fun|object|class|true|false|null|apply|context|if|else|return|private|public'),
  XML: [
    { type: 'comment', re: /<!--[\s\S]*?-->/y },
    { type: 'string', re: /"(?:[^"\\]|\\.)*"/y },
    { type: 'attr', re: /[A-Za-z_][\w.:-]*(?==)/y },
    { type: 'type', re: /<\/?[A-Za-z_][\w.:-]*/y },
    { type: 'punctuation', re: /\/?>|=/y },
  ],
};

interface Token {
  type: keyof typeof tokenColor;
  value: string;
}

function tokenize(code: string, rules: Rule[]): Token[] {
  const tokens: Token[] = [];
  let plain = '';
  let i = 0;

  while (i < code.length) {
    let matched = false;
    for (const rule of rules) {
      rule.re.lastIndex = i;
      const result = rule.re.exec(code);
      if (result === null) {
        continue;
      }
      if (result.index !== i || result[0].length === 0) {
        continue;
      }
      if (plain) {
        tokens.push({ type: 'plain', value: plain });
        plain = '';
      }
      tokens.push({ type: rule.type, value: result[0] });
      i += result[0].length;
      matched = true;
      break;
    }
    if (!matched) {
      plain += code[i];
      i += 1;
    }
  }
  if (plain) {
    tokens.push({ type: 'plain', value: plain });
  }
  return tokens;
}

export function CodeBlock({ language, code }: { language: Language; code: string }) {
  const tokens = tokenize(code, ruleSets[language]);

  return (
    <figure style={{ margin: 0, width: '100%' }}>
      <figcaption
        style={{
          alignItems: 'center',
          background: '#23232a',
          borderRadius: '10px 10px 0 0',
          color: '#a8a8b3',
          display: 'flex',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 11,
          gap: 8,
          letterSpacing: 0.6,
          padding: '8px 16px',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ color: '#ff5f57' }}>●</span>
        <span style={{ color: '#febc2e' }}>●</span>
        <span style={{ color: '#28c840' }}>●</span>
        <span style={{ marginInlineStart: 8 }}>{language}</span>
      </figcaption>
      <pre
        style={{
          background: '#1d1d22',
          borderRadius: '0 0 10px 10px',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 13,
          lineHeight: 1.65,
          margin: 0,
          overflowX: 'auto',
          padding: '16px 18px',
        }}
      >
        <code style={{ color: tokenColor.plain }}>
          {tokens.map((token, index) => (
            <span key={index} style={{ color: tokenColor[token.type], whiteSpace: 'pre' }}>
              {token.value}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export function Showcase({
  platform,
  code,
  language,
  children,
}: {
  platform: Platform;
  code: string;
  language: Language;
  children: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <DeviceFrame platform={platform}>{children}</DeviceFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <NativeNote platform={platform} />
        <CodeBlock language={language} code={code} />
      </div>
    </div>
  );
}
