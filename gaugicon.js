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

        bgColour: "#FFFFFF",    // Normal background color
        colours: [],            // areas of  different bg colour

        retina: false       // canvas should be 32x32 instead of 16x16 and all dimensions are x2
        autoApply: true     // automatically apply the new graphic on value set

        minAngle: (0 - (Math.PI * 1.29));
        maxAngle: (Math.PI * 0.29);
    };

    gaugicon.DialGauge.prototype.init = function(options) {
        this.options = $.extend({}, gaugicon.DialGauge.DEFAULTS, options);
        this.value = this.options.min;

        this._canvas = document.createElement('canvas');

        var size = retina ? 32 : 16;
        this._canvas.width = this._canvas.height = size;

        this._context = _canvas.getContext('2d');
    };

    /* Update the value and redraw the canvas image */
    gaugicon.DialGauge.setValue = function(val) {
        this.value = val;
        if (autoApply) this.apply();
    };

    /* Update the visible favicon with the current canvas image */
    gaugicon.DialGauge.apply = function() {
        var matches = ('link[rel~=icon]');
        if (matches.length == 0)
            this._createFaviconElement();

        this._draw();
        $('link[rel~=icon]').attr('href', this.canvas.toDataURL("image/png"));
    };

    /* Creates a favicon link element */
    gaugicon.DialGauge._createFaviconElement = function() {
        var link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    /* Selects the correct background colour */
    gaugicon.DialGauge._chooseBackgroundColour = function() {
        var bg = this.options.bgColour;
        $.each(this.options.colours, function(i,v) {
            if (this.value >= v.from && this.value <= v.to)
                bg = v.bgColour;
        });
    };

    /* Draw the face of the dial */
    gauge.DialGauge._drawFace = function() {
        var size = this._canvas.width;

        this._context.fillStyle = _chooseBackgroundColour();
        this._context.beginPath();
        this._context.arc(
            size / 2,
            size / 2,
            (size / 2) - 1
            this.options.minAngle,
            this.options.maxAngle,
            false
        );
        this._context.fill()
        this._context.stroke();
        this._context.closePath();
    };

    /* Draws the image onto the canvas */
    gaugicon.DialGauge._draw = function() {
        if (this._context == null) return;  // Canvas appears to be unsupported.

        this._context.clearRect(0, 0, this.options.width, this.options.height);

        this._drawFace();
    };


    window.gaugicon = gaugicon;

})(jQuery);
