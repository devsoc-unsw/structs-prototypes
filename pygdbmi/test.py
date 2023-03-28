from pygdbmi.gdbcontroller import GdbController

COMMAND_TIMEOUT_SEC = 0.1


def main():
    gdbmi = GdbController()
    gdbmi.write('-file-exec-and-symbols linked_list')
    gdbmi.write('-break-insert main')  # machine interface (MI) commands start with a '-'
    gdbmi.write('-break-insert append')
    # gdbmi.write('-enable-frame-filters')
    gdbmi.write('-exec-run')

    while True:
        # response = gdbmi.write('-exec-next', timeout_sec=COMMAND_TIMEOUT_SEC)[-1]['payload']
        response = gdbmi.write('-exec-next')[-1]['payload']
        if 'reason' in response and response['reason'] in ['exited', 'exited-normally', 'exited-signalled']:
            break

        frame_info = response['frame']
        # frame_variables = gdbmi.write('-stack-list-variables --simple-values', timeout_sec=COMMAND_TIMEOUT_SEC)[0]['payload']['variables']
        frame_variables = gdbmi.write('-stack-list-variables --simple-values')[0]['payload']['variables']
        # frame_arguments = gdbmi.write('-stack-list-arguments --simple-values', timeout_sec=COMMAND_TIMEOUT_SEC)[0]['payload']['arguments']
        # frame_locals = gdbmi.write('-stack-list-locals --simple-values', timeout_sec=COMMAND_TIMEOUT_SEC)[0]['payload']['locals']

        print(f"Executing line {frame_info['line']} in function {frame_info['func']}")

        for frame_variable in frame_variables:
            if not all(k in frame_variable for k in ('name', 'value')):
                continue

            if 'arg' in frame_variable and frame_variable['arg'] == '1':
                print(f"arg: {frame_variable['name']} = {frame_variable['value']}")
            else:
                print(f"local: {frame_variable['name']} = {frame_variable['value']}")

if __name__ == '__main__':
    main()
