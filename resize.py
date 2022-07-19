from PIL import Image
import numpy as np
from skimage.util import random_noise
import random
import os

noise = [{'mode': 's&p', 'amount': random.uniform(0.02, 0.05)},
         {'mode': 'gaussian', 'var': random.uniform(0.005, 0.015)},
         {'mode': 'poisson'},
         {'mode': 'speckle', 'var': random.uniform(0.005, 0.015)},
         {'mode': 'localvar'}]
path = './data/test_images/'
images = os.listdir(path)

for i in range(320,330):
    im = Image.open(f'{path}/{i}.jpg')
    im = im.resize((320,180))
    im.save(f'./new_data/final_test/{i}.jpg')

# for image in images:
#     im = Image.open(f'{path}/{image}')
#     im_arr = np.asarray(im)
#     for i in noise:
#         noise_im = random_noise(im_arr, **i)
#         noise_im = (255*noise_im).astype(np.uint8)
#         img = Image.fromarray(noise_im)
#         img.save(f'./new_data/noisy/{i["mode"]}_{image}')