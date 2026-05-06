export type Language = 'rus' | 'tuv';

export interface NavTranslations {
  about: string;
  rubrics: string;
  projects: string;
  merch: string;
  contacts: string;
}

export interface AboutTranslations {
  title: string;
  body1: string;
  body2: string;
  body3: string;
}

export interface ProjectsTranslations {
  title: string;
  items: string[];
}

export interface RubricsTranslations {
  title: string;
  items: { label: string }[];
}

export interface MerchTranslations {
  title: string;
  items: { label: string }[];
}

export interface ContactsTranslations {
  title: string;
  body1: string;
  email?: string;
  body2: string;
  instagram: string;
  telegram: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: { tagline: string; };
  footer: { title: string; };
  about: AboutTranslations;
  rubrics: RubricsTranslations;
  projects: ProjectsTranslations;
  merch: MerchTranslations;
  contacts: ContactsTranslations;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  rus: {
    nav: {
      about: 'О нас',
      rubrics: 'Рубрики',
      projects: 'Наши проекты',
      merch: 'Мерч',
      contacts: 'Контакты',
    },
    hero: {
      tagline: 'ТУВИНСКОЕ ФЕМ-МЕДИА\nДЛЯ ЧЕСТНЫХ РАЗГОВОРОВ\nО ВАЖНЫХ ВЕЩАХ',
    },
    footer: {
      title: 'Контакты',
    },
    rubrics: {
      title: 'РУБРИКИ',
      items: [
        { label: 'HER STORY' },
        { label: 'ИНТЕРВЬЮ' },
        { label: 'ИССЛЕДОВАНИЯ' },
        { label: 'ТЕЛО И ТЕЛЕСНОСТЬ' },
        { label: 'КУЛЬТУРА И ИСТОРИЯ' },
        { label: 'ВИДЕО' },
      ],
    },
    projects: {
      title: 'НАШИ ПРОЕКТЫ',
      items: [
        'ВЫСТАВКА\n«ЖЕНЩИНА ЖЕНЩИНЕ — ДОМ»',
        'ФОТОГРАФИИ ИЗ ПРОЕКТА\n«ТЕЛО И ТЕЛЕСНОСТЬ»',
        'ПСИХОЛОГИЧЕСКАЯ\nГРУППА ПОДДЕРЖКИ',
        'ВИДЕОПРОЕКТ\n«О ЧЁМ МЕЧТАЮТ ТУВИНКИ?»',
      ],
    },
    merch: {
      title: 'МЕРЧ',
      items: [
        { label: 'КОМИКСЫ' },
        { label: 'СТИКЕРЫ' },
        { label: 'ФЕМ-КАЛЕНДАРЬ' },
        { label: 'КАЛЕНДАРЬ\nШАГАА-2026' },
      ],
    },
    contacts: {
      title: 'КОНТАКТЫ:',
      body1: `Если вы хотите поделиться с нами историей, материалами или предложить идею для текста, вы можете написать нам на почту\u00a0–\u00a0 <b><a href="mailto:chavaga.media@gmail.com">chavaga.media@gmail.com</a></b>`,
      body2: 'Подпишитесь на наши социальные сети:',
      instagram: '@chavaga.media',
      telegram: '@chavaga_media',
    },
    about: {
      title: 'О НАС',
      body1: 'Чавага медиа – это сообщество тувин:ок, которым важно говорить о правах и свободах женщин и других уязвимых групп Тувы. Идея создать фем-сообщество для тувинок существовала давно, но именно 8 марта 2024 года мы запустили медиаплатформу Чавага Медиа.',
      body2: 'Чавага Медиа – билингвальное тувинское фем-медиа, которое говорит о жизни женщин и уязвимых групп через локальный опыт, культуру и язык. Мы делаем тексты, визуальные и образовательные проекты, которые помогают лучше понимать себя и свои права.',
      body3: 'Мы верим, что женщины и другие уязвимые группы Тувы, опираясь на локальный контекст, могут свободно выбирать свои роли в жизни и быть участни:цами общественных процессов и принятия решений.',
    },
  },
  tuv: {
    nav: {
      about: 'Бистиң дугайында',
      rubrics: 'Рубрикалар',
      projects: 'Төлевилелдеривис',
      merch: 'Мерч',
      contacts: 'Харылзаа',
    },
    hero: {
      tagline: 'Чугула чүүлдер дугайында чугаалажыыр тыва кыстарга фем-медиа',
    },
    footer: {
      title: 'Харылзаа',
    },
    rubrics: {
      title: 'РУБРИКАЛАР',
      items: [
        { label: 'HER STORY' },
        { label: 'ИНТЕРВЬЮ' },
        { label: 'ШИНЧИЛЕЛДЕР' },
        { label: 'МАГА-БОТ' },
        { label: 'КУЛЬТУРА БОЛГАШ ТӨӨГҮ' },
        { label: 'ВИДЕО' },
      ],
    },
    projects: {
      title: 'Төлевилелдеривис',
      items: [
        '"КЫС КИЖИ – КЫС КИЖИГЕ БАЖЫҢ" ДЕЛГЕЛГЕ',
        '"МАГА-БОТ" ДЕП ФОТОТӨЛЕВИЛ',
        'ПСИХОЛОГТУГ ДУЗА КАДАР БӨЛУК',
        '"ТЫВА КЫСТАР ЧҮНҮ КҮЗЕП ТУРАРЫЛ?" ВИДЕОТӨЛЕВИЛ',
      ],
    },
    merch: {
      title: 'МЕРЧ',
      items: [
        { label: 'КОМИКСТЕР' },
        { label: 'СТИКЕРЛЕР' },
        { label: 'ФЕМ-КАЛЕНДАРЬ' },
        { label: 'ШАГАА-2026\nКАЛЕНДАРЬ' },
      ],
    },
    contacts: {
      title: 'ХАРЫЛЗАА:',
      body1: `Биске бодуңарның төөгүңер, материалдар азы өске бодал-саналыңар-биле үлежиксеп турар болзуңарза, бистиң почтавысче <b><a href="mailto:chavaga.media@gmail.com">chavaga.media@gmail.com</a></b> бижип болур силер.`,
      body2: 'Бистиң социал четкилерге бижиттинип алыңар:',
      instagram: '@chavaga.media',
      telegram: '@chavaga_media',
    },
    about: {
      title: 'БИСТИҢ ДУГАЙЫНДА',
      body1: 'Чавага Медиа дээрге Тываның кыс чонунуң болгаш өске дарладып турар кижилерниң эргелериниң болгаш хостуг чоруунуң дугайында айтырыгларны көдүрүп турар бөлүк. Кыстарга фем-бөлүк кылыр санал шагда-ла турган, ынчалза-даа март 2024 чылдың март 8-те бис Чавага Медиа деп медианы ажыткан бис.',
      body2: 'Чавага Медиа дээрге ийи дылга бижип турар тыва фем-медиа, ол тыва кыстарның болгаш өске дарладып турар кижилерниң чуртталгазының дугайында дуржулга, культура болгаш дыл таварыштыр чугаалап турар. Бис бодун эки билип алырынга, бодунуң эргелерин билип алырынга бижиктер, визуалдыг болга өөредиглиг төлевилелдер үндүрүп турар бис.',
      body3: 'Бис тыва кыс чон болгаш өске дарладып турар кижилер бодунуң тускай дуржулгазынга даянмышаан боттары оруун шилип, ниитилелге шиитпирлер кылып, база өске чүвелерге бодунуң үнүн илередир ужурлуг деп бодаар бис.',
    },
  },
};
