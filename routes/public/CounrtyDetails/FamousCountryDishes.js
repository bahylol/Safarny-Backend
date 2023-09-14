const bodyParser = require("body-parser");
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { Client } = require("@googlemaps/google-maps-services-js");
const { get } = require("lodash");
const SerpApi = require("google-search-results-nodejs");

//to get images for google API

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/famousDishes", async (req, response) => {
    async function getPhotos(placName) {
      const client = new Client({});

      try {
        const queryResult = await client.findPlaceFromText({
          params: {
            input: placName,
            inputtype: "textquery",
            fields: ["name", "place_id"],
            key: process.env.GOOGLEMAPSAPIKEY,
          },
        });
        if (queryResult.data && queryResult.data.candidates.length > 0) {
          const placeId = queryResult.data.candidates[0].place_id;

          const placeResult = await client.placeDetails({
            params: {
              place_id: placeId,
              fields: ["geometry", "photos"],
              key: process.env.GOOGLEMAPSAPIKEY,
            },
          });
          let arr = placeResult.data.result.photos;
          let urls = [];
          if (arr)
            for (let i = 0; i < 3; i++) {
              const ref = arr[i].photo_reference;
              let imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.GOOGLEMAPSAPIKEY}`;
              // to upload photo to the cloud

              // imageUrl = await uploadImage(imageUrl);

              urls.push(imageUrl);
              // console.log("image url\n\n\n" + imageUrl);
            }
          if (urls.length > 0) return urls;
          else return [];
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    let messages = [
      {
        role: "system",
        content: `you help the user to get the most famous dishes in a country 
              return the output as the same fromat provided in the example
              after each dish write ///
input : give me the most famous dishes in a Country 
output :     
Koshari: Koshari is often considered Egypt's national dish.
 It consists of a mix of pasta, rice, lentils, chickpeas,
  and crispy fried onions, topped with a spicy tomato sauce.
   It's a hearty and flavorful vegetarian dish.///Ful Medames:
    Ful Medames is a traditional Egyptian breakfast dish made 
    from fava beans cooked slowly and typically served with olive
     oil, garlic, lemon juice, and various toppings like onions, 
     tomatoes, and herbs.///Molokhia: Molokhia is a green leafy 
     vegetable often prepared as a soup or stew. It is usually
      cooked with garlic, coriander, and chicken or rabbit. It has
       a distinct, somewhat slimy texture and is usually served with
        Egyptian bread or rice.///Shawarma: While shawarma 
        is a Middle Eastern dish, it's incredibly popular 
        in Egypt. Thinly sliced marinated meat 
        (usually beef, chicken, or lamb) is cooked 
        on a vertical rotisserie and served in 
        pita bread with tahini, vegetables, and 
        various condiments./// Ta'meya (Egyptian Falafel):
         Ta'meya is Egypt's version of falafel. It's made 
         from crushed fava beans or a mixture of fava beans
          and chickpeas, mixed with herbs and spices, then 
          deep-fried to create crispy, flavorful patties. 
          It's typically served in pita bread or as a 
          snack.///Moussaka: Egyptian moussaka is quite
           different from the Greek version. It's a 
           layered casserole dish made with layers 
           of eggplant, minced meat (often beef or lamb), 
           tomatoes, and béchamel sauce, similar 
           to lasagna.///Hawawshi: Hawawshi is a 
           popular Egyptian street food. It's 
           essentially a stuffed pita or flatbread 
           filled with seasoned minced meat 
           (typically beef or lamb) mixed with 
           spices, onions, and sometimes hot
            peppers, then baked or grilled.///Roz Bel 
            Laban: Roz Bel Laban is a traditional 
            Egyptian rice pudding made with rice, 
            milk, sugar, and flavored with vanilla 
            and sometimes topped with ground cinnamon 
            or nuts. It's a popular dessert.///Baklava: 
            Baklava, though of Turkish origin, is widely
             enjoyed in Egypt. It's a sweet pastry made 
             of layers of filo dough filled with chopped 
             nuts and sweetened with syrup or
              honey.///Fattah: Fattah is a festive 
              dish often served during special occasions.
               It typically consists of layers of toasted
                or fried bread, rice, and lamb or beef
                , all soaked in a flavorful tomato or 
                vinegar-based sauce and garnished with
                 garlic and crispy fried onions.///
              `,
      },
    ];
    try {
      const { countryName } = req.body;
      console.log(req.body);
      console.log("Dishes in " + countryName + " start");
      //to stream the response
      function streamChatCompletions(client, deploymentId, messages, options) {
        const events = client.listChatCompletions(
          deploymentId,
          messages,
          options
        );
        const stream = new ReadableStream({
          async start(controller) {
            for await (const event of events) {
              controller.enqueue(event);
            }
            controller.close();
          },
        });

        return stream;
      }
      let userInput = `give me the most famous dishes in ${countryName}`;
      messages[0].content += "intput: " + userInput + "\noutput";
      // getting the output
      const endpoint = process.env.ENDPOINT;
      const azureApiKey = process.env.AZUERAPIKEY;
      const client = new OpenAIClient(
        endpoint,
        new AzureKeyCredential(azureApiKey)
      );
      const deploymentId = "countryFamousDishes";
      const stream = streamChatCompletions(client, deploymentId, messages, {});
      let res = "";
      const reader = stream.getReader();

      let numberOfSentDays = 0;
      let Result = "";
      let arr = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("DONE \n\n\n");
          break;
        }
        for (const choice of value.choices) {
          if (choice.delta?.content !== undefined) {
            // console.log(Result);
            Result += choice.delta?.content;
            arr = Result.split("///");
            while (arr.length - 1 > numberOfSentDays) {
              console.log(
                arr[numberOfSentDays].split(":")[0] ||
                  arr[numberOfSentDays].split(":")[1]
              );
              const images = await getPhotos(
                arr[numberOfSentDays].split(":")[0] ||
                  arr[numberOfSentDays].split(":")[1]
              );

              let resultArray = {
                details: arr[numberOfSentDays].trim(),
                images: images,
              };
              numberOfSentDays++;
              const jsonString = JSON.stringify(resultArray);
              let f = JSON.parse(jsonString);
              console.log("the json\n\n\n" + f.details + " " + f.images);
              response.write(`${jsonString}`);
            }
          }
        }
      }
      console.log(arr);
      console.log("real Done \n\n\n");
      return response.status(200);
    } catch (err) {
      console.error(err.message);
      return response.status(400).send("Error: Could not create your post");
    }
  });
};
