FROM nginx:alpine

# Eliminar la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Instalar curl para el healthcheck
RUN apk add --no-cache curl

# Copiar nuestra configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/

# Copiar el contenido estático
COPY . /usr/share/nginx/html

# Asegurar permisos correctos (importante cuando se construye desde Windows)
RUN chmod -R 755 /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
