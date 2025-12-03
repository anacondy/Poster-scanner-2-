# API Documentation

This document describes the API integration and configuration for Cinematic Archives.

## Google Gemini AI Integration

The application uses Google's Gemini 2.5 Flash model for image analysis.

### API Endpoint

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent
```

### Authentication

API key is required. Get one from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Request Format

```javascript
{
  "contents": [{
    "role": "user",
    "parts": [
      { 
        "text": "Analyze this image..." 
      },
      { 
        "inlineData": { 
          "mimeType": "image/jpeg", 
          "data": "base64_encoded_image_data" 
        } 
      }
    ]
  }],
  "generationConfig": {
    "responseMimeType": "application/json"
  },
  "safetySettings": [
    { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
    { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
    { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
    { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
  ]
}
```

### Response Format

```javascript
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "{\"title\":\"Movie Title\",\"year\":\"2023\",\"genre\":\"Sci-Fi\",\"description\":\"A description...\"}"
      }]
    }
  }]
}
```

### Parsed Result

```javascript
{
  "title": "Movie Title",
  "year": "2023",
  "genre": "Sci-Fi",
  "description": "A short, mysterious description of the poster"
}
```

## Safety Settings

All safety categories are set to `BLOCK_NONE` to allow unrestricted content analysis:

- `HARM_CATEGORY_HARASSMENT`
- `HARM_CATEGORY_HATE_SPEECH`
- `HARM_CATEGORY_SEXUALLY_EXPLICIT`
- `HARM_CATEGORY_DANGEROUS_CONTENT`

This ensures the AI can analyze any type of visual content without restrictions.

## Rate Limits

### Free Tier
- **Requests per minute**: 60
- **Requests per day**: Unlimited (with RPM limit)
- **Tokens per minute**: Variable based on content

### Paid Tier
- **Requests per minute**: Higher (check current pricing)
- **No daily limits**
- **Priority support**

## Error Handling

### Common Errors

**401 Unauthorized**
- Invalid or missing API key
- API key not enabled for Generative Language API

**429 Too Many Requests**
- Rate limit exceeded
- Wait before retrying

**400 Bad Request**
- Invalid image format
- Image too large
- Malformed request

**500 Internal Server Error**
- Temporary API issue
- Retry after delay

### Error Response Example

```javascript
{
  "error": {
    "code": 401,
    "message": "API key not valid",
    "status": "UNAUTHENTICATED"
  }
}
```

## Implementation Example

### Setting the API Key

**Method 1: Direct in Code**
```javascript
// src/App.jsx line 41
const apiKey = "YOUR_API_KEY_HERE";
```

**Method 2: Environment Variable**
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

Then create `.env.local`:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

### Making a Request

```javascript
const analyzeImage = async (imageFile) => {
  // Convert image to base64
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  
  reader.onloadend = async () => {
    const base64Data = reader.result.split(',')[1];
    
    // Call API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [
              { text: "Analyze this movie poster..." },
              { inlineData: { mimeType: imageFile.type, data: base64Data } }
            ]
          }],
          generationConfig: { responseMimeType: "application/json" },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        })
      }
    );
    
    const data = await response.json();
    const result = JSON.parse(data.candidates[0].content.parts[0].text);
    console.log(result);
  };
};
```

## Prompt Engineering

### Current Prompt

```
Analyze this image (Movie Poster, Game Cover, or Abstract Art).
1. Identify Title (if unknown, create a fitting abstract title).
2. Identify Release Year (or Era).
3. Identify Genre (e.g., Sci-Fi, Noir, Romance, Abstract).
4. Write a short, mysterious, atmospheric description. NO SPOILERS. Describe the vibe, mood, or artistic composition. < 50 words.

Return JSON:
{
  "title": "String",
  "year": "String",
  "genre": "String",
  "description": "String"
}
```

### Customizing the Prompt

To customize what information is extracted:

1. **Edit the prompt** in `src/App.jsx` lines 44-58
2. **Update the JSON schema** to match your needs
3. **Update the UI** to display new fields

**Example - Add Director:**
```javascript
const prompt = `
  Analyze this movie poster.
  Return JSON with: title, year, genre, director, description
  
  Return JSON:
  {
    "title": "String",
    "year": "String",
    "genre": "String",
    "director": "String",
    "description": "String"
  }
`;
```

## Alternative Models

### Switching to GPT-4 Vision

```javascript
const response = await fetch(
  'https://api.openai.com/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4-vision-preview",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: imageDataUrl } }
        ]
      }],
      max_tokens: 500
    })
  }
);
```

### Switching to Claude Vision

```javascript
const response = await fetch(
  'https://api.anthropic.com/v1/messages',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      max_tokens: 500,
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Data } }
        ]
      }]
    })
  }
);
```

## Performance Optimization

### Caching Results

```javascript
const cache = new Map();

const analyzeWithCache = async (file) => {
  const cacheKey = `${file.name}_${file.size}_${file.lastModified}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await analyzeImage(file);
  cache.set(cacheKey, result);
  return result;
};
```

### Batch Processing

```javascript
const analyzeBatch = async (files) => {
  const results = await Promise.all(
    files.map(file => analyzeImage(file))
  );
  return results;
};
```

### Retry Logic

```javascript
const analyzeWithRetry = async (file, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await analyzeImage(file);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
};
```

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** on the client side
4. **Validate responses** before using them
5. **Handle errors gracefully**
6. **Use HTTPS only**
7. **Monitor API usage** to detect abuse

## Resources

- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [API Pricing](https://ai.google.dev/pricing)
- [API Status](https://status.cloud.google.com/)

---

Last Updated: December 2025
