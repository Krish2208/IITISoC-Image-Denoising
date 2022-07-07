from importlib.metadata import files
import os
# for dirname in os.listdir("./images"):
#     if os.path.isdir(dirname):
#         for i, filename in enumerate(os.listdir(dirname)):
#             os.rename(dirname + "/" + filename, dirname + "/" + str(i+3752) + ".py")

for i, filename in enumerate(os.listdir("./data/images")):
    os.rename("./data/images/" + filename, "./data/images/"+str(i+3752)+".jpg")