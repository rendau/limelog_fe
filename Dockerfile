FROM nginx:alpine

RUN apk --no-cache update && apk --no-cache upgrade && apk add --no-cache ca-certificates tzdata

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx dist/spa /www/site

COPY nginx_cmd.sh /
RUN chmod +x /nginx_cmd.sh

CMD ["/nginx_cmd.sh"]
