sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";
        var urlObject = library.URLHelper;
        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
                let produto = {};
                let productModel = new JSONModel(produto);
                let view = this.getView();
                view.setModel(productModel,"ModeloProduto");                
            },
            onClickImage: function(oEvent) {
                urlObject.redirect(oEvent.getSource().getSrc(), true);
            },
            onPressBuscar: function() {
                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();
                //alert(valor);

                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor, 
                    method : "GET",
                    async : true,
                    crossDomain : true
                };

                $.ajax(parameters)
                .done(function(response){
                    let oProdutoModel = this.getView().getModel("ModeloProduto");
                    //clear
                    oProdutoModel.setData({});
                    oProdutoModel.refresh();
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();
                }.bind(this)) //sucesso
                .fail(function(){

                }.bind(this)); //erro


                // Variavel tipo texto - com aspas
                let material = "Agua Mineral Natural";
                // Variavel tipo numérico
                let peso = 500;
                let uom = "ml";
                // numerico com casas decimais
                let qtdsodio = 15.66;
                //booleano - abap_bool
                let conteudoliquido = true;

                //tabela interna no javascript - array
                let composicao = ["bicarbonato","magnesio","sulfato","brometo"];
                //estrutura - tipo com varias propriedades - ou tambem chamado de obejto
                let produto = {
                    descricao : "chá verde",
                    marca : "quaker",
                    peso: 130,
                    uom: "g"
                }

            }
        });
    });
