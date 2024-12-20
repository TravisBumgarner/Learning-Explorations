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

invalid_updates = []
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
    
    if not valid_update:
        invalid_updates.append(update)

print('inv', invalid_updates)

def make_valid(invalid_update: list[str]):
    pages_after_count = []
    for page in invalid_update:
        other_pages = set(invalid_update.copy())
        other_pages.remove(page)
        print('pther', other_pages)
        pages_that_must_come_after = rules.get(page)
        if pages_that_must_come_after == None:
            pages_after_count.append(0)
        else:
            invalid_pages = other_pages.intersection(pages_that_must_come_after)
            pages_after_count.append(len(invalid_pages))

    output = [None for _ in range(len(invalid_update))]

    for i in range(len(invalid_update)):
        output[pages_after_count[i]] = invalid_update[i]
    # Output is currently sorted by number of pages that come after so we need to reverse the orer.
    output.reverse()
    return output

total = 0
for invalid_update in invalid_updates:
    result = make_valid(invalid_update)
    middle_index = math.floor(len(result) / 2)
    total += int(result[middle_index])

print(total)