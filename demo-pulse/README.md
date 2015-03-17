# demo-pulse

Some basic demos of using the pulse sensor.
Please see the below link on how to wire up the sensor.
The code assumes you've conencted the sensor to analog port 1 (A1).

Read more on connecting up the sensor:
 * https://github.com/Frijol/PulseSensor

# Installing

* Unplug the Tessel from your computer
* Connect the pulse sensor according to instructions
* In the demo-pulse directory, run `npm install`

# Demo

There is just one demo of the pulse module, which you can upload to your Tessel via:

```
node app demo-pulse/
```

The demo prints pulse data and transmits it to Kattegat, meaning you can hook into the sensor values from some other source.