def generate_kernal(kernal_size, increment_function):
    side_length = kernal_size * 2 + 1
    m = np.zeros((side_length, side_length))
    sub_matrix_side_length = side_length
    x = 0
    y = 0
    v = 1
    while sub_matrix_side_length > 0:
        m[
            x:side_length-x,
            y:side_length-y
        ] = increment_function(v)
        x += 1
        y += 1
        v += 1
        sub_matrix_side_length -= (0.5)
    return m