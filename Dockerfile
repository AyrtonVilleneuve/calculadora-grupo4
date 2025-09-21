# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Remove configurações padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos da sua aplicação para o Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80 (padrão HTTP)
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
