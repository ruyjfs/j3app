FROM node:5
# RUN apk update && apk upgrade && apk add --no-cache \
#     curl bash
# RUN curl "https://install.meteor.com/" | /bin/sh
# RUN useradd meteor -G staff -m -s /bin/bash
RUN curl https://install.meteor.com/ > meteor.sh \
    && chmod 777 ./meteor.sh \ 
    && ./meteor.sh
RUN npm i -g mupx
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# USER meteor
ENV METEOR_ALLOW_SUPERUSER=true
EXPOSE 3000