//
// Módulo para coordenar a renderização e remoção de views, escuta por eventos
// do event aggregator
//
define([

    "util/evAggregator",
    "views/app/navbar",
    "views/atividades/frame",
    "views/inicio/frame"

    ], function(evAggregator, Navbar, AtividadesFrame, InicioFrame) {

        var ViewManager = function() {

            // Método adicionado Backbone.View para destruir as views, no final
            // dispara o evento 'close', as views podem escutar este evento para
            // executar rotinas de limpeza
            Backbone.View.prototype.close = function() {
                this.$el.empty();
                this.stopListening();
                this.trigger("close");
            };

            this.closeCurrent = function() {
                if (this.currentView) this.currentView.close();
            };

            evAggregator.on(
                "view:navbar"
                ,   function() {
                        new Navbar().render();
            }, this);

            evAggregator.on(
                "view:atividades"
                ,   function(categoria) {
                        this.closeCurrent();
                        this.currentView = new AtividadesFrame().render(categoria);
            }, this);

            evAggregator.on(
                "view:inicio"
                ,   function() {
                        this.closeCurrent();
                        this.currentView = new InicioFrame().render();
            }, this);

        };

        return ViewManager;

});