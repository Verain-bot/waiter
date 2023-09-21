def make_int(x):
    try:
        return int(x)
    except:
        return 'not an int'

print(make_int('asd'))