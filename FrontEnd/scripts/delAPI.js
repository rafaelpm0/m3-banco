import {updateDividaSelect, updatePagadorSelect} from "./UpdateSelect.js";
import { showMessageModal} from "./utils.js";



export async function deleteDivida() {
    try {
      const id = document.getElementById("data-numero_pagamento").value;
      if (id === "") {
        showMessageModal("Selecione uma divida para deletar");
        return;
      }
      const response = await fetch(`http://localhost:5000/api/pagamentos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        showMessageModal("Erro ao deletar divida");
      } else {
        showMessageModal("Divida deletada com sucesso");
        setTimeout(() => {
          deactivateModal();
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      showMessageModal("Erro ao deletar divida");
    }
    updateDividaSelect();
  }
  
  export async function deletPagador() {
    try {
      const id = document.querySelectorAll("#id_pagador")[1].value;
      if (id === "") {
        showMessageModal("Selecione um pagador para deletar");
        return;
      }
      const response = await fetch(`http://localhost:5000/api/pagadores/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        showMessageModal("Erro ao deletar pagador");
      } else {
        showMessageModal("Pagador deletada com sucesso");
  
        setTimeout(() => {
          deactivateModal();
        }, 3000);
        await updatePagadorSelect();
        await updateDividaSelect();
      }
    } catch (error) {
      console.error("Error:", error);
      showMessageModal("Erro ao deletar pagador");
    }
  }
  