import { Container } from "@/components/Container"

export function PrivacyPage() {
  return (
    <main>
      <Container className="max-w-[820px] py-20">
        <span className="w-fit rounded-full border border-gold px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-[#6d5b31]">
          Transparência
        </span>
        <h1 className="mt-6 font-display text-[clamp(38px,6vw,64px)] text-ink">Política de Privacidade</h1>
        <p className="mt-2 font-mono text-xs text-muted">Última atualização: 9 de agosto de 2026</p>

        <div className="mt-12 space-y-10 text-muted [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ink [&_li]:mt-2 [&_p]:leading-relaxed">
          <section>
            <h2>1. Quem somos e o que este site faz</h2>
            <p>
              Este site é operado pela Planeja Leve Finanças e é uma página única de vendas do
              Diário Financeiro Kakeibo. Ele também mantém uma integração privada de uso interno
              com a API do Pinterest e um formulário opcional de captura de e-mail.
            </p>
          </section>

          <section>
            <h2>2. Dados que coletamos</h2>
            <ul>
              <li>E-mail: apenas se você preencher voluntariamente o formulário de novidades.</li>
              <li>
                Dados de pagamento: processados inteiramente pelo Kirvano no momento da compra do
                Diário Financeiro Kakeibo.
              </li>
              <li>
                Dados da integração com a API do Pinterest: informações básicas da conta, Pins e
                pastas necessários para administrar exclusivamente a conta da Planeja Leve
                Finanças.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Compra e processamento de pagamento (Kirvano)</h2>
            <p>
              O checkout do Diário Financeiro Kakeibo é processado pelo Kirvano. Não armazenamos
              dados de cartão ou de pagamento em nossos próprios sistemas — essas informações
              ficam exclusivamente com o Kirvano, responsável pelo processamento seguro da
              transação.
            </p>
          </section>

          <section>
            <h2>4. E-mail e consentimento (LGPD)</h2>
            <p>
              Só enviamos e-mails com novidades e conteúdo sobre organização financeira para quem
              marcar o checkbox de consentimento no formulário. Você pode revogar esse
              consentimento a qualquer momento, pelo link de descadastro presente em cada e-mail
              enviado.
            </p>
          </section>

          <section>
            <h2>5. Integração com o Pinterest</h2>
            <p>
              A integração auxilia na criação e programação de Pins previamente selecionados pelo
              titular e na consulta dos próprios Pins e pastas. Não solicitamos nem armazenamos a
              senha do Pinterest e não acessamos contas de terceiros. Nenhum dado recebido da API
              é vendido ou compartilhado com terceiros.
            </p>
          </section>

          <section>
            <h2>6. Armazenamento e segurança</h2>
            <p>
              Não mantemos cópias permanentes de dados de Pins ou pastas obtidos pela API. As
              credenciais de acesso são mantidas em ambiente privado, com acesso restrito ao
              titular.
            </p>
          </section>

          <section>
            <h2>7. Seus direitos (LGPD)</h2>
            <p>
              Você pode solicitar acesso, correção ou exclusão do seu e-mail em nossa lista, e
              revogar seu consentimento a qualquer momento, entrando em contato pelo canal
              indicado abaixo.
            </p>
          </section>

          <section>
            <h2>8. Contato</h2>
            <p>
              Dúvidas sobre esta política podem ser encaminhadas pelo perfil público{" "}
              <a
                href="https://br.pinterest.com/planejalevefinancas/"
                target="_blank"
                rel="noreferrer"
                className="text-green underline underline-offset-2"
              >
                @planejalevefinancas
              </a>
              .
            </p>
          </section>

          <section>
            <h2>9. Alterações</h2>
            <p>
              Esta política poderá ser atualizada para refletir mudanças no site, na oferta ou nas
              regras aplicáveis. A data da revisão mais recente permanece indicada no início desta
              página.
            </p>
          </section>
        </div>

        <a href="/" className="mt-16 inline-block text-green underline underline-offset-2">
          Voltar ao início
        </a>
      </Container>
    </main>
  )
}
