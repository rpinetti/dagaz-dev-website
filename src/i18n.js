import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      "nav": {
        "home": "Início",
        "mentor": "O Mentor",
        "blog": "A Forja (Blog)",
        "contact": "Contato"
      },
      "hero": {
        "title1": "Desperte o",
        "title2": "Poder",
        "title3": "do seu Código",
        "subtitle": "Consultoria SAP de alta performance e mentoria para desenvolvedores que buscam a excelência da forja.",
        "btn_ebook": "Baixar E-book (As 9 Runas)",
        "btn_consulting": "Conhecer Consultoria"
      },
      "philosophy": {
        "title": "A Filosofia Inabalável",
        "subtitle": "",
        "pillar1_title": "Estratégia de um Jarl",
        "pillar1_desc": "Visão arquitetural e liderança técnica para blindar seus projetos corporativos contra falhas e gargalos.",
        "pillar2_title": "Precisão de um Ferreiro",
        "pillar2_desc": "Maestria técnica e atenção aos detalhes. ABAP, Fiori e integrações com o máximo de performance.",
        "pillar3_title": "Resiliência de um Berserker",
        "pillar3_desc": "Força inabalável para superar incidentes críticos de produção e pressão de prazos.",
        "pillar4_title": "Coragem de um Explorador",
        "pillar4_desc": "Busca contínua por inovação. Desbravando as novidades do SAP S/4HANA e novas arquiteturas."
      },
      "clients": {
        "title": "Marcas Forjadas pela Dagaz",
        "sectors": ["Agronegócio", "Varejo", "Finanças", "Manufatura", "Energia", "Tecnologia", "Logística"]
      },
      "testimonials": {
        "title": "O Que a Trincheira Diz",
        "t1_text": "A consultoria da Dagaz estabilizou nosso S/4HANA em tempo recorde. Código impecável.",
        "t1_author": "Diretor de TI - Varejo",
        "t2_text": "Finalmente uma mentoria que fala a língua de quem está na linha de frente do desenvolvimento corporativo.",
        "t2_author": "Desenvolvedor Sênior ABAP",
        "t3_text": "Reduzimos as falhas de integração em 80% após adotarmos os padrões de arquitetura recomendados.",
        "t3_author": "Tech Lead - Finanças",
        "t4_text": "A visão estratégica combinada com a capacidade técnica de resolver o problema na raiz é o diferencial da Dagaz.",
        "t4_author": "CIO - Logística",
        "t5_text": "O treinamento 'As 9 Runas' mudou a postura de toda a minha equipe de Fiori.",
        "t5_author": "Gerente de Sistemas"
      },
      "blog": {
        "latest_title": "Últimas da Forja",
        "search_placeholder": "Buscar pelo conhecimento ancestral...",
        "categories": {
          "all": "Todas",
          "sap": "SAP S/4HANA",
          "abap": "ABAP & Fiori",
          "career": "Carreira Dev",
          "leadership": "Liderança"
        },
        "read_more": "LER ARTIGO",
        "reading_time": "min de leitura"
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "mentor": "The Mentor",
        "blog": "The Forge (Blog)",
        "contact": "Contact"
      },
      "hero": {
        "title1": "Awaken the",
        "title2": "Power",
        "title3": "of your Code",
        "subtitle": "High-performance SAP consulting and mentorship for developers seeking excellence in the forge.",
        "btn_ebook": "Download E-book (The 9 Runes)",
        "btn_consulting": "Discover Consulting"
      },
      "philosophy": {
        "title": "The Unshakable Philosophy",
        "subtitle": "",
        "pillar1_title": "Strategy of a Jarl",
        "pillar1_desc": "Architectural vision and technical leadership to bulletproof your corporate projects against failures and bottlenecks.",
        "pillar2_title": "Precision of a Blacksmith",
        "pillar2_desc": "Technical mastery and attention to detail. ABAP, Fiori, and integrations with maximum performance.",
        "pillar3_title": "Resilience of a Berserker",
        "pillar3_desc": "Unwavering strength to overcome critical production incidents and tight deadlines.",
        "pillar4_title": "Courage of an Explorer",
        "pillar4_desc": "Continuous pursuit of innovation. Pioneering new SAP S/4HANA features and architectures."
      },
      "clients": {
        "title": "Brands Forged by Dagaz",
        "sectors": ["Agribusiness", "Retail", "Finance", "Manufacturing", "Energy", "Technology", "Logistics"]
      },
      "testimonials": {
        "title": "What the Trench Says",
        "t1_text": "Dagaz consulting stabilized our S/4HANA in record time. Impeccable code.",
        "t1_author": "IT Director - Retail",
        "t2_text": "Finally, mentorship that speaks the language of those on the front lines of corporate development.",
        "t2_author": "Senior ABAP Developer",
        "t3_text": "We reduced integration failures by 80% after adopting the recommended architectural standards.",
        "t3_author": "Tech Lead - Finance",
        "t4_text": "The strategic vision combined with the technical ability to solve problems at the root is the Dagaz differential.",
        "t4_author": "CIO - Logistics",
        "t5_text": "The '9 Runes' training changed the posture of my entire Fiori team.",
        "t5_author": "Systems Manager"
      },
      "blog": {
        "latest_title": "Latest from the Forge",
        "search_placeholder": "Search for ancestral knowledge...",
        "categories": {
          "all": "All",
          "sap": "SAP S/4HANA",
          "abap": "ABAP & Fiori",
          "career": "Dev Career",
          "leadership": "Leadership"
        },
        "read_more": "READ ARTICLE",
        "reading_time": "min read"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt", // Idioma padrão
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
