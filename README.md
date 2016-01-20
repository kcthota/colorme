colorme
=============

[![Build Status](https://img.shields.io/travis/kcthota/colorme/master.svg)](https://travis-ci.org/kcthota/colorme)

Library to help convert Hex Color Codes to RGB and HSL.

# Usage

```
bower install colorme
```

```
<script src="dist/colorme.min.js"></script>
```

# Examples

## Hex Color to RGB

```
var rgb, hexColor = new colorMe.HexColor('#123456');

rgb = hexColor.getRGB();

rgb.red();

rgb.green();

rgb.blue();

```

## Hex Color to HSL

```
var hsl, hexColor = new colorMe.HexColor('#123456');

hsl = hexColor.getHSL();

hsl.hue();

hsl.saturation();

hsl.lightness();

```

## RGB to Hex

```
var hex, rgb = new colorMe.RGB(150, 150, 150);

hex = rgb.getHex();

```

## RGB to HSL

```
var hsl, rgb = new colorMe.RGB(12, 233, 120);

hsl = rgb.getHSL();

```

## HSL to Hex Color

```
var hex, hsl = new colorMe.HSL(0, 0, 0);

hex = hsl.getHex();
        
```

## HSL to RGB

```
var rgb, hsl = new colorMe.HSL(250, 0.20, 0.8);

rgb = hsl.getRGB();

```
# License

MIT License

Copyright 2016 Krishna Chaitanya Thota.

#References:

http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
