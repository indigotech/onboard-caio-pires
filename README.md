# Onboard to the White Shores

## Description

One code to learn them all.

## Environment and tools

* Developed on Ubuntu 19.10
* Nodejs version 10.15.2
* NPM version 6.14.4
* Android Studio 3.6.3
* Run over Samsung Galaxy S9

## Steps to run and debug
Once in /elessar/ folder, open a terminal and run:

```console
npm start
```

It will start React Native.

Now, in order to run it on a device, open another terminal and connect your Android device's via USB and check if it is actually connected:

```console
lsusb
```

Copy the first four characters of ID. It should look like 04e8:6860, copy '04e8' and input them as follows:

```console
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

Now the device must be shown running this line:

```console
adb devices
```

Just one device must be running.

Now we can run the app with:

```console
npx react-native run-android
```
