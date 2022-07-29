# IITISoC-Image-Denoising
With CCTV images not being very clear on zooming there is a great demand for image denoising models. Build a model which takes input of blurred RGB images and outputs clear images. Carefully study the kind of noise CCTV images have and target accordingly.

We implemented ADNet, RIDNet, and DnCNN by customizing it and trained them on Google Colab.

## Team Members
 - Krish Agrawal
 - Rupal Shah
 - Khushi Sawla
## Dataset
VIRAT Video Dataset(We took images out of this dataset at every 5 second interval and prepared an image dataset containing 64 training images, 16 validation images, 8 test images of 1080x1920 size.)
## Technology Used
-   PyTorch (Implemented ADNet and DnCNN)
-   Tensorflow (Implemented RIDNet)
-   Sci-Kit Image (To Add Random Gaussian Noise to the images)
