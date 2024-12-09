
import {showMessageModal} from "./utils.js";


export async function getDividas() {
    try {
      const response = await fetch("http://localhost:5000/api/pagamentos", {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
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
  
  
export async function getPagadores() {
    try {
      const response = await fetch("http://localhost:5000/api/pagadores", {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
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
        headers: { "Content-type": "application/json;charset=UTF-8" },
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
  