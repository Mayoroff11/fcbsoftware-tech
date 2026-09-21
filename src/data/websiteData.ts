import { FeatureItem, PricingTier, ReviewItem, DurationGroup, LicensePlan, VideoItem } from '../types.ts';

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  verificationUrl: string;
}

export const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'demo-1',
    title: 'Live 1 BTC Transaction',
    description: 'A live transaction sending 1 BTC, Using the FCB software.',
    videoUrl: 'https://pub-8add9ed2d9a1446887cc26adff5c59bf.r2.dev/11111.mp4',
    verificationUrl: 'https://bitref.com/bc1qrakkjwgp34gx44uacm83u5pe327uaea30s3sg4'
  },
  {
    id: 'demo-2',
    title: 'Live 2 BTC Transaction',
    description: 'A live transaction sending 2 BTC, Using the FCB software.',
    videoUrl: 'https://pub-8add9ed2d9a1446887cc26adff5c59bf.r2.dev/22222.mp4',
    verificationUrl: 'https://bitref.com/bc1q6futfagt039v6n2tqzxu0z3dupkha39pqrpwnv'
  },
  {
    id: 'demo-3',
    title: 'Live 3 BTC Transaction',
    description: 'A live transaction sending 3 BTC, Using the FCB software.',
    videoUrl: 'https://pub-8add9ed2d9a1446887cc26adff5c59bf.r2.dev/33333.mp4',
    verificationUrl: 'https://bitref.com/bc1qasmhna0x92u9gxdydl32p5u4ldcwm6a82lwuwr'
  },
  {
    id: 'demo-4',
    title: 'Live 5 BTC Transaction',
    description: 'A live transaction sending 5 BTC, Using the FCB software.',
    videoUrl: 'https://pub-8add9ed2d9a1446887cc26adff5c59bf.r2.dev/5five.mp4',
    verificationUrl: 'https://bitref.com/bc1qqg3asckwxhwvualxv3uv2h869xkmja6r8u4lc2fgllnyp8p278aszys9wv'
  },
  {
    id: 'demo-5',
    title: 'Live 2 BTC Transaction',
    description: 'A live transaction sending 2 BTC, Using the FCB software.',
    videoUrl: 'https://pub-8add9ed2d9a1446887cc26adff5c59bf.r2.dev/2two.mp4',
    verificationUrl: 'https://bitref.com/bc1qcmesy3pnu2v8vw0pvvsr9gzkp7k5at30zdjhvx'
  },
  {
    id: 'demo-6',
    title: 'Live 1 BTC Transaction',
    description: 'A live transaction sending 1 BTC, Using the FCB software.',
    videoUrl: 'https://pub-8add9ed2d9a1446887cc26adff5c59bf.r2.dev/1one.mp4',
    verificationUrl: 'https://bitref.com/bc1q4xxnfmdesk4ppzphqjd93jvru6q33000puj5vu'
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'tx-construction',
    title: 'Deterministic Transaction Construction',
    description: 'Assemble complex Bitcoin transactions with exact input selection, change address routing, and byte-level payload validation.',
    category: 'Core Engine',
    specs: ['SegWit / Taproot compatible', 'Custom dust limit protection', 'Manual & automated UTXO sorting']
  },
  {
    id: 'key-isolation',
    title: 'Local Cryptographic Key Isolation',
    description: 'Private keys remain strictly confined to your local hardware security environment. FCB never transmits or logs private key material.',
    category: 'Security',
    specs: ['PSBT (BIP 174/370) standard', 'Air-gapped signature support', 'Zero network telemetry for keys']
  },
  {
    id: 'multi-output',
    title: 'Multi-Output & Batch Distribution',
    description: 'Construct single transactions dispatching to hundreds of destination scripts with optimized fee density and change management.',
    category: 'Operations',
    specs: ['Batch distribution optimization', 'CSV import & payload parser', 'Change output balancing']
  },
  {
    id: 'fee-precision',
    title: 'Granular Sat/vB Fee Controls',
    description: 'Direct control over satoshi-per-vbyte allocation, RBF (Replace-By-Fee) signaling, and CPFP (Child-Pays-For-Parent) acceleration structures.',
    category: 'Economics',
    specs: ['Sub-sat fee calculation', 'Dynamic RBF sequence injection', 'CPFP parent-child tree mapping']
  },
  {
    id: 'node-connectivity',
    title: 'Direct RPC & Node Connectors',
    description: 'Connect directly to your self-hosted Bitcoin Core full node or private RPC infrastructure without third-party middleware dependencies.',
    category: 'Infrastructure',
    specs: ['Native Bitcoin Core RPC support', 'Tor / onion proxy routing', 'Custom peer broadcasting']
  },
  {
    id: 'audit-inspection',
    title: 'Pre-Broadcast Script Verification',
    description: 'Inspect raw witness data, scriptPubKey execution paths, and signatures prior to network broadcast with visual structural breakdown.',
    category: 'Verification',
    specs: ['Raw hex byte inspector', 'Witness stack visualizer', 'Signature hash pre-calculation']
  }
];

