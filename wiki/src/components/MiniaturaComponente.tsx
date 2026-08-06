/**
 * Miniaturas dos componentes para a home.
 *
 * Uma home de sistema de design tem de MOSTRAR os componentes, não listar seus
 * nomes. Como o pacote React ainda não está no npm, a Wiki não pode importá-lo:
 * estas miniaturas são reproduções em HTML e CSS, montadas com os mesmos tokens
 * do sistema.
 *
 * São ilustrações, não os componentes reais — por isso ficam fora da árvore de
 * acessibilidade (`aria-hidden`) e não recebem foco. Quem quiser o componente
 * de verdade, rodando, encontra na página dele: cada miniatura é um link.
 */
export function MiniaturaComponente({ slug }: { slug: string }) {
  const desenho = DESENHOS[slug];
  if (!desenho) return null;

  return (
    <span aria-hidden="true" className="wiki-mini">
      {desenho}
    </span>
  );
}

/** Os oito componentes em destaque na home têm miniatura desenhada. */
export function temMiniatura(slug: string): boolean {
  return slug in DESENHOS;
}

const LINHAS_TABELA = [
  { protocolo: '2026-0431', servico: 'IPVA', situacao: 'Pago', tom: 'verde' },
  { protocolo: '2026-0432', servico: 'Licenciamento', situacao: 'Em análise', tom: 'amarelo' },
  { protocolo: '2026-0433', servico: 'Multa', situacao: 'Vencido', tom: 'vermelho' },
];

const DESENHOS: Record<string, React.ReactElement> = {
  button: (
    <span className="wiki-mini__palco wiki-mini__palco--centro">
      <span className="wiki-mini__botao">Enviar</span>
      <span className="wiki-mini__botao wiki-mini__botao--fantasma">Cancelar</span>
    </span>
  ),

  'text-input': (
    <span className="wiki-mini__palco">
      <span className="wiki-mini__rotulo">CPF</span>
      <span className="wiki-mini__campo">000.000.000-00</span>
      <span className="wiki-mini__dica">Somente números</span>
    </span>
  ),

  alert: (
    <span className="wiki-mini__palco">
      <span className="wiki-mini__alerta">
        <span className="wiki-mini__alerta-faixa" />
        <span className="wiki-mini__alerta-corpo">
          <span className="wiki-mini__alerta-titulo">Solicitação enviada</span>
          <span className="wiki-mini__alerta-texto" />
          <span className="wiki-mini__alerta-texto wiki-mini__alerta-texto--curta" />
        </span>
      </span>
    </span>
  ),

  card: (
    <span className="wiki-mini__palco">
      <span className="wiki-mini__cartao">
        <span className="wiki-mini__cartao-capa" />
        <span className="wiki-mini__cartao-selo">Ativo</span>
        <span className="wiki-mini__cartao-titulo">Segunda via do IPVA</span>
        <span className="wiki-mini__cartao-texto">Emissão imediata, sem login.</span>
      </span>
    </span>
  ),

  breadcrumb: (
    <span className="wiki-mini__palco">
      <span className="wiki-mini__trilha">
        <span className="wiki-mini__trilha-elo">Início</span>
        <span className="wiki-mini__trilha-sep">/</span>
        <span className="wiki-mini__trilha-elo">Serviços</span>
        <span className="wiki-mini__trilha-sep">/</span>
        <span className="wiki-mini__trilha-elo wiki-mini__trilha-elo--atual">IPVA</span>
      </span>
    </span>
  ),

  checkbox: (
    <span className="wiki-mini__palco">
      <span className="wiki-mini__opcao">
        <span className="wiki-mini__caixa wiki-mini__caixa--marcada">
          <svg fill="none" height="12" stroke="#fff" strokeWidth="2.4" viewBox="0 0 16 16" width="12">
            <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="wiki-mini__opcao-texto">Li e concordo</span>
      </span>
      <span className="wiki-mini__opcao">
        <span className="wiki-mini__caixa" />
        <span className="wiki-mini__opcao-texto">Receber avisos</span>
      </span>
    </span>
  ),

  'data-table': (
    <span className="wiki-mini__palco">
      <span className="wiki-mini__tabela">
        <span className="wiki-mini__tabela-cab">
          <span>Protocolo</span>
          <span>Serviço</span>
          <span>Situação</span>
        </span>
        {LINHAS_TABELA.map((linha) => (
          <span className="wiki-mini__tabela-linha" key={linha.protocolo}>
            <span>{linha.protocolo}</span>
            <span>{linha.servico}</span>
            <span className={`wiki-mini__selo wiki-mini__selo--${linha.tom}`}>{linha.situacao}</span>
          </span>
        ))}
      </span>
    </span>
  ),

  modal: (
    <span className="wiki-mini__palco wiki-mini__palco--escurecido">
      <span className="wiki-mini__modal">
        <span className="wiki-mini__modal-titulo">Confirmar envio?</span>
        <span className="wiki-mini__modal-texto">Depois de enviar não dá para alterar.</span>
        <span className="wiki-mini__modal-acoes">
          <span className="wiki-mini__botao wiki-mini__botao--fantasma wiki-mini__botao--mini">
            Voltar
          </span>
          <span className="wiki-mini__botao wiki-mini__botao--mini">Confirmar</span>
        </span>
      </span>
    </span>
  ),
};
