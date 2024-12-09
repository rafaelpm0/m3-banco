import {updateDividaSelect, updatePagadorSelect} from "./UpdateSelect.js";
import {handleChangeDivida, handleChangePagador, showMessageModal} from "./utils.js";
import {getDividas, getPagadores, getUnidades} from "./getAPI.js";
import {handleForm, handleFormPagadores } from "./postAPI.js";
import {deleteDivida, deletPagador} from "./delAPI.js";

document.addEventListener("DOMContentLoaded", () => {

    updateDividaSelect();
    updatePagadorSelect();
    updateUnidadeSelect();

    const formulario = document.getElementById("button_submit");
    if (formulario) {
        formulario.addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                const id_pagador = document.getElementById("id_pagador").value;
                const id_unidade = document.getElementById("id_unidade").value;
                const data_pagamento = document.getElementById("data_pagamento").value;
                const ano_referencia = document.getElementById("ano_referencia").value;
                const mes_referencia = document.getElementById("mes_referencia").value;
                const arquivo_comprovante = document.getElementById("arquivo_comprovante").files[0];

                const data = {
                    id_pagador,
                    id_unidade,
                    data_pagamento,
                    ano_referencia,
                    mes_referencia,
                    arquivo_comprovante,
                };
                await handleForm(data);
            } catch (error) {
                console.error("Error during form submission:", error);
            }
        });
    } else {
        console.error("Form not found");
    }

    const formularioPagador = document.getElementById("button-submit-pagador");
    if (formularioPagador) {
        formularioPagador.addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                const nome_completo = document.getElementById("pagador-nome_completo").value;
                const email = document.getElementById("pagador-email").value;
                const documento = document.getElementById("pagador-documento").value;
                const telefone = document.getElementById("pagador-telefone").value;

                const data = {
                    nome_completo, email, documento, telefone
                };
                await handleFormPagadores(data);
            } catch (error) {
                console.error("Error during form submission:", error);
            }
        });
    } else {
        console.error("Form not found");
    }

    const select = document.getElementById("data-numero_pagamento");
    if (select) {
        select.addEventListener("change", async (event) => {
           
            const id = event.target.value;
            const data = await getDividas(); //dava para melhorar e fazer a requisicao direto pelo id 
            const objectId = data[0].find((data) => data.id_pagamento == id);
            handleChangeDivida(objectId);
        });
    } else {
        console.error("Select not found");
    }

    const selectPagador = document.querySelectorAll("#id_pagador")[1];
    if (selectPagador) {
        selectPagador.addEventListener("change", async (event) => {
           
            const id = event.target.value;
            const data = await getPagadores(); //dava para melhorar e fazer a requisicao direto pelo id 
            const objectId = data.find((data) => data.id_pagador == id);
            handleChangePagador(objectId);
        });
    } else {
        console.error("Select not found");
    }

    const deleteButton = document.getElementById("btn-delete");
    if (deleteButton) {
        deleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log("Delete button clicked and propagation stopped");
            try {
                await deleteDivida();
            } catch (error) {
                console.error("Error during delete:", error);
            }
        });
    } else {
        console.error("Delete button not found");
    }

    const deleteButtonPagador = document.getElementById("btn-delete-pagador");
    if (deleteButtonPagador) {
        deleteButtonPagador.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log("Delete button clicked and propagation stopped");
            try {
                await deletPagador();
            } catch (error) {
                console.error("Error during delete:", error);
            }
        });
    } else {
        console.error("Delete button not found");
    }

});




async function updateUnidadeSelect() {
    try {
        const unidades = await getUnidades();
        const select = document.getElementById("id_unidade");
        if (select) {
            select.innerHTML = "<option value='' disabled selected>Escolha a unidade</option>";
            unidades.forEach(unidade => {
                const option = document.createElement("option");
                option.value = unidade.id_unidade;
                option.text = unidade.numero_identificador;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Erro ao atualizar o select de unidades:", error);
    }
}