import subprocess


def compile_files(files: list[str]):
    subprocess.run(["gcc", "-g", " ".join(files)], capture_output=True)


def main():
    compile_files(["program.c"])


if __name__ == "__main__":
    main()
