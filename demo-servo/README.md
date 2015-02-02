# demo-servo

Make sure you only plug and unplug servos and the servo module itself
while the Tessel is unplugged from your computer.

Warnings:
* The motor is very weak, do not try to move heavy or immobile objects.
* The motor generates heat, give it a rest if it seems too hot
* If the motor is trying to move but can't (because the object is too heavy or it has stalled), disconnect the power as soon as possible to avoid burn out.

Connect it up:
* Unplug the Tessel from your computer
* Plug the servo module in to port 'C' of the Tessel
* Connect a servo motor to channel 1 of the servo module. The yellow wire should be toward the 'S' label on the module, and the brown wire should be toward the '-' label. 
* Plug the Tessel in to your computer via USB
* In the demo-servo directory, run `npm install` to fetch the necessary helper code.
* Plug the power adapter in to the servo module to power the servo (if the module is not powered your code will still run, but the motor will not turn)

Read more:
 * http://start.tessel.io/modules/servo
 * http://tessel.io/docs/servo
 
# Demos

Sketches are easily uploaded to the Tessel from the kattegat-tessel directory:

```
node app demo-servo/random.js
```

## spin

Spins the servo back and forth in its range of movement. Pressing the on-board Tessel button switches between three speed settings.

## remote

Set the position of the servo from a Kattegat sketch. Requires you to copy 'remote-sketch' to your Kattegat/public directory, and open it in your browser.

## random

Randomly moves to a new position every second

# Tuning the duty cycle
In the `servo.configure` call, there are two numbers for tuning the pulse width modulation. The default minimum is 0.0.5 and the maximum is 0.12. According to Tessel docs, moving these numbers toward each other means less movement range, but more sure movement, and moving them apart from each other means more movement range, but the motor might stall or burn out. Please be careful if these numbers are adjusted!