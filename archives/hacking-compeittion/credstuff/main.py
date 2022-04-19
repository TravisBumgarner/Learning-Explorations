import csv


with open('passwords.txt', 'r') as fd:
    reader = csv.reader(fd)
    passwords = []
    for row in reader:
        passwords.append(row[0])


with open('usernames.txt', 'r') as fd:
    reader = csv.reader(fd)
    usernames = []
    for row in reader:
        usernames.append(row[0])

usernames_and_passwords = zip(usernames, passwords)
for entry in sorted(usernames_and_passwords, key=lambda x: x[0]):
    if entry[0] == 'cultiris':
        print(entry)

# for p in sorted(passwords):
#     print(p)

pw_char_set = set()
for pw in passwords:
    for char in pw:
        pw_char_set.add(char)

print(sorted(list(pw_char_set)))
print(len(pw_char_set))