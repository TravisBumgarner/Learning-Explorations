import math

rules: dict[str, set[str]] = {}
updates: list[list[str]] = []

# 47|53 -> means 47 must be before 53. 



with open('05_01.txt', 'r') as file:
    for line in file.readlines():
        line = line.strip()

        if line.find('|') > 0:
            [key, value] = line.split('|')
            
            if key not in rules:
                rules[key] = set()
            
            rules[key].add(value)
        
        if line.find(',') > 0:
            updates.append([line for line in line.split(',')])
total = 0
for update in updates:
    valid_update = True
    for index, page in enumerate(update):
        pages_that_must_come_after = rules.get(page)
        if not pages_that_must_come_after:
            continue

        pages_before = set(update[0:index])

        invalid_pages = pages_before.intersection(pages_that_must_come_after)
        if len(invalid_pages) > 0:
            valid_update = False
            break
    
    if valid_update:
        middle_index = math.floor(len(update) / 2)
        total += int(update[middle_index])

print(total)

                