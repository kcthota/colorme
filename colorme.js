(function (root) {
    'use strict';
    var colorMe = {};
    
    colorMe.HexColor = function (hex) {
        if (hex) {
            var sc_parts, parts = [], val = hex.toString();

            //check for shortcode - #123 should be #112233
            sc_parts = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(val);

            if (sc_parts) {
                sc_parts.splice(1).forEach(function (val) {
                    parts.push(val + val);
                });
            } else {
                parts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
                parts = parts.splice(1);
            }

            if (parts) {
                this.r_part = parts[0];
                this.g_part = parts[1];
                this.b_part = parts[2];
            }
        }
        
        return null;
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
            values.push(this.r.toString(16).slice(-2));
            values.push(this.g.toString(16).slice(-2));
            values.push(this.b.toString(16).slice(-2));
            return values.join('');
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
            
            s = parseFloat(s).toFixed(2);
            l = parseFloat(l).toFixed(2);
            
            return new colorMe.HSL(h, s, l);
        }
    };
    
    colorMe.HSL = function (h, s, l) {
        var h_val = parseFloat(h).toFixed(0) || 0,
            s_val = parseFloat(s) || 0,
            l_val = parseFloat(l) || 0;
        
        this.h = h_val > 360 ? h_val % 360 : h_val;
        this.h = h_val < 0 ? h_val + 360 * Math.ceil((h_val * -1) / 360) : h_val;
        this.s = Math.max(Math.min(s_val, 1), 0);
        this.l = Math.max(Math.min(l_val, 1), 0);
    };
    
    colorMe.HSL.prototype = {
        getRGB: function () {
            
        }
    };
    
    root.colorMe = colorMe;
    
}(this));