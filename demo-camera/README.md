# demo-camera

Some basic demos of using the camera. The samples assume the camera module is plugged into port 'A' of the Tessel.

If you get corrupt images, try unplugging the Tessel, plugging it in again and uploading the sketch again.

Read more:
 * http://start.tessel.io/modules/camera
 * http://tessel.io/docs/camera

# Installing

* Unplug the Tessel from your computer
* Plug the camera module into port 'A' of the Tessel
* In the demo-camera directory, run `npm install`

# Demos

Sketches are easily uploaded to the Tessel from the kattegat-tessel directory:

```
node app demo-camera/webcam.js
```

## camera

Takes a photo from the camera when you press the button on the Tessel. The image is saved in the directory you installed kattegat-tessel as a JPG file.

## webcam

Takes a photo every second and emits it to Kattegat. Copy the `webcam` sketch in your public directory and open this to view the captured images.
