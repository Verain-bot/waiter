import os
dir_path = r"/Volumes/SSD 1/OnePiece/Season 19 - Whole Cake Island/"

def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text

for file in os.listdir(dir_path):
    if file.startswith("[Anime Time] One Piece - "):
        new_name = remove_prefix(file, "[Anime Time] One Piece - ")
        os.rename(os.path.join(dir_path, file), os.path.join(dir_path, new_name))
        print(new_name)