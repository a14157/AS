#FROM continuumio/anaconda3 

#ADD requirements.txt / 

#RUN pip install -r requirements.txt 

#CMD ["/opt/conda/bin/jupyter", "notebook", "--notebook-dir=/opt/notebooks", "--ip='*'", "--no-browser", "--allow-root"]

FROM python:3.7
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
RUN mkdir /app/dev
CMD ["python", "app.py"]