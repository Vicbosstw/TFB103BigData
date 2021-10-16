import cv2
import numpy as np
import datetime as dt
import matplotlib.pyplot as plt
import sys

from numpy.core.numeric import _full_like_dispatcher

src = cv2.imread("./cvHW/taiko.mp4")
# src = cv2.resize(src, (500, 400))
gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
# gray = cv2.GaussianBlur(gray, (5, 5), 0)





cv2.imshow("img", gray)









cv2.waitKey()
cv2.destroyAllWindows()
cv2.waitKey(1)