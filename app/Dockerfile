FROM python:3.8.0
EXPOSE 8000
WORKDIR /app 

RUN pip install --upgrade pip
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
	
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs

COPY requirements.txt /app
RUN pip3 install -r requirements.txt --no-cache-dir
COPY . /app 

COPY ./package.json /
RUN npm install

COPY ./entrypoint.sh /
RUN chmod a+x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]