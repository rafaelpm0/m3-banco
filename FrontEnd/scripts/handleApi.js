export async function getDividas() {
    try{
        const response = await fetch("http://localhost:5000/api/pagamentos",{
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"}
        });
        if(!response.ok){
            showMessageModal("Erro de conexão com api");
        }else{
            const data = await response.json();
            return data;
        }
    
    }catch{
        showMessageModal("Erro de conexão com api");
    }
}

export async function getPagadores() {
    try {
        const response = await fetch("http://localhost:5000/api/pagadores", {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });
        if (!response.ok) {
            showMessageModal("Erro de conexão com api");
        } else {
            const data = await response.json();
            return data;
        }
    } catch {
        showMessageModal("Erro de conexão com api");
    }
}

export async function getUnidades() {
    try {
        const response = await fetch("http://localhost:5000/api/unidades", {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" }
        });
        if (!response.ok) {
            showMessageModal("Erro de conexão com api");
        } else {
            const data = await response.json();
            return data;
        }
    } catch {
        showMessageModal("Erro de conexão com api");
    }
}

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
            dividas[0].forEach(divida => {
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

export function handleChangeDivida(data) {
    console.log(data, data.comprovante.data)
    Object.keys(data).forEach(key => {
      
        const element = document.getElementById(`data-${key}`);
        
        if (element) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
                element.value = data[key] || "";
            } else if (element.tagName === "BUTTON" && key === "comprovante") {
                const fileName = "comprovante.pdf";
                const fileContent = data.comprovante ? new Uint8Array(data.comprovante.data) : null;
                if (fileContent) {
                    const blob = new Blob([fileContent], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    element.onclick = () => {
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    };
                } else {
                    element.onclick = null;
                }
            } else {
                element.textContent = data[key] || "";
            }
        }
    });
}

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
    updateDividaSelect()
}

export async function deleteDivida() {
    try {
        const id = document.getElementById("data-numero_divida").value;
        if (id === "") {
            showMessageModal("Selecione uma divida para deletar");
            return;
        }
        const response = await fetch(`http://localhost:5000/dividas/${id}`, {
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
    updateDividaSelect()
}

function showMessageModal(message){
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const div = document.createElement("div");
    div.className = 'messageContainer';
    div.innerHTML = `<h2>${message}</h2>`;
    modal.className = "modal active";
    modalContent.innerHTML = "";
    modalContent.appendChild(div);
}

function deactivateModal() {
    const modal = document.getElementById("modal");
    modal.className = "modal";
}

window.deactivateModal = deactivateModal;