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
        this.canvas = null;

        this.init(options);
    };

    gaugicon.DialGauge.DEFAULTS = {
        min: 0,             // minimum point on the dial
        max: 100,           // maximum point on the dial

        bands: [],          // areas of colour ({from: 90, to: 100, color: '#F00'})

        retina: false       // canvas should be 32x32 instead of 16x16
    };

    gaugicon.DialGauge.prototype.init = function(options) {
        this.options = $.extend({}, gaugicon.DialGauge.DEFAULTS, options);

        this.canvas = document.createElement('canvas');

        var size = retina ? 32 : 16;
        this.canvas.width = this.canvas.height = size;
    };



    window.gaugicon = gaugicon;

})(jQuery);
