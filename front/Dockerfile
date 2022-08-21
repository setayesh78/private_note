FROM nginx:latest
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./index1.html /usr/share/nginx/html/index1.html
COPY ./index2.html /usr/share/nginx/html/index2.html
COPY ./index3.html /usr/share/nginx/html/index3.html

COPY ./myscripts.js /usr/share/nginx/html/myscripts.js
COPY ./style.css /usr/share/nginx/html/style.css
COPY ./front.conf /etc/nginx/conf.d/
RUN rm -f /etc/nginx/conf.d/default.conf
