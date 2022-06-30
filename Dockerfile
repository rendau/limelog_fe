FROM nginx:alpine

RUN apk --no-cache update && apk --no-cache upgrade && apk add --no-cache ca-certificates tzdata

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx dist/spa /www/site

COPY docker_cmd.sh /
RUN chmod +x /docker_cmd.sh

HEALTHCHECK --start-period=3s --interval=5s --timeout=2s --retries=2 CMD curl -f http://localhost || false

CMD ["/docker_cmd.sh"]
