/* eslint-disable */
/**
 * GENERATED FILE — DO NOT EDIT.
 *
 * Single source of truth: collections/home_remedies.json
 * Regenerate after editing the JSON: `npm run gen:curated-data` (from admin/).
 * curated_data_sync.standalone.ts fails CI if this file drifts from the JSON.
 *
 * Non-herbal home-care / self-care measures from US-government public-domain pages (CDC, NIH/NLM MedlinePlus, FDA); each entry carries its own sourceUrl.
 */
import type { NaturalRemediesFile } from '../../types/conditions.js'

export const HOME_REMEDIES_FILE: NaturalRemediesFile = {
  version: '2026-06-10',
  source: {
    name: 'Recommandations sanitaires du gouvernement américain (CDC, NIH/NHLBI, MedlinePlus/NLM, FDA)',
    url: 'https://www.cdc.gov',
    license: 'Public domain (US government works)',
  },
  remedies: [
    {
      slug: 'honey-for-cough',
      name: 'Miel (contre la toux)',
      commonNames: [],
      conditions: ['cough', 'sore-throat', 'common-cold'],
      uses: "Le miel peut soulager la toux chez l'adulte et l'enfant d'au moins 1 an. Une à deux cuillères à café se prennent telles quelles ou dans une boisson tiède (pas chaude).",
      how: 'Donnez une à deux cuillères à café de miel directement, ou mélangez-le à une boisson tiède (pas chaude). Les CDC (autorité sanitaire américaine) le recommandent comme mesure à domicile contre la toux liée au rhume.',
      evidence:
        "Les CDC citent le miel parmi les mesures à domicile recommandées pour soulager la toux et le mal de gorge liés au rhume ; c'est l'une des stratégies sans médicament mentionnées avec le repos, l'hydratation et l'humidificateur.",
      cautions:
        'Ne donnez jamais de miel à un enfant de moins de 1 an : il peut contenir des spores de Clostridium botulinum responsables du botulisme infantile, une maladie rare mais grave. Cette mise en garde vaut quels que soient le type ou la marque du miel.',
      sourceUrl: 'https://www.cdc.gov/common-cold/treatment/index.html',
    },
    {
      slug: 'fluids-and-rest',
      name: 'Hydratation et repos',
      commonNames: [],
      conditions: ['common-cold', 'fever', 'diarrhea', 'nausea-vomiting'],
      uses: "Bien se reposer et boire suffisamment (eau, bouillons clairs, jus de fruits ou boissons de l'effort) aide à se remettre d'un rhume, de la fièvre, d'une diarrhée ou de nausées. En cas de diarrhée, l'adulte peut boire de l'eau, des jus de fruits, des boissons de l'effort, des sodas sans caféine et des bouillons salés.",
      how: "Reposez-vous beaucoup et buvez beaucoup. Si vous avez du mal à garder les liquides, prenez souvent de petites gorgées d'eau ou sucez des glaçons plutôt que de boire de grandes quantités d'un coup.",
      evidence:
        "Les CDC recommandent le repos et l'hydratation comme mesures de base à domicile contre le rhume. MedlinePlus (NIH/NIDDK) en fait également la base des soins de la diarrhée, et conseille en cas de nausées de boire souvent de petites quantités de liquides clairs pour rester hydraté.",
      cautions:
        "Une personne très malade, présentant des signes de déshydratation (pas d'urine, yeux creusés, soif intense) ou incapable de garder le moindre liquide doit consulter rapidement. La caféine et l'alcool ne permettent pas de se réhydrater.",
      sourceUrl: 'https://www.cdc.gov/common-cold/treatment/index.html',
    },
    {
      slug: 'oral-rehydration',
      name: 'Soluté de réhydratation orale (SRO)',
      commonNames: ['ORS', 'rehydration salts'],
      conditions: ['dehydration', 'diarrhea'],
      uses: "Les solutés de réhydratation orale remplacent l'eau et les sels minéraux perdus lors d'une diarrhée ou d'autres causes de déshydratation. En cas de déshydratation légère à modérée, boire de l'eau est la première étape ; les boissons de l'effort ou les SRO (vendus en pharmacie) sont recommandés quand les sels minéraux sont aussi épuisés, surtout chez l'enfant.",
      how: "Utilisez un soluté de réhydratation orale du commerce (sans ordonnance, en pharmacie) et suivez les indications de l'emballage. Chez l'adulte qui a perdu des sels minéraux, les boissons de l'effort peuvent aider ; si les liquides passent mal, prenez souvent de petites gorgées ou sucez des glaçons plutôt que de boire beaucoup d'un coup.",
      evidence:
        "MedlinePlus (NIH/NIDDK) indique que le traitement de la déshydratation consiste à remplacer l'eau et les sels minéraux perdus, et que des solutés de réhydratation pour enfants sont disponibles sans ordonnance. La même source recommande les boissons de l'effort chez l'adulte qui a perdu des sels minéraux en même temps que de l'eau.",
      cautions:
        "Consultez immédiatement en cas de signes de déshydratation sévère : pas d'urine depuis 8 heures ou plus, cœur rapide, confusion ou impossibilité de garder les liquides. Les nourrissons et jeunes enfants ayant la diarrhée doivent recevoir un SRO adapté (pas de l'eau seule) pour remplacer les sels minéraux en toute sécurité.",
      sourceUrl: 'https://medlineplus.gov/dehydration.html',
    },
    {
      slug: 'cool-compress-fever',
      name: "Compresse fraîche (fièvre et piqûres d'insectes)",
      commonNames: [],
      conditions: ['fever', 'insect-bites-stings', 'eye-allergy', 'eye-irritation'],
      uses: "Un linge propre trempé dans de l'eau fraîche (pas glacée) et posé sur le front ou la zone piquée peut atténuer l'inconfort de la fièvre, des piqûres d'insectes et des allergies oculaires. Pour une piqûre d'insecte, appliquez de la glace enveloppée dans un gant de toilette 10 minutes, puis retirez-la 10 minutes, et ainsi de suite.",
      how: "Trempez un linge propre dans de l'eau fraîche, essorez-le et posez-le sur le front ou la zone concernée. Pour une piqûre d'insecte, enveloppez de la glace dans un linge et appliquez-la 10 minutes, puis retirez-la 10 minutes — ne mettez jamais de glace directement sur la peau nue.",
      evidence:
        "MedlinePlus (NIH/NIAID) indique que les compresses fraîches sont recommandées contre la conjonctivite allergique et les brûlures ou irritations des yeux. Pour les piqûres et morsures d'insectes, une compresse fraîche ou glacée est un premier geste de soin classique, décrit dans les ressources MedlinePlus en accord avec celles des NIH.",
      cautions:
        "N'appliquez pas de glace ou de compresse glacée directement sur la peau nue de façon prolongée : enveloppez la glace dans un linge et limitez chaque application à 10–15 minutes pour éviter gelures et lésions. Contre la fièvre, les compresses fraîches complètent (sans le remplacer) un médicament contre la fièvre quand il est indiqué ; consultez si la fièvre est élevée, dure ou s'accompagne de symptômes graves.",
      sourceUrl: 'https://medlineplus.gov/insectbitesandstings.html',
    },
    {
      slug: 'ice-and-elevation',
      name: 'Glace et surélévation (méthode GREC)',
      commonNames: ['RICE', 'Rest-Ice-Compression-Elevation'],
      conditions: ['muscle-joint-pain', 'insect-bites-stings'],
      uses: "Appliquer de la glace enveloppée dans un linge sur un muscle froissé, une entorse ou une piqûre — avec repos, compression et surélévation de la zone blessée — réduit le gonflement et la douleur. La glace s'applique 10–15 minutes toutes les 1 à 3 heures pendant les premiers jours.",
      how: 'Enveloppez de la glace dans un linge ou une serviette et appliquez-la 10–15 minutes à la fois sur la zone blessée. Mettez la zone au repos, maintenez-la avec un bandage bien ajusté pour limiter le gonflement, et surélevez-la au-dessus du niveau du cœur si possible.',
      evidence:
        "MedlinePlus (NIH/NIAMS) décrit cette méthode (en anglais RICE ; en français GREC : glace, repos, élévation, compression) comme le traitement de première intention des entorses et élongations : mettre au repos, appliquer de la glace, comprimer avec un bandage et surélever au-dessus du cœur si possible. L'usage de la glace pendant les 3 premiers jours est explicitement mentionné.",
      cautions:
        "N'appliquez jamais de glace directement sur la peau — enveloppez-la toujours dans un linge ou une serviette. Si le gonflement s'aggrave nettement, si un engourdissement apparaît ou si vous suspectez une fracture, consultez. N'appliquez pas de chaleur pendant les 48 à 72 premières heures d'une blessure aiguë des tissus mous.",
      sourceUrl: 'https://medlineplus.gov/sprainsandstrains.html',
    },
    {
      slug: 'heating-pad',
      name: 'Bouillotte ou compresse chaude',
      commonNames: [],
      conditions: ['menstrual-cramps', 'muscle-joint-pain', 'earache'],
      uses: "Une bouillotte ou un coussin chauffant posé sur le bas du ventre soulage les règles douloureuses. Une compresse chaude sur l'oreille peut soulager un mal d'oreille. La chaleur peut aussi s'appliquer sur un muscle froissé après les 48 à 72 premières heures d'une blessure aiguë.",
      how: "Posez un coussin chauffant ou une bouillotte sur le bas du ventre en cas de règles douloureuses, ou tenez un linge chaud contre l'oreille douloureuse. Utilisez une chaleur faible ou moyenne et placez un tissu entre la source de chaleur et la peau pour éviter les brûlures.",
      evidence:
        "MedlinePlus (NIH/NLM) cite le coussin chauffant ou la bouillotte sur le bas du ventre, ainsi qu'un bain chaud, parmi les soins à domicile des douleurs de règles. Pour le mal d'oreille, un linge chaud sur l'oreille figure parmi les mesures de confort des ressources NIH/NLM sur l'otite aiguë.",
      cautions:
        "Ne vous endormez jamais avec un coussin chauffant allumé : risque de brûlures. Utilisez une chaleur faible ou moyenne et placez un tissu entre la source de chaleur et la peau. Pour un mal d'oreille, n'introduisez rien dans le conduit auditif ; si la douleur est forte, ou accompagnée d'écoulement, de baisse d'audition ou de fièvre, consultez pour écarter une infection nécessitant des antibiotiques.",
      sourceUrl: 'https://medlineplus.gov/periodpain.html',
    },
    {
      slug: 'humidifier-and-steam',
      name: 'Humidificateur ou inhalation de vapeur',
      commonNames: ['cool-mist vaporizer', 'steam inhalation'],
      conditions: ['nasal-congestion', 'cough', 'common-cold'],
      uses: "Un humidificateur propre ou un vaporisateur à brume froide humidifie l'air et peut soulager le nez bouché et la toux. Respirer la vapeur d'un bol d'eau chaude ou d'une douche chaude 2 à 4 fois par jour aide aussi à fluidifier les sécrétions nasales.",
      how: "Remplissez d'eau un humidificateur ou un vaporisateur à brume froide propre et faites-le fonctionner dans la pièce. Nettoyez l'appareil chaque jour selon les instructions du fabricant pour éviter moisissures et bactéries.",
      evidence:
        "Les CDC recommandent un humidificateur ou un vaporisateur à brume froide propre comme mesure à domicile contre les symptômes du rhume, dont le nez bouché et la toux. MedlinePlus indique également qu'un humidificateur aide à fluidifier le mucus et que la vapeur d'une douche est un moyen reconnu de dégager le nez.",
      cautions:
        "Nettoyez l'humidificateur chaque jour selon les instructions du fabricant pour éviter moisissures et bactéries. Préférez les humidificateurs à brume froide aux modèles à vapeur chaude pour les enfants, à cause du risque de brûlure. En inhalant la vapeur d'eau chaude, attention aux brûlures : gardez une distance de sécurité et ne vous couvrez pas la tête au-dessus d'une casserole d'eau bouillante.",
      sourceUrl: 'https://www.cdc.gov/common-cold/treatment/index.html',
    },
    {
      slug: 'saline-nasal-rinse',
      name: 'Lavage de nez au sérum salé',
      commonNames: ['neti pot', 'nasal irrigation', 'saline nasal wash'],
      conditions: ['nasal-congestion', 'common-cold'],
      uses: 'Le lavage de nez au sérum salé évacue pollen, poussières et excès de mucus des fosses nasales et les humidifie. Il se fait avec un pot à lavage nasal (neti pot), un flacon souple ou une poire, avec une solution salée préparée.',
      how: "Utilisez uniquement de l'eau distillée, stérile ou bouillie puis refroidie — jamais l'eau du robinet. Après chaque usage, rincez l'appareil avec cette même eau sûre, puis laissez-le sécher à l'air ou essuyez-le avant de le ranger.",
      evidence:
        "Les CDC recommandent le spray ou les gouttes de sérum salé comme mesure à domicile contre le rhume. La FDA (agence américaine du médicament) confirme que les dispositifs de lavage nasal sont « en général sûrs et efficaces lorsqu'ils sont utilisés et nettoyés correctement », la condition essentielle étant le type d'eau utilisé.",
      cautions:
        "Utilisez uniquement de l'eau distillée, stérile ou bouillie (et refroidie) — jamais l'eau du robinet. La FDA avertit que l'eau du robinet peut contenir des organismes, dont des amibes, sans danger à boire mais pouvant provoquer des infections graves, voire mortelles, dans les fosses nasales. L'eau bouillie doit être refroidie jusqu'à tiède et conservée dans un récipient propre et fermé 24 heures au maximum. Nettoyez et séchez toujours l'appareil après usage.",
      sourceUrl:
        'https://www.fda.gov/consumers/consumer-updates/rinsing-your-sinuses-neti-pots-safe',
    },
    {
      slug: 'oatmeal-bath',
      name: "Bain à l'avoine ou bain frais",
      commonNames: ['colloidal oatmeal bath'],
      conditions: ['skin-rash-itch', 'poison-ivy', 'dry-skin'],
      uses: "Un bain tiède à l'avoine ou un bain frais peut soulager les démangeaisons et irritations dues aux éruptions, aux plantes irritantes, à l'eczéma et à la peau sèche. Des produits pour le bain à base d'avoine colloïdale sont vendus en pharmacie.",
      how: "Remplissez la baignoire d'eau tiède (pas chaude) et ajoutez un produit à l'avoine colloïdale selon la notice, ou utilisez simplement de l'eau fraîche. Après le bain, séchez la peau en tamponnant doucement et appliquez aussitôt une crème hydratante sans parfum pour garder l'hydratation.",
      evidence:
        "MedlinePlus (NLM) recommande les « bains tièdes ou à l'avoine » comme mesure contre les démangeaisons, avec les compresses fraîches et une lotion hydratante. Les produits de bain à l'avoine sont spécifiquement cités pour soulager l'eczéma et le psoriasis ; des bains courts et plus frais sont jugés meilleurs que des bains longs et chauds pour la peau.",
      cautions:
        "Utilisez de l'eau tiède — pas chaude : l'eau chaude peut aggraver la sécheresse et l'irritation de la peau. Après le bain, séchez en tamponnant doucement (sans frotter) et appliquez aussitôt une crème hydratante sans parfum. Si une éruption s'étend rapidement, s'accompagne de fièvre ou touche le visage ou les parties génitales, consultez.",
      sourceUrl: 'https://medlineplus.gov/itching.html',
    },
    {
      slug: 'cool-running-water-on-burns',
      name: 'Eau fraîche courante sur les brûlures',
      commonNames: [],
      conditions: ['burns'],
      uses: "En cas de brûlure légère, faites couler immédiatement de l'eau fraîche (pas froide) doucement sur la zone brûlée pendant 10 à 15 minutes pour stopper la brûlure et réduire la douleur. Après refroidissement, couvrez la brûlure d'un linge propre et sec ou d'un pansement stérile.",
      how: "Faites couler doucement de l'eau fraîche sur la zone brûlée pendant plusieurs minutes, puis couvrez d'un linge propre et sec ou d'un pansement. N'appliquez ni glace, ni beurre, ni crème : cela peut aggraver les lésions.",
      evidence:
        "Les fiches de premiers secours des CDC indiquent : faire couler doucement de l'eau fraîche sur la brûlure pendant plusieurs minutes, puis couvrir d'un linge ou d'un pansement propre et sec. MedlinePlus (NIH/NIGMS) précise de même 10 à 15 minutes d'eau fraîche courante suivies d'un pansement stérile sec comme premier geste adapté aux brûlures légères.",
      cautions:
        "N'appliquez ni glace, ni eau glacée, ni beurre, ni crème ou spray de premiers secours, ni remède maison : cela peut aggraver les lésions ou provoquer une infection. Ne percez pas les cloques, sauf avis d'un professionnel de santé. N'essayez pas de retirer les vêtements ou débris collés à la brûlure. Appelez le 15 ou le 112 pour une brûlure étendue, une brûlure du visage, des yeux, des mains ou des pieds, une brûlure chimique ou électrique, ou toute brûlure très douloureuse, insensible ou profonde.",
      sourceUrl: 'https://medlineplus.gov/burns.html',
    },
    {
      slug: 'clean-and-cover-wounds',
      name: 'Nettoyer et couvrir plaies et coupures',
      commonNames: [],
      conditions: ['wounds-cuts'],
      uses: "Pour une petite coupure ou écorchure, rincez abondamment la plaie à l'eau fraîche et propre pour enlever les saletés, appuyez doucement avec une compresse pour arrêter le saignement, puis couvrez d'un pansement propre. Lavez à l'eau et au savon pour réduire le risque d'infection.",
      how: "Appuyez fermement mais doucement avec une compresse pour arrêter le saignement ; si le sang traverse, ajoutez une compresse par-dessus sans retirer la première. Rincez la plaie à l'eau fraîche et propre, puis couvrez-la d'un pansement propre et sec.",
      evidence:
        "Les recommandations des CDC sur les soins des plaies indiquent : appuyer sur une coupure qui saigne jusqu'à l'arrêt du saignement, verser doucement de l'eau propre sur la plaie pour la nettoyer, puis appliquer un pansement propre et sec. MedlinePlus (NLM) conseille de même de rincer les coupures à l'eau fraîche et d'appuyer fermement mais doucement pour arrêter le saignement.",
      cautions:
        "Surveillez les signes d'infection dans les jours suivants : rougeur croissante, gonflement, chaleur, pus ou traînées rouges partant de la plaie nécessitent une consultation rapide. Consultez immédiatement pour une plaie profonde ou béante, une morsure d'animal ou humaine, ou une piqûre par un objet potentiellement souillé (risque de tétanos : vérifiez que votre vaccination est à jour).",
      sourceUrl: 'https://medlineplus.gov/firstaid.html',
    },
    {
      slug: 'salt-water-gargle',
      name: "Gargarisme à l'eau salée",
      commonNames: [],
      conditions: ['sore-throat', 'common-cold', 'canker-sores'],
      uses: "Se gargariser plusieurs fois par jour à l'eau salée tiède peut atténuer le mal de gorge et soulager aussi les aphtes. La préparation habituelle : ½ cuillère à café (3 grammes) de sel dissoute dans un verre (240 mL) d'eau tiède.",
      how: "Dissolvez le sel dans un verre d'eau tiède, prenez une gorgée, penchez la tête en arrière et gargarisez-vous quelques secondes avant de recracher. Recommencez au besoin dans la journée pour soulager le mal de gorge.",
      evidence:
        "MedlinePlus (NLM) indique que les gargarismes peuvent atténuer le mal de gorge, au même titre que les pastilles et l'hydratation. La même source note que les bains de bouche à l'eau salée peuvent soulager les aphtes, en évitant les bains de bouche contenant de l'alcool, qui irritent les tissus.",
      cautions:
        "Le gargarisme à l'eau salée soulage les symptômes mais ne traite pas la cause du mal de gorge. Un mal de gorge avec forte fièvre, difficulté à avaler ou à respirer, hypersalivation, raideur de la nuque, ou qui dure plus d'une semaine doit être vu par un professionnel de santé : une angine à streptocoque et d'autres affections nécessitent un autre traitement.",
      sourceUrl: 'https://medlineplus.gov/sorethroat.html',
    },
    {
      slug: 'fiber-and-water-constipation',
      name: 'Fibres et eau (constipation et hémorroïdes)',
      commonNames: [],
      conditions: ['constipation', 'hemorrhoids'],
      uses: "Manger davantage de fruits, de légumes et de céréales complètes (riches en fibres) et boire beaucoup d'eau chaque jour sont les gestes de base pour prévenir et soulager la constipation et réduire l'inconfort des hémorroïdes.",
      how: 'Mangez chaque jour davantage de fruits, de légumes et de céréales complètes, et buvez beaucoup. Augmentez les fibres progressivement pour éviter gaz et ballonnements.',
      evidence:
        "MedlinePlus (NIH/NIDDK) cite l'augmentation des fibres alimentaires et une hydratation suffisante comme mesures principales contre la constipation comme contre les hémorroïdes. La page sur les hémorroïdes recommande précisément de manger des aliments riches en fibres et de boire suffisamment chaque jour comme traitement à domicile de première intention.",
      cautions:
        "Augmentez les fibres progressivement pour éviter gaz et ballonnements. Si la constipation est récente, sévère, s'accompagne de sang dans les selles ou d'une perte de poids importante, consultez pour écarter une cause sous-jacente. Des symptômes d'hémorroïdes persistant au-delà d'une semaine de soins à domicile, ou tout saignement rectal, justifient une consultation.",
      sourceUrl: 'https://medlineplus.gov/constipation.html',
    },
    {
      slug: 'sitz-bath',
      name: 'Bain de siège (hémorroïdes)',
      commonNames: [],
      conditions: ['hemorrhoids'],
      uses: "Un bain de siège — s'asseoir dans quelques centimètres d'eau chaude 10 à 15 minutes, plusieurs fois par jour — soulage la douleur et les démangeaisons des hémorroïdes. Des bassines de bain de siège qui s'adaptent sur la cuvette des toilettes sont vendues en pharmacie.",
      how: "Remplissez une baignoire ou une bassine de bain de siège de quelques centimètres d'eau agréablement chaude et asseyez-vous dedans 10 à 15 minutes. Recommencez plusieurs fois par jour, en gardant la zone propre et sèche entre les bains.",
      evidence:
        "MedlinePlus (NLM) recommande des bains chauds plusieurs fois par jour, dont les bains de siège, comme soin à domicile pour soulager la douleur des hémorroïdes, à raison de 10 à 15 minutes dans l'eau chaude à chaque fois.",
      cautions:
        "L'eau doit être agréablement chaude — pas brûlante — pour éviter les brûlures. Gardez la zone propre et sèche entre les bains. Si les symptômes ne s'améliorent pas après une semaine de soins à domicile, ou en cas de saignement rectal, consultez.",
      sourceUrl: 'https://medlineplus.gov/hemorrhoids.html',
    },
    {
      slug: 'elevate-head-heartburn',
      name: "Surélever la tête du lit (brûlures d'estomac)",
      commonNames: [],
      conditions: ['heartburn', 'indigestion'],
      uses: "Surélever la tête du lit de 10 à 15 cm (cales sous le cadre du lit ou coussin plan incliné) empêche l'acide de l'estomac de remonter dans l'œsophage pendant le sommeil, ce qui réduit les brûlures d'estomac nocturnes et les symptômes de reflux (RGO).",
      how: "Placez des cales sous les pieds du lit côté tête, ou un coussin en mousse incliné sous le matelas, pour surélever le couchage d'environ 15 cm. Des oreillers supplémentaires sous la tête seule sont moins efficaces, car ils plient le corps à la taille au lieu d'incliner tout le buste.",
      evidence:
        "Les ressources de MedlinePlus sur les brûlures d'estomac (issues des NIH/NIDDK) recommandent de surélever la tête pendant le sommeil comme mesure d'hygiène de vie contre les brûlures d'estomac et le reflux, cette position aidant à prévenir les remontées acides. Dormir la tête surélevée d'environ 15 cm est une recommandation précise de l'encyclopédie médicale.",
      cautions:
        "Des oreillers supplémentaires sous la tête sont moins efficaces que surélever tout le haut du corps : ils peuvent provoquer des douleurs de nuque et ne changent pas assez l'angle. Des brûlures d'estomac fréquentes, sévères, ou accompagnées de difficultés à avaler, d'une perte de poids inexpliquée ou de vomissements de sang nécessitent une consultation.",
      sourceUrl: 'https://medlineplus.gov/heartburn.html',
    },
    {
      slug: 'bland-small-meals',
      name: 'Petits repas fréquents et légers',
      commonNames: ['BRAT diet', 'bland diet'],
      conditions: ['nausea-vomiting', 'indigestion', 'diarrhea'],
      uses: "Prendre 6 à 8 petits repas légers dans la journée (biscottes, pain grillé, poulet au four, riz, pommes de terre) au lieu de 3 gros repas réduit les nausées et facilite la digestion. Quand une diarrhée s'améliore, des aliments mous et légers peuvent être réintroduits progressivement.",
      how: "Mangez plus souvent en petites quantités et privilégiez des aliments légers, en évitant les plats épicés, gras ou salés. Si vous avez du mal à garder les aliments, commencez par de petites gorgées fréquentes de liquides clairs et n'ajoutez des aliments solides légers que lorsqu'ils sont bien tolérés.",
      evidence:
        "MedlinePlus (NLM) recommande des petits repas légers et fréquents et d'éviter les aliments épicés, gras ou salés comme principale mesure alimentaire contre les nausées et vomissements. Pour l'indigestion, MedlinePlus indique qu'éviter les aliments et situations déclencheurs est la principale stratégie à domicile. En cas de diarrhée, des « aliments mous et légers » sont recommandés à mesure que les symptômes s'améliorent.",
      cautions:
        "Le régime « BRAT » (banane, riz, compote de pommes, pain grillé) a longtemps été recommandé, mais MedlinePlus indique qu'il n'est pas prouvé qu'il soit meilleur qu'une alimentation légère classique ; il n'est probablement pas nocif. Si les nausées ou vomissements durent plus de 24 à 48 heures, s'accompagnent de fortes douleurs ou empêchent de boire suffisamment, consultez.",
      sourceUrl: 'https://medlineplus.gov/nauseaandvomiting.html',
    },
    {
      slug: 'dark-quiet-room-headache',
      name: 'Repos dans une pièce sombre et calme (mal de tête)',
      commonNames: [],
      conditions: ['headache', 'sleeplessness'],
      uses: "Se reposer les yeux fermés dans une pièce sombre et calme est une mesure sans médicament recommandée pendant un mal de tête ou une migraine. On y associe souvent le fait de boire de l'eau pour éviter la déshydratation et de poser un linge frais sur le front.",
      how: "Allez dans une pièce calme et obscure, fermez les yeux et reposez-vous. Buvez de l'eau et posez un linge humide et frais sur votre front pour atténuer la gêne.",
      evidence:
        "MedlinePlus (NLM) décrit le repos dans une pièce calme et obscure comme l'un des principaux gestes pour aller mieux pendant un mal de tête ou une migraine, avec le fait de boire de l'eau et les techniques de relaxation. Ces recommandations s'appuient sur les sources des NIH sur la prise en charge des maux de tête et des migraines.",
      cautions:
        'Un mal de tête soudain et très violent (« en coup de tonnerre »), ou un mal de tête avec fièvre, raideur de la nuque, confusion ou troubles de la vue, peut signaler une affection grave : appelez le 15 ou le 112. Des maux de tête fréquents qui perturbent la vie quotidienne doivent être évoqués avec un professionnel de santé plutôt que gérés uniquement à domicile.',
      sourceUrl: 'https://medlineplus.gov/headache.html',
    },
    {
      slug: 'sleep-hygiene',
      name: 'Bonnes habitudes de sommeil',
      commonNames: ['good sleep habits'],
      conditions: ['sleeplessness'],
      uses: "Un ensemble d'habitudes régulières — heures de coucher et de lever fixes, chambre fraîche et sombre, pas d'écrans ni de caféine avant le coucher, activité physique régulière — aide l'adulte à dormir suffisamment et durablement.",
      how: "Couchez-vous et levez-vous à la même heure chaque jour. Gardez la chambre calme, sombre et fraîche ; éteignez les écrans au moins 30 minutes avant le coucher ; évitez la caféine l'après-midi et le soir, ainsi que les repas copieux ou l'alcool avant de dormir.",
      evidence:
        "Les CDC et le NHLBI recommandent ces habitudes précises pour bien dormir : se coucher et se lever à heures fixes, garder la chambre calme, fraîche et sombre, éteindre les écrans au moins 30 minutes avant le coucher, éviter la caféine l'après-midi et le soir, et éviter repas copieux ou alcool avant de dormir. Le NHLBI souligne leur importance pour les travailleurs en horaires décalés et les personnes insomniaques.",
      cautions:
        'De bonnes habitudes de sommeil peuvent soulager une insomnie passagère ; une insomnie qui dure plus de quelques semaines doit être évaluée par un professionnel de santé. Des troubles du sommeil avec ronflements, pauses respiratoires ou somnolence excessive dans la journée peuvent signaler une apnée du sommeil, qui nécessite un diagnostic médical.',
      sourceUrl: 'https://www.cdc.gov/sleep/about/index.html',
    },
    {
      slug: 'pinworm-hygiene',
      name: "Mesures d'hygiène contre les oxyures",
      commonNames: [],
      conditions: ['pinworm'],
      uses: "Se laver soigneusement les mains à l'eau tiède et au savon (surtout après être allé aux toilettes et avant de manger), se laver chaque matin au savon, changer de sous-vêtements chaque jour, garder les ongles courts et propres, et laver literie et pyjamas à l'eau chaude sont les principales mesures à la maison contre les oxyures.",
      how: 'Lavez-vous chaque matin au réveil et lavez-vous régulièrement les mains, surtout après être allé aux toilettes. Changez de sous-vêtements chaque jour, lavez souvent pyjamas et draps, et évitez de vous ronger les ongles pour ne pas vous réinfecter.',
      evidence:
        "Les CDC présentent le lavage des mains comme « le moyen le plus important d'éviter la propagation des oxyures ». MedlinePlus (NIH/NIAID) cite comme mesures d'hygiène essentielles : se laver au réveil, laver souvent pyjamas et draps, se laver régulièrement les mains, changer de sous-vêtements chaque jour, et éviter de se ronger les ongles et de se gratter la zone anale.",
      cautions:
        "L'hygiène seule ne suffit généralement pas à éliminer une infection active : un antiparasitaire sans ordonnance (pamoate de pyrantel) est en général nécessaire, et tous les membres du foyer doivent être traités en même temps. Le traitement est habituellement renouvelé au bout de 2 semaines, car il tue les vers mais pas les œufs ; la seconde dose traite les vers éclos après la première.",
      sourceUrl: 'https://medlineplus.gov/pinworms.html',
    },
    {
      slug: 'keep-feet-dry-athlete-foot',
      name: 'Garder les pieds propres et secs (mycose)',
      commonNames: ["athlete's foot self-care"],
      conditions: ['fungal-infection'],
      uses: "Garder les pieds propres, secs et au frais — se les laver chaque jour à l'eau et au savon, bien sécher entre les orteils, porter des chaussettes propres en coton et ne pas marcher pieds nus dans les douches et vestiaires collectifs — aide au traitement et évite la propagation du pied d'athlète et des autres teignes.",
      how: "Gardez les pieds propres, secs et au frais ; portez des chaussettes propres et évitez de marcher pieds nus dans les lieux publics comme les douches de vestiaires (portez des tongs). Appliquez une crème antifongique sans ordonnance selon la notice, ce qui suffit dans la plupart des cas de pied d'athlète.",
      evidence:
        "MedlinePlus (d'après les CDC) conseille : garder les pieds propres, secs et au frais ; porter des chaussettes propres ; éviter de marcher pieds nus dans les lieux publics ; porter des tongs dans les douches de vestiaires ; garder les ongles des pieds propres et coupés court. Les crèmes antifongiques sans ordonnance suffisent dans la plupart des cas de pied d'athlète.",
      cautions:
        "Si le traitement antifongique sans ordonnance n'améliore pas l'infection en 2 à 4 semaines, consultez. Une rougeur, une chaleur ou un gonflement qui s'étend ou s'aggrave — surtout chez une personne diabétique ou ayant des problèmes de circulation — justifie une consultation rapide. Les mycoses des ongles sont plus difficiles à traiter que celles de la peau et nécessitent souvent un traitement sur ordonnance.",
      sourceUrl: 'https://medlineplus.gov/athletesfoot.html',
    },
  ],
}
