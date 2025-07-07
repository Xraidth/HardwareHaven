from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
import re
import TextGuide as tg
import os
import platform

# Limpiar consola al iniciar
def clear_console():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")



# Cargar variables de entorno
load_dotenv()

# Inicializar Flask
app = Flask(__name__)

# Crear cliente OpenAI
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

# Ruta para interactuar con el bot
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message")

    if not user_input:
        return jsonify({"error": "No se envió ningún mensaje."}), 400

    prompt = f"""
    Reponde esta consulta como si fueras una persona de soporte: {user_input}.
    Utilizando esta guia: {tg.getGuide()}
    """

    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",
            messages=[{"role": "user", "content": prompt}]
        )

        content = response.choices[0].message.content if response.choices else ""
        cleaned_response = re.sub(r'[*#]+', '', content)
        return jsonify({"response": cleaned_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

clear_console()
print("OpenClass is running on port 5000 ...")
# Iniciar servidor
if __name__ == "__main__":
    app.run(debug=True, port=5000)
