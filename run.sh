#!/bin/bash

cd PB

cd tfc

python3 manage.py runserver &

cd ..

cd ..

cd frontend

npm run start

cd ..
