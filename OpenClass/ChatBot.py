
from openai import OpenAI
from dotenv import load_dotenv
import os
import re
import TextGuide as tg
def chatGenerator():

    load_dotenv()

    def prontCreator():
        x = input("Ingresa tu consulta:")

        r=f"""Reponde esta consulta como si fueras una persona de soporte: {x}.     
           Utilizando esta guia: {tg.getGuide()}
          """
        return r


    client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY"),  
        base_url="https://openrouter.ai/api/v1"  
    )


    chat = client.chat.completions.create(
        model="deepseek/deepseek-r1:free",
        messages=
        
        [{
            "role": "user",
            "content": f"""{prontCreator()}"""   
        }]
        

    )

    r=""
    if chat.choices and chat.choices[0].message.content:
        #r = chat.choices[0].message.content.replace('*', '')
        r = re.sub(r'[*#]+', '', chat.choices[0].message.content)

        

    else:
        print("La respuesta no contiene contenido o está vacía.")
    return r



print(chatGenerator())
