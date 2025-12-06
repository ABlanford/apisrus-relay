FROM bluenviron/mediamtx:latest-ffmpeg

LABEL maintainer="APIs R Us"
LABEL description="FeedView Relay - Convert RTSP cameras to Lightning-payable HLS streams"

ENV PUID=1000
ENV PGID=1000

COPY docker_entrypoint.sh /docker_entrypoint.sh
RUN chmod +x /docker_entrypoint.sh

EXPOSE 8554
EXPOSE 8888
EXPOSE 8889

VOLUME /data

ENTRYPOINT ["/docker_entrypoint.sh"]
