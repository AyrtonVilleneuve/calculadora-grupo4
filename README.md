# Projeto Fase 1 — Calculadora em JavaScript

## 1. Link do Repositório
[https://github.com/AyrtonVilleneuve/calculadora-grupo4](https://github.com/AyrtonVilleneuve/calculadora-grupo4)

## 2. Informações do Projeto
- **Nome:** Calculadora em JavaScript
- **Descrição:** Projeto simples que realiza operações matemáticas básicas (soma, subtração, multiplicação, divisão).

- **Execução local:**
  1. Clone o repositório ou baixe o ZIP.
  2. Abra o arquivo `index.html` em qualquer navegador.


## 3. Dificuldades Encontradas
- **Autenticação no GitHub** → resolvido usando **Personal Access Token (PAT)** em vez de senha.
- **Configuração do GitHub Actions** → inicialmente o workflow falhou por estar na pasta errada (`assets/.github`), depois corrigido para `.github/workflows`.

## 4. Passo a Passo: Runners e Jenkins

### 4.1 GitHub Actions
- Criado arquivo `.github/workflows/ci.yml` com steps de *checkout*, verificação de arquivos e upload de artefatos.
- O **runner** utilizado foi o `ubuntu-latest` (runner compartilhado do GitHub).
- Logs e artefatos podem ser visualizados na aba **Actions** do repositório.

### 4.2 Jenkins
1. Instalar **Java 17** e o **Jenkins LTS** no Windows.  
2. Acessar `http://localhost:8080`, usar a senha inicial e criar usuário admin.  
3. Criar credenciais (se o repo for privado) → GitHub PAT.  
4. Criar um novo item **Pipeline**, escolher **Pipeline script from SCM**, informar a URL do repositório e branch `main`.  
5. Jenkins encontra e executa o `Jenkinsfile`, rodando os stages:
   - **Checkout**: clona o repositório.
   - **Sanity checks**: lista arquivos e confirma presença de `index.html`.
   - **Archive**: gera pasta `dist/` e salva como artefato.






