from pygdbmi.gdbcontroller import GdbController
from pprint import pprint


def format_vars(allval, simpleval):
    variables: list[dict] = []
    for i in range(len(allval)):
        var = allval[i]
        nvar: dict = {}
        nvar["name"] = var["name"]
        nvar["type"] = simpleval[i]["type"]
        nvar["value"] = var["value"]
        variables.append(nvar)
    return variables


def derefence_all_needed(variables, gdbmi):
    dereferenced: list[dict] = []
    for var in variables:
        if "*" in var["type"]:
            if var["value"] == "<optimized out>":
                continue
            dres = gdbmi.write(f"-data-evaluate-expression *{var['name']}")
            if dres[0]["message"] == "error":
                continue
            nvar = {}
            # pprint(dres)
            nvar["name"] = var["name"]
            nvar["address"] = var["value"]
            nvar["dereferenced"] = dres[0]["payload"]["value"]
            dereferenced.append(nvar)
    return dereferenced

def main():
    file: str = input("Chose binary: ")
    lines: list[str] = []
    print("Be sure to choose valid lines")
    prompt_line = "Enter a line or function you want to break on: "
    line = input(prompt_line)
    while line:
        lines.append(line)
        line = input(prompt_line)

    # print(lines)

    gdbmi = GdbController()
    print("Program starting")
    r = gdbmi.write(f"-file-exec-and-symbols {file}")
    # pprint(r)
    for line in lines:
        gdbmi.write(f"-break-insert {line}")
    # r = gdbmi.write("-break-list")
    # print(r)
    print("---")
    r = gdbmi.write("-inferior-tty-set ./outfile.txt")
    pprint(r)
    print("---")

    running = True
    r = gdbmi.write("-exec-run")
    while running:
        # pprint(r)
        r = gdbmi.write("-stack-info-frame")
        r_use = r[len(r) - 1]["payload"]
        print("---")
        pprint(r_use)
        print(
            f"At line {r_use['frame']['line']} in function {r_use['frame']['func']} the values of the current frame are:")

        # pprint(r)
        v1 = gdbmi.write("-stack-list-variables --all-values")

        v2 = gdbmi.write("-stack-list-variables --simple-values")

        variables = format_vars(v1[len(v1) - 1]["payload"]["variables"], v2[len(v2) - 1]["payload"]["variables"])
        pprint(variables)
        def_vars = derefence_all_needed(variables, gdbmi)
        if len(def_vars) != 0:
            print("Allowed dereferenced values are:")
            pprint(def_vars)
        print("---\n---")

        # r = gdbmi.write("-stack-list-frames --no-frame-filters")
        # pprint(r)

        r = gdbmi.write("-exec-continue")

        for res in r:
            # This is not a good way of checking (may have issues working with threads)
            if res["message"] == "thread-group-exited":
                running = False
                break

    print("Program ended")

if __name__ == "__main__":
    main()