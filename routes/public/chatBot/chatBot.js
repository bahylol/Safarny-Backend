const bodyParser = require("body-parser");
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
let history = "";
let messageTemplate = {
    role: "user",
    content: "",
  };

  let messagesForChatBot = [
    {
      role: "system",
      content: `your name is rahal and you must use it. you are chat bot who helps people to plan 
            their trips and explore places with easy convenient process you must be
             every pilot and also friendly not formal. give a very very short answer and never
              tell any answer you are not sure about you work for TripPlanner site 
              for example the user input : "i need to visit Egypt"
              output : Egypt is a country rich in history and culture. It is known for its iconic landmarks such as the Pyramids of Giza and the Sphinx. Egypt offers a variety of experiences including exploring ancient ruins, cruising the Nile River, and diving in the Red Sea. It's a destination that has something for everyone to enjoy.
              input : tell me more about the last place is my question. give me answeres according to the last chat histroy here is the user questions and you answres that's you answered 
              history : user question : tell me about egypt \n chat answere : Egypt is a country rich in history and culture. It is known for its iconic landmarks such as the Pyramids of Giza and the Sphinx. Egypt offers a variety of experiences including exploring ancient ruins, cruising the Nile River, and diving in the Red Sea. It's a destination that has something for everyone to enjoy.
              output : Egypt is a country located in North Africa. It is known for its ancient civilization and historical sites. Some famous landmarks in Egypt include the Great Pyramids of Giza, the Sphinx, and the Valley of the Kings. The country also offers opportunities for exploring the Nile River, visiting cultural museums, and experiencing traditional Egyptian cuisine. Egypt is a popular destination for history enthusiasts and those interested in learning about ancient civilizations
              
              `,
    },
  ];

messagesForChatBot.push(messageTemplate);

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/chatBot", async (req, res) => {
   
    try {
      const { question } = req.body;
      // console.log(req.body);
      history +="user question "+ question + "\n";
      messageTemplate.content =
        question +
        " is my question. give me answeres according to the last chat histroy here is the user questions and you answres that's you answered " +
        history;
      //   console.log(req.body);
      //   console.log("lol");
      //   console.log(userinput);
      console.log("== Chat bot started ");
      // console.log(messagesForChatBot);
      console.log("=============");
      // messagesForChatBot[messagesForChatBot.length-1] = question;

    //   console.log(messagesForChatBot[messagesForChatBot.length - 1]);
      // console.log(messages[1].content);
      const client = new OpenAIClient(
        process.env.ENDPOINT,
        new AzureKeyCredential(process.env.AZUERAPIKEY)
      );
      const deploymentId = "ChatBot";
      const result = await client.getChatCompletions(
        deploymentId,
        messagesForChatBot
      );
      console.log(`done\n`);
      console.log(result.choices[0].message.content);
      history += "Chat answere  "+result.choices[0].message+"\n";
    //   console.log(history);
    //   messagesForChatBot.push(result.choices[0].message);
    //   console.log(messagesForChatBot);
      res.json(result);
    } catch (err) {
      console.error(err.message);
    }
  });
};
