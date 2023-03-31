import sys
import subprocess
import argparse
from pygdbmi.gdbcontroller import GdbController

# COMMAND_TIMEOUT_SEC = 0.1


def main():
    """
    Main function
    """
    args = parse_args()
    compile_code(args.code)
    debug_code(args.breakpoints)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Runs GDB on C code and prints stack locals and frames"
    )
    parser.add_argument("code", help="the filename of the C code")
    parser.add_argument(
        "breakpoints",
        nargs="*",
        help="the breakpoints (lines or functions) to be placed for debugging",
    )
    return parser.parse_args()


def compile_code(code):
    """
    Compiles code_file into executable
    Note: -ggdb option produces debugging information for use by GDB
    """
    subprocess.run(["gcc", "-ggdb", code])


def debug_code(breakpoints):
    """
    Run GDB on the compiled executable
    Print out all stack args and locals at each frame where breakpoint is added
    """
    gdbmi = GdbController()

    gdbmi.write("-file-exec-and-symbols a.out")
    # machine interface (MI) commands start with a '-'
    gdbmi.write("-break-insert main")
    for breakpoint in breakpoints:
        gdbmi.write(f"-break-insert {breakpoint}")
    # gdbmi.write('-break-insert append')
    # gdbmi.write('-enable-frame-filters')
    gdbmi.write("-exec-run")

    # Continue executing GDB commands until execution ends
    while True:
        # response = gdbmi.write('-exec-next', timeout_sec=COMMAND_TIMEOUT_SEC)[-1]['payload']
        response = gdbmi.write("-exec-next")[-1]["payload"]
        if "reason" in response and response["reason"] in [
            "exited",
            "exited-normally",
            "exited-signalled",
        ]:
            break

        frame_info = response["frame"]
        # frame_variables = gdbmi.write('-stack-list-variables --simple-values', timeout_sec=COMMAND_TIMEOUT_SEC)[0]['payload']['variables']
        frame_variables = gdbmi.write("-stack-list-variables --simple-values")[0][
            "payload"
        ]["variables"]
        # frame_arguments = gdbmi.write('-stack-list-arguments --simple-values', timeout_sec=COMMAND_TIMEOUT_SEC)[0]['payload']['arguments']
        # frame_locals = gdbmi.write('-stack-list-locals --simple-values', timeout_sec=COMMAND_TIMEOUT_SEC)[0]['payload']['locals']

        print(f"Executing line {frame_info['line']} in function {frame_info['func']}")

        for frame_variable in frame_variables:
            if not all(k in frame_variable for k in ("name", "value")):
                continue

            if "arg" in frame_variable and frame_variable["arg"] == "1":
                print(f"arg: {frame_variable['name']} = {frame_variable['value']}")
            else:
                print(f"local: {frame_variable['name']} = {frame_variable['value']}")


if __name__ == "__main__":
    main()
