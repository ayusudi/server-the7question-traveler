import { Injectable } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { InputBody } from './dto/input-body.dto';

// Define Zod schema
const zodOutput = StructuredOutputParser.fromZodSchema(
  z.object({
    location: z.string(),
    country: z.string(),
    totalDays: z.number(),
    month: z.string(),
    statusSouvenirs: z.boolean(),
    visaItinerary: z.string(),
    safetyRedDistrict: z.string(),
    weatherClothing: z.string(),
    souvenirsOrFood: z.string(),
    relatedLink: z
      .array(z.string())
      .describe('A list of related links as strings'),
  }),
);

@Injectable()
export class AppService {
  async generateTravelInfo(inputBody: InputBody): Promise<any> {
    let { location, country, totalDays, month, statusSouvenirs } = {
      ...inputBody,
    };
    const prompt = `
      Gemini, you are working to give insights to a traveler to raise awareness about safety, enjoyment, and preparation for their trip.
      
      Provide detailed travel information in JSON format for the following schema:
      {
        "location": string,
        "country": string,
        "totalDays": number,
        "month": string,
        "statusSouvenirs": boolean,
        "visaItinerary": string,
        "safetyRedDistrict": string,
        "weatherClothing": string,
        "souvenirsOrFood": string,
        "relatedLink": array of strings (each representing a URL)
      }
      
      Traveler's information:
        - Location: ${location}
        - Country: ${country}
        - Total Days: ${totalDays}
        - Month: ${month}
        - Interested in Souvenirs: ${statusSouvenirs ? 'Yes' : 'No'}

      Requirements:
        - Provide the visa and itinerary details.
        - Outline safety information, particularly around any red districts.
        - Describe expected weather and clothing recommendations for the month specified.
        - Suggest notable souvenirs or local foods the traveler should consider.
        - Include relevant related links in an array, each as a string URL.

      Please format the response according to the schema, with extra narrative text explain recommendation, month and the season of the country include safety and note on red district area.
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
