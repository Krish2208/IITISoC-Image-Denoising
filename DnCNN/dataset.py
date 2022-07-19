import os
from torch.utils.data import Dataset
from torchvision import transforms
from PIL import Image

class ImageDataset(Dataset):
    def __init__(self, clean_dir, noisy_dir):
        super(ImageDataset, self).__init__()
        self.clean_file_filenames = [os.path.join(clean_dir, x) for x in os.listdir(clean_dir)]
        self.noisy_file_filenames = [os.path.join(noisy_dir, x) for x in os.listdir(noisy_dir)]
        self.transform = transforms.ToTensor()
    def __getitem__(self, index):
        clean = Image.open(self.clean_file_filenames[index])
        noisy = Image.open(self.noisy_file_filenames[index])
        return self.transform(noisy), self.transform(clean)
    def __len__(self):
        return len(self.clean_file_filenames)