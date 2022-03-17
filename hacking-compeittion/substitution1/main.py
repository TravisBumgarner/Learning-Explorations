from frequency_attack import frequency_attack

coded_message = "WILh (hjpai lpa wrtikan ijn lbrc) ran r ietn pl wpgtkina hnwkazie wpgtnizizpu. Wpuinhiruih ran tanhnuiny szij r hni pl wjrbbnucnh sjzwj inhi ijnza wanrizdzie, inwjuzwrb (ruy cppcbzuc) hfzbbh, ruy tapobng-hpbdzuc rozbzie. Wjrbbnucnh khkrbbe wpdna r ukgona pl wrincpaznh, ruy sjnu hpbdny, nrwj eznbyh r hiazuc (wrbbny r lbrc) sjzwj zh hkogziiny ip ru pubzun hwpazuc hnadzwn. WILh ran r canri sre ip bnrau r szyn raare pl wpgtkina hnwkazie hfzbbh zu r hrln, bncrb nudzapugnui, ruy ran jphiny ruy tbreny oe grue hnwkazie capkth rapkuy ijn spaby lpa lku ruy tarwizwn. Lpa ijzh tapobng, ijn lbrc zh: tzwpWIL{LA3VK3UWE_4774WF5_4A3_W001_O810YY84}"

lookup = {
    'A': "R", # Guess 
    'B': "L",
    'C': "G",
    'D': "V",
    'E': "Y", #guess
    'F': "K",
    'G': "M", #guess
    'H': "S",
    'I': "T",
    'J': "H",
    'K': "U", #guess
    'L': "F",
    'M': None,
    'N': "E", #guess
    'O': "B",
    'P': "O",
    'Q': None,
    'R': "A", # Guess
    'S': "W",
    'T': "P",
    'U': "N", #guess
    'V': "Q",
    'W': "C",
    'X': None,
    'Y': "D", 
    'Z': "I",
} 
frequency_attack(coded_message)

output = ''
for char in coded_message:
    if char.upper() in lookup and lookup[char.upper()]:
        output += lookup[char.upper()]
    else:
        output += char.lower() # Lower chars are unsolved

print(output)
