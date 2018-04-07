def pretty_print_message(type, message):
    message = message.decode('utf-8').strip().split('\r\n')
    print('\n[>] {}'.format(type))
    for line in message:
        print('[>]     {}'.format(line))