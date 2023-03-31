# pygdbmi

A python library which gives programmatic control over GDB.
- `test.py` is a program that runs GDB on an C executable prints the stack arguments and locals for each line of code executed

## Setup
### Prerequisites
- Python v3.8.10 or later
- gcc & gdb to compile your code
- The above should all be part of a docker container at some point

### Instructions
1. Clone the repository and `cd` in this directory (`pygdbmi`)
2. Create a virtual environment in python by typing `python3 -m venv venv` and activate it by typing (`source venv/bin/activate`) (works on Linux and Mac, if you're using window switch to WSL bruh)
3. Install all necessary dependencies by typing `pip3 install -r requirements.txt`