export const DURATION_GROUPS: DurationGroup[] = [
  {
    id: '1-month',
    name: '1 Month',
    personal: {
      id: '1m-personal',
      durationId: '1-month',
      durationName: '1 Month',
      type: 'personal',
      title: 'Personal License',
      price: '$1,999',
      periodLabel: '1 Month',
      description: 'For one user.',
      features: [
        'Monthly Bitcoin transaction allowance: [SPECIFY]',
        '1 user/device',
        'License duration: 1 month',
        'Upto 100 btc',
        'Duration: 90 days',
        'Transaction verification tools',
        'Compatible with standard wallets',
        '24/7 support'
      ],
      ctaText: 'Choose Plan'
    },
    business: {
      id: '1m-business',
      durationId: '1-month',
      durationName: '1 Month',
      type: 'business',
      title: 'Business License',
      price: '$2,999',
      periodLabel: '1 Month',
      description: 'For multiple users.',
      features: [
        'Monthly Bitcoin transaction allowance: [SPECIFY]',
        'Up to 3 users/devices simultaneously',
        'License duration: 1 month',
        'Upto 150 btc',
        'Duration: 120 days',
        'Transaction verification tools',
        'Compatible with supported wallets',
        '24/7 support'
      ],
      ctaText: 'Choose Plan',
      recommended: true
    }
  },
  {
    id: '3-months',
    name: '3 Months',
    personal: {
      id: '3m-personal',
      durationId: '3-months',
      durationName: '3 Months',
      type: 'personal',
      title: 'Personal License',
      price: '$3,499',
      periodLabel: '3 Months',
      description: 'For one user.',
      features: [
        'Bitcoin transaction allowance: [SPECIFY]',
        '1 user/device',
        '3-month license',
        'Upto 350 btc',
        'Duration: 90 days',
        'Transaction verification tools',
        'Compatible with standard wallets',
        '24/7 support'
      ],
      ctaText: 'Choose Plan'
    },
    business: {
      id: '3m-business',
      durationId: '3-months',
      durationName: '3 Months',
      type: 'business',
      title: 'Business License',
      price: '$4,499',
      periodLabel: '3 Months',
      description: 'For multiple users.',
      features: [
        'Bitcoin transaction allowance: [SPECIFY]',
        'Up to 3 users/devices simultaneously',
        '3-month license',
        'Upto 500 btc',
        'Duration: 120 days',
        'Transaction verification tools',
        'Compatible with supported wallets',
        '24/7 support'
      ],
      ctaText: 'Choose Plan',
      recommended: true
    }
  },
  {
    id: '6-months',
    name: '6 Months',
    personal: {
      id: '6m-personal',
      durationId: '6-months',
      durationName: '6 Months',
      type: 'personal',
      title: 'Personal License',
      price: '$4,999',
      periodLabel: '6 Months',
      description: 'For one user.',
      features: [
        'Bitcoin transaction allowance: [SPECIFY]',
        'Up to 2 users/devices simultaneously',
        '6-month license',
        'Upto 1000 btc',
        'Duration: 120 days',
        'Transaction verification tools',
        'Compatible with standard wallets',
        '24/7 support'
      ],
      ctaText: 'Choose Plan'
    },
    business: {
      id: '6m-business',
      durationId: '6-months',
      durationName: '6 Months',
      type: 'business',
      title: 'Business License',
      price: '$5,999',
      periodLabel: '6 Months',
      description: 'For multiple users.',
      features: [
        'Bitcoin transaction allowance: [SPECIFY]',
        '3–5 users/devices simultaneously',
        '6-month license',
        'Upto 2000 btc',
        'Duration: 180 days',
        'Transaction verification tools',
        'Compatible with supported wallets',
        '24/7 priority support'
      ],
      ctaText: 'Choose Plan',
      recommended: true
    }
  },
  {
    id: '1-year',
    name: '1 Year',
    personal: {
      id: '1y-personal',
      durationId: '1-year',
      durationName: '1 Year',
      type: 'personal',
      title: 'Personal License',
      price: '$7,499',
      periodLabel: '1 Year',
      description: 'For one user.',
      features: [
        'Bitcoin transaction allowance: [SPECIFY]',
        'Up to 3 users/devices simultaneously',
        '1-year license',
        'Upto 2000 btc',
        'Duration: 180 days',
        'Transaction verification tools',
        'Compatible with standard wallets',
        '24/7 support'
      ],
      ctaText: 'Choose Plan'
    },
    business: {
      id: '1y-business',
      durationId: '1-year',
      durationName: '1 Year',
      type: 'business',
      title: 'Business License',
      price: '$8,999',
      periodLabel: '1 Year',
      description: 'For multiple users.',
      features: [
        'Bitcoin transaction allowance: [SPECIFY]',
        '5–7 users/devices simultaneously',
        '1-year license',
        'Upto 5000 btc',
        'Duration: 365 days',
        'Transaction verification tools',
        'Compatible with supported wallets',
        '24/7 priority support'
      ],
      ctaText: 'Choose Plan',
      recommended: true
    }
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    personal: {
      id: 'lifetime-personal',
      durationId: 'lifetime',
      durationName: 'Lifetime',
      type: 'personal',
      title: 'Personal License',
      price: '$9,999',
      periodLabel: 'Lifetime',
      description: 'For one user.',
      features: [
        'Bitcoin transaction allowance: [SPECIFY]',
        'Up to 5 users/devices simultaneously',
        'Lifetime license',
        'Upto 5000 btc monthly',
        'Duration: 365 days',
        'Transaction verification tools',
        'Compatible with standard wallets',
        '24/7 support'
      ],
      ctaText: 'Choose Plan'
    },
    business: {
      id: 'lifetime-business',
      durationId: 'lifetime',
      durationName: 'Lifetime',
      type: 'business',
      title: 'Business License',
      price: '$14,999',
      periodLabel: 'Lifetime',
      description: 'For multiple users.',
      features: [
        'Unlimited Bitcoin transaction allowance: [CONFIRM]',
        'Up to 15 users/devices simultaneously',
        'Lifetime license',
        'Duration: 365 days',
        'Transaction verification tools',
        'Compatible with supported wallets',
        '24/7 priority support'
      ],
      ctaText: 'Choose Plan',
      recommended: true
    }
  }
];

