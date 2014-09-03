#!/usr/bin/env sh
git clone https://github.com/rgrannell1/tin
cd tin
echo alias tin=\'$(pwd -P)/lib/tin.js\' >> ~/.bashrc && . ~/.bashrc
