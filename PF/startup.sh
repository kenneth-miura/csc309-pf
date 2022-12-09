#!/bin/bash

cd PB

python3 -m pip install virtualenv
python3 -m venv venv

source venv/bin/activate

pip3 install -r requirements.txt

cd tfc

# python3 manage.py migrate

cd ..

cd ..

cd frontend

npm install

cd ..