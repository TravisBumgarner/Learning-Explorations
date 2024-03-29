key = "PAQZTNDSRYWFEXGJKCVLBUHOMI" 
lookup = {
    'P': 'A',
    'A': 'B',
    'Q': 'C',
    'Z': 'D',
    'T': 'E',
    'N': 'F',
    'D': 'G',
    'S': 'H',
    'R': 'I',
    'Y': 'J',
    'W': 'K',
    'F': 'L',
    'E': 'M',
    'X': 'N',
    'G': 'O',
    'J': 'P',
    'K': 'Q',
    'C': 'R',
    'V': 'S',
    'L': 'T',
    'B': 'U',
    'U': 'V',
    'H': 'W',
    'O': 'X',
    'M': 'Y',
    'I': 'Z',
} 

coded_messasge = """
Stctbjgx Ftdcpxz pcgvt, hrls p dcput pxz vlpltfm prc, pxz acgbdsl et lst attlft
ncge p dfpvv qpvt rx hsrqs rl hpv txqfgvtz. Rl hpv p atpblrnbf vqpcpaptbv, pxz, pl
lspl lret, bxwxghx lg xplbcpfrvlv—gn qgbcvt p dctpl jcrit rx p vqrtxlrnrq jgrxl
gn urth. Lstct htct lhg cgbxz afpqw vjglv xtpc gxt tolcterlm gn lst apqw, pxz p
fgxd gxt xtpc lst glstc. Lst vqpftv htct toqttzrxdfm spcz pxz dfgvvm, hrls pff lst
pjjtpcpxqt gn abcxrvstz dgfz. Lst htrdsl gn lst rxvtql hpv utcm ctepcwpaft, pxz,
lpwrxd pff lsrxdv rxlg qgxvrztcplrgx, R qgbfz spczfm afpet Ybjrltc ngc srv gjrxrgx
ctvjtqlrxd rl.

Lst nfpd rv: jrqgQLN{5BA5717B710X_3U0FB710X_PP1QQ2A7}
"""

output = ''
for char in coded_messasge:
    if char.upper() in lookup:
        output += lookup[char.upper()]
    else:
        output += char

print(output)