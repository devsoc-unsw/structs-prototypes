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


def dereference_all_needed(variables, gdbmi):
    dereferenced: list[dict] = []
    for var in variables:
        if "*" in var["type"]:
            res = gdbmi.write(f"-data-evaluate-expression *{var['name']}")
            nvar = {}
            nvar["name"] = var["name"]
            nvar["address"] = var["value"]
            nvar["dereferenced"] = res[0]["payload"]["value"]
            dereferenced.append(nvar)
    return dereferenced


file: str = input("Choose binary: ")
lines: list[int] = []
print("Be sure to choose valid lines")
prompt_line = "Enter a line or function you want to break on: "
line = input(prompt_line)
while line:
    lines.append(line)
    line = input(prompt_line)

gdbmi = GdbController()
r = gdbmi.write(f"-file-exec-and-symbols {file}")

for line in lines:
    gdbmi.write(f"-break-insert {line}")

running = True
r = gdbmi.write("-exec-run")
while running:
    r_use = r[len(r) - 1]["payload"]
    print(f"At line {r_use['frame']['line']} in function {r_use['frame']['func']} in file, the values of the current frame are:")

    v1 = gdbmi.write("-stack-list-variables --all-values")
    v2 = gdbmi.write("-stack-list-variables --simple-values")
    variables = format_vars(v1[len(v1) - 1]["payload"]["variables"], v2[len(v2) - 1]["payload"]["variables"])
    pprint(variables)

    dereferenced_vars = dereference_all_needed(variables, gdbmi)
    pprint(dereferenced_vars)

    for var in dereferenced_vars:
        if 'next' in var['dereferenced']:
            var_name = var["name"]
            print(f'VARIABLE: {var_name}')

            data_val = var_name

            while True:
                var_next_data = f'{var_name}_next_data'
                gdbmi.write(f'-var-create {var_next_data} * {data_val}->data')
                response = gdbmi.write(f'-var-evaluate-expression {var_next_data}')
                next_data = response[0]['payload']['value']
                print("value =", next_data)

                if 'next' in next_data:
                    var_name = next_data
                    data_val = var_name
                else:
                    break

    print("---\n---")
    r = gdbmi.write("-exec-continue")

    for res in r:
        if res["message"] == "thread-group-exited":
            running = False
            break

print("Program ended")
