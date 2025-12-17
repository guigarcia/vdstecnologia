# 🚀 Guia de Deploy para HostGator

Este projeto está configurado para fazer deploy automático via FTP usando GitHub Actions.

## ✅ Opção 1: Deploy Automático via GitHub Actions (Recomendado)

### 📋 Passo a Passo

1. **Configure os Secrets no GitHub:**
   - Acesse seu repositório no GitHub
   - Vá em: `Settings` > `Secrets and variables` > `Actions`
   - Clique em `New repository secret`
   - Adicione os seguintes secrets:
     - **`FTP_SERVER`**: Seu servidor FTP (ex: `ftp.seusite.com.br` ou IP como `192.168.1.1`)
     - **`FTP_USERNAME`**: Seu usuário FTP da HostGator
     - **`FTP_PASSWORD`**: Sua senha FTP da HostGator

2. **Faça push para a branch `main`:**
   ```bash
   git add .
   git commit -m "Preparar para deploy"
   git push origin main
   ```

3. **O GitHub Actions irá automaticamente:**
   - ✅ Fazer build do projeto
   - ✅ Gerar arquivos estáticos na pasta `out/`
   - ✅ Fazer upload via FTP para a HostGator

4. **Verificar Deploy:**
   - Vá em: `Actions` no seu repositório GitHub
   - Veja o progresso do workflow `Deploy to HostGator via FTP`
   - Se houver erros, verifique os logs

### 🔧 Configuração do Servidor FTP

Na HostGator, você normalmente encontrará:
- **Servidor FTP**: `ftp.seusite.com.br` ou o IP do servidor
- **Porta**: `21` (padrão) ou `22` (SFTP)
- **Pasta de destino**: `public_html/` (raiz do site)

## 📤 Opção 2: Deploy Manual via FTP

Se preferir fazer deploy manual:

1. **Build do projeto:**
   ```bash
   npm run build
   ```

2. **A pasta `out/` será gerada com todos os arquivos estáticos**

3. **Faça upload via FTP:**
   - Conecte-se ao seu servidor FTP da HostGator (use FileZilla, WinSCP, etc.)
   - Navegue até a pasta `public_html/` (ou a pasta raiz do seu domínio)
   - Faça upload de **TODOS** os arquivos da pasta `out/` para `public_html/`
   - Mantenha a estrutura de pastas (`_next/`, `logos/`, etc.)

## ⚙️ Configurações Importantes

- ✅ O projeto está configurado para **exportação estática** (`output: 'export'`)
- ✅ As imagens estão com `unoptimized: true` para funcionar em servidores estáticos
- ✅ O trailing slash está habilitado para compatibilidade

## 🔍 Troubleshooting

### ❌ Erro de conexão FTP
- Verifique se o servidor FTP está correto
- Confirme usuário e senha
- Alguns servidores usam porta diferente (adicione `:21` ou `:22` no servidor)
- Verifique se o firewall não está bloqueando

### ❌ Arquivos não aparecem no site
- Verifique se fez upload para a pasta correta (`public_html/`)
- Confirme se há um arquivo `.htaccess` ou configuração do servidor
- Limpe o cache do navegador (Ctrl+F5)

### ❌ Erro 404 em rotas
- Certifique-se de que o servidor está configurado para servir arquivos estáticos
- Pode ser necessário criar um `.htaccess` na HostGator com:
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
  ```

### ❌ Build falha no GitHub Actions
- Verifique se todas as dependências estão no `package.json`
- Confirme se o Node.js versão 20 está sendo usado
- Veja os logs completos na aba `Actions`

## 📁 Estrutura de Arquivos no Servidor

Após o deploy, sua estrutura na HostGator deve ficar assim:

```
public_html/
├── _next/
│   ├── static/
│   └── ...
├── logos/
│   ├── VDS AI Orange.png
│   ├── aws-color.svg
│   └── ...
├── index.html
├── favicon.ico
└── ...outros arquivos
```

## 🎯 Próximos Passos

1. Configure os secrets no GitHub
2. Faça push para `main`
3. Aguarde o deploy automático
4. Acesse seu site e verifique se está funcionando!

## 📞 Suporte

Se tiver problemas:
- Verifique os logs do GitHub Actions
- Confirme as credenciais FTP na HostGator
- Teste a conexão FTP manualmente primeiro

