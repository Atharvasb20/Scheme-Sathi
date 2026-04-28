const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function scrapeSchemes() {
    console.log('Starting the scheme scraper...');
    
    const targetUrl = 'https://en.wikipedia.org/wiki/List_of_government_schemes_in_India';
    console.log(`Fetching from ${targetUrl}...`);
    
    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const html = response.data;
        
        // Use a robust Regex to find mentions of specific Indian schemes from the raw HTML text
        // Looks for things like "Pradhan Mantri Awas Yojana", "Ayushman Bharat Scheme", etc.
        const regex = /([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){1,4}\s+(?:Yojana|Mission|Scheme|Abhiyan|Karyakram))/g;
        let matches = html.match(regex);
        
        const schemesData = [];
        
        if (matches) {
            // Deduplicate and clean up
            const uniqueNames = [...new Set(matches)];
            
            for (let i = 0; i < Math.min(uniqueNames.length, 12); i++) {
                schemesData.push({
                    name: uniqueNames[i].trim(),
                    category: "General/Welfare",
                    income_limit: "Refer to official portal",
                    occupation: "All eligible citizens",
                    state: "All India",
                    benefit: `Benefits provided under ${uniqueNames[i].trim()}`
                });
            }
        }

        console.log(`Successfully extracted ${schemesData.length} unique schemes using web scraping.`);
        
        const outputPath = path.join(__dirname, '..', 'schemes.json');
        
        if (schemesData.length > 0) {
            fs.writeFileSync(outputPath, JSON.stringify(schemesData, null, 2), 'utf-8');
            console.log(`Data successfully saved to ${outputPath}`);
        } else {
            console.log('No elements found to scrape.');
        }
        
    } catch (error) {
        console.error('Error during scraping:', error.message);
    }
}

scrapeSchemes();
