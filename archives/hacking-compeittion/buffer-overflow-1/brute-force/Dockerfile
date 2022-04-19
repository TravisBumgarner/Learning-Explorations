FROM python:3.10
WORKDIR /picoCTF
COPY vuln ./
RUN chmod a+x vuln
# Install 32-bit C runtime library for 'vuln' to execute. Plus some other useful things.
RUN apt-get update && \
    apt-get install -y \
        bsdextrautils \
        libc6-i386 \
        netcat
RUN pip3 install \
    pwn

          