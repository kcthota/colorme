describe("ColorTests", function () {
  
    it("hex color in short format", function() {
        var hexColor = new colorMe.HexColor('#123');
        expect(hexColor.getValue()).toBe('#112233');
    });
    
    it("short hex color without #", function() {
        var hexColor = new colorMe.HexColor('123');
        expect(hexColor.getValue()).toBe('#112233');
    });
    
    it("hex color without #", function() {
        var hexColor = new colorMe.HexColor('123456');
        expect(hexColor.getValue()).toBe('#123456');
    });
    
    it("valid hex color should be parseable", function() {
        var hexColor = new colorMe.HexColor('#123456');
        expect(hexColor.getValue()).toBe('#123456');
    });
    
    it("Invalid hex color code", function() {
        var hexColor = new colorMe.HexColor('#123ZUB');
        expect(hexColor.getValue()).toBe('#000000');
    });
    
    it("Hex to RGB - random color", function() {
        var rgb, hexColor = new colorMe.HexColor('#123456');
        rgb = hexColor.getRGB();
        expect(rgb.red()).toBe(18);
        expect(rgb.green()).toBe(52);
        expect(rgb.blue()).toBe(86);
    });
    
    it("Hex to RGB - black", function() {
        var rgb, hexColor = new colorMe.HexColor('#000000');
        rgb = hexColor.getRGB();
        expect(rgb.red()).toBe(0);
        expect(rgb.green()).toBe(0);
        expect(rgb.blue()).toBe(0);
    });
    
    it("Hex to RGB - white", function() {
        var rgb, hexColor = new colorMe.HexColor('#FFFFFF');
        rgb = hexColor.getRGB();
        expect(rgb.red()).toBe(255);
        expect(rgb.green()).toBe(255);
        expect(rgb.blue()).toBe(255);
    });
    
    it("Hex to HSL - random color", function() {
        var hsl, hexColor = new colorMe.HexColor('#123456');
        hsl = hexColor.getHSL();
        expect(hsl.hue()).toBe(210);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.65);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(0.20);
    });
    
    it("Hex to HSL - black", function() {
        var hsl, hexColor = new colorMe.HexColor('#000');
        hsl = hexColor.getHSL();
        expect(hsl.hue()).toBe(0);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(0.00);
    });
    
    it("Hex to HSL - white", function() {
        var hsl, hexColor = new colorMe.HexColor('#fff');
        hsl = hexColor.getHSL();
        expect(hsl.hue()).toBe(0);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(1.00);
    });
    
    it("RGB - negative values should be corrected to zero", function() {
        var rgb = new colorMe.RGB(-1, -4, -255);
        expect(rgb.red()).toBe(0);
        expect(rgb.green()).toBe(0);
        expect(rgb.blue()).toBe(0);
    });
    
    it("RGB - greater than 255 values should be corrected to 255", function() {
        var rgb = new colorMe.RGB(256, 500, 300);
        expect(rgb.red()).toBe(255);
        expect(rgb.green()).toBe(255);
        expect(rgb.blue()).toBe(255);
    });
    
    it("RGB - invalid values should default to 0", function() {
        var rgb = new colorMe.RGB('a', 'b', 'c');
        expect(rgb.red()).toBe(0);
        expect(rgb.green()).toBe(0);
        expect(rgb.blue()).toBe(0);
    });
    
    it("RGB to Hex conversion - grey", function() {
        var rgb = new colorMe.RGB(150, 150, 150);
        expect(rgb.getHex()).toBe('#969696');
    });
    
    it("RGB to Hex conversion", function() {
        var rgb = new colorMe.RGB(12, 233, 120);
        expect(rgb.getHex()).toBe('#0CE978');
    });
    
    it("RGB to Hex conversion - black", function() {
        var rgb = new colorMe.RGB(0, 0, 0);
        expect(rgb.getHex()).toBe('#000000');
    });
    
    it("RGB to Hex conversion - white", function() {
        var rgb = new colorMe.RGB(255, 255, 255);
        expect(rgb.getHex()).toBe('#FFFFFF');
    });
    
    it("RGB to HSL - black", function() {
        var hsl, rgb = new colorMe.RGB(0, 0, 0);
        hsl = rgb.getHSL();
        expect(hsl.hue()).toBe(0);
        expect(hsl.saturation()).toBe(0);
        expect(hsl.lightness()).toBe(0);
    });
    
    it("RGB to HSL - white", function() {
        var hsl, rgb = new colorMe.RGB(255, 255, 255);
        hsl = rgb.getHSL();
        expect(hsl.hue()).toBe(0);
        expect(hsl.saturation()).toBe(0);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(1.00);
    });
    
    
    it("RGB to HSL - random color", function() {
        var hsl, rgb = new colorMe.RGB(12, 233, 120);
        hsl = rgb.getHSL();
        expect(hsl.hue()).toBe(149);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.90);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(0.48);
    });
    
    it("RGB to HSL - random color", function() {
        var hsl, rgb = new colorMe.RGB(50, 50, 50);
        hsl = rgb.getHSL();
        expect(hsl.hue()).toBe(0);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(0.20);
    });
    
    it("create HSL - black", function() {
        var hsl = new colorMe.HSL(0, 0, 0)
        expect(hsl.hue()).toBe(0);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(0.00);
    });
    
    it("create HSL - white", function() {
        var hsl = new colorMe.HSL(0, 0, 1)
        expect(hsl.hue()).toBe(0);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(1.00);
    });
    
    it("create HSL - h greater than 360", function() {
        var hsl = new colorMe.HSL(400, 0, 1);
        expect(hsl.hue()).toBe(40);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(1.00);
    });
    
    it("create HSL - h less than 0", function() {
        var hsl = new colorMe.HSL(-30, 0, 1)
        expect(hsl.hue()).toBe(330);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(1.00);
    });
    
    it("create HSL - s and l positive boundary tests", function() {
        var hsl = new colorMe.HSL(360, 2, 1.1)
        expect(hsl.hue()).toBe(0);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(1.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(1.00);
    });
    
    it("create HSL - s and l negative boundary tests", function() {
        var hsl = new colorMe.HSL(360, -2, -0.2)
        expect(hsl.hue()).toBe(0);
        expect(parseFloat(hsl.saturation().toFixed(2))).toBe(0.00);
        expect(parseFloat(hsl.lightness().toFixed(2))).toBe(0.00);
    });
    
    it("HSL to hex - black", function() {
        var hsl = new colorMe.HSL(0, 0, 0);
        expect(hsl.getHex()).toBe('#000000');
    });
    
    it("HSL to hex - white", function() {
        var hsl = new colorMe.HSL(0, 0, 1);
        expect(hsl.getHex()).toBe('#FFFFFF');
    });
    
    it("HSL to hex - random color", function() {
        var hsl = new colorMe.HSL(120, 0.7, 0.7);
        expect(hsl.getHex()).toBe('#7DE87D');
    });
    
    it("HSL to RGB - random color", function() {
        var rgb, hsl = new colorMe.HSL(250, 0.20, 0.8);
        rgb = hsl.getRGB();
        expect(rgb.red()).toBe(197);
        expect(rgb.green()).toBe(194);
        expect(rgb.blue()).toBe(214);
    });
    
    it("HSL to RGB - black", function() {
        var rgb, hsl = new colorMe.HSL(0, 0, 0);
        rgb = hsl.getRGB();
        expect(rgb.red()).toBe(0);
        expect(rgb.green()).toBe(0);
        expect(rgb.blue()).toBe(0);
    });
    
    it("HSL to RGB - white", function() {
        var rgb, hsl = new colorMe.HSL(0, 0, 1);
        rgb = hsl.getRGB();
        expect(rgb.red()).toBe(255);
        expect(rgb.green()).toBe(255);
        expect(rgb.blue()).toBe(255);
    });
    
    it("HSL to RGB - grey", function() {
        var rgb, hsl = new colorMe.HSL(0, 0, 0.2);
        rgb = hsl.getRGB();
        expect(rgb.red()).toBe(51);
        expect(rgb.green()).toBe(51);
        expect(rgb.blue()).toBe(51);
    });
  
});
