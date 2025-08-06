const API_URL = "https://api.intelligence.io.solutions/api/v1/chat/completions";
const MODELS_URL = "https://api.intelligence.io.solutions/api/v1/models";

const API_KEY = "io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6Ijk0ZjI2YTVmLTU1NGQtNDM1MC05MjI2LTk5Y2Y3ZTExZjk1NiIsImV4cCI6NDkwMDI5NTg1OH0.gA6VzS3n9454JqR0Sga_t7UzhoyMgM0LXty_qoE5wa0Yo14GCTahdjagA2HPeuslSKTfvSF52C5NywkxXVEOdQ";

export async function askAI(messages, model) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await res.json();
    
   
    const content = data.choices?.[0]?.message?.content || "No response.";

  
    const cleaned = content.includes("</think>")
      ? content.split("</think>").pop().trim() 
      : content.trim(); 

    return cleaned || "No response."; 
  } catch (err) {
    console.error("askAI error:", err);
    return "⚠️ Failed to contact AI."; 
  }
}


export async function fetchModels() {
  try {
    const res = await fetch(MODELS_URL, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "accept": "application/json",
      },
    });
    const data = await res.json();

   
    return data.data.map((m) => m.id); 
  } catch (err) {
    console.error("fetchModels error:", err);
    return []; 
  }
}

