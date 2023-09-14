const bodyParser = require("body-parser");
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { Client } = require("@googlemaps/google-maps-services-js");
const cloudinary = require("cloudinary").v2;
const db = require("../../../connectors/db.js");

// Configure Cloudinary with your credentials
cloudinary.config({
  secure: true,
  cloud_name: "dtfqit0kz",
  api_key: process.env.CLOUDINARYAPIKEY || "",
  api_secret: process.env.CLOUDINARYSCREETAPIKEY || "",
});

// Log the configuration
// console.log(cloudinary.config());

// Define an asynchronous function to upload the image
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log("Upload result:", result);

    const publicId = result.public_id;
    const imageUrl = cloudinary.image(publicId, {
      secure: true, // Use HTTPS
      width: 400, // Set the desired width
      height: 300, // Set the desired height
      crop: "fill", // Crop method (e.g., "fill", "fit", "scale")
    });
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
const order = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
];
//to get images for google API
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
//to extract the name ,description and coord from a day

let lol = 0;
module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/planTrip", async (req, response) => {
    // getting the input
    let messages = [
      {
        role: "system",
        content: `you help the user to plan a trip you well get the place , data and activates he would like to do
             return result contain the place name , place location , place coordinates , place description  sort the result according to the time he will do them like the breakfast restaurant will be the first then some activities then the lunch if something should be done at night sort it at the last like fire show  and so on
             
             you must mention place with coordinates only
             if no coordinates  choose another places
             
             The response must have same number of days as the user gave you
             for each day try to make the place he will visit near to each other
             try to make the total trip around the budget level 
            if the budget is 1000 dollars try to give activities from 900 to 1100 dollars 
            try to distribute the budget on all the places and activities 
            at the end give me the expected value for transportation , stays 
             return the ouput in the SAME FORMAT in the sample below and DON'T CHANGE IT and DON'T ADD ANYTHING TO IT'S structure
            DON'T add any opnion or greeting message only the plan!
            DON'T add any note to the plan 
            FOLLOW the EXACT format in the sample below
            DONT'T ever put any curly brackete in the output like { or }
            as I will convert the output to JSON so make sure that it's okay to be JSON file 
            you MUST give me the plan with the SAME number of days the user gave you
            input : 7 days in Cairo, Egypt in August activities are : food , museum , culture, adventure
        budget : 1800 dollars
        output: 
        For the first day:

        Name: Breakfast at Felfela
        Coordinates:

        Latitude: 30.0480
        Longitude: 31.2437

        Description: Start your day with a traditional Egyptian breakfast at Felfela, a renowned restaurant serving delicious falafel, foul, and various Middle Eastern delights.
        Cost: 15

        Name: Explore the Egyptian Museum
        Coordinates:

        Latitude: 30.0475
        Longitude: 31.2334

        Description: Dive into Egypt's rich history at the Egyptian Museum, home to a vast collection of ancient artifacts, including the treasures of Tutankhamun.
        Cost: 20

        Name: Lunch at Naguib Mahfouz Cafe
        Coordinates:

        Latitude: 30.0494
        Longitude: 31.2616

        Description: Enjoy a leisurely lunch at Naguib Mahfouz Cafe, located in Khan El Khalili bazaar. Savor Egyptian dishes in a historic setting.
        Cost: 25

        Name: Khan El Khalili Bazaar
        Coordinates:

        Latitude: 30.0461
        Longitude: 31.2622

        Description: Explore the bustling Khan El Khalili Bazaar, known for its vibrant atmosphere and a wide array of shops selling jewelry, textiles, spices, and more.
        Cost: Free

        Name: Sunset at Cairo Tower
        Coordinates:

        Latitude: 30.0450
        Longitude: 31.2246

        Description: Head to Cairo Tower to witness a stunning sunset over the city. The observation deck offers panoramic views of Cairo's skyline.
        Cost: 15

        For the second day:

        Name: Breakfast at Eish + Malh
        Coordinates:

        Latitude: 30.0565
        Longitude: 31.2142

        Description: Start your day with a hearty breakfast at Eish + Malh, a trendy cafe serving freshly baked bread and Egyptian breakfast classics.
        Cost: 10

        Name: Visit the Salah El-Din Citadel
        Coordinates:

        Latitude: 30.0291
        Longitude: 31.2612

        Description: Explore the historic Salah El-Din Citadel, a UNESCO World Heritage Site, and visit the stunning Mohamed Ali Mosque located within the citadel complex.
        Cost: 20

        Name: Lunch at Koshary Abou Tarek
        Coordinates:

        Latitude: 30.0557
        Longitude: 31.2615

        Description: Indulge in a satisfying lunch at Koshary Abou Tarek, famous for its Egyptian comfort food, especially the classic dish, koshary.
        Cost: 10

        Name: Egyptian Opera House
        Coordinates:

        Latitude: 30.0445
        Longitude: 31.2201

        Description: Attend a performance or explore the Egyptian Opera House, a cultural hub for music, dance, and theater in Cairo.
        Cost: 30

        Name: Dinner at Zooba
        Coordinates:

        Latitude: 30.0590
        Longitude: 31.2197

        Description: Enjoy a contemporary twist on Egyptian street food at Zooba, where you can savor dishes like Hawawshi and Taameya.
        Cost: 20

        For the third day:

        Name: Breakfast at Left Bank
        Coordinates:

        Latitude: 30.0649
        Longitude: 31.2153

        Description: Start your day with a riverside breakfast at Left Bank, offering a picturesque view of the Nile River and a menu of international and Egyptian breakfast options.
        Cost: 15

        Name: Visit the Giza Pyramids
        Coordinates:

        Latitude: 29.9765
        Longitude: 31.1314

        Description: Explore the world-famous Giza Pyramids, including the Great Pyramid of Khufu, the Pyramid of Khafre, and the Pyramid of Menkaure.
        Cost: 25

        Name: Lunch at Andrea El Mariouteya
        Coordinates:

        Latitude: 30.0157
        Longitude: 31.2121

        Description: Enjoy a Mediterranean seafood lunch at Andrea El Mariouteya, known for its scenic Nile view and delicious seafood dishes.
        Cost: 40

        Name: Felucca Ride on the Nile
        Coordinates:

        Latitude: 30.0621
        Longitude: 31.2147

        Description: Experience the tranquil beauty of the Nile River with a traditional felucca boat ride, a relaxing way to see Cairo from the water.
        Cost: 20

        Name: Dinner at Naguib Mahfouz Cafe
        Coordinates:

        Latitude: 30.0494
        Longitude: 31.2616

        Description: End your day with another delightful meal at Naguib Mahfouz Cafe, where you can try more Egyptian specialties.
        Cost: 25

        For the fourth day:

        Name: Breakfast at Delices
        Coordinates:

        Latitude: 30.0552
        Longitude: 31.2132

        Description: Enjoy a European-style breakfast at Delices, a charming bakery known for its croissants and pastries.
        Cost: 15

        Name: Visit the Coptic Cairo District
        Coordinates:

        Latitude: 30.0106
        Longitude: 31.2154

        Description: Explore the historic Coptic Cairo District, home to ancient churches, including the Hanging Church and the Coptic Museum.
        Cost: 15

        Name: Lunch at Nagiub Mahfouz Cafe
        Coordinates:

        Latitude: 30.0494
        Longitude: 31.2616

        Description: Satisfy your appetite with lunch at Nagiub Mahfouz Cafe, where you can revisit your favorite Egyptian dishes.
        Cost: 25

        Name: Al-Azhar Park
        Coordinates:

        Latitude: 30.0390
        Longitude: 31.2610

        Description: Spend a peaceful afternoon at Al-Azhar Park, a green oasis in the heart of Cairo, offering beautiful gardens and great views of the city.
        Cost: 10

        Name: Dinner at Taboula
        Coordinates:

        Latitude: 30.0572
        Longitude: 31.2152

        Description: Enjoy a Middle Eastern feast at Taboula, known for its mezze, kebabs, and shawarma.
        Cost: 20

        For the fifth day:

        Name: Breakfast at La Poire
        Coordinates:

        Latitude: 30.0460
        Longitude: 31.2293

        Description: Start your day with a luxurious breakfast at La Poire, a French-style patisserie and cafe.
        Cost: 20

        Name: Islamic Cairo Walking Tour
        Coordinates:

        Latitude: 30.0474
        Longitude: 31.2617

        Description: Embark on a walking tour of Islamic Cairo, exploring historic mosques, markets, and the vibrant culture of this ancient neighborhood.
        Cost: 15

        Name: Lunch at Khan El Khalili
        Coordinates:

        Latitude: 30.0461
        Longitude: 31.2622

        Description: Enjoy a traditional Egyptian lunch in the heart of Khan El Khalili, sampling local street food and specialties.
        Cost: 20

        Name: El Moez Street
        Coordinates:

        Latitude: 30.0482
        Longitude: 31.2629

        Description: Stroll along El Moez Street, known for its well-preserved medieval architecture and historic buildings.
        Cost: Free

        Name: Dinner at Le Pacha 1901
        Coordinates:

        Latitude: 30.0642
        Longitude: 31.2146

        Description: Dine in style aboard a Nile cruise at Le Pacha 1901, offering a fine dining experience with beautiful Nile views.
        Cost: 40

        For the sixth day:

        Name: Breakfast at Delices
        Coordinates:

        Latitude: 30.0552
        Longitude: 31.2132

        Description: Start your day with a European-style breakfast at Delices, a charming bakery known for its croissants and pastries.
        Cost: 15

        Name: Day Trip to Saqqara
        Coordinates:

        Latitude: 29.8711
        Longitude: 31.2166

        Description: Explore the ancient necropolis of Saqqara, home to the Step Pyramid of Djoser and other fascinating archaeological sites.
        Cost: 30

        Name: Lunch at Sofra
        Coordinates:

        Latitude: 30.0145
        Longitude: 31.2397

        Description: Enjoy an Egyptian feast at Sofra, known for its traditional dishes like molokhia, tagine, and more.
        Cost: 30

        Name: Sound and Light Show at the Pyramids
        Coordinates:

        Latitude: 29.9765
        Longitude: 31.1314

        Description: Witness the Pyramids of Giza come to life in a captivating sound and light show that tells the history of ancient Egypt.
        Cost: 20

        Name: Dinner at Birdcage
        Coordinates:

        Latitude: 30.0573
        Longitude: 31.2150

        Description: End your day with a delightful dinner at Birdcage, a restaurant offering a fusion of international cuisines.
        Cost: 25

        For the seventh day:

        Name: Breakfast at Paul
        Coordinates:

        Latitude: 30.0585
        Longitude: 31.2156

        Description: Enjoy a European-style breakfast at Paul, a bakery known for its artisanal bread and pastries.
        Cost: 15

        Name: Visit the Egyptian Textile Museum
        Coordinates:

        Latitude: 30.0432
        Longitude: 31.2169

        Description: Explore the history of textiles in Egypt at the Egyptian Textile Museum, showcasing beautiful fabrics and artifacts.
        Cost: 10

        Name: Lunch at Zooba
        Coordinates:

        Latitude: 30.0590
        Longitude: 31.2197

        Description: Have a delicious Egyptian lunch at Zooba, where you can try more Egyptian street food specialties.
        Cost: 20

        Name: Felucca Ride on the Nile
        Coordinates:

        Latitude: 30.0621
        Longitude: 31.2147

        Description: Enjoy another serene felucca boat ride on the Nile, taking in the scenic views of Cairo.
        Cost: 20

        Name: Dinner at Andrea El Mariouteya
        Coordinates:

        Latitude: 30.0157
        Longitude: 31.2121

        Description: Conclude your trip with a seafood dinner at Andrea El Mariouteya, savoring the flavors of the Nile.
        Cost: 40

        Transportation and staying cost: 100
             `,
      },
    ];
    const countryList = {
      Afghanistan: "AF",
      "Aland Islands": "AX",
      Albania: "AL",
      Algeria: "DZ",
      "American Samoa": "AS",
      Andorra: "AD",
      Angola: "AO",
      Anguilla: "AI",
      Antarctica: "AQ",
      "Antigua And Barbuda": "AG",
      Argentina: "AR",
      Armenia: "AM",
      Aruba: "AW",
      Australia: "AU",
      Austria: "AT",
      Azerbaijan: "AZ",
      Bahamas: "BS",
      Bahrain: "BH",
      Bangladesh: "BD",
      Barbados: "BB",
      Belarus: "BY",
      Belgium: "BE",
      Belize: "BZ",
      Benin: "BJ",
      Bermuda: "BM",
      Bhutan: "BT",
      Bolivia: "BO",
      "Bosnia And Herzegovina": "BA",
      Botswana: "BW",
      "Bouvet Island": "BV",
      Brazil: "BR",
      "British Indian Ocean Territory": "IO",
      "Brunei Darussalam": "BN",
      Bulgaria: "BG",
      "Burkina Faso": "BF",
      Burundi: "BI",
      Cambodia: "KH",
      Cameroon: "CM",
      Canada: "CA",
      "Cape Verde": "CV",
      "Cayman Islands": "KY",
      "Central African Republic": "CF",
      Chad: "TD",
      Chile: "CL",
      China: "CN",
      "Christmas Island": "CX",
      "Cocos (Keeling) Islands": "CC",
      Colombia: "CO",
      Comoros: "KM",
      Congo: "CG",
      "Congo, Democratic Republic": "CD",
      "Cook Islands": "CK",
      "Costa Rica": "CR",
      "Cote D'Ivoire": "CI",
      Croatia: "HR",
      Cuba: "CU",
      Cyprus: "CY",
      "Czech Republic": "CZ",
      Denmark: "DK",
      Djibouti: "DJ",
      Dominica: "DM",
      "Dominican Republic": "DO",
      Ecuador: "EC",
      Egypt: "EG",
      "El Salvador": "SV",
      "Equatorial Guinea": "GQ",
      Eritrea: "ER",
      Estonia: "EE",
      Ethiopia: "ET",
      "Falkland Islands (Malvinas)": "FK",
      "Faroe Islands": "FO",
      Fiji: "FJ",
      Finland: "FI",
      France: "FR",
      "French Guiana": "GF",
      "French Polynesia": "PF",
      "French Southern Territories": "TF",
      Gabon: "GA",
      Gambia: "GM",
      Georgia: "GE",
      Germany: "DE",
      Ghana: "GH",
      Gibraltar: "GI",
      Greece: "GR",
      Greenland: "GL",
      Grenada: "GD",
      Guadeloupe: "GP",
      Guam: "GU",
      Guatemala: "GT",
      Guernsey: "GG",
      Guinea: "GN",
      "Guinea-Bissau": "GW",
      Guyana: "GY",
      Haiti: "HT",
      "Heard Island & Mcdonald Islands": "HM",
      "Holy See (Vatican City State)": "VA",
      Honduras: "HN",
      "Hong Kong": "HK",
      Hungary: "HU",
      Iceland: "IS",
      India: "IN",
      Indonesia: "ID",
      "Iran, Islamic Republic Of": "IR",
      Iraq: "IQ",
      Ireland: "IE",
      "Isle Of Man": "IM",
      Israel: "IL",
      Italy: "IT",
      Jamaica: "JM",
      Japan: "JP",
      Jersey: "JE",
      Jordan: "JO",
      Kazakhstan: "KZ",
      Kenya: "KE",
      Kiribati: "KI",
      Korea: "KR",
      Kuwait: "KW",
      Kyrgyzstan: "KG",
      "Lao People's Democratic Republic": "LA",
      Latvia: "LV",
      Lebanon: "LB",
      Lesotho: "LS",
      Liberia: "LR",
      "Libyan Arab Jamahiriya": "LY",
      Liechtenstein: "LI",
      Lithuania: "LT",
      Luxembourg: "LU",
      Macao: "MO",
      Macedonia: "MK",
      Madagascar: "MG",
      Malawi: "MW",
      Malaysia: "MY",
      Maldives: "MV",
      Mali: "ML",
      Malta: "MT",
      "Marshall Islands": "MH",
      Martinique: "MQ",
      Mauritania: "MR",
      Mauritius: "MU",
      Mayotte: "YT",
      Mexico: "MX",
      "Micronesia, Federated States Of": "FM",
      Moldova: "MD",
      Monaco: "MC",
      Mongolia: "MN",
      Montenegro: "ME",
      Montserrat: "MS",
      Morocco: "MA",
      Mozambique: "MZ",
      Myanmar: "MM",
      Namibia: "NA",
      Nauru: "NR",
      Nepal: "NP",
      Netherlands: "NL",
      "Netherlands Antilles": "AN",
      "New Caledonia": "NC",
      "New Zealand": "NZ",
      Nicaragua: "NI",
      Niger: "NE",
      Nigeria: "NG",
      Niue: "NU",
      "Norfolk Island": "NF",
      "Northern Mariana Islands": "MP",
      Norway: "NO",
      Oman: "OM",
      Pakistan: "PK",
      Palau: "PW",
      "Palestinian Territory, Occupied": "PS",
      Panama: "PA",
      "Papua New Guinea": "PG",
      Paraguay: "PY",
      Peru: "PE",
      Philippines: "PH",
      Pitcairn: "PN",
      Poland: "PL",
      Portugal: "PT",
      "Puerto Rico": "PR",
      Qatar: "QA",
      Reunion: "RE",
      Romania: "RO",
      "Russian Federation": "RU",
      Rwanda: "RW",
      "Saint Barthelemy": "BL",
      "Saint Helena": "SH",
      "Saint Kitts And Nevis": "KN",
      "Saint Lucia": "LC",
      "Saint Martin": "MF",
      "Saint Pierre And Miquelon": "PM",
      "Saint Vincent And Grenadines": "VC",
      Samoa: "WS",
      "San Marino": "SM",
      "Sao Tome And Principe": "ST",
      "Saudi Arabia": "SA",
      Senegal: "SN",
      Serbia: "RS",
      Seychelles: "SC",
      "Sierra Leone": "SL",
      Singapore: "SG",
      Slovakia: "SK",
      Slovenia: "SI",
      "Solomon Islands": "SB",
      Somalia: "SO",
      "South Africa": "ZA",
      "South Georgia And Sandwich Isl.": "GS",
      Spain: "ES",
      "Sri Lanka": "LK",
      Sudan: "SD",
      Suriname: "SR",
      "Svalbard And Jan Mayen": "SJ",
      Swaziland: "SZ",
      Sweden: "SE",
      Switzerland: "CH",
      "Syrian Arab Republic": "SY",
      Taiwan: "TW",
      Tajikistan: "TJ",
      Tanzania: "TZ",
      Thailand: "TH",
      "Timor-Leste": "TL",
      Togo: "TG",
      Tokelau: "TK",
      Tonga: "TO",
      "Trinidad And Tobago": "TT",
      Tunisia: "TN",
      Turkey: "TR",
      Turkmenistan: "TM",
      "Turks And Caicos Islands": "TC",
      Tuvalu: "TV",
      Uganda: "UG",
      Ukraine: "UA",
      "United Arab Emirates": "AE",
      "United Kingdom": "GB",
      "United States": "US",
      "United States Outlying Islands": "UM",
      Uruguay: "UY",
      Uzbekistan: "UZ",
      Vanuatu: "VU",
      Venezuela: "VE",
      "Viet Nam": "VN",
      "Virgin Islands, British": "VG",
      "Virgin Islands, U.S.": "VI",
      "Wallis And Futuna": "WF",
      "Western Sahara": "EH",
      Yemen: "YE",
      Zambia: "ZM",
      Zimbabwe: "ZW",
      "North Macedonia": "MK",
      Češka: "CZ",
    };
    try {
      const { duration, Destination, Month, activites, budget } = req.body;

      console.log(req.body);
      console.log("start ============================");
      //1- stroe the trip in DB 332
      let countryCode = Destination.split(",")[1].trim();
      countryCode = countryList[countryCode];
      const addTrip = await db("trips")
        .insert({
          duration: duration,
          destination: Destination,
          country_code: countryCode,
          month: Month,
          activities: activites,
          budget: budget,
        })
        .returning("*");
      // GET THE TRIP ID
      const tripId = addTrip[0].id;
      console.log("new Trip ID" + tripId);
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
      async function getDayData(dayString, isLastDay) {
        const days = dayString.split(`For the`);

        let cur_day = days[0].toString();
        let outputName = [],
          outputDescription = [],
          outputCoordinates = [],
          outputCost = [];
        let names = cur_day.matchAll(/Name:(.+?)Coordinates:/gs);
        for (const name of names) {
          outputName.push(name[1].trim());
        }

        let coordinates = cur_day.matchAll(/Coordinates:(.+?)Description:/gs);
        for (const coordinate of coordinates) {
          const coordinateString = coordinate[1].trim();
          const coordinatePairs = coordinateString.split("\n");
          const lat = coordinatePairs[0].split(":")[1].trim();
          const lng = coordinatePairs[1].split(":")[1].trim();
          outputCoordinates.push({ lat, lng });
        }
        let descriptions = cur_day.matchAll(/Description:(.+?)Cost:/gs);
        for (const description of descriptions) {
          outputDescription.push(description[1].trim());
        }
        let costs = cur_day.matchAll(/Cost:(.+?)Name:/gs);
        for (const cost of costs) {
          if (cost[1].trim().length > 4) {
            outputCost.push(cost[1].trim().slice(0, 4));
          } else outputCost.push(cost[1].trim());
        }
        // we added all costs execpt the last one
        let lastCost = cur_day.lastIndexOf("Cost:");
        lastCost = cur_day.slice(lastCost + "Cost:".length);
        lastCost = lastCost.trim();
        // now keep adding the remaning char as long as they are numbers
        let i = 0;
        outputCost.push("");
        while (
          i < lastCost.length &&
          lastCost[i] >= "0" &&
          lastCost[i] <= "9"
        ) {
          outputCost[outputCost.length - 1] += lastCost[i];
          i++;
        }

        // to work with real photos using google API
        // un comment the belwo code  and comment the code after it

        let photos = [];
        for (let j = 0; j < outputName.length; j++) {
          let phototemp = await getPhotos(outputName[j]);
          photos.push(phototemp);
        }
        // let photos = [];
        // for (let j = 0; j < outputName.length; j++) {
        //   let phototemp = [
        //     "https://bit.ly/fcc-relaxing-cat",
        //     "https://bit.ly/fcc-relaxing-cat",
        //     "https://bit.ly/fcc-relaxing-cat",
        //   ];
        //   photos.push(phototemp);
        // }

        // -- comment this for real photos
        //reomve any undefinde name or description or coordinates or cost
        for (let i = 0; i < outputName.length; i++) {
          if (
            outputName[i] === undefined ||
            outputName[i] === null ||
            outputName[i] === ""
          ) {
            outputName.splice(i, 1);
            outputDescription.splice(i, 1);
            outputCoordinates.splice(i, 1);
            outputCost.splice(i, 1);
            photos.splice(i, 1);
            i--;
          }
        }

        // console.log("photos\n\n\n" + photos);
        const resultArray = [
          outputName,
          outputDescription,
          outputCoordinates,
          photos,
          outputCost,
        ];
        // put all the photos in one arr
        let photosArr = [];
        for (let i = 0; i < photos.length; i++) {
          for (let j = 0; j < photos[i].length; j++) {
            photosArr.push(photos[i][j]);
          }
        }

        // 2- store the day 332
        const addDay = await db("day")
          .insert({
            name: outputName,
            description: outputDescription,
            coordinates: outputCoordinates,
            images: photosArr,
            cost: outputCost,
            trip_id: tripId,
          })
          .returning("*");
        // // get the day id
        const dayId = addDay[0].id;
        daysID.push(dayId);
        console.log("new day ID" + dayId);
        // 3- add  the day id with existing day id in array of the trip with the same trip id 332
        const addDayToTrip = await db("trips")
          .where("id", tripId)
          .update({
            days: daysID,
          })
          .returning("*");

        if (isLastDay) {
          let outputTransportationAndStayingCost = [];

          let transportationAndStayingCosts = cur_day.lastIndexOf(
            "Transportation and staying cost:"
          );
          transportationAndStayingCosts = cur_day.slice(
            transportationAndStayingCosts +
              "Transportation and staying cost:".length
          );
          transportationAndStayingCosts = transportationAndStayingCosts.trim();
          // console.log(transportationAndStayingCosts);
          outputTransportationAndStayingCost.push(
            transportationAndStayingCosts
          );
          resultArray.push(outputTransportationAndStayingCost);
        }
        const jsonString = JSON.stringify(resultArray);
        let f = JSON.parse(jsonString);
        // console.log("the json\n\n\n" + f);
        return jsonString;
      }
      let userInput = `${duration} day in ${Destination} in ${Month} activities are : ${activites}, budget is ${budget} dollars`;
      messages[0].content += "intput: " + userInput + "\noutput";
      // getting the output
      const endpoint = process.env.ENDPOINT;
      const azureApiKey = process.env.AZUERAPIKEY;
      const client = new OpenAIClient(
        endpoint,
        new AzureKeyCredential(azureApiKey)
      );
      const deploymentId = "working-gpt-model";
      const stream = streamChatCompletions(client, deploymentId, messages, {});
      let res = "";
      const reader = stream.getReader();

      let cnt = 0;
      numberOfDays = duration;
      let daysID = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // console.log("break\n\n\n");
          break;
        }
        for (const choice of value.choices) {
          if (choice.delta?.content !== undefined) {
            res += choice.delta?.content;
            if (
              cnt < numberOfDays - 1 &&
              res.includes(`${order[cnt + 1]} day:`)
            ) {
              const dayPattern = new RegExp(
                `For the ${order[cnt]} day:(.+?)For the ${order[cnt + 1]} day:`,
                "s"
              );
              let cur_day = res.match(dayPattern)[1].trim();
              const cur_day_res = await getDayData(cur_day, false);
              response.write(`${cur_day_res}`);
              cnt++;
            }
          }
        }
      }
      // console.log("res\n\n\n" + res);
      // handle the last day
      const the_last_day = `For the ${order[cnt]} day:`;
      const last_day_index = res.lastIndexOf(the_last_day);
      const last_day = res.slice(last_day_index + the_last_day.length + 2);
      const cur_day_res = await getDayData(last_day, true);
      // console.log(`For the ${order[cnt]} day:`);
      response.write(`${cur_day_res}`);
      response.end();
      return response.status(200);
    } catch (err) {
      console.error(err.message);
    }
  });
};
