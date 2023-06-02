import re
import pprint


def get_allocs(file_name):
    result: dict = {}
    with open(file_name, "r") as codefile:
        line_no: int = 1
        for line in codefile:
            if re.search("(re|m|c)alloc", line):
                # print("")
                # print(f"Alloc done on line {line_no}:")
                # print(line.strip())
                start_pos: int = 0
                if "*" in line:
                    start_pos = line.find("*") + 1
                end_pos: int = line.find("=")
                # print(f"The variable being alloced is {(line[start_pos:end_pos]).strip()}")
                result[line_no] = (line[start_pos:end_pos]).strip()
            line_no += 1

    return result


def get_name_line(file, line) -> str:
    allocs = get_allocs(file)
    return allocs[int(line)] if int(line) in allocs else "-1"

def main():
    file = input("Choose a file: ")
    allocs = get_allocs(file)
    if allocs == {}:
        print("No allocs found in file")
    else:
        print(allocs)


if __name__ == "__main__":
    main()