export const ALL_LICENSE_PLANS: LicensePlan[] = DURATION_GROUPS.flatMap((g) => [g.personal, g.business]);

export const PRICING_DATA: PricingTier[] = [
  {
    id: '1m-personal',
    name: '1 Month - Personal License',
    tagline: 'For one user.',
    price: '$1,999',
    billingDetail: '1 Month',
    description: 'For one user.',
    features: DURATION_GROUPS[0].personal.features,
    recommended: false,
    ctaText: 'Choose Plan',
    tierBadge: 'Personal'
  },
  {
    id: '1m-business',
    name: '1 Month - Business License',
    tagline: 'For multiple users.',
    price: '$2,999',
    billingDetail: '1 Month',
    description: 'For multiple users.',
    features: DURATION_GROUPS[0].business.features,
    recommended: true,
    ctaText: 'Choose Plan',
    tierBadge: 'Business'
  }
];

export interface Review {
  id: string;
  name: string;
  rating: number;
  content: string;
  avatar: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Daniel Morrison',
    rating: 3.9,
    content: 'I appreciated how simple the interface was. It didn’t feel overwhelming',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-2',
    name: 'Faraday',
    rating: 3.9,
    content: "I’m a freelancer and some months are slower than others. Breaking this up into smaller chunks made it actually possible for me to get the software without eating ramen for a month. The 'no access until it's paid' thing was a bit of a bummer at first, but it kept me motivated to finish the payments.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-3',
    name: 'Jenny Thompson',
    rating: 3.5,
    content: 'The refund policy is clear, but users need to read it carefully',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-4',
    name: 'Maria Mak',
    rating: 4.5,
    content: 'Support has been really good. They reply fast and actually help instead of giving automated answers. That made the experience way better.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-5',
    name: 'Edward',
    rating: 4,
    content: 'I’m still testing things out before forming a full opinion.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-6',
    name: 'Miss Watkins',
    rating: 4,
    content: 'Security practices were explained in a way that didn’t feel like marketing fluff.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-7',
    name: 'Mark Zimmerman',
    rating: 3.5,
    content: 'The coins do what they’re supposed to, but I feel like they could last longer. Still happy overall.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-8',
    name: 'Patrick Sullivan',
    rating: 4.5,
    content: 'Most critics haven’t actually tried it.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-9',
    name: 'Call me Gallagher',
    rating: 4.5,
    content: 'The platform wasn’t a good fit for my needs I want something that lasts longer, this would do for now though, i just hope the devs are working on this matter',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-10',
    name: 'Mark Underwood',
    rating: 4.5,
    content: 'Everything was straightforward. Setup was easy and instructions were clear on the manual guide',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-11',
    name: 'Emily R.',
    rating: 3.5,
    content: 'Support replied, though it took a bit longer than expected',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-12',
    name: 'Steven james',
    rating: 4.5,
    content: 'I like that the platform explains its limits instead of pretending they can do everything',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-13',
    name: 'Frank Alvarez',
    rating: 5,
    content: 'I was skeptical at first, but it actually worked. Glad I gave it a chance',
    avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-14',
    name: 'Oliver',
    rating: 4.5,
    content: 'No complaints so far.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-15',
    name: 'Nathan Scott',
    rating: 4.5,
    content: 'Crypto-only payments are explained well, even if it’s not for everyone',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-16',
    name: 'Daniel Mitchell',
    rating: 3.5,
    content: 'The response time from support could be better',
    avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-17',
    name: 'Mendes',
    rating: 4.5,
    content: 'Customer support is solid. Quick replies and clear help whenever I needed it.',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-18',
    name: 'Luke Goodman',
    rating: 4.5,
    content: 'I was a little nervous about how the hand-off would work once I hit the final payment, but it was instant. The second that last $250 cleared, I got the email with my license key. No hidden fees or interest either, which is rare in these space',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-19',
    name: 'popper',
    rating: 4,
    content: 'I decided not to continue using it after trying it out my conscience as a Christian.',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-20',
    name: 'Mohamed Khalil',
    rating: 4,
    content: 'It worked, but not in the way I expected, no direct withdrawal of crypto, have to go through some processes, they said its for our safety though',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-21',
    name: 'Acker',
    rating: 5,
    content: 'I requested a refund within the allowed time frame and followed the instructions exactly. Support reviewed it and processed the refund without any issues',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-22',
    name: 'Milly',
    rating: 4.5,
    content: 'It was easy to understand what I was paying for',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-23',
    name: 'ARTURO',
    rating: 5,
    content: 'One of my ex colleagues (quit his job lol) introduced me to this and explained how it worked. After trying it myself, I can say it was morethan worth it, God bless you whereever you are man',
    avatar: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-24',
    name: 'Godnotzilla',
    rating: 4,
    content: 'The technical explanations on the Dev Team page may be confusing for beginners, in the crypto space',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-25',
    name: 'Emmanuel',
    rating: 4.5,
    content: 'I’m still learning how to use everything I’m new to crypto, thanks to the support they never leave me hanging',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-26',
    name: 'Augustina',
    rating: 5,
    content: 'Refund policy was straightforward. No confusing language.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-27',
    name: 'Thompson',
    rating: 4.5,
    content: 'I had trouble understanding some parts of the process support made it easier though',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-28',
    name: 'Him',
    rating: 4.5,
    content: 'Once you stop thinking emotionally and start thinking technically, it’s easier to see why this works the way it does.',
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-29',
    name: 'Berry Aaron',
    rating: 4.5,
    content: 'I didn’t qualify for a refund because my license activity went against the stated rules. Support pointed me to the exact section in the policy.',
    avatar: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-30',
    name: 'Masscot',
    rating: 5,
    content: 'Any time I contacted support, they responded quickly and were helpful. It’s nice knowing someone actually gets back to you',
    avatar: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-31',
    name: 'Harrison',
    rating: 4.5,
    content: 'Activation was quick and I was able to get started right away.',
    avatar: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-32',
    name: "David O'connel brooks",
    rating: 4.5,
    content: 'Everything feels aligned — terms, refunds, security, and support.',
    avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-33',
    name: 'victor delgado Patrick',
    rating: 4.5,
    content: 'This was suggested by friends I trust, so I decided to give it a shot. It worked out well and I appreciate them putting me onto it',
    avatar: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-34',
    name: 'Taker',
    rating: 4,
    content: 'I’m still taking my time',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-35',
    name: 'Katherina',
    rating: 4,
    content: 'I used the months I was paying it off to just watch YouTube tutorials so I’d be ready. By the time I actually got the software, I felt like a pro already. If you’re not in a massive rush, this is the way to do it.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-36',
    name: 'Daniel Martha',
    rating: 4.5,
    content: 'im so in love with this, why didnt i know this earliar',
    avatar: 'https://images.unsplash.com/photo-1508243771214-6e85740f7431?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-37',
    name: 'Geek Biggi',
    rating: 5,
    content: 'Those who immediately label it a scam usually haven’t done any real research beyond surface-level comments.',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-38',
    name: 'EDDIE',
    rating: 4,
    content: 'The crypto-only payment rule is clear, but it limits payment options',
    avatar: 'https://images.unsplash.com/photo-1562788869-4ed32648eb72?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-39',
    name: 'Kyle',
    rating: 4.5,
    content: 'If this was completely fake, it wouldn’t still be discussed years later by experienced crypto users.',
    avatar: 'https://images.unsplash.com/photo-1514543250559-83867827ecce?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-40',
    name: 'Marriah',
    rating: 4.5,
    content: 'The Security page gave me confidence. It didn’t feel vague or overpromising',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-41',
    name: 'Mahney',
    rating: 5,
    content: 'I\'ve known about this software for a while now, and got scammed buying from people on telegram, Im glad these people made an official site, this way you can buy directly from them',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-42',
    name: 'Augustine August',
    rating: 4.5,
    content: 'The process was straightforward. As long as you follow the rules stated in the PDF manual, it works as described.',
    avatar: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-43',
    name: 'Miguel',
    rating: 4.5,
    content: 'The biggest mistake people make is assuming everything in crypto works the same way. This relies on a different mechanism, which is why it confuses so many users',
    avatar: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-44',
    name: 'Nelson',
    rating: 5,
    content: 'The refund policy was clear, so I knew what information to provide. Once I submitted everything, the response was quick',
    avatar: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-45',
    name: 'Adam Smith',
    rating: 4.5,
    content: 'It seems fine, though I haven’t explored all features yet.',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-46',
    name: 'Kaitlin',
    rating: 4,
    content: 'The system works exactly like they say, but man, it is tough watching money leave your account for two months while the software just sits there locked. It’s a fair deal, but definitely don\'t do this if you’re in a hurry',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-47',
    name: 'dot dot dot',
    rating: 4.5,
    content: 'My refund request was denied because I exceeded the usage limits mentioned in the policy. It was disappointing, but the reason was clearly explained',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171edd2521d?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-48',
    name: 'Kylian',
    rating: 4,
    content: 'I had to read the refund policy twice to fully understand it.',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-49',
    name: 'Aman',
    rating: 5,
    content: 'I hate debt. This is basically digital layaway and I\'m here for it. It’s a bit of a test of patience since you can’t use it right away, but the feeling of finally hitting \'Download\' and knowing you don\'t owe anyone anything is 10/10.',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-50',
    name: 'Jameson',
    rating: 5,
    content: 'Big thank you for the help from the support, even after my first week they advised i keep it low and start building a business this way',
    avatar: 'https://images.unsplash.com/photo-1520409364224-63400dfe26e5?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-51',
    name: 'Sarah Livingstone',
    rating: 5,
    content: 'Honestly the only reason why i tried this in the first place was because of the refund policy i saw, it gave me confidence, that way if this doesnt work as expected ill just have my money refunded',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-52',
    name: 'Debra',
    rating: 4.5,
    content: 'It\'s a payment plan. It did what it was supposed to do. I got my software at the end. Nothing flashy about the experience, and I did find the reminder emails a bit annoying, but hey, I have the license now.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-53',
    name: 'Ian Whitmore',
    rating: 4.5,
    content: 'Saying this isn’t real is like saying crypto itself wasn’t real years ago. New concepts are always rejected before people understand them.',
    avatar: 'https://images.unsplash.com/photo-1563240619-44ec0047592c?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-54',
    name: 'Samuel Dennis',
    rating: 4.5,
    content: 'The plan is fine if you have zero discipline, but since you don\'t get the software until the very end anyway, it’s basically just a savings account you can\'t touch. It worked out in the end, but next time I\'d probably just save the cash myself and buy it all at once.',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-55',
    name: 'walden',
    rating: 4.5,
    content: 'It works, but I’m staying cautious.',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-56',
    name: 'Verrani',
    rating: 4,
    content: 'No back and forth',
    avatar: 'https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-57',
    name: 'George Klein',
    rating: 4.5,
    content: 'Not everything legitimate is easy to understand. Complexity doesn’t automatically mean something is a scam',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-58',
    name: 'jeff strongman',
    rating: 4,
    content: 'The pages are detailed. Some sections took time to read, but that’s expected',
    avatar: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-59',
    name: 'Princess',
    rating: 4.5,
    content: 'I like that the platform focuses on security',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-60',
    name: 'Smeeth',
    rating: 4.5,
    content: 'So far everything works, but I’m taking my time',
    avatar: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-61',
    name: 'John Armstrong',
    rating: 4.5,
    content: 'My brother was the one who told me about this. Giving it a chance honestly changed things for me in a positive way, and I’m grateful he shared it with me',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf0931ee?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-62',
    name: 'Husseini Ahmad',
    rating: 4.5,
    content: 'I’ll have a better opinion after more use.',
    avatar: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-63',
    name: 'Mahmood',
    rating: 5,
    content: 'I spent time reading the security and privacy pages and appreciated how clearly everything was explained.',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-64',
    name: 'Dont call me',
    rating: 4,
    content: 'I didn’t have issues with access or performance.',
    avatar: 'https://images.unsplash.com/photo-1560787313-5dff3307e257?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-65',
    name: 'Gentle',
    rating: 4.5,
    content: 'This has been around longer than people think. It’s only now being discussed more openly, which is why there’s backlash.',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-66',
    name: 'Rita',
    rating: 4,
    content: 'I came across the software while researching different crypto topics.',
    avatar: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-67',
    name: 'Mr beneke',
    rating: 4.5,
    content: 'Security explanations are good, but some users may want simpler wording',
    avatar: 'https://images.unsplash.com/photo-1541577141970-eebc83230055?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-68',
    name: 'Zehhh',
    rating: 5,
    content: 'I contacted support with my order details and license, and they confirmed the refund after reviewing my case',
    avatar: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-69',
    name: 'Joseph quin',
    rating: 4.5,
    content: 'All i can say is, If this wasn’t real, it wouldn’t still be around',
    avatar: 'https://images.unsplash.com/photo-1500649297466-74794c70acff?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-70',
    name: 'Benedict gillighan',
    rating: 4,
    content: 'So far, it’s been a positive experience using the software',
    avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  },
  {
    id: 'rev-71',
    name: 'Jesse Hudson',
    rating: 4.5,
    content: 'Everything worked fine, I just wish the coins lasted a bit longer',
    avatar: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?auto=format&fit=crop&crop=faces&w=160&h=160&q=80'
  }
];

export const REVIEWS_DATA: ReviewItem[] = REVIEWS.map((r) => ({
  id: r.id,
  author: r.name,
  role: 'Verified User',
  institution: 'Customer Review',
  date: 'Verified',
  quote: r.content,
  rating: r.rating,
  useCase: 'Software License'
}));
