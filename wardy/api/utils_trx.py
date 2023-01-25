from binascii import hexlify
import hashlib


def sha256(data):
    ''' '''
    return hashlib.sha256(data).hexdigest()


def ripemd160(data):
    ''' '''
    #h = hashlib.new('ripemd160')
    h = hashlib.new('rmd160')
    h.update(data)
    return h.hexdigest()


def sig_digest(payload, chain_id=None):
    ''' '''
    if chain_id:
        buf = bytearray.fromhex(chain_id)
    else:
        buf = bytearray(32)
    # already a bytearray
    buf.extend(payload)
    buf.extend(bytearray(32))

    return sha256(buf)


def int_to_hex(i):
    return '{:02x}'.format(i)


def hex_to_int(i):
    return int(i, 16)

def str_to_hex(c):
    hex_data = hexlify(bytearray(c, 'ascii')).decode()
    return int(hex_data, 16)


def char_subtraction(a, b, add):
    x = str_to_hex(a)
    y = str_to_hex(b)
    ans = str((x - y) + add)
    if len(ans) % 2 == 1:
        ans = '0' + ans
    return int(ans)



def char_to_symbol(c):
    ''' '''
    if c >= 'a' and c <= 'z':
        return char_subtraction(c, 'a', 6)
    if c >= '1' and c <= '5':
        return char_subtraction(c, '1', 1)
    return 0


def string_to_name(s):
    ''' '''
    i = 0
    name = 0
    while i < len(s):
        #sym = char_to_symbol(s[i])
        name += (char_to_symbol(s[i]) & 0x1F) << (64 - 5 * (i + 1))
        i += 1
    if i > 12:
        name |= char_to_symbol(s[11]) & 0x0F
    return name


def name_to_string(n):
    ''' '''
    charmap = '.12345abcdefghijklmnopqrstuvwxyz'
    name = ['.'] * 13
    i = 0
    while i <= 12:
        c = charmap[n & (0x0F if i == 0 else 0x1F)]
        name[12 - i] = c
        n >>= 4 if i == 0 else 5
        i += 1
    return ''.join(name).rstrip('.')



