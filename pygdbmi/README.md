# pygdbmi

A python library which gives programmatic control over GDB.
- `main.py` is a program that runs GDB on an C executable prints the stack arguments and locals of the frame for each line of code executed

## Usage
```
usage: main.py [-h] [-b [BREAKPOINTS [BREAKPOINTS ...]]] files [files ...]

Runs GDB on C code and prints stack locals and frames

positional arguments:
  files                 the filename(s) of C code

optional arguments:
  -h, --help            show this help message and exit
  -b [BREAKPOINTS [BREAKPOINTS ...]], --breakpoints [BREAKPOINTS [BREAKPOINTS ...]]
                        the breakpoints (lines or functions) to be placed for debugging
```

## Setup
### Prerequisites
- Python v3.8.10 or later
- gcc & gdb to compile your code
- The above should all be in a docker container at some point

### Instructions
1. Clone the repository and `cd` in this directory (`pygdbmi`)
2. Create a virtual environment in python by typing `python3 -m venv venv` and activate it by typing (`source venv/bin/activate`) (works on Linux and Mac, if you're using window switch to WSL bruh)
3. Install all necessary dependencies by typing `pip3 install -r requirements.txt`


