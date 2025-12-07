FROM bluenviron/mediamtx:latest-ffmpeg

RUN apk update && apk add --no-cache tini && rm -f /var/cache/apk/*

COPY docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
