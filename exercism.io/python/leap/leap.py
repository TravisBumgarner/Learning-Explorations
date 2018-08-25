# Clean Code Thoughts
# What does is_divisible_by() really get you?

def is_leap_year(year):
    return year % 400 == 0 or (year % 4 == 0 and not year % 100 == 0)
