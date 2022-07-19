from PIL import Image
import torch
from torch.utils.data import DataLoader
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms

from model import DnCNN
from dataset import ImageDataset

from math import log10
import matplotlib.pyplot as plt


train_dataset = ImageDataset("../new_data/large/clean/", "../new_data/large/noisy/")
test_dataset = ImageDataset("../new_data/large/test_clean/", "../new_data/large/test_noisy/")

batch_size = 1

training_data_loader = DataLoader(dataset=train_dataset, batch_size=batch_size)
testing_data_loader = DataLoader(dataset=test_dataset, batch_size=batch_size)

model = DnCNN()

criterion = nn.MSELoss()
lr = 1e-4
optimizer = optim.SGD(model.parameters(), lr=lr)


def train(epoch):
    epoch_loss = 0
    for i, data in enumerate(training_data_loader, 1):
        input = data[0]
        target = data[1]
        out = model(input)

        loss = criterion(out, target)
        epoch_loss += loss

        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

        print("===> Epoch[{}]({}/{}): Loss: {:.4f}".format(epoch, i, len(training_data_loader), loss.item()))
    
    print("===> Epoch {} Complete: Avg. Loss: {:.4f}".format(epoch, epoch_loss / len(training_data_loader)))

def validate():
    avg_psnr = 0
    model.eval()
    with torch.no_grad():
        for data in testing_data_loader:
            input = data[0]
            output = model(input)
            mse = criterion(output, input)
            psnr = 10 * log10(1 / mse.item())
            avg_psnr += psnr
    print("===> Avg. PSNR: {:.4f} dB".format(avg_psnr / len(testing_data_loader)))
    model.train()


def save(state, epoch):
    model_out_path = "./models/model_epoch_{}.pth".format(epoch)
    torch.save(state, model_out_path)
    print("Checkpoint saved to {}".format(model_out_path))

def training():
    # checkpoint = torch.load("./models/model_epoch_20.pth")
    # model.load_state_dict(checkpoint['state_dict'])
    # optimizer.load_state_dict(checkpoint['optimizer'])
    # epoch = checkpoint['epoch']

    # model.eval()

    num_epochs = 10
    for epoch in range(1, num_epochs + 1):
        train(epoch)
        if epoch % 5 == 0:
            validate()
            save({
                'epoch': epoch + 1,
                'arch': model,
                'state_dict': model.state_dict(),
                'optimizer' : optimizer.state_dict(),
            }, epoch)

def testing():
    for image_number in range(320,330):
        trans = transforms.ToPILImage()
        model = torch.load("./models/model_epoch_20.pth")
        model = model['arch']
        loader = transforms.Compose([
            transforms.ToTensor()
        ])
        image = Image.open(f"../new_data/final_test/noisy_{image_number}.jpg")
        image = loader(image).float()
        print(image.shape)
        image = image.unsqueeze(0)
        out = torch.clamp(image-model(image), 0., 1.)
        out = out.squeeze(0)
        print(out.shape)
        trans(out).save(f'../new_data/final_test/clean_{image_number}.jpg')

if __name__ == "__main__":
    training()
    # testing()
