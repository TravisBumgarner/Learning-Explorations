from frequency_attack import frequency_attack

coded_message = "voxfxxtnuvuxjxfrycvoxfdxyyxuvraynuoxgonwousoccyscqmkvxfuxskfnvhscqmxvnvncpunpsykgnpwshaxfmrvfncvrpgkushaxfsoryyxpwxvoxuxscqmxvnvncpubcskumfnqrfnyhcpuhuvxqurgqnpnuvfrvncpbkpgrqxpvryudonsorfxjxfhkuxbkyrpgqrfexvrayxuenyyuocdxjxfdxaxynxjxvoxmfcmxfmkfmcuxcbronwousoccyscqmkvxfuxskfnvhscqmxvnvncpnupcvcpyhvcvxrsojrykrayxuenyyuakvryucvcwxvuvkgxpvunpvxfxuvxgnprpgxtsnvxgrackvscqmkvxfusnxpsxgxbxpunjxscqmxvnvncpurfxcbvxpyracfnckurbbrnfurpgscqxgcdpvcfkppnpwsoxseynuvurpgxtxskvnpwscpbnwusfnmvucbbxpuxcpvoxcvoxforpgnuoxrjnyhbcskuxgcpxtmycfrvncprpgnqmfcjnurvncprpgcbvxporuxyxqxpvucbmyrhdxaxynxjxrscqmxvnvncpvcksonpwcpvoxcbbxpunjxxyxqxpvucbscqmkvxfuxskfnvhnuvoxfxbcfxraxvvxfjxonsyxbcfvxsoxjrpwxynuqvcuvkgxpvunprqxfnsrponwousoccyubkfvoxfdxaxynxjxvorvrpkpgxfuvrpgnpwcbcbbxpunjxvxsopnzkxunuxuuxpvnrybcfqckpvnpwrpxbbxsvnjxgxbxpuxrpgvorvvoxvccyurpgscpbnwkfrvncpbcskuxpsckpvxfxgnpgxbxpunjxscqmxvnvncpugcxupcvyxrguvkgxpvuvcepcdvoxnfxpxqhruxbbxsvnjxyhruvxrsonpwvoxqvcrsvnjxyhvonpeynexrprvvrsexfmnscsvbnurpcbbxpunjxyhcfnxpvxgonwousoccyscqmkvxfuxskfnvhscqmxvnvncpvorvuxxeuvcwxpxfrvxnpvxfxuvnpscqmkvxfusnxpsxrqcpwonwousoccyxfuvxrsonpwvoxqxpckworackvscqmkvxfuxskfnvhvcmnzkxvoxnfskfncunvhqcvnjrvnpwvoxqvcxtmycfxcpvoxnfcdprpgxpraynpwvoxqvcaxvvxfgxbxpgvoxnfqrsonpxuvoxbyrwnumnscSVB{P6F4Q_4P41H515_15_73G10K5_B302B3A6}"

lookup = {
    'A': None, 
    'B': "F",
    'C': "O",
    'D': None,
    'E': None, 
    'F': None,
    'G': None, 
    'H': None,
    'I': None,
    'J': None,
    'K': None, 
    'L': None,
    'M': "P",
    'N': "I", 
    'O': None,
    'P': None,
    'Q': None,
    'R': None, 
    'S': "C",
    'T': None,
    'U': None, 
    'V': "T",
    'W': None,
    'X': None,
    'Y': None, 
    'Z': None,
} 
frequency_attack(coded_message)

output = ''
for char in coded_message:
    if char.upper() in lookup and lookup[char.upper()]:
        output += lookup[char.upper()]
    else:
        output += char.lower() # Lower chars are unsolved

print(output)
