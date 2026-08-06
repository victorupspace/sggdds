import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Suporte',
  description:
    'Como pedir ajuda, reportar um defeito ou propor mudança no Sampa Design System, e o que ainda não está definido.',
};

const REPO = 'https://github.com/victorupspace/sggdds';

export default function PaginaSuporte() {
  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Recursos', href: '/recursos/ferramentas' }, { titulo: 'Suporte' }]} />

      <h1>Suporte</h1>
      <p className="wiki-prosa__resumo">
        Onde levar cada tipo de problema, o que incluir no pedido e o que ainda não tem canal
        definido.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Os canais oficiais ainda não foram definidos</p>
        <p>
          Não existe canal de atendimento, acordo de nível de serviço nem pessoa responsável
          formalmente designada para o Sampa Design System. O único caminho que funciona hoje é o
          repositório público. Esta página será atualizada quando a governança for definida — ver{' '}
          <Link href="/introducao/governanca">Governança</Link>.
        </p>
      </div>

      <h2 id="onde-levar">Onde levar cada problema</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Encaminhamento por tipo de problema</caption>
          <thead>
            <tr>
              <th scope="col">Situação</th>
              <th scope="col">Onde levar</th>
              <th scope="col">O que incluir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>O componente tem um defeito de comportamento</td>
              <td>
                <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
                  Issue no repositório ↗
                </a>
              </td>
              <td>
                Componente, o que você esperava, o que aconteceu, navegador, e o link da story do
                Storybook que reproduz
              </td>
            </tr>
            <tr>
              <td>O design no Figma e o código não batem</td>
              <td>
                <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
                  Issue no repositório ↗
                </a>
              </td>
              <td>Node-id do Figma, arquivo do código e a diferença observada</td>
            </tr>
            <tr>
              <td>Falta um componente para o que preciso fazer</td>
              <td>
                <Link href="/introducao/contribua">Proposta de componente</Link>
              </td>
              <td>O problema que você precisa resolver — não a solução que você imaginou</td>
            </tr>
            <tr>
              <td>Erro nesta documentação</td>
              <td>
                <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
                  Issue no repositório ↗
                </a>
              </td>
              <td>A URL da página e o trecho errado</td>
            </tr>
            <tr>
              <td>Dúvida de uso</td>
              <td>Sem canal definido</td>
              <td>
                Consulte a página do componente e o Storybook; se a dúvida persistir, ela é um sinal
                de que a documentação falhou — abra uma issue dizendo isso
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="bom-relato">O que faz um bom relato de defeito</h2>
      <ol>
        <li>
          <strong>Um link que reproduz.</strong> Toda story do Storybook tem URL própria. Abrir o
          exemplo isolado e colar o link economiza metade da conversa.
        </li>
        <li>
          <strong>O que você esperava.</strong> Nem sempre é óbvio: o que parece defeito às vezes é
          comportamento documentado.
        </li>
        <li>
          <strong>O contexto real.</strong> Qual serviço, qual tela, quantas pessoas afetadas. Isso
          define a prioridade.
        </li>
        <li>
          <strong>Se é bloqueante.</strong> Diga explicitamente se existe contorno possível.
        </li>
      </ol>

      <h2 id="acessibilidade">Problemas de acessibilidade</h2>
      <p>
        Barreira de acessibilidade em serviço público é impedimento de acesso a um direito, não
        melhoria. Ao relatar, informe a tecnologia assistiva usada, o passo em que a barreira
        aparece e o critério da WCAG afetado, se você souber. Ver{' '}
        <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
      </p>

      <h2 id="pendencias">O que ainda não existe</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> canal de atendimento (e-mail, chat ou fórum), acordo de nível
        de serviço por severidade, pessoa ou equipe responsável, e rito de triagem de issues —
        fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
