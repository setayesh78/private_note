FROM python:3.6-alpine

ENV PYTHONUNBUFFERED=1

# ENV  DEFAULT_TIMEDELTA  [0, 0, 1]
ENV  RUNSERVER_PORT  8000
# ENV  DATABASE_USERNAME  'admin'
# ENV  DATABASE_PASSWORD  'admin'
# ENV  DATABASE_URL  'localhost'
# ENV  DATABASE_NAME  'privetNote'
# ENV  DATABASE_PORT  '27017'

RUN pip install --upgrade pip
ADD ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN mkdir -p /home/pn

WORKDIR /home/pn
COPY . .

EXPOSE 8000
RUN chmod +x runserver.sh
ENTRYPOINT ./runserver.sh