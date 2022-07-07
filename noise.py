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
path = './data/test_images/archive/Wildtrack/Image_subsets/C'
images = os.listdir(path)
for image in images:
    im = Image.open(f'{path}/{image}')
    im_arr = np.asarray(im)
    index = random.randrange(0, 5)
    print(index)
    noise_im = random_noise(im_arr, **noise[index])
    noise_im = (255*noise_im).astype(np.uint8)
    img = Image.fromarray(noise_im)
    img.save(f'./data/test_noise/{image}')
