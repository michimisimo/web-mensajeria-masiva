# Usa una imagen base de Nginx
FROM nginx:alpine

# Copia el archivo de configuración de Nginx al contenedor
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos de tu aplicación al contenedor
COPY ./dist/proyecto_arq/browser /usr/share/nginx/html

# Exponer el puerto 8080
EXPOSE 8080