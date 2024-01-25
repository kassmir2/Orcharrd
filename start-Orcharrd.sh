#!/bin/bash

# Start the back-end application
cd /Users/charleskassmir/Desktop/Meredith-Project/Orcharrd/BackEnd
python3 -m flask run --host 0.0.0.0 -p 34000 

# Start the front-end application
cd /Users/charleskassmir/Desktop/Meredith-Project/Orcharrd/FrontEnd/OrcharrdApp
npm start &
