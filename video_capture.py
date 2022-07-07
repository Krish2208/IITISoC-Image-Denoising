import cv2
# videos = ['VIRAT_S_000002.mp4', 'VIRAT_S_050300_10_002176_002238.mp4', 'VIRAT_S_050301_00_000000_000036.mp4']
videos = ['VIRAT_S_010115_03_000685_000793.mp4',
          'VIRAT_S_010108_02_000800_000960.mp4', 'VIRAT_S_010114_00_000006_000116.mp4']
i = 1
for video_name in videos:
    video = cv2.VideoCapture(f'./data/videos/{video_name}')
    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break
        if i % 150 == 0:
            cv2.imwrite('./data/test_images/'+str((i//150)+3751)+'.jpg', frame)
        i += 1

    video.release()
    cv2.destroyAllWindows()
