import { Injectable } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { InputBody } from './dto/input-body.dto';

// Define Zod schema
const zodOutput = StructuredOutputParser.fromZodSchema(
  z.object({
    location: z.string(),
    city: z.string(),
    country: z.string(),
    totalDays: z.number(),
    month: z.string(),
    statusSouvenirs: z.boolean().describe(''),
    detailOfTheCity: z.string().describe('About the city'),
    visaItinerary: z.string().describe('Visa information'),
    safetyRedDistrict: z.string().describe('Safety & Red District information'),
    weatherClothing: z.string().describe('Weather & Clothing information'),
    souvenirsOrFood: z.string().describe('Souvenirs & Local Food information'),
    publicNationalHoliday: z
      .array(z.string())
      .describe('A list of public or national holiday'),
    relatedLink: z
      .array(z.string())
      .describe('A list of related links as strings'),
  }),
);

@Injectable()
export class AppService {
  async generateTravelInfo(inputBody: InputBody): Promise<any> {
    let { location, city, country, totalDays, month, statusSouvenirs } = {
      ...inputBody,
    };
    const prompt = `
      Gemini, you are working to give insights to a traveler to raise awareness about safety, enjoyment, and preparation for their trip.
      
      Provide detailed travel information in JSON format for the following schema:
      {
        "location": string,
        "city": string,
        "country": string,
        "totalDays": number,
        "month": string,
        "statusSouvenirs": boolean,
        "detailOfTheCity": string,
        "visaItinerary": string,
        "safetyRedDistrict": string,
        "weatherClothing": string,
        "souvenirsOrFood": string,
        "publicNationalHoliday": array of strings (each representing a date and name of national/public holiday as string),
        "relatedLink": array of strings (each representing a URL)
      }
      
      Traveler's information:
        - Country: ${country}
        - City: ${city}
        - Location: ${location ? location : city}
        - Total Days: ${totalDays}
        - Month: ${month}
        - Interested in Souvenirs: ${statusSouvenirs ? 'Yes' : 'No'}

      Requirements:
        - Provide the visa and itinerary details.
        - Outline safety information, particularly around any red districts.
        - Describe expected weather and clothing recommendations for the month specified.
        - Suggest notable souvenirs or local foods the traveler should consider.
        - Include relevant related links in an array, each as a string URL.
        - No need format of bold text and no list number or bullet point, just make it as narative text.

      Please format the response according to the schema, with extra narrative text explain recommendation, visa and does iternary is a must or not, month and the season of the country include safety and note on red district area.
    `;

    const model = new ChatGoogleGenerativeAI({
      model: 'gemini-1.5-flash',
      maxOutputTokens: 4096,
      streaming: false,
    });

    const responseChunk = await model.invoke([['human', prompt]], {});
    try {
      const parsedData = await zodOutput.parse(responseChunk.text);
      return parsedData;
    } catch (error) {
      console.error(`Parsing failed: ${error.message}`);
      return { rawResponse: responseChunk.text, error: error.message };
    }
  }
}
