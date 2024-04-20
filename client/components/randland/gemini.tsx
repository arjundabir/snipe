function getRandomLandmark() {
    const landmarks = [
        "Royce Hall",
        "Powell Library",
        "Janss Steps",
        "Dickson Court North",
        "Dickson Court South",
        "Bruin Bear",
        "Inverted Fountain (Janss Steps Fountain)",
        "Bruin Walk",
        "Pauley Pavilion",
        "Franklin D. Murphy Sculpture Garden",
        "Kerckhoff Hall",
        "Botanical Gardens",
        "Schoenberg Music Building",
        "Fowler Museum",
        "Mildred E. Mathias Botanical Garden",
        "James West Alumni Center",
        "UCLA Store (Ackerman Union)",
        "Young Research Library",
        "Murphy Hall",
        "Carnesale Commons",
        "UCLA School of Law",
        "Geffen Playhouse",
        "UCLA Medical Center",
        "Franz Hall",
        "Boelter Hall",
        "Engineering VI Building",
        "Haines Hall",
        "Anderson School of Management",
        "UCLA Meteorite Gallery",
        "Court of Sciences",
        "UCLA Meteorite Collection in Geology Building",
        "UCLA Terasaki Life Sciences Building",
        "UCLA Marina Aquatic Center",
        "Macgowan Hall",
        "UCLA Police Department",
        "Moore Hall",
        "Public Affairs Building",
        "UCLA Film & Television Archive",
        "Rieber Hall",
        "Rieber Vista",
        "Sunset Canyon Recreation Center",
        "Drake Stadium",
        "John Wooden Center",
        "UCLA Lake Arrowhead Conference Center",
        "UCLA Guest House",
        "North Athletic Field",
        "UCLA Tennis Center",
        "UCLA Faculty Center",
        "Pauley Pavilion Statue Garden",
        "Strathmore Building"
    ];
    const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)];
    return randomLandmark;
}

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCik3GAQnGnckRKhQjmx_RIGEs4jDQBj3A');

async function run() {
    const randomLandmark = getRandomLandmark();

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      const prompt = `Give me a riddle on how to find a landmark. 
      Don't include the name of it in the riddle, but tell me the name of the landmark at the end. 
      Also, don't make it too verbose, keep it simple. Give me the coordinates of the landmark as well.
      The landmark is ${randomLandmark}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();