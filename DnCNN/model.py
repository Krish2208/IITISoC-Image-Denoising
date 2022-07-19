import torch.nn as nn

class DnCNN(nn.Module):
    def __init__(self):
        super(DnCNN, self).__init__()

        self.conv1 = nn.Conv2d(in_channels = 3, out_channels = 64, kernel_size = 3, padding = 1, bias = False)
        self.relu1 = nn.ReLU(inplace=False)

        layers = []
        for i in range(8):
            layers.append(nn.Conv2d(in_channels = 64, out_channels = 64, kernel_size = 3, padding = 1, bias = False))
            layers.append(nn.BatchNorm2d(64))
            layers.append(nn.ReLU(inplace=True))
        
        self.layers = nn.Sequential(*layers)
        self.conv2 = nn.Conv2d(in_channels = 64, out_channels = 3, kernel_size = 3, padding = 1, bias = False)
    
    def forward(self, x):
        x = self.conv2(self.layers(self.relu1(self.conv1(x))))
        return x