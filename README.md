# Desafio Aprovação — Código-fonte disponível (10/10/2026)

Plataforma de estudos para concursos e vestibulares, com modo INSS Técnico do Seguro Social (edital 2022), simulados, histórico de respostas e opções de treino.

**Site publicado no ChatGPT Sites:** https://desafio-aprovacao-willian.willianrafael732.chatgpt.site

> **Sobre esta cópia:** os arquivos deste repositório foram recuperados do último ZIP de código disponibilizado pelo autor em 10/10/2026 (`Desafio_Aprovacao_INSS_2022_Etica(1).zip`). A versão hospedada no ChatGPT Sites recebeu alterações posteriores e não pôde ser exportada automaticamente devido à exigência de autenticação do endereço. Portanto, os códigos podem não corresponder exatamente à versão online.

## Executar localmente

Abra `index.html` diretamente no navegador. Para testes com servidor HTTP local:

```bash
python -m http.server 8000
```

Acesse http://localhost:8000. O progresso é salvo no navegador (localStorage).

## Páginas

- `index.html`: início, concursos, vestibulares, simulados e biblioteca de questões;
- `inss-etica.html`: resumo e questões sobre Ética no Serviço Público para INSS (edital 2022).

O projeto contém questões de várias fontes e questões elaboradas para prática. Os **32 itens de Ética são autorais**, e **não** questões oficiais do INSS. Verifique o ano do edital e a origem de cada questão antes de tratá-la como oficial.

## Publicação

Os arquivos podem ser hospedados como site estático. O domínio `chatgpt.site` é uma hospedagem separada; alterações neste GitHub **não** atualizam automaticamente esse endereço.

## Nota sobre a exportação

No repositório, `study-tools.js` utiliza uma implementação alternativa de compatibilidade para mapa mental e impressão/salvamento de resultados em PDF. O arquivo original segue preservado no pacote ZIP do projeto fornecido pelo autor; a versão deste GitHub não é uma exportação exata do site hospedado.


## Guias de pesos e prioridades (10/10/2026)

O arquivo `vestibulares.html` reúne 10 guias separados: `vestibular-enem.html`, `vestibular-fuvest.html`, `vestibular-unicamp.html`, `vestibular-unesp.html`, `vestibular-ufpr.html`, `vestibular-uel.html`, `vestibular-uem.html`, `vestibular-uece.html`, `vestibular-ufu.html` e `vestibular-fatec.html`. Cada guia separa o dado oficial por edição, a variação de pesos por curso e a estratégia de estudo, com links das fontes. O checklist persiste no navegador. Não foram alteradas questões nem a versão privada hospedada no ChatGPT Sites.
