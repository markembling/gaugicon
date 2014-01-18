/*
 * gaugicon
 * http://github.com/markembling/gaugicon
 *
 * Copyright (c) 2014 Mark Embling (markembling.info)
 * Licensed under the BSD (3 clause) license.
 */

;(function($) {

    "use strict";

    var gaugicon = {};


    gaugicon.DialGauge = function(options) {
        this.options = null;
        this.value = 0;
        this._canvas = null;
        this._context = null;

        this.init(options);
    };

    gaugicon.DialGauge.DEFAULTS = {
        min: 0,             // minimum dial value
        max: 100,           // maximum dial value

        bgColour: "#FFFFFF",        // Normal background color
        outlineColour: "#000000",   // Outline colour
        colours: [],                // areas of  different bg colour

        retina: false,      // canvas should be 32x32 instead of 16x16 and all dimensions are x2
        autoApply: true,    // automatically apply the new graphic on value set

        minAngle: (0 - (Math.PI * 1.29)),
        maxAngle: (Math.PI * 0.29)
    };

    gaugicon.DialGauge.prototype.init = function(options) {
        this.options = $.extend({}, gaugicon.DialGauge.DEFAULTS, options);
        this.value = this.options.min;

        this._canvas = document.createElement('canvas');

        var size = this.options.retina ? 32 : 16;
        this._canvas.width = this._canvas.height = size;

        this._context = this._canvas.getContext('2d');
    };

    /* Update the value and redraw the canvas image */
    gaugicon.DialGauge.prototype.setValue = function(val) {
        this.value = val;
        if (this.options.autoApply) this.apply();
    };

    /* Update the visible favicon with the current canvas image */
    gaugicon.DialGauge.prototype.apply = function() {
        var matches = $('link[rel~=icon]');
        if (matches.length == 0)
            this._createFaviconElement();

        this._draw();
        $('link[rel~=icon]').attr('href', this._canvas.toDataURL("image/png"));
    };

    /* Creates a favicon link element */
    gaugicon.DialGauge.prototype._createFaviconElement = function() {
        var link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    /* Selects the correct background colour */
    gaugicon.DialGauge.prototype._chooseBackgroundColour = function() {
        var bg = this.options.bgColour;
        $.each(this.options.colours, function(i,v) {
            if (this.value >= v.from && this.value <= v.to)
                bg = v.bgColour;
        });
        return bg;
    };

    /* Determine the middle of the dial */
    gaugicon.DialGauge.prototype._getDialCentrePoint = function() {
        var size = this._canvas.width;
        return [ size / 2, size / 2 ];
    };

    /* Draw the face of the dial */
    gaugicon.DialGauge.prototype._drawFace = function() {
        var size = this._canvas.width;
        var lineWidth = this.options.retina ? 2 : 1.5;
        var centre = this._getDialCentrePoint();

        this._context.fillStyle = this._chooseBackgroundColour();
        this._context.strokeStyle = this.options.outlineColour;
        this._context.lineWidth = lineWidth;

        this._context.beginPath();
        this._context.arc(
            centre[0],
            centre[1],
            (size / 2) - Math.ceil(lineWidth),
            this.options.minAngle,
            this.options.maxAngle,
            false
        );
        this._context.fill();
        this._context.stroke();
        this._context.closePath();
    };

    /* Draw the dial's needle */
    gaugicon.DialGauge.prototype._drawNeedle = function() {
        // thanks to @vkornov for giving me this formula
        var currentValueRotationAngle = ((this.value - this.options.min) * 
                                         (this.options.maxAngle - this.options.minAngle) / 
                                         (this.options.max - this.options.min) + 
                                         this.options.minAngle);
        var centre = this._getDialCentrePoint();
        var lineWidth = this.options.retina ? 2 : 1.5;
        var needleLength = (this._canvas.width / 2) - lineWidth

        // Position/rotate to put needle in the right place
        this._context.translate(centre[0], centre[1]); 
        this._context.rotate(currentValueRotationAngle);

        this._context.lineWidth = lineWidth;
        this._context.beginPath();
        this._context.moveTo(-1, 0);
        this._context.lineTo(needleLength, 0);
        this._context.stroke();
        this._context.closePath();

        // Reset needle translation/rotation
        this._context.rotate(0 - currentValueRotationAngle);
        this._context.translate(centre[0] * -1, centre[1] * -1);
    };

    /* Draws the image onto the canvas */
    gaugicon.DialGauge.prototype._draw = function() {
        if (this._context == null) return;  // Canvas appears to be unsupported.

        this._context.clearRect(0, 0, this.options.width, this.options.height);

        this._drawFace();
        this._drawNeedle();
    };


    window.gaugicon = gaugicon;

})(jQuery);
