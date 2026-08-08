# Planeja Leve Finanças

Site estático da Planeja Leve Finanças, publicado diretamente pelo Netlify (sem comando de build; diretório de publicação é a raiz do repositório).

## Páginas

- `/` — landing page de vendas do **Diário Financeiro Kakeibo** (`index.html`, `kakeibo.css`).
- `/sobre/` — página institucional da marca, incluindo a divulgação exigida pela integração com a API do Pinterest.
- `/politica-de-privacidade/` — política de privacidade (captura de e-mail, compra via Kirvano e integração com o Pinterest).

## Pendências na landing page do Kakeibo

- **Imagens do produto**: os espaços de imagem (capa do Diário, capas dos 2 bônus e prints das páginas internas) estão como placeholders tracejados (`.img-slot`) em `index.html`, esperando os arquivos reais.
- **Link de checkout (Kirvano)**: os dois botões de compra (`#cta-oferta` e `#cta-final`) estão com `href="#"` e um comentário `TODO` no HTML — trocar pelo link real assim que disponível.
