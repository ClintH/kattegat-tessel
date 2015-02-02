# demo-climate

Some basic demos of using the camera. The samples assume the camera module is plugged into port 'A' of the Tessel.

Read more:
 * http://start.tessel.io/modules/climate
 * http://tessel.io/docs/climate

# Installing

* Unplug the Tessel from your computer
* Plug the climate module into port 'B' of the Tessel
* In the demo-climate directory, run `npm install`

# Demo

There is just one demo of the climate module, which you can upload to your Tessel via:

```
node app demo-climate/
```

The demo prints climate data and transmits it to Kattegat, meaning you can hook into the sensor values from some other source.