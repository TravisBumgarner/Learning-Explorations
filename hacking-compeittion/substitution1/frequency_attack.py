# https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html

morse_frequency = {
    'A': 8000,
    'B': 1600,
    'C': 3000,
    'D': 4400,
    'E': 12000,
    'F': 2500,
    'G': 1700,
    'H': 6400,
    'I': 8000,
    'J': 400,
    'K': 800,
    'L': 4000,
    'M': 3000,
    'N': 8000,
    'O': 8000,
    'P': 1700,
    'Q': 500,
    'R': 6200,
    'S': 8000,
    'T': 9000,
    'U': 3400,
    'V': 1200,
    'W': 2000,
    'X': 400,
    'Y': 2000,
    'Z': 200, 
}

concise_oxford_frequency = {
    'A': 43.31,
    'B': 2.07,
    'C': 4.54,
    'D': 3.38,
    'E': 56.88,
    'F': 1.81,
    'G': 2.47,
    'H': 3.00,
    'I': 7.54,
    'J': 0.197,
    'K': 1.10,
    'L': 5.49,
    'M': 3.01,
    'N': 6.65,
    'O': 7.16,
    'P': 3.17,
    'Q': 0.196,
    'R': 7.58,
    'S': 5.73,
    'T': 6.95,
    'U': 3.63,
    'V': 1.00,
    'W': 1.29,
    'X': 0.29,
    'Y': 1.78,
    'Z': 0.27,
}

start_frequency = {
    'A':0,
    'B':0,
    'C':0,
    'D':0,
    'E':0,
    'F':0,
    'G':0,
    'H':0,
    'I':0,
    'J':0,
    'K':0,
    'L':0,
    'M':0,
    'N':0,
    'O':0,
    'P':0,
    'Q':0,
    'R':0,
    'S':0,
    'T':0,
    'U':0,
    'V':0,
    'W':0,
    'X':0,
    'Y':0,
    'Z':0,
} 

def frequency_attack(message, recommended_frequency=concise_oxford_frequency):
    for char in message:
        if char.upper() in start_frequency:
            start_frequency[char.upper()] += 1
        else:
            print('skipping char', char)

    recommended_letters = [x[0] for x in sorted(recommended_frequency.items(), key=lambda item: item[1], reverse=True)]

    index = 0
    for letter, freuqency in sorted(start_frequency.items(), key=lambda item: item[1], reverse=True):
        print (f'{letter}: {freuqency}, Recommendation: {recommended_letters[index]}')
        index += 1


