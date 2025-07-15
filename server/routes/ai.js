import express from "express"

export default function createAIRouter(aiInstance) {
    const router = express.Router() 

    async function callGemini(prompt) {
      try{
        const response = await aiInstance.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            systemInstruction: "You are narrating a Star Wars ship battle, and are to return a 2 paragraph Star Wars story about what happened. The perspective is second person as the User, with the opposing side being refered to as the Enemy",
          },
        });
        return response.text;
      } catch (err) {
        console.error("Gemini API call failed:", err); 
        if (err.status === 503 || (err.response && err.response.status === 503)) {
            return "Please try again in a few moments.";
        } else {
            return "An unexpected error occurred";
        }
    }
        
      }

    router.post("/", async (req, res) => {
        try {
            const {prompt} = req.body
            const result = await callGemini(prompt)
            res.json({result})
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving response from Gemini");
        }
    });  
    return router;
}