'use strict';

/**
 * Lumen extension
 */

var modal = module.exports;

/**
 * The layout() hook.
 */
 modal.layout = function (layouts, callback) {

   var modalRegion = {
     name: "modal",
     title: "Modal",
     template: "/templates/modal-wrapper.html",
     weight: 3,
     region: true,
     classes: ["modal-region"]
   };

   Object.keys(layouts).forEach(function (name) {
     layouts[name].rows.push(modalRegion);
   });

   callback();
 }
