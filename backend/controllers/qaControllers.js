import TravelTips from '../model/travelTips.js';
import { pipeline } from '@xenova/transformers';

let answerer;
const paragraphCache = new Map(); // Cache for storing paragraph variations

/**
 * Initialize the question-answering model pipeline.
 */
export const initializeModel = async () => {
    try {
        answerer = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');
        console.log('Model initialized successfully');
    } catch (error) {
        console.error('Error initializing model:', error);
        // Handle initialization error as needed
    }
};

/**
 * Answer a question based on category and locationName.
 */
export const answerQuestion = async (req, res) => {
    const { category, locationName, question } = req.body;

    console.log(req.body);
    try {
        const tips = await TravelTips.find({ category, locationName });

        if (!tips || tips.length === 0) {
            return res.status(404).json({ error: 'No tips found for the specified category and location' });
        }

        const mergedData = mergeDataEntries(tips);
        const paragraph = generateParagraph(mergedData);
        console.log('Generated paragraph:', paragraph); // Debug log to inspect paragraph

        if (!question || !paragraph) {
            return res.status(400).json({ error: 'Question and paragraph are required' });
        }

        if (!answerer) {
            return res.status(500).json({ error: 'Model not initialized' });
        }

        const result = await answerer(question, paragraph, { topk: 5 });
        console.log('Top-k answers:', result); // Debug log to inspect answers
        res.json(getRandomTopKAnswer(result));
    } catch (error) {
        console.error('Error answering question:', error);
        res.status(500).json({ error: 'Failed to process the request' });
    }
};

/**
 * Merge multiple data entries for the same category and location.
 */
const mergeDataEntries = (entries) => {
    const mergedData = {
        category: entries[0].category,
        locationName: entries[0].locationName,
        typeOfWear: getUniqueValues(entries.map(entry => entry.typeOfWear).flat()),
        necessaryItems: getUniqueValues(entries.map(entry => entry.necessaryItems).flat()),
        nativeLanguage: getUniqueValues(entries.map(entry => entry.nativeLanguage).flat()),
        localCuisine: getUniqueValues(entries.map(entry => entry.localCuisine).flat()),
        nearestCommute: getUniqueValues(entries.map(entry => entry.nearestCommute).flat()),
        travelChallenges: getUniqueValues(entries.map(entry => entry.travelChallenges).flat()),
        solutions: getUniqueValues(entries.map(entry => entry.solutions).flat()),
        culturalInsights: getUniqueValues(entries.map(entry => entry.culturalInsights).flat())
    };

    return mergedData;
};

/**
 * Utility function to get unique values from an array.
 */
const getUniqueValues = (arr) => Array.from(new Set(arr));

/**
 * Utility function to get a random element from an array.
 */
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Utility function to randomly select one answer from top-k results.
 */
const getRandomTopKAnswer = (results) => {
    if (Array.isArray(results) && results.length > 0) {
        return getRandomElement(results);
    }
    return results;
};

/**
 * Generate a paragraph based on merged data.
 */
