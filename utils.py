def pretty_print_message(type, message):
    message = message.decode('utf-8').split('\r\n')
    print('[>] {}'.format(type))
    for line in message:
        print('[>]     {}'.format(line))
    print('\n')