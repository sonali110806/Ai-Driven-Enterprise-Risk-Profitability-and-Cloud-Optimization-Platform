import openai
import json

class AIModelConnector:
    def __init__(self, api_key):
        openai.api_key = api_key

    def generate_output(self, prompt_text, user_input):
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": prompt_text},
                {"role": "user", "content": json.dumps(user_input)}
            ],
            temperature=0.2
        )
        output = response['choices'][0]['message']['content']
        return json.loads(output)