const generateParagraph = (data) => {
    const cacheKey = `${data.category}-${data.locationName}`;
    if (!paragraphCache.has(cacheKey)) {
        paragraphCache.set(cacheKey, []);
    }

    const cached = paragraphCache.get(cacheKey);
    if (cached.length >= 5) {
        return getRandomElement(cached); // Reuse varied paragraphs
    }

    const timeToVisitTemplates = [
        `The best time to visit ${data.locationName} is during spring or autumn for mild weather.`,
        `Plan your ${data.locationName} trip in spring or fall to enjoy pleasant conditions.`,
        `Visit ${data.locationName} in spring or autumn to avoid extreme temperatures.`,
        `Spring and fall are ideal for exploring ${data.locationName} comfortably.`,
        `For the best experience in ${data.locationName}, travel during spring or autumn.`,
        `${data.locationName} shines in spring and fall with perfect weather for sightseeing.`
    ];

    const clothingAdviceTemplates = [
        `Pack ${getRandomElement(data.typeOfWear)} and bring ${getRandomElement(data.necessaryItems)} for your ${data.locationName} trip.`,
        `In ${data.locationName}, wear ${getRandomElement(data.typeOfWear)} and carry ${getRandomElement(data.necessaryItems)} for convenience.`,
        `Opt for ${getRandomElement(data.typeOfWear)} in ${data.locationName}; ${getRandomElement(data.necessaryItems)} is a must-have.`,
        `For ${data.locationName}, dress in ${getRandomElement(data.typeOfWear)} and ensure you have ${getRandomElement(data.necessaryItems)}.`,
        `Prepare for ${data.locationName} with ${getRandomElement(data.typeOfWear)} and ${getRandomElement(data.necessaryItems)} in your bag.`,
        `${data.locationName} calls for ${getRandomElement(data.typeOfWear)}; don’t forget ${getRandomElement(data.necessaryItems)}.`
    ];

    const cuisineAndLanguageTemplates = [
        `In ${data.locationName}, locals speak ${getRandomElement(data.nativeLanguage)} and serve dishes like ${data.localCuisine.slice(0, 2).join(' and ')}.`,
        `You’ll hear ${getRandomElement(data.nativeLanguage)} in ${data.locationName} and can enjoy ${data.localCuisine.slice(0, 2).join(' or ')}.`,
        `${data.locationName}’s language is ${getRandomElement(data.nativeLanguage)}; try local specialties like ${data.localCuisine.slice(0, 2).join(' and ')}.`,
        `Speak a bit of ${getRandomElement(data.nativeLanguage)} in ${data.locationName} and savor ${data.localCuisine.slice(0, 2).join(' or ')}.`,
        `${data.locationName} locals use ${getRandomElement(data.nativeLanguage)}, and their cuisine, like ${data.localCuisine.slice(0, 2).join(' and ')}, is a highlight.`,
        `The vibe in ${data.locationName} includes ${getRandomElement(data.nativeLanguage)} and delicious ${data.localCuisine.slice(0, 2).join(' or ')}.`
    ];

    const commuteOptionsTemplates = [
        `Navigate ${data.locationName} easily with ${getRandomElement(data.nearestCommute)}.`,
        `${data.locationName}’s ${getRandomElement(data.nearestCommute)} makes getting around a breeze.`,
        `Use ${getRandomElement(data.nearestCommute)} to explore ${data.locationName} efficiently.`,
        `In ${data.locationName}, ${getRandomElement(data.nearestCommute)} is your best travel option.`,
        `Travel around ${data.locationName} using ${getRandomElement(data.nearestCommute)} for convenience.`,
        `${getRandomElement(data.nearestCommute)} is the go-to transport in ${data.locationName}.`
    ];

    const challengesAndSolutionsTemplates = [
        `In ${data.locationName}, you might face ${getRandomElement(data.travelChallenges)}, but ${getRandomElement(data.solutions)} helps.`,
        `${data.locationName} visitors may encounter ${getRandomElement(data.travelChallenges)}; ${getRandomElement(data.solutions)} is a great fix.`,
        `Watch out for ${getRandomElement(data.travelChallenges)} in ${data.locationName}, but ${getRandomElement(data.solutions)} can ease it.`,
        `${data.locationName}’s ${getRandomElement(data.travelChallenges)} can be tackled with ${getRandomElement(data.solutions)}.`,
        `Be ready for ${getRandomElement(data.travelChallenges)} in ${data.locationName}; ${getRandomElement(data.solutions)} will help.`,
        `${getRandomElement(data.travelChallenges)} might pop up in ${data.locationName}, but ${getRandomElement(data.solutions)} has you covered.`
    ];

    const culturalAdviceTemplates = [
        `In ${data.locationName}, make sure to ${getRandomElement(data.culturalInsights)}.`,
        `Respect ${data.locationName}’s culture by ${getRandomElement(data.culturalInsights)}.`,
        `Embrace ${data.locationName}’s traditions with ${getRandomElement(data.culturalInsights)}.`,
        `When in ${data.locationName}, always ${getRandomElement(data.culturalInsights)}.`,
        `${data.locationName} locals appreciate when you ${getRandomElement(data.culturalInsights)}.`,
        `Blend into ${data.locationName} by ${getRandomElement(data.culturalInsights)}.`
    ];

    const newParagraph = `Exploring ${data.locationName} is a unique adventure. ${getRandomElement(timeToVisitTemplates)} ${getRandomElement(clothingAdviceTemplates)} ${getRandomElement(cuisineAndLanguageTemplates)} ${getRandomElement(commuteOptionsTemplates)} ${getRandomElement(challengesAndSolutionsTemplates)} ${getRandomElement(culturalAdviceTemplates)}`;
    
    if (!cached.some(p => p === newParagraph)) { // Avoid duplicate paragraphs
        cached.push(newParagraph);
        paragraphCache.set(cacheKey, cached);
    }
    return newParagraph;
};

/**
 * Answer a top question based on category, locationName, and question.
 */
export const answerQuestionTop = async (req, res) => {
    const { category, locationName, question } = req.body;

    try {
        const tips = await TravelTips.find({ category, locationName });

        if (!tips || tips.length === 0) {
            return res.status(404).json({ error: 'No tips found for the specified category and location' });
        }

        const mergedData = mergeDataEntries(tips);
        const paragraph = generateParagraph(mergedData);
        console.log('Generated paragraph (top):', paragraph); // Debug log to inspect paragraph

        if (!question || !paragraph) {
            return res.status(400).json({ error: 'Question and paragraph are required' });
        }

        if (!answerer) {
            return res.status(500).json({ error: 'Model not initialized' });
        }

        const result = await answerer(question, paragraph, { topk: 5 });
        console.log('Top-k answers (top):', result); // Debug log to inspect answers
        res.json(getRandomTopKAnswer(result));
    } catch (error) {
        console.error('Error answering top question:', error);
        res.status(500).json({ error: 'Failed to process the request' });
    }
};