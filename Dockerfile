FROM ubuntu

USER root

RUN apt-get update

RUN apt-get install git

RUN apt-get install gitolite
