"use strict";

const CONTENT = {
  profile: {
    name: "Muhammad Sohaib Ali",
    title: "Enterprise AI Architect",
    org: "Hubcom Corporation",
    location: "Jeddah, Saudi Arabia",
    label: "Enterprise AI Architect · Jeddah, Saudi Arabia",
    pitch:
      "I design agentic AI systems that run real business work, for Enterprises.",
    summary:
      "About 10 years designing, scaling and governing enterprise cloud-native AI/ML platforms; Generative AI, LLMs, Agentic AI, MCP, MLOps, RPA, data platforms on AWS, Azure, GCP.",
    email: "sohaibayub9@gmail.com",
    phone: "+966 53 407 8945",
    phonePk: "+923155507888",
    photo: "assets/photo.jpg",
    linkedin: "https://www.linkedin.com/in/msohaibali",
    orcid: "https://orcid.org/0009-0006-7828-3137",
    cv: "assets/Sohaib_Ali_CV.pdf",
    monogram: "MSA",
  },

  clients: [
    { name: "IKEA", logo: "assets/logos/ikea.png" },
    { name: "Flow Progressive Logistics", logo: "assets/logos/flow.png" },
    { name: "Circle K", logo: "assets/logos/circlek.png" },
    { name: "Al Sulaiman Group", logo: "assets/logos/alsulaiman.png" },
    { name: "Fosroc", logo: "assets/logos/fosroc.png" },
    { name: "Qatar Cool", logo: "assets/logos/qatarcool.png" },
    { name: "Getz Pharma", logo: "assets/logos/getz.png" },
    { name: "UpBrainery", logo: "assets/logos/upbrainery.png" },
    { name: "Northwestern University", logo: "assets/logos/northwestern.png" },
    { name: "Qualcomm", logo: "assets/logos/qualcomm.svg" },
    { name: "Detasad", logo: "assets/logos/detasad.png" },
    { name: "Muvi Cinemas", logo: "assets/logos/muvi.png" },
    { name: "Catrion", logo: "assets/logos/catrion.png" },
    { name: "Pakistan Air Force", logo: "assets/logos/paf.png" },
    { name: "RapiDev", logo: "assets/logos/rapidev.png" },
    { name: "Joyn Group", logo: "assets/logos/joyngroup.png" },
    { name: "The Viewlytics", logo: "assets/logos/viewlytics.png" },
    { name: "Jazz Cash", logo: "assets/logos/jazzcash.png" },
    { name: "Telenor", logo: "assets/logos/telenor.png" },
    { name: "Mobilink Microfinance Bank", logo: "assets/logos/mobilink.png" },
    { name: "MTN - Benin", logo: "assets/logos/mtn-benin.svg" },
  ],

  filters: [
    { id: "agentic-ai", label: "Agentic AI" },
    { id: "data-science", label: "Data Science / ML" },
    { id: "automation", label: "Automation" },
    { id: "mlops-cloud", label: "MLOps & Cloud" },
  ],

  projects: [
    {
      id: "muvi",
      title: "Muvi Booking Assistant",
      client: "Muvi Cinemas",
      tags: ["agentic-ai"],
      summary:
        "Multi-agent conversational ticket booking: showtimes, seat availability, digital ticket issuance at scale.",
      problem:
        "Cinema ticket booking needed to handle showtimes, seats and digital issuance conversationally at scale.",
      built:
        "A multi-agent assistant with a router agent that delegates to showtime, seat and ticket agents backed by cinema APIs.",
      role: "Designed and architected the multi-agent system and led delivery.",
      stack: ["Multi-agent systems", "LLMs", "RAG", "Tool use"],
      result: null,
      diagram: {
        nodes: [
          { id: "user", label: "User", col: 0, row: 1 },
          { id: "router", label: "Router agent", col: 1, row: 1 },
          { id: "show", label: "Showtime", col: 2, row: 0 },
          { id: "seat", label: "Seat", col: 2, row: 1 },
          { id: "ticket", label: "Ticket", col: 2, row: 2 },
          { id: "apis", label: "Cinema APIs", col: 3, row: 1 },
        ],
        edges: [
          ["user", "router"],
          ["router", "show"],
          ["router", "seat"],
          ["router", "ticket"],
          ["show", "apis"],
          ["seat", "apis"],
          ["ticket", "apis"],
        ],
      },
    },
    {
      id: "detasad-ipm",
      title: "Intelligent Project Manager",
      client: "Detasad",
      tags: ["agentic-ai"],
      summary:
        "Production multi-agent platform auto-generating BOQ/BOM from historical data and analysing workforce/resource-allocation risk.",
      problem:
        "Project planning depended on manual BOQ/BOM work and weak visibility into workforce and resource risk.",
      built:
        "A production multi-agent platform that generates BOQ/BOM from historical data and analyses allocation risk.",
      role: "Designed and architected the platform and led delivery.",
      result: null,
    },
    {
      id: "proclaim",
      title: "ProClaim",
      client: "Royal Cyber (product)",
      tags: ["agentic-ai"],
      period: "Dec 2023 – Mar 2024",
      summary:
        "LLM/RAG insurance claims automation: document ingestion, summarisation, policy validation.",
      problem: "Manual insurance claims processing was slow and error-prone.",
      built:
        "An LLM/RAG system for document ingestion, summarisation and policy validation.",
      role: "Designed and architected the solution and led delivery.",
      stack: ["LLMs", "RAG", "Prompt engineering"],
      result: null,
      diagram: {
        nodes: [
          { id: "docs", label: "Claim docs", col: 0, row: 1 },
          { id: "ingest", label: "Ingestion", col: 1, row: 1 },
          { id: "rag", label: "LLM / RAG", col: 2, row: 1 },
          { id: "policy", label: "Policy check", col: 3, row: 0 },
          { id: "summary", label: "Summary", col: 3, row: 2 },
        ],
        edges: [
          ["docs", "ingest"],
          ["ingest", "rag"],
          ["rag", "policy"],
          ["rag", "summary"],
        ],
      },
    },
    {
      id: "corporate-buddy",
      title: "Corporate Buddy & Meeting Booking Agent",
      client: "Hubcom",
      tags: ["agentic-ai"],
      summary: "Multi-agent enterprise assistant and a meeting-booking agent.",
      result: null,
    },
    {
      id: "ikea-vendor-portal",
      title: "Vendor Portal",
      client: "IKEA Saudi Arabia",
      tags: ["agentic-ai", "automation"],
      summary:
        "SharePoint vendor portal with LLM/OCR extraction of CR, IBAN, VAT and ZATCA certificates and government-portal validation.",
      problem:
        "Vendor onboarding required manual certificate extraction and government checks.",
      built:
        "An end-to-end SharePoint vendor portal with LLM/OCR extraction and validation against government portals.",
      role: "Designed and architected the portal and led delivery.",
      stack: ["SharePoint", "LLM", "OCR"],
      result: null,
      diagram: {
        nodes: [
          { id: "vendor", label: "Vendor", col: 0, row: 1 },
          { id: "portal", label: "SharePoint", col: 1, row: 1 },
          { id: "ocr", label: "LLM / OCR", col: 2, row: 1 },
          { id: "gov", label: "Gov portals", col: 3, row: 1 },
        ],
        edges: [
          ["vendor", "portal"],
          ["portal", "ocr"],
          ["ocr", "gov"],
        ],
      },
    },
    {
      id: "fosroc",
      title: "Fosroc Formulation AI",
      client: "Fosroc, UAE (via Royal Cyber)",
      tags: ["data-science", "mlops-cloud"],
      period: "Jan – Jun 2024",
      summary:
        "AI-driven cement / construction-chemical formulation optimisation with feature stores and Azure ML CI/CD.",
      problem:
        "Formulation optimisation across manufacturing needed better models and repeatable ML delivery.",
      built:
        "Feature stores, XGBoost / decision tree / multi-model regression, and Azure ML CI/CD for formulation optimisation.",
      role: "Designed and architected the platform and led delivery.",
      stack: ["XGBoost", "Azure ML", "Feature stores"],
      result:
        "30–50% efficiency gains, 20–30% additive cost savings · PASHA Award winner",
      diagram: {
        nodes: [
          { id: "data", label: "Plant data", col: 0, row: 1 },
          { id: "fs", label: "Feature store", col: 1, row: 1 },
          { id: "models", label: "Models", col: 2, row: 1 },
          { id: "aml", label: "Azure ML CI/CD", col: 3, row: 1 },
        ],
        edges: [
          ["data", "fs"],
          ["fs", "models"],
          ["models", "aml"],
        ],
      },
    },
    {
      id: "burd",
      title: "BURD – Bio-User Recognition Data",
      client: "Hubcom product",
      tags: ["data-science"],
      period: "Sep 2024 – Present",
      summary:
        "Facial and human-activity recognition with YOLO-based detection, real-time video pipelines and a central dashboard.",
      problem:
        "Healthcare, retail and security teams needed reliable facial and activity recognition.",
      built:
        "YOLO-based detection, real-time video pipelines and a central dashboard.",
      role: "Designed and architected the product and led delivery.",
      stack: ["YOLO", "Python", "Real-time video"],
      result: null,
      diagram: {
        nodes: [
          { id: "cam", label: "Cameras", col: 0, row: 1 },
          { id: "yolo", label: "YOLO detect", col: 1, row: 1 },
          { id: "pipe", label: "Video pipe", col: 2, row: 1 },
          { id: "dash", label: "Dashboard", col: 3, row: 1 },
        ],
        edges: [
          ["cam", "yolo"],
          ["yolo", "pipe"],
          ["pipe", "dash"],
        ],
      },
    },
    {
      id: "plate-analyzer",
      title: "Smart AI Plate Analyzer",
      client: "Catrion (via Royal Cyber)",
      tags: ["data-science"],
      period: "Jul – Oct 2024",
      summary:
        "Classifies plates as untouched / partly / fully eaten for catering meal tracking and dietary insight.",
      problem: "Catering teams lacked automated meal-consumption tracking.",
      built:
        "A classifier for untouched, partly eaten and fully eaten plates.",
      role: "Designed and architected the POC and led delivery.",
      result: null,
    },
    {
      id: "ikea-checkout-qa",
      title: "Checkout QA Automation",
      client: "IKEA Saudi Arabia",
      tags: ["automation", "mlops-cloud"],
      summary:
        "Scheduled end-to-end checkout tests for ikea.com/sa with PDF failure reports emailed via Microsoft Graph.",
      problem:
        "Checkout regressions needed reliable scheduled coverage with alerts to QA and leads.",
      built:
        "E2E tests covering product search → bag with Saudi national address → customer details → card payment; PDF reports via Microsoft Graph on failure.",
      role: "Built by Sohaib.",
      stack: [
        "Python 3.13",
        "Playwright",
        "Pytest",
        "Page Object Model",
        "Microsoft Graph",
        "Docker",
        "uv",
      ],
      result: null,
      diagram: {
        nodes: [
          { id: "sched", label: "Scheduler", col: 0, row: 1 },
          { id: "pw", label: "Playwright", col: 1, row: 1 },
          { id: "ikea", label: "ikea.com/sa", col: 2, row: 1 },
          { id: "mail", label: "Graph mail", col: 3, row: 1 },
        ],
        edges: [
          ["sched", "pw"],
          ["pw", "ikea"],
          ["pw", "mail"],
        ],
      },
    },
    {
      id: "flow-utility-sadad",
      title: "Utility & SADAD Payment Automation",
      client: "Flow Progressive Logistics",
      tags: ["automation"],
      summary:
        "Seven UiPath workstreams for utility bills, SADAD payments via HSBCnet, and Oracle invoice create/pay.",
      problem:
        "Utility bill download, SADAD payment and Oracle invoice work was manual and repetitive.",
      built:
        "Seven UiPath workstreams on a shared foundation (credential vault, logging, exception handling): SEC, NWC, Mobily, STC bills; SADAD via HSBCnet; Oracle reconcile/create/pay; humans only for OTP/mobile approvals.",
      role: "Designed the PDDs and managed delivery; built in UiPath by a partner team.",
      status: "Live in production",
      stack: ["UiPath", "HSBCnet", "Oracle"],
      result: null,
      diagram: {
        nodes: [
          { id: "bills", label: "Utility bills", col: 0, row: 1 },
          { id: "rpa", label: "UiPath", col: 1, row: 1 },
          { id: "sadad", label: "SADAD / HSBCnet", col: 2, row: 0 },
          { id: "oracle", label: "Oracle", col: 2, row: 2 },
        ],
        edges: [
          ["bills", "rpa"],
          ["rpa", "sadad"],
          ["rpa", "oracle"],
        ],
      },
    },
    {
      id: "flow-customs",
      title: "Customs Clearance Automation",
      client: "Flow Progressive Logistics",
      tags: ["automation"],
      summary:
        "Three parallel UiPath workstreams for Saber.sa documents, SADAD customs payments and Oracle invoices.",
      problem:
        "Customs clearance involved repetitive portal work, SADAD payments and Oracle invoice steps.",
      built:
        "Three UiPath workstreams: Saber.sa login (Captcha, OTP from email), invoice/PR&C downloads, SADAD/SABB payments, Oracle create/approve/pay.",
      role: "Designed the PDDs and managed delivery; built in UiPath by a partner team.",
      status: "Live in production",
      stack: ["UiPath", "Saber.sa", "SADAD", "Oracle"],
      result: null,
      diagram: {
        nodes: [
          { id: "saber", label: "Saber.sa", col: 0, row: 1 },
          { id: "rpa", label: "UiPath", col: 1, row: 1 },
          { id: "bank", label: "SADAD / SABB", col: 2, row: 0 },
          { id: "oracle", label: "Oracle", col: 2, row: 2 },
        ],
        edges: [
          ["saber", "rpa"],
          ["rpa", "bank"],
          ["rpa", "oracle"],
        ],
      },
    },
    {
      id: "flow-traffic",
      title: "Traffic Violations Monitoring",
      client: "Flow Progressive Logistics",
      tags: ["automation"],
      summary:
        "Extracts violations from government portals (TAMM, TGA) with Power BI dashboards and automated payroll/finance workflows.",
      problem:
        "Traffic violations needed monitoring across government portals with finance follow-through.",
      built:
        "Portal extraction from TAMM and TGA, Power BI dashboards, and automated payroll/finance workflows.",
      role: "Designed and architected the solution and led delivery.",
      result: null,
    },
    {
      id: "invoice-automation",
      title: "Invoice Automation",
      client: "US beverage manufacturer (via Royal Cyber)",
      tags: ["automation", "agentic-ai"],
      period: "Dec 2023 – Feb 2024",
      summary: "AI-based invoice processing across a large supplier network.",
      problem:
        "Invoice processing across a large supplier network was complex and manual.",
      built: "An AI-based invoice processing solution for the supplier network.",
      role: "Designed and architected the solution and led delivery.",
      result: null,
    },
  ],

  moreWork: [
    "GenAI e-commerce customer-behaviour analytics",
    "LLM retail sentiment analysis",
    "Personalised GenAI learning assistant (UpBrainery)",
    "Distributed MongoDB on Kubernetes",
    "OSINT and social-media analytics at scale (Defense Solutions)",
    "1,000+ feature store and HA Hadoop/Spark/MinIO platform (Pakistan Air Force)",
  ],

  experience: [
    {
      org: "IKEA Alsulaiman",
      logo: "assets/logos/ikea.png",
      title: "Technical Consultant",
      period: "Aug 2025 – Present",
      location: "Jeddah",
      note: "Concurrent with Hubcom",
      bullets: [
        "RPA, automation and AI for IKEA Saudi Arabia; Vendor Portal and Checkout QA.",
      ],
    },
    {
      org: "Hubcom Corporation",
      logo: "assets/logos/hubcom.png",
      title: "Enterprise AI Architect",
      period: "Sept 2024 – Present",
      location: "Saudi Arabia",
      bullets: [
        "Agentic and GenAI platform strategy; multi-agent LLM systems with RAG, tool use and vector databases.",
        "LLMOps/MLOps platforms; Responsible AI governance; embed agents in core workflows with C-suite partners.",
      ],
    },
    {
      org: "Royal Cyber Inc.",
      logo: "assets/logos/royalcyber.png",
      title: "Senior Data Scientist, AI Practice Lead",
      period: "Dec 2023 – Oct 2024",
      location: "United States",
      bullets: [
        "LLM/RAG R&D, copilots and knowledge assistants, inference pipelines, productionised GenAI.",
      ],
    },
    {
      org: "Dice Analytics",
      logo: "assets/logos/dice.png",
      title: "Lead Instructor & Consultant",
      period: "Apr 2023 – Oct 2024",
      location: "Pakistan",
      note: "Part-time, concurrent",
      bullets: [
        "DevOps, MLOps, GenAI and Agentic AI training; AWS, Azure and GCP.",
      ],
    },
    {
      org: "Smart Forum — client Qualcomm",
      logo: "assets/logos/qualcomm.svg",
      title: "Senior Software Consultant / Python Backend Engineer",
      period: "Aug 2021 – Nov 2023",
      location: "United States",
      note: "Full-time Aug–Dec 2021, then part-time consultant",
      bullets: [
        "Flask/FastAPI services, Swagger/OpenAPI, CI/CD, merge-request reviews, AWS ECS/EKS/Lambda.",
      ],
    },
    {
      org: "Pakistan Air Force",
      logo: "assets/logos/paf.png",
      title: "Senior Data Scientist & AI Consultant",
      period: "Dec 2021 – Dec 2022",
      bullets: [
        "Descriptive to predictive analytics; 1,000+ feature store; MLOps pipelines; HA Hadoop/Spark/MinIO.",
      ],
    },
    {
      org: "Defense Solutions & Systems",
      logo: "assets/logos/defense.png",
      title: "Data Scientist / Senior Python Developer",
      period: "Jul 2019 – Aug 2021",
      location: "Pakistan",
      bullets: [
        "OSINT and social analytics, PySpark, MongoDB/Cassandra/Elasticsearch/Neo4j, CNN facial recognition.",
      ],
    },
    {
      org: "Albari Solutions",
      logo: "assets/logos/albari.png",
      title: "Data Extractor & Software Developer",
      period: "Dec 2017 – Feb 2019",
      location: "Pakistan",
      bullets: [
        "Scraping/ETL (Scrapy, Selenium, Tika), Hadoop, chatbot.",
      ],
    },
  ],

  certifications: [
    {
      name: "Microsoft Certified: Azure Solutions Architect Expert",
      issuer: "Microsoft",
      issued: "Feb 2026",
      expires: "Feb 2027",
      id: "10CA870D58D58C41",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/msohaibali/10CA870D58D58C41?sharingId",
    },
    {
      name: "Microsoft Certified: Azure Administrator Associate",
      issuer: "Microsoft",
      issued: "Feb 2026",
      expires: "Feb 2027",
      id: "2EFEDF3006A9021E",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/msohaibali/2EFEDF3006A9021E?sharingId",
    },
    {
      name: "Model Context Protocol (MCP): Hands-On with Agentic AI",
      issuer: "LinkedIn",
      issued: "Nov 2025",
      url: "https://www.linkedin.com/learning/certificates/cdc724999d9e2140c84011f0202e0a05b9696bbad0c2d6e76caa6d8d4abb7f4d/",
    },
    {
      name: "Mastering Model Context Protocol (MCP)",
      issuer: "LinkedIn",
      issued: "Nov 2025",
      url: "https://www.linkedin.com/learning/certificates/4a9aba89b2b41510b44a052c208a40786309814bd5e26af707e7bf779c3f6e79/",
    },
    {
      name: "OCI Generative AI Professional",
      issuer: "Oracle",
      issued: "Jul 2024",
      expired: "Jul 2026",
      id: "312793210OCI2024GAIOCP",
      url: "https://brm-certview.oracle.com/ords/certview/ecertificate?ssn=OC5143189&trackId=OCI2024GAIOCP&key=1172247831e7ef124bd6e671b969e2d83fe2f03b",
    },
    {
      name: "Large Language Models: Text Classification for NLP using BERT",
      issuer: "National Association of State Boards of Accountancy (NASBA)",
      issued: "May 2024",
      url: "https://www.linkedin.com/learning/certificates/b65a1db4b025e2f82c919fe4d49c93e2b2732d118a695d7a03874c533469e994/",
    },
    {
      name: "Fundamentals of Qualcomm AI",
      issuer: "Qualcomm",
      issued: "Oct 2023",
      url: "https://qwa.qualcomm.com/course-catalog/Fundamentals-of-Qualcomm-AI",
    },
    {
      name: "Deep Learning: Face Recognition",
      issuer: "LinkedIn",
      issued: "Sep 2022",
      url: "https://www.linkedin.com/learning/certificates/911430e05feaa4739cf12aef6f558eacb10beb6fdc11ba6006279011e54fcba3/",
    },
    {
      name: "Building Deep Learning Applications with Keras 2.0",
      issuer: "LinkedIn",
      issued: "Sep 2022",
      url: "https://www.linkedin.com/learning/certificates/a3fcc4d7edf611594829dec67a336e087c7d0b7425614cd92325a929ac2b2795/",
    },
    {
      name: "Learn to Earn Cloud Challenge: Sports Data Analysis Skills",
      issuer: "Google Digital Academy (Skillshop)",
      issued: "Jul 2022",
      id: "2393792",
      url: "https://www.skills.google/public_profiles/8206714f-06c7-4666-9615-aec8b248ada6/badges/2393792",
    },
  ],

  publication: {
    title:
      "Dynamic and Static Handwriting Assessment in Parkinson's Disease: A Synergistic Approach with C-Bi-GRU and VGG19",
    venue: "JCTA Vol 1 No 2, pp 151–162, Dec 2023",
    doi: "10.33633/jcta.v1i2.9469",
    url: "https://doi.org/10.33633/jcta.v1i2.9469",
    note: "C-Bi-GRU reached 0.75 accuracy vs 0.53–0.57 for baselines on early-stage PD detection.",
  },

  honour: {
    title: "Certificate of Appreciation as IT Expert",
    detail: "President of Kukkiwon (Korea), 2013",
  },

  education: [
    {
      school: "FAST-NUCES",
      degree: "MS Data Science",
      period: "2018–2020",
    },
    {
      school: "International Islamic University Islamabad",
      degree: "BS Computer Software Engineering",
      period: "2013–2017",
    },
  ],

  speaking: [
    "Lead Instructor, Dice Analytics / Dicecamp — DevOps, MLOps, GenAI, Agentic AI (2023–2024) and No-Code Agentic AI bootcamp",
    'Webinar: "The AI Skills Hiring Managers Are Actually Looking For" (Nov 2026)',
    'Webinar: "DevOps in the Era of AI" (Aug 2026)',
    "About 14K LinkedIn followers",
  ],
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONTENT;
} else {
  window.CONTENT = CONTENT;
}
