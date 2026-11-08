export const site = {
  company: 'Apex Roofing',
  tagline: 'Honest roofing. Fair prices. Done right.',
  phone: '(555) 123-4567',
  email: 'hello@apexroofing.example',
  accent: '#C2410C',
  serviceArea: {
    headline: 'Proudly serving the Dallas–Fort Worth area',
    places: ['Dallas', 'Plano', 'Frisco', 'Arlington', 'Fort Worth', 'Irving'],
  },
  services: [
    { id: 'repair', title: 'Roof Repair', blurb: 'Leaks, missing shingles, flashing and storm damage fixed fast.' },
    { id: 'replacement', title: 'Roof Replacement', blurb: 'Full tear-off and install with a workmanship warranty.' },
    { id: 'inspection', title: 'Roof Inspection', blurb: 'Written report with photos. Fee credited toward any project.' },
  ],
    accountId: 'biz_CmOzPzQ3H8UP1E',
      ownerUserId: 'user_c2x5f0EHAuPjm',
  plans: {
    inspection: { name: 'Roof Inspection', amountUsd: 149, planId: 'plan_d1OMOQgJIlk5x' },
    deposit: { name: 'Project Deposit', amountUsd: 500, planId: 'plan_MFPGc9wjHfGnY' },
    flatRate: { name: 'Roof Tune-Up & Cleaning', amountUsd: 399, planId: 'plan_8tJ69IiIp410O' },
  },
  financing: {
    headline: 'Monthly payments available',
    body: 'Split your roof project into payments at checkout. Options are shown automatically when you are eligible.',
  },
  reviews: [
    { name: 'Michael R.', text: 'Crew showed up on time and left the yard spotless.', stars: 5 },
    { name: 'Sandra T.', text: 'Clear quote, no surprises, and the deposit process was easy.', stars: 5 },
    { name: 'James L.', text: 'Fixed our leak the same week after a storm.', stars: 5 },
  ],
}
export type Site = typeof site