(function (root) {
    'use strict';
    var colorMe = {};
    
    colorMe.HexColor = function (hex) {
        var sc_parts, parts = [], val = hex.toString();
        //check for shortcode - #123 should be #112233
        sc_parts = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(val);
        
        if (sc_parts) {
            sc_parts.forEach(function (val) {
                parts.push(val + val);
            });
        } else {
            parts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
        }

        if (parts) {
            parts = parts.splice(1);
            this.r_part = parts[0];
            this.g_part = parts[1];
            this.b_part = parts[2];
        } else {
            this.r_part = '00';
            this.g_part = '00';
            this.b_part = '00';
        }
    };
    
    colorMe.HexColor.prototype = {
        getRGB: function () {
            return new colorMe.RGB(parseInt(this.r_part, 16), parseInt(this.g_part, 16), parseInt(this.b_part, 16));
        },
        getHSL: function () {
            return this.getRGB().getHSL();
        },
        getValue: function () {
            return "#" + this.r_part + this.g_part + this.b_part;
        }
    };
    
    colorMe.RGB = function (r, g, b) {
        var r_val = parseInt(r, 10) || 0,
            g_val = parseInt(g, 10) || 0,
            b_val = parseInt(b, 10) || 0;
        
        //keep r, g, b between 0, 255
        this.r = Math.max(Math.min(r_val,  255), 0);
        this.g = Math.max(Math.min(g_val,  255), 0);
        this.b = Math.max(Math.min(b_val,  255), 0);
    };
    
    colorMe.RGB.prototype = {
        getHex: function () {
            
            var values = [];
            values.push("#");
            values.push(('0' + this.r.toString(16)).slice(-2));
            values.push(('0' + this.g.toString(16)).slice(-2));
            values.push(('0' + this.b.toString(16)).slice(-2));
            return values.join('').toUpperCase();
        },
        getHSL: function () {
            var rForOne = this.r / 255,
                gForOne = this.g / 255,
                bForOne = this.b / 255,
                max_color = Math.max(rForOne, gForOne, bForOne),
                min_color = Math.min(rForOne, gForOne, bForOne),
                l = (max_color + min_color) / 2,
                h = 0,
                s = 0;
            
            if (max_color !== min_color) {
                if (l > 0.5) {
                    s = (max_color - min_color) / (2 - max_color - min_color);
                } else {
                    s = (max_color - min_color) / (max_color + min_color);
                }
                
                if (rForOne > gForOne && rForOne > bForOne) {
                    h = (gForOne - bForOne) / (max_color - min_color);
                } else if (gForOne > rForOne && gForOne > bForOne) {
                    h = 2.0 + (bForOne - rForOne) / (max_color - min_color);
                } else {
                    h = 4.0 + (rForOne - gForOne) / (max_color - min_color);
                }
                
                h *= 60;
            }
            
            return new colorMe.HSL(h, s, l);
        }
    };
    
    colorMe.HSL = function (h, s, l) {
        var h_val = Math.round(h) || 0,
            s_val = parseFloat(s) || 0,
            l_val = parseFloat(l) || 0;
        if (h_val >= 360) {
            this.h = h_val % 360;
        } else if (h_val < 0) {
            this.h = h_val + 360 * Math.ceil((h_val * -1) / 360);
        } else {
            this.h = h_val;
        }
        
        this.s = Math.max(Math.min(s_val, 1), 0);
        this.l = Math.max(Math.min(l_val, 1), 0);
    };
    
    colorMe.HSL.prototype = {
        getRGB: function () {
            var r, g, b, t1, t2, h_val, r1, g1, b1,
                hue2rgb = function (t1, t2, h) {
                    var color;
                    if (6 * h < 1) {
                        color = t2 + (t1 - t2) * 6 * h;
                    } else if (2 * h < 1) {
                        color = t1;
                    } else if (3 * h < 2) {
                        color = t2 + (t1 - t2) * (0.666 - h) * 6;
                    } else {
                        color = t2;
                    }
                    return color;
                },
                correctColor = function (color) {
                    var val = color;
                    if (color > 1) {
                        val = color - 1;
                    } else if (color < 0) {
                        val = color + 1;
                    }
                    
                    if (!(val > 0 && val < 1)) {
                        val = correctColor(val);
                    }
                    return val;
                };
            
            if (this.s === 0) {
                r = g = b = this.l * 255;
            } else {
                if (this.l < 0.5) {
                    t1 = this.l * (1.0 + this.s);
                } else {
                    t1 = this.l + this.s - this.l * this.s;
                }
                
                t2 = 2 * this.l - t1;
                h_val = this.h / 360;
                
                r1 = correctColor(h_val + 0.333);
                g1 = correctColor(h_val);
                b1 = correctColor(h_val - 0.333);
                
                r = Math.round(hue2rgb(t1, t2, r1) * 255);
                g = Math.round(hue2rgb(t1, t2, g1) * 255);
                b = Math.round(hue2rgb(t1, t2, b1) * 255);
            }
            return new colorMe.RGB(r, g, b);
        },
        getHex: function () {
            return this.getRGB().getHex();
        }
    };
    
    root.colorMe = colorMe;
    
}(this));