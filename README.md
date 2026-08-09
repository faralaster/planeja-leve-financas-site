# Planeja Leve Finanças — Diário Financeiro Kakeibo

Landing page de vendas de página única para o Diário Financeiro Kakeibo (R$ 9,90),
construída com Vite + React + TypeScript + Tailwind CSS v4 + shadcn-style UI
primitives + Motion.

## Páginas

- `/` — landing page de vendas (Hero, reconhecimento da dor, agitação, solução,
  oferta, captura de e-mail, prova social, garantia, FAQ, CTA final, rodapé).
- `/politica-de-privacidade/` — Política de Privacidade (e-mail/LGPD, pagamento
  via Kirvano, integração com a API do Pinterest).

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm run test     # testes (Vitest + Testing Library)
npm run build    # build de produção em dist/
```

## Deploy

Netlify roda `npm run build` e publica `dist/` (ver `netlify.toml`).

## Pendências conhecidas

- Imagens reais do produto (capa do Diário + 2 bônus + páginas internas) — hoje
  são placeholders (`ImagePlaceholder`).
- Link de checkout do Kirvano — os botões de compra (`#cta-oferta`, `#cta-final`)
  estão com `href="#"` e um comentário `TODO: link Kirvano`.
