numberLetterDict = {
    0: 0,  #Used for dealing with 0 in ones place
    1: 3, #one
    2: 3, #two
    3: 5, #three
    4: 4, #four
    5: 4, #five
    6: 3, #six
    7: 5, #seven
    8: 5, #eight
    9: 4, #nine
    10: 3, #ten
    11: 6, #eleven
    12: 6, #twelve
    13: 8, #thirteen
    14: 8, #fourteen
    15: 7, #fifteen
    16: 7, #sixteen
    17: 9, #seventeen
    18: 8, #eighteen
    19: 8, #nineteen
    20: 6, #twenty
    30: 6, #thirty
    40: 5, #forty
    50: 5, #fifty
    60: 5, #sixty
    70: 7, #seventy
    80: 6, #eighty
    90: 6, #ninety
    100: 10, #one hundred
    200: 10, #two hundred
    300: 12, #three hundred
    400: 11, #four hundred
    500: 11, #five hundred
    600: 10, #six hundred
    700: 12, #seven hundred
    800: 12, #eight hundred
    900: 11, #nine hundred
    1000:11} #one thousand

def numToLetters(inputNum):
    numAsList = list(str(inputNum))
    numAsListInt = []
    for each in range(len(numAsList)):
        numAsListInt.append(int(numAsList[each]))
    if len(numAsListInt) == 1: #Only ones
        return numberLetterDict[numAsListInt[0]] 
    elif len(numAsListInt) == 2: #Tens and Ones
        if inputNum >= 20:
            return numberLetterDict[numAsListInt[0]*10] + numberLetterDict[numAsListInt[1]]
        else:
            return numberLetterDict[inputNum]
    elif len(numAsListInt) == 3:#Hundreds tens and ones
        if inputNum %100 == 0:
            return numberLetterDict[numAsListInt[0]*100]
        elif int(numAsList[1]+numAsList[2]) < 20:
            return numberLetterDict[numAsListInt[0]*100] + numberLetterDict[int(numAsList[1]+numAsList[2])] + 3 # +3 for word and
        else:
            return numberLetterDict[numAsListInt[2]] + numberLetterDict[numAsListInt[1]*10] + numberLetterDict[numAsListInt[0]*100]  + 3
            
    else: #Thousands
        return 11 #Returns 11 since we're only dealing with 1000

allLetters = 0
for each in range(1,1001):
    allLetters += numToLetters(each)
print(allLetters)








    
