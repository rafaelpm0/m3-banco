
import { showMessageModal} from "./utils.js";
import {getDividas, getPagadores, getUnidades} from "./getAPI.js";


export async function updateDividaSelect() {
    try {
      const dividas = await getDividas();
      const select = document.getElementById("data-numero_pagamento");
      if (select) {
        const defaultOption = select.querySelector("option[value='']");
        if (defaultOption) {
          defaultOption.disabled = false;
        }
        select.innerHTML = "";
        if (defaultOption) {
          select.appendChild(defaultOption);
        }
        dividas[0].forEach((divida) => {
          const option = document.createElement("option");
          option.value = divida.id_pagamento;
          option.text = `${divida.nome_completo} - ${divida.mes_referencia}/${divida.ano_referencia}`;
          select.appendChild(option);
        });
      }
    } catch (error) {
      showMessageModal("Erro ao atualizar o select de dívidas!");
      setTimeout(() => {
        deactivateModal();
      }, 3000);
    }
  }

  export async function updatePagadorSelect() {
    try {
      const pagadores = await getPagadores();
      const selects = document.querySelectorAll("#id_pagador");
      if (selects.length > 0) {
        selects.forEach((select) => {
          select.innerHTML =
            "<option value='' disabled selected>Escolha o pagador</option>";
          pagadores.forEach((pagador) => {
            const option = document.createElement("option");
            option.value = pagador.id_pagador;
            option.text = pagador.nome_completo;
            select.appendChild(option);
          });
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar o select de pagadores:", error);
    }
  }
  
  export async function updateUnidadeSelect() {
    try {
        const unidades = await getUnidades();
        const selects = document.querySelectorAll("#id_unidade");
        if (selects.length > 0) {
          selects.forEach((select) => {
            select.innerHTML =
              "<option value='' disabled selected>Escolha o pagador</option>";
              unidades.forEach((unidade) => {
              const option = document.createElement("option");
              option.value = unidade.id_unidade;
              option.text = `N ${unidade.numero_identificador} ${unidade.localizacao}`;
              select.appendChild(option);
            });
          });
        }
      } catch (error) {
        console.error("Erro ao atualizar o select de pagadores:", error);
      }
    }