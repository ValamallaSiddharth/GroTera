import type { Prompt } from './types';
const entries=[
['seo-blog-writer','SEO Blog Writer','Create authoritative, search-focused long-form content with natural keyword coverage.','Marketing','ChatGPT',['SEO','Content']],
['youtube-script','YouTube Script Generator','Turn an idea into a high-retention video script with pattern interrupts.','Video','Claude',['YouTube','Script']],
['saas-strategy','SaaS Marketing Strategy','Build a channel-by-channel growth plan grounded in your product and market.','Marketing','Gemini',['SaaS','Growth']],
['instagram-captions','Instagram Caption Generator','Write scroll-stopping captions with a natural brand voice and clear CTA.','Social Media','ChatGPT',['Instagram','Social']],
['python-reviewer','Python Code Reviewer','Audit Python for correctness, security, performance, and maintainability.','Coding','Coding AI',['Python','Review']],
['resume-optimizer','Resume Optimizer','Transform experience into concise, quantified, ATS-friendly achievements.','Business','Claude',['Career','ATS']],
['product-description','Product Description Writer','Create benefit-led product copy that converts without sounding generic.','Writing','ChatGPT',['Ecommerce','Copy']],
['business-idea','Business Idea Generator','Generate and validate differentiated business concepts for a chosen market.','Business','Gemini',['Startup','Strategy']],
['study-tutor','Adaptive Study Tutor','Teach any subject with Socratic questions and personalized practice.','Education','Claude',['Learning','Tutor']],
['image-director','Image Generation Prompt','Convert a visual concept into cinematic art direction and precise parameters.','Image Generation','Midjourney',['Visual','Art']],
['email-copywriter','Email Copywriter','Write concise campaign emails with persuasive hooks and strong CTAs.','Marketing','ChatGPT',['Email','Conversion']],
['sales-outreach','Sales Outreach Writer','Research-driven personalized outreach that earns replies without gimmicks.','Sales','Claude',['B2B','Outreach']],
['research-synthesizer','Research Synthesizer','Turn multiple sources into a rigorous, cited executive synthesis.','Research','Gemini',['Analysis','Synthesis']],
['meeting-facilitator','Meeting Facilitator','Design a focused agenda with decisions, owners, and follow-ups.','Productivity','ChatGPT',['Meetings','Teams']],
['sql-analyst','SQL Query Architect','Translate business questions into safe, efficient SQL with explanations.','Coding','Coding AI',['SQL','Data']],
['brand-voice','Brand Voice Designer','Define a distinctive voice system with principles and before/after examples.','Writing','Claude',['Branding','Voice']],
['lesson-planner','Lesson Plan Architect','Create inclusive, outcomes-based lessons with assessment checkpoints.','Education','Gemini',['Teaching','Planning']],
['competitor-analysis','Competitive Intelligence Brief','Map competitors, positioning gaps, threats, and actionable opportunities.','Business','ChatGPT',['Research','Market']],
['video-storyboard','Video Storyboard Director','Build a shot-by-shot storyboard with pacing, audio, and camera direction.','Video','Video AI',['Storyboard','Creative']],
['linkedin-post','LinkedIn Thought Leadership','Shape expertise into credible, insight-rich posts that invite discussion.','Social Media','Claude',['LinkedIn','Personal Brand']],
] as const;
export const prompts:Prompt[]=entries.map((e,i)=>({id:e[0],title:e[1],description:e[2],category:e[3],model:e[4] as Prompt['model'],tags:[...e[5]],author:i%3===0?'Maya Chen':i%3===1?'Alex Morgan':'PromptForge Studio',rating:Number((4.6+(i%4)*.1).toFixed(1)),uses:1280+i*437,createdAt:new Date(2026,7,22-i).toISOString(),content:`ROLE\nYou are a world-class ${e[1]} with deep practical expertise.\n\nOBJECTIVE\n${e[2]}\n\nCONTEXT\nUse the background, audience, and constraints I provide. Ask up to three focused questions when essential context is missing.\n\nINSTRUCTIONS\n1. Analyze the intended outcome before responding.\n2. Use specific, actionable language and avoid generic advice.\n3. Structure the response for immediate use.\n4. Check the result against the objective before finalizing.\n\nCONSTRAINTS\nBe accurate, concise, original, and transparent about assumptions.\n\nOUTPUT FORMAT\nProvide a polished deliverable followed by a short rationale and next steps.\n\nINPUT\n[Paste your context here]`}));
export const categories=['Marketing','Coding','Business','Writing','Education','Productivity','Image Generation','Video','Social Media','SEO','Sales','Research'];
export const models=['ChatGPT','Claude','Gemini','Midjourney','DALL-E','Coding AI','Video AI'];
