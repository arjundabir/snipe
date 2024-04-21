from uagents import Agent, Context, Model
import google.generativeai as genai

genai.configure(api_key="AIzaSyCik3GAQnGnckRKhQjmx_RIGEs4jDQBj3A")
model = genai.GenerativeModel('gemini-pro')


class TestRequest(Model):
    message: str


class Response(Model):
    text: str


agent = Agent(
    name="your_agent_name_here",
    seed="your_agent_seed_here",
    port=8001,
    endpoint="http://localhost:8001/submit",
)


@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {agent.name}")
    ctx.logger.info(f"With address: {agent.address}")
    ctx.logger.info(f"And wallet address: {agent.wallet.address()}")


@agent.on_query(model=TestRequest, replies={Response})
async def query_handler(ctx: Context, sender: str, _query: TestRequest):
    ctx.logger.info("Query received")
    try:
        print(_query)
        response = model.generate_content(f"Give me list of 5 places in UCLA seperated by commas and nothing else that an incomming student who answered the following questions would like to visit: {_query}")
        print(response)
        await ctx.send(sender, Response(text=response.text))
    except Exception as e:
        await ctx.send(sender, Response(text=str(e)))


if __name__ == "__main__":
    agent.run()