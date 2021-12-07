FROM nginx:alpine

RUN apk --no-cache update && apk --no-cache upgrade && apk add --no-cache ca-certificates tzdata

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx dist/spa /www/site

COPY env_to_config.sh /
RUN chmod +x /env_to_config.sh

CMD ["sh", "-c", "/env_to_config.sh", "&&", "nginx", "-g", "daemon off;"]
