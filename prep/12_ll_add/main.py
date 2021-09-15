def naive_solution(a, b):
    output = []
    
    carry_digit = 0
    sum_digit = 0
    
    a_index = 0
    b_index = 0
    
    while a_index < len(a) or b_index < len(b):
        a_value = 0
        b_value = 0

        if a_index < len(a):
            a_value = a[a_index]
            a_index += 1

        if b_index < len(b):
            b_value = b[b_index]
            b_index += 1
        
        digit_total = a_value + b_value + carry_digit
        
        sum_digit = digit_total % 10
        carry_digit = digit_total // 10
        
        output.append(sum_digit)
    
    if(carry_digit > 0):
        output.append(carry_digit)
    
    return output