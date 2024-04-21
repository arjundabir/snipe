function getRandomLandmark() {
    const landmarks = [
        "sculptureGarden",
        "bruinStatue",
        "royceHall",
        "powellLibrary",
        "pauleyPavilion",
        "invertedFountain",
        "janssSteps",
        "murphyHall",
    ];
    const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)];
    return randomLandmark;
}

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCik3GAQnGnckRKhQjmx_RIGEs4jDQBj3A');

export async function run() {
    const randomLandmark = getRandomLandmark();

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      const prompt = `Give me a riddle on how to find a landmark at UCLA. Include a historical fact about it.
      Don't include the name of it in the riddle, but tell me the name of the landmark at the end. 
      Also, don't make it too verbose, keep it simple.
      say "find me" at the end. response in a json string in this format: 
      {"riddle": "riddle here", "landmark": "landmark here"}
      please make the landmark in the json string the same format and case as the one i give you.
      The landmark is ${randomLandmark}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsedText = JSON.parse(text);
    parsedText.landmark = randomLandmark;
    const newText = JSON.stringify(parsedText);
    return newText;
}
