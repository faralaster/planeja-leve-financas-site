# Diário Financeiro Kakeibo — Landing Page de Vendas (Redesign Premium)

Data: 2026-08-09

## Contexto

O repositório `planeja-leve-financas-site` hoje (branch `main`) publica uma página institucional simples (hero + 3 cards + nota sobre integração com a API do Pinterest), em HTML/CSS puro, sem build, deployada estática no Netlify (`publish = "."`).

Existe uma PR draft não mesclada (#1, branch `claude/como-criar-site-vgjx8z`) que implementou uma landing de vendas do produto **Diário Financeiro Kakeibo** como página separada, movendo a institucional para `/sobre/`. Essa PR não será usada como base: o escopo real é **uma página única de vendas**, substituindo a home atual. A página institucional/Pinterest não terá rota própria — a única página adicional mantida é a Política de Privacidade (exigida por lei e pelo próprio prompt de copy), que já cobre a divulgação do uso da API do Pinterest.

## Objetivo

Reconstruir a home como landing page de vendas de rolagem única (sem menu, sem múltiplas páginas) para o Diário Financeiro Kakeibo, com visual premium/sofisticado e acolhedor, usando componentes shadcn dos registries `originkit.dev/templates`, `skiper-ui.com` e `cult-ui.com`, e animações sutis com Motion (motion.dev).

## Não-objetivos

- Não criar order bump, upsell, ou etapas extras de checkout.
- Não inventar valor de referência riscado ("de R$X por R$9,90").
- Não prometer resultado financeiro específico.
- Não manter a página institucional/Pinterest como rota separada.
- Não implementar o link real do Kirvano nem trocar as imagens reais do produto — ambos chegam depois; a página fica pronta para receber esses dois inputs com o mínimo de fricção.

## Arquitetura

- **Stack**: Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Motion for React.
- **Roteamento**: nenhum client router. Build multi-página do Vite (`vite.config.ts` com `build.rollupOptions.input` apontando para `index.html` e `politica-de-privacidade/index.html`), preservando a estrutura de URLs atual (`/` e `/politica-de-privacidade/`).
- **Deploy**: Netlify passa a rodar `npm run build` e publicar `dist/` (hoje publica a raiz estática). Headers de segurança atuais do `netlify.toml` são preservados.
- **Formulário de e-mail**: mantém `data-netlify="true"` + campo honeypot, compatível com Netlify Forms, mesmo dentro do componente React (form estático renderizado, sem submit via JS/fetch).

## Sistema de design

- **Cores**: tokens Tailwind extraídos 1:1 dos valores atuais — `ink #173c35`, `muted #567068`, `paper #f8f5ed`, `mint #d9eadf`, `green #2f6758`, `gold #c4a86a`, `line rgba(23,60,53,.16)`. Nenhum valor de cor novo é introduzido.
- **Tipografia**: título/headline em serifada quente (Fraunces, via Google Fonts), corpo e UI em Inter (mantido). Escala tipográfica generosa nos títulos (`clamp` fluido, como hoje).
- **Textura/decoração**: gradiente radial sutil de fundo (já existe hoje) preservado; elementos decorativos discretos (folhas) como SVG inline leve, sem dependência de biblioteca de ícones pesada além do necessário.
- **Direção visual**: "Editorial Warmth" — espaçamento generoso, cards com leve profundidade no hover (não glassmorphism pesado), divisores finos dourados, sem gradientes vibrantes ou efeitos "tech/SaaS".

## Estrutura da página (ordem final, copy verbatim do prompt do usuário)

1. **Hero** — headline "Kakeibo: o método japonês de 30 dias pra sair do piloto automático financeiro", subheadline sobre não conectar conta bancária, imagem da capa (placeholder), CTA "Quero organizar minhas finanças" com scroll suave até a seção de oferta.
2. **Reconhecimento da dor** — 4 perguntas em tom de conversa, reveal escalonado ao entrar na viewport, fechamento sobre "não é falta de força de vontade".
3. **Agitação** — bloco de citação/destaque, texto grande, acento dourado.
4. **Solução** — texto explicando o método + preview de 2-3 páginas reais do produto (placeholders de imagem).
5. **Oferta** — título "Tudo isso por R$ 9,90", checklist honesto (5 itens do prompt), sem valor inflado.
6. **Captura de e-mail** — posicionada logo após a oferta, campo de e-mail + checkbox de consentimento LGPD + link para política de privacidade, integrado ao Netlify Forms.
7. **Prova social** — selo de compra segura + frase de transparência sobre a origem do método Kakeibo.
8. **Garantia** — banner "7 dias, sem perguntas", com referência ao CDC art. 49.
9. **FAQ** — accordion com as 5 perguntas/respostas do prompt.
10. **CTA final** — headline reduzida + botão de compra centralizado.
11. **Rodapé** — marca, link para Política de Privacidade, contato.

Todos os textos são copiados verbatim do prompt original do usuário — nenhuma reescrita de copy.

## Mapeamento de componentes (registries)

| Seção | Componente base | Origem |
|---|---|---|
| Hero | Hero section template | originkit.dev/templates |
| Botões CTA (hero, oferta, final) | Button com micro-brilho/hover | skiper-ui.com |
| Reconhecimento da dor | Lista com stagger reveal | custom (Motion), estrutura de card cult-ui.com |
| Solução (galeria de páginas) | Galeria/preview de imagens | originkit.dev/templates ou skiper-ui.com (o que tiver melhor fit) |
| Oferta | Card de checklist/pricing | shadcn Card + Check icon |
| Captura de e-mail | Input + Checkbox | shadcn/ui |
| Garantia | Badge/banner com ícone de escudo | shadcn/ui |
| FAQ | Accordion | shadcn/ui |

A escolha exata de qual componente de cada registry usar (quando há mais de uma opção equivalente) fica a critério de implementação, desde que a paleta e a estrutura de copy acima sejam respeitadas.

## Animações

Motion for React: fade + slide sutil no scroll-reveal de cada seção; stagger nos itens de lista (dor, oferta, FAQ); hover de leve elevação/brilho nos CTAs. Todas as animações respeitam `prefers-reduced-motion: reduce` (desativa ou reduz drasticamente o movimento).

## Placeholders e pendências

- **Imagens do produto** (capa do Diário, capas dos 2 bônus, prints internos): placeholder visual com moldura tracejada + ícone, proporção compatível com o formato final, fácil substituição futura (um único ponto de import por imagem).
- **Link de checkout Kirvano**: botões de CTA (`#cta-oferta`, `#cta-final`) com `href="#"` e comentário `TODO: link Kirvano`.

## Acessibilidade e compliance

- Estrutura semântica (`main`, `section`, `h1`/`h2` hierárquicos, `nav` ausente por design — página sem menu).
- Formulário de e-mail com `label` associado e checkbox de consentimento LGPD explícito, linkando para a Política de Privacidade.
- Garantia com texto legal preciso (CDC art. 49), sem exagero de marketing.
- Política de Privacidade mantida como página separada, atualizada para cobrir e-mail (LGPD) e checkout (Kirvano), além da integração já existente com o Pinterest.

## Plano de testes

- Build local (`npm run build`) e verificação de rotas geradas (`/` e `/politica-de-privacidade/`).
- Checagem visual via preview local (Vite dev server) das seções em desktop e mobile.
- Verificação de que `prefers-reduced-motion` desativa as animações.
- Lighthouse/aXe básico para contraste de cor (paleta já validada hoje) e semântica.
