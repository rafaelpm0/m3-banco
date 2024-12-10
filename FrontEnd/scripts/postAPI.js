import {updateDividaSelect, updatePagadorSelect} from "./UpdateSelect.js";
import {showMessageModal} from "./utils.js";


export async function handleForm(data) {
    const formData = new FormData();
    formData.append("id_pagador", data.id_pagador);
    formData.append("id_unidade", data.id_unidade);
    formData.append("data_pagamento", data.data_pagamento);
    formData.append("ano_referencia", data.ano_referencia);
    formData.append("mes_referencia", data.mes_referencia);
    formData.append("arquivo_comprovante", data.arquivo_comprovante);
  
    try {
      const response = await fetch("http://localhost:5000/api/pagamentos", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Server response:", result);
      showMessageModal("Pagamento cadastrado com sucesso!");
      setTimeout(() => {
        deactivateModal();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      showMessageModal("Erro ao cadastrar pagamento!");
      setTimeout(() => {
        deactivateModal();
      }, 3000);
    }
    updateDividaSelect();
  }

  export async function handleFormPagadores(data) {
    try {
      const response = await fetch("http://localhost:5000/api/pagadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Server response:", result);
      showMessageModal("Pagador cadastrado com sucesso!");
      setTimeout(() => {
        deactivateModal();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      showMessageModal("Erro ao cadastrar pagador!");
      setTimeout(() => {
        deactivateModal();
      }, 3000);
    }
    updatePagadorSelect();
  }


  export async function handleFormUnidade(data) {
    try {
      const response = await fetch("http://localhost:5000/api/unidades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Server response:", result);
      showMessageModal("Unidade cadastrado com sucesso!");
      setTimeout(() => {
        deactivateModal();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      showMessageModal("Erro ao cadastrar unidade!");
      setTimeout(() => {
        deactivateModal();
      }, 3000);
    }
    updatePagadorSelect();
  }