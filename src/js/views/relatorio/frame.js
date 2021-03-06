define([

    "text!../../templates/relatorio/frame.html"

    ], function(relatorioFrameTpl) {

        var RelatorioFrame = Backbone.View.extend({

            el : $("#content"),

            initialize : function () {
                this.on("close", this.cleanUp, this);
            },

            render : function() {
                this.$el.html(_.template(relatorioFrameTpl));
                this.$(".datepicker").datepicker();
                return this;
            },

            cleanUp: function () {
                $(".datepicker").remove();
            }

        });

        return RelatorioFrame;

});