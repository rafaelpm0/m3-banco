export async function getDividas() {
    try{
        const response = await fetch("http://localhost:5000/dividas",{
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

export async function updateDividaSelect() {
    try {
        const dividas = await getDividas();
        console.log(dividas)
        const select = document.getElementById("data-numero_divida");
        if (select) {
            const defaultOption = select.querySelector("option[value='']");
            if (defaultOption) {
                defaultOption.disabled = false;
            }
            select.innerHTML = "";
            if (defaultOption) {
                select.appendChild(defaultOption);
            }
            dividas.forEach(divida => {
                const option = document.createElement("option");
                option.value = divida.id;
                option.text = `${divida.nome_cliente} - Processo: ${divida.numero_processo}`;
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
    console.log(data);
    Object.keys(data).forEach(key => {
        const element = document.getElementById(`data-${key}`);
        if (element) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
                element.value = data[key] || "";
            } else if (element.tagName === "BUTTON" && key === "arquivo_comprovante") {
                const fileName = data.arquivo_comprovante_name || "comprovante.pdf";
                const fileContent = data.arquivo_comprovante ? new Uint8Array(data.arquivo_comprovante.data) : null;
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
    formData.append("nome_cliente", data.nome_cliente);
    formData.append("cpf_cliente", data.cpf_cliente);
    formData.append("email_cliente", data.email_cliente);
    formData.append("cep", data.cep);
    formData.append("numero", data.numero);
    formData.append("complemento", data.complemento);
    formData.append("valor", data.valor);
    formData.append("descricao", data.descricao);
    formData.append("situacao", data.situacao);
    formData.append("numero_processo", data.numero_processo);
    formData.append("arquivo_comprovante", data.arquivo_comprovante);



    try {
        const response = await fetch("http://localhost:5000/dividas", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Server response:", result);
        showMessageModal("Divida cadastrada com sucesso!");
        setTimeout(() => {
            deactivateModal();
        }, 3000);
    } catch (error) {
        console.error("Error:", error);
        showMessageModal("Erro ao cadastrar divida!");
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

