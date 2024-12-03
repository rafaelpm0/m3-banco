import { handleForm, updateDividaSelect, handleChangeDivida, getDividas, deleteDivida } from "./handleApi.js";

document.addEventListener("DOMContentLoaded", () => {

    updateDividaSelect();

    const formulario = document.getElementById("button_submit");
    if (formulario) {
        formulario.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log("Form submit event prevented and propagation stopped");

            try {
                const nome_cliente = document.getElementById("nome_cliente").value;
                const cpf_cliente = document.getElementById("cpf_cliente").value;
                const email_cliente = document.getElementById("email_cliente").value;
                const cep = document.getElementById("cep").value;
                const numero = document.getElementById("numero").value;
                const complemento = document.getElementById("complemento").value;
                const valor = document.getElementById("valor").value;
                const descricao = document.getElementById("descricao").value;
                const situacao = document.getElementById("situacao").value;
                const numero_processo = document.getElementById("numero_processo").value;
                const arquivo_comprovante = document.getElementById("arquivo_comprovante").files[0];

                const data = {
                    nome_cliente,
                    cpf_cliente,
                    email_cliente,
                    cep,
                    numero,
                    complemento,
                    valor,
                    descricao,
                    situacao,
                    numero_processo,
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

    const select = document.getElementById("data-numero_divida");
    if (select) {
        select.addEventListener("change", async (event) => {
            const id = event.target.value;
            const dividas = await getDividas(); //dava para melhorar e fazer a requisicao direto pelo id 
            const divida = dividas.find((divida) => divida.id == id);
            handleChangeDivida(divida);
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

});