
export function handleChangeDivida(data) {
  Object.keys(data).forEach((key) => {
    const element = document.getElementById(`data-${key}`);
    if (element) {
      if (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT"
      ) {
        element.value = data[key] ? data[key] : "";
      } else if (element.tagName === "BUTTON" && key === "comprovante") {
        const fileName = "comprovante.pdf";
        const fileContent = data.comprovante
          ? new Uint8Array(data.comprovante.data)
          : null;
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

export function handleChangePagador(data) {
  Object.keys(data).forEach((key) => {
    const element = document.getElementById(`data-pagador-${key}`);
    if (element) {
      element.textContent = data[key] || "";
    }
  });
}

export function handleChangeUnidade(data) {
  Object.keys(data).forEach((key) => {
    const element = document.getElementById(`unidade-${key}`);
    if (element) {
      element.textContent = data[key] || "";
    }
  });
}



export function showMessageModal(message) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const div = document.createElement("div");
  div.className = "messageContainer";
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
