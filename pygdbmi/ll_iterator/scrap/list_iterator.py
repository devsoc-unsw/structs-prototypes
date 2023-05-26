# data-read-memory
# -data-evaluate-expression
# parse_and_eval


import subprocess
import argparse
from pygdbmi.gdbcontroller import GdbController
import tempfile
import pprint


COMMAND_TIMEOUT_SEC = 0.1


def main():
    """
    Main function
    """
    args = parse_args()
    compile_code(args.files)
    debug_code(args.breakpoints)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Runs GDB on C code and prints stack locals and frames"
    )
    parser.add_argument("files", nargs="+", help="the filename(s) of C code")
    parser.add_argument(
        "-b",
        "--breakpoints",
        default=[],
        nargs="*",
        help="the breakpoints (lines or functions) to be placed for debugging",
    )
    return parser.parse_args()


def compile_code(files):
    """
    Compiles code_file into executable
    Note: -ggdb option produces debugging information for use by GDB
    """
    subprocess.run(["gcc", "-ggdb", *files])


def find_val(address):
    gdbmi = GdbController()

    gdbmi.write("-file-exec-and-symbols a.out")
    print(f"ADDRESS: {address}")

    command = f'x {address}'  # GDB command to examine the memory address
    response = gdbmi.write(command)

    if (
        response
        and response[0]["type"] == "result"
        and response[0]["message"] == "done"
        and "payload" in response[0]
        and "memory" in response[0]["payload"]
    ):
        memory = response[0]["payload"]["memory"][0]
        memory_value = memory["value"]
        memory_address = memory["address"]
        return {"value": memory_value, "address": memory_address}

    return None




def find_val2(address):
    gdbmi = GdbController()

    gdbmi.write("-file-exec-and-symbols a.out")
    print(f"ADDRESS: {address}")

    address_hex = hex(int(address, 16))  # Convert address to hexadecimal format
    res = gdbmi.write(f"-data-read-memory {address_hex} x 1 1 1")

    print(res)
    if res and res[0]["type"] == "result" and res[0]["message"] == "done":
        memory_value = res[0]["payload"]["memory"][0]["value"]
        return memory_value

    return None







def extract_next_address(dereferenced):
    # Find the start and end positions of "next = "
    start_pos = dereferenced.find("next = ")
    end_pos = dereferenced.find(",", start_pos)

    # Extract the value after "next = "
    next_address = dereferenced[start_pos + len("next = "):end_pos].strip()

    return next_address


def debug_code(breakpoints):
    """
    Run GDB on the compiled executable
    Print out all stack args and locals at each frame where breakpoint is added
    """
    gdbmi = GdbController()

    gdbmi.write("-file-exec-and-symbols a.out")
    gdbmi.write("-break-insert main")
    for breakpoint in breakpoints:
        gdbmi.write(f"-break-insert {breakpoint}")
    gdbmi.write("-exec-run")

    # Continue executing GDB commands until execution ends
    while True:
        response = gdbmi.write("-exec-next", timeout_sec=COMMAND_TIMEOUT_SEC)[-1][
            "payload"
        ]
        if "reason" in response and response["reason"] in [
            "exited",
            "exited-normally",
            "exited-signalled",
        ]:
            break

        frame_info = response["frame"]
        frame_variables = gdbmi.write(
            "-stack-list-variables --simple-values", timeout_sec=COMMAND_TIMEOUT_SEC
        )[0]["payload"]["variables"]

        print(
            f"In function {frame_info['func']}, {frame_info['file']}:{frame_info['line']}"
        )

        for frame_variable in frame_variables:
            if not all(k in frame_variable for k in ("name", "value")):
                continue

            if "arg" in frame_variable and frame_variable["arg"] == "1":
                print(f"arg: {frame_variable['name']} = {frame_variable['value']}")
            else:
                print(f"local: {frame_variable['name']} = {frame_variable['value']}")

        dereferenced_vars = dereference_linked_list_values(frame_variables, gdbmi)
        print("Dereferenced linked list values:")
        for var in dereferenced_vars:
            print(f"Variable: {var['name']}, Value: {var['dereferenced']}")

            next_address = extract_next_address(var["dereferenced"])
            value = find_val(next_address)
            if value is not None:
                print(f"Value at address {var['dereferenced']}: {value}")
            else:
                print(f"Value at address {var['dereferenced']}: NONE")

        print()


def dereference_linked_list_values(variables, gdbmi):
    """
    Dereference values of pointer variables in the linked list
    """
    dereferenced = []
    for var in variables:
        if "*" in var["type"]:
            res = gdbmi.write(f"-data-evaluate-expression *{var['name']}")
            nvar = {}
            nvar["name"] = var["name"]
            nvar["address"] = var["value"]
            nvar["dereferenced"] = res[0]["payload"]["value"]
            dereferenced.append(nvar)
    return dereferenced


if __name__ == "__main__":
    main()

