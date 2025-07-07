import os
def getGuide():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    txt_path = os.path.join(script_dir, "Guide.txt")
    text_req = ""
    try:
        with open(txt_path, "r", encoding="utf-8") as txt_file:
            text = txt_file.read()

        if text.strip():
            text_req = text
        else:
            print("El archivo está vacío.")
    except FileNotFoundError:
        print(f"Error: El archivo '{txt_path}' no se encontró.")
    except Exception as e:
        print(f"Ocurrió un error al leer el archivo: {e}")
    return text_req





