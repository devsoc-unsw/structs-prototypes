from typing import List
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
            res = gdbmi.write(f"-data-evaluate-expression *{var['name']}")
            nvar = {}
            # pprint(res)
            nvar["name"] = var["name"]
            nvar["address"] = var["value"]
            nvar["dereferenced"] = res[0]["payload"]["value"]
            dereferenced.append(nvar)
    return dereferenced


file: str = input("Chose binary: ")
lines: List[int] = []
print("Be sure to choose valid lines")
prompt_line = "Enter a line or function you want to break on: "
line = input(prompt_line)
while line:
    lines.append(line)
    line = input(prompt_line)

print(lines)

gdbmi = GdbController()
r = gdbmi.write(f"-file-exec-and-symbols {file}")
# pprint(r)
for line in lines:
    gdbmi.write(f"-break-insert {line}")
# r = gdbmi.write("-break-list")
# pprint(r)
running = True
r = gdbmi.write("-exec-run")
while running:
    r_use = r[len(r) - 1]["payload"]
    print(f"{r_use=}")
    print(
        f"At line {r_use['frame']['line']} in function {r_use['frame']['func']} in file the values of the current frame are:")

    v1 = gdbmi.write("-stack-list-variables --all-values")

    v2 = gdbmi.write("-stack-list-variables --simple-values")

    variables = format_vars(
        v1[len(v1) - 1]["payload"]["variables"], v2[len(v2) - 1]["payload"]["variables"])
    pprint(variables)
    def_vars = derefence_all_needed(variables, gdbmi)
    pprint(def_vars)
    print("---\n---")
    r = gdbmi.write("-exec-continue")

    for res in r:
        # This is not a good way of checking (may have issues working with threads)
        if res["message"] == "thread-group-exited":
            running = False
            break

print("Program ended")
