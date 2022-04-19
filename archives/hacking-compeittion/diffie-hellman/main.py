encrypted_message = 'H98A9W_H6UM8W_6A_9_D6C_5ZCI9C8I_JBACIFAI'

def get_public_key(secret_key, prime_number, generator):
    return prime_number ** secret_key % generator

def get_shared_secret(public_key, private_number, generator):
    return public_key ** private_number % generator
    
shared_generator = 13
shared_prime = 5

alice_secret_key = 7
alice_public_key = get_public_key(secret_key=alice_secret_key, prime_number=shared_prime, generator=shared_generator )

bob_secret_key = 3
bob_public_key = get_public_key(secret_key=bob_secret_key, prime_number=shared_prime, generator=shared_generator )


alice_shared_secret = get_shared_secret(public_key=bob_public_key, private_number=alice_secret_key, generator=shared_generator)
bob_shared_secret = get_shared_secret(public_key=alice_public_key, private_number=bob_secret_key, generator=shared_generator)

print(alice_shared_secret, bob_shared_secret)

ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

negative_decrypted_message = ''
positive_decrypted_message = ''
for letter in encrypted_message:
    if letter in ALPHABET:
        original_index = ALPHABET.index(letter)
        
        negative_offset_index = (original_index + (len(ALPHABET) - alice_shared_secret)) % len(ALPHABET)
        negative_decrypted_message += ALPHABET[negative_offset_index]
        
        positive_offset_index = (original_index + alice_shared_secret) % len(ALPHABET)
        positive_decrypted_message += ALPHABET[
            positive_offset_index]
    else:
        positive_decrypted_message += letter
        negative_decrypted_message += letter

print(-1 * alice_shared_secret, negative_decrypted_message)
print(alice_shared_secret, positive_decrypted_message)