/* Marathasa Valley & Kykkos Day Trip — guide content.
 *
 * COORDINATE POLICY
 *   coords            : verified from published sources (see SOURCES).
 *   coordsApprox:true : map position is indicative only. Navigation for these
 *                       uses a Google Maps *place search* on the exact official
 *                       name, never the approximate pair. Badged "approx" in UI.
 *   navQuery          : exact place name used for search-based navigation.
 */

const GUIDE = {
  meta: {
    title: 'Marathasa Valley & Kykkos Day Trip',
    subtitle: 'Polis → Moutoullas → Kalopanayiotis → Kykkos → Throni → Paphos Forest',
    intro:
      'The day starts on the coast and climbs east into Marathasa, the deep valley on the ' +
      'north-west flank of Troodos where stone villages sit in terraced orchards above the ' +
      'Setrachos river. You begin with two of the finest painted churches in Cyprus — one of ' +
      'them precisely dated to 1280 — then walk the river gorge at Kalopanayiotis past a ' +
      'medieval bridge, sulphur springs and an abandoned watermill. In the afternoon the road ' +
      'climbs into high pine forest to Kykkos, the richest and most powerful monastery on the ' +
      'island, and finishes on the summit of Throni at the tomb of Archbishop Makarios III, ' +
      'with the whole of the Paphos Forest falling away to the west. The return runs back ' +
      'through that forest to the coast.',
    stats: [
      { icon: 'clock', label: 'Full day', value: '~10 hours door to door' },
      { icon: 'car', label: 'Driving', value: '~130–150 km, 3½–4 h' },
      { icon: 'walk', label: 'Walking', value: '3–5 km across the day' },
      { icon: 'peak', label: 'Highest point', value: '~1,300 m at Kykkos / Throni' },
      { icon: 'church', label: 'UNESCO churches', value: '2 of the 10 Painted Churches' },
      { icon: 'food', label: 'Lunch', value: 'Kalopanayiotis, ~13:10' }
    ],
    highlights: [
      'Traditional Marathasa mountain villages',
      '2 UNESCO Painted Churches of the Troodos Region',
      'Setrachos river walk',
      '16th-century stone bridge',
      'Sulphur springs',
      'Kykkos Monastery',
      'Tomb of Archbishop Makarios III',
      'High Troodos scenery',
      'Paphos Forest return'
    ],
    startCoords: [35.03333, 32.43333],
    departure: '10:15'
  },

  /* ---------------------------------------------------------------- STOPS */
  stops: [
    /* ============================================================ DRIVE 1 */
    {
      id: 'drive-polis-moutoullas',
      kind: 'drive',
      num: null,
      name: 'Polis → Moutoullas',
      arrive: '10:15',
      duration: '~1 h 50 m',
      summary:
        'Inland from Goudi, up through Lysos and across the Paphos Forest past Stavros tis ' +
        'Psokas, over the watershed at Kykkos, then down into Marathasa.',
      driveFacts: [
        { label: 'Distance', value: '~64 km' },
        { label: 'Time', value: '1 h 45 m – 2 h' },
        { label: 'Climb', value: 'sea level → ~1,300 m → 800 m' },
        { label: 'Surface', value: 'Mostly surfaced forest road' }
      ],
      notice: {
        tone: 'warn',
        title: 'Google Maps may not route you this way',
        body:
          'Mapping apps have long had trouble with the forest road linking Lysos, Stavros tis ' +
          'Psokas and Kykkos, and will often send you the long way round via Kannaviou and ' +
          'Pano Panagia instead. Follow the brown/white physical signs for <strong>Stavros ' +
          'tis Psokas</strong> and then <strong>Kykkos</strong>. If you would rather stay on ' +
          'unambiguously main roads, the Kannaviou → Pano Panagia → Kykkos route is fully ' +
          'surfaced but adds roughly 30–40 minutes.'
      },
      body:
        'Leave Polis on the Paphos road and turn left for Lysos about 4–5 km out, at Goudi. ' +
        'From Lysos the road climbs steadily into the Paphos Forest. This is the shortest link ' +
        'between the coast and Kykkos — around 44 km to the monastery — and it is scenic the ' +
        'whole way, but it is a mountain forest road: narrow in places, blind bends, and slow. ' +
        'Budget the full time rather than the distance. Past Kykkos the road drops east through ' +
        'Pedoulas into Marathasa; Moutoullas is the next village down the valley.',
      tips: [
        'Fill the tank in Polis. There is no fuel between Lysos and Pedoulas.',
        'Phone signal is patchy across the forest section — this page works offline once loaded.',
        'Stavros tis Psokas is directly on this road. If you would rather not do it at the end ' +
        'of the day, a 20-minute leg-stretch here on the way out works well.'
      ]
    },

    /* ============================================================== STOP 1 */
    {
      id: 'moutoullas',
      kind: 'stop',
      num: 1,
      name: 'Moutoullas',
      subtitle: 'A 1280 painted church above a working mountain village',
      arrive: '12:05',
      depart: '12:55',
      duration: '45–60 min',
      coords: [34.983, 32.817],
      elevation: '800 m',
      summary:
        'A small Marathasa village of stone houses and wooden balconies, best known for one ' +
        'thing: the tiny church of Panagia tou Moutoulla, whose frescoes carry a precise date ' +
        'of 1280 and are the only securely dated 13th-century wall paintings surviving in Cyprus.',
      sights: [
        {
          id: 'moutoullas-parking',
          name: 'Parking in Moutoullas',
          category: 'parking',
          coords: [34.983, 32.817],
          coordsApprox: true,
          navQuery: 'Moutoullas village, Cyprus',
          navVerb: 'Drive here',
          duration: '—',
          quick:
            'There is no dedicated visitor car park. Park considerately on the main road ' +
            'through the village, near the café — the lane up to the church is signposted ' +
            'opposite. Roadside parking only, and the village lanes are narrow, so leave the ' +
            'car on the main road rather than trying to drive up.',
          lookFor: [
            'A signposted lane climbing away from the main road, opposite a café',
            'Space is informal — pull in where you are not blocking a gate or a passing place'
          ],
          practical: [
            { label: 'Type', value: 'Roadside, informal' },
            { label: 'Walk to church', value: '3–5 min, uphill' },
            { label: 'Surface', value: 'Paved lane, steep in places' }
          ]
        },
        {
          id: 'panagia-tou-moutoulla',
          name: 'Panagia tou Moutoulla',
          category: 'church',
          essential: true,
          doNotMiss: true,
          coords: [34.98261, 32.82419],
          navQuery: 'Panagia tou Moutoulla, Moutoullas, Cyprus',
          navVerb: 'Walk here',
          duration: '25–35 min',
          quick:
            'A tiny single-aisled chapel under a steep timber roof, built and painted in 1280 ' +
            'at the expense of a local couple, Ioannis of Moutoullas and his wife Irene. It is ' +
            'one of the ten Painted Churches in the Troodos Region inscribed by UNESCO in 1985, ' +
            'and it matters out of all proportion to its size: its wall paintings are the only ' +
            'series from the 13th century in Cyprus that can be dated precisely.',
          lookFor: [
            'The <strong>donor portraits</strong> — Ioannis and Irene, shown holding a model of the church itself',
            'The <strong>dedicatory inscription</strong> on the north wall of the sanctuary, which carries the 1280 date',
            'The steep <strong>timber roof</strong> above you — the whole point of the Troodos church type',
            'Western touches mixed into Byzantine faces and drapery: this is Cyprus under Frankish rule',
            'The <strong>narthex</strong> wrapping the west and north sides — added later, after about 1500, so it is not part of the 1280 building',
            'Painted panels of saints at eye level, deliberately placed where a worshipper stands'
          ],
          story:
            '<p>In 1280 Cyprus had been ruled for nearly a century by the Lusignans, a French ' +
            'crusader dynasty who took the island after Richard the Lionheart sold it on. The ' +
            'kingdom was Catholic at the top and Orthodox underneath: a Latin archbishop sat in ' +
            'Nicosia, Greek bishops had been pushed out to provincial towns, and the Orthodox ' +
            'population kept its liturgy, its language and its painters, but lost its ' +
            'institutional power. Mountain villages like Moutoullas were far enough from the ' +
            'centre to carry on much as before.</p>' +
            '<p>That is the world this church belongs to. It is small, low and built of rubble ' +
            'stone, and it is covered by the steep-pitched timber roof that defines the Troodos ' +
            'churches — a practical response to heavy mountain snow, and the feature that ties ' +
            'the ten UNESCO churches together as a group. Inside, every surface was painted in ' +
            'one campaign, paid for by a named couple rather than by a bishop or a king.</p>' +
            '<p>The painting is a hybrid. The compositions, the saints and the liturgical logic ' +
            'are Byzantine, and some of it looks back to 12th-century models. But there are ' +
            'Western elements threaded through — a way of modelling a face, a detail of costume ' +
            'or gesture that a painter in Constantinople would not have used. That mixture is ' +
            'exactly what makes the church historically valuable: it is a dated snapshot of ' +
            'what happened to Orthodox art under Latin rule.</p>' +
            '<p>Because the inscription fixes the year, art historians use Moutoullas as a ' +
            'yardstick. Undated frescoes elsewhere on the island are placed earlier or later by ' +
            'comparison with what is on these walls. Very few medieval buildings anywhere offer ' +
            'that kind of anchor.</p>' +
            '<p>The scale and the private donation have led scholars to suggest it may have ' +
            'begun as a private chapel belonging to the donors rather than a parish church.</p>',
          facts: [
            'The 1280 paintings are the only precisely dated 13th-century fresco series left in Cyprus.',
            'Ioannis and Irene are shown holding a model of the building — a medieval way of saying "we paid for this".',
            'The narthex is a later addition, from after about 1500, so the church you see is not all one date.',
            'It was inscribed by UNESCO in 1985 in the first group of Troodos painted churches.',
            'The steep timber roof is a snow roof: Marathasa gets real winter weather at 800 m.',
            'The building is small enough that the whole painted programme is visible from one spot in the nave.'
          ],
          people: [
            {
              name: 'Ioannis of Moutoullas & Irene',
              text:
                'The couple who paid for the church and its paintings in 1280. Almost nothing ' +
                'else is known about them, but they secured a kind of immortality: they appear ' +
                'on the wall holding a model of the church, and their inscription is the reason ' +
                'the building is a fixed point in Cypriot art history. Donor portraits like ' +
                'this were both piety and record — a claim on the prayers of everyone who ' +
                'entered, and a statement of standing in the village.'
            }
          ],
          didYouKnow:
            'Donor portraits are why we can date the church at all. The couple were commemorating ' +
            'themselves, not helping historians — but by putting their names and the year on the ' +
            'wall they gave Cyprus one of its few fixed reference points for medieval painting.',
          legend: null,
          whyItMatters:
            'Cyprus has an unusually dense survival of Byzantine wall painting, and the Troodos ' +
            'churches are the core of it. Moutoullas is the dated one. It shows Orthodox village ' +
            'Cyprus continuing under Catholic Lusignan rule, absorbing Western influence without ' +
            'being replaced by it — a small building that carries a large argument about cultural ' +
            'survival.',
          access: {
            title: 'Getting in',
            body:
              'The church is normally <strong>kept locked</strong>. The key is held locally — ' +
              'ask at the café on the main road and they will point you to the keyholder\'s ' +
              'house. This is normal practice for the Troodos painted churches and villagers ' +
              'are used to visitors, but it means access is not guaranteed and is unlikely ' +
              'during the middle of the day or at mealtimes. There is no fixed ticket; a small ' +
              'donation is customary.',
            tone: 'info'
          },
          etiquette: [
            'Cover shoulders and knees.',
            'Photography inside is often not permitted, and flash never is — ask first.',
            'It is a consecrated church, not a museum.'
          ]
        },
        {
          id: 'old-moutoullas',
          name: 'Old Moutoullas wander',
          category: 'historic',
          optional: true,
          coords: [34.983, 32.817],
          coordsApprox: true,
          navQuery: 'Moutoullas, Cyprus',
          navVerb: 'Open in Google Maps',
          duration: '15–20 min',
          quick:
            'A short loop through the older lanes below and around the church. Moutoullas is a ' +
            'working village of about 170 people, not a restored showpiece, and that is its ' +
            'charm — stone houses, timber balconies, cherry and walnut orchards on the terraces, ' +
            'and long views down Marathasa.',
          lookFor: [
            'Rough stone walls with timber lintels, and upper-floor wooden balconies',
            'Steep stepped lanes between houses — the village is built amphitheatrically on the slope',
            'Terraced orchards: cherries, walnuts, apples',
            'Views down the Setrachos valley towards Kalopanayiotis'
          ],
          facts: [
            'Moutoullas sits at about 800 m in the heart of the Marathasa valley.',
            'The village is known across Cyprus for its spring water — bottling began here in 1961, the first water bottling operation in Cyprus.',
            'It is also known for traditional wooden-oven bread and carved wooden troughs.'
          ],
          whyItMatters:
            'Marathasa\'s villages are among the least altered in Cyprus. Walking five minutes ' +
            'off the main road is the quickest way to understand why a church like Panagia tou ' +
            'Moutoulla survived here at all.'
        },
        {
          id: 'rigena-chlio',
          name: 'Baths of Rigena & Chlio nature trail',
          category: 'water',
          optional: true,
          skipIfLate: true,
          coords: [34.983, 32.817],
          coordsApprox: true,
          navQuery: 'Baths of Rigena nature trail, Moutoullas, Cyprus',
          navVerb: 'Drive here',
          duration: '30–40 min',
          quick:
            'A signposted circular nature trail of about 1.5 km just outside the village, ' +
            'running down to the Setrachos where four sulphur springs rise. "Chlio" comes from ' +
            'the local word for tepid — the water is warm. Easy walking, but it is an extra ' +
            'half hour and the day is already full.',
          lookFor: [
            'Four sulphur water sources on the river bank',
            'The washing place at Chlio, where village women did their laundry in the warm water',
            'River vegetation and rock formations along the Setrachos'
          ],
          practical: [
            { label: 'Length', value: '~1.5 km circular' },
            { label: 'Difficulty', value: 'Easy' },
            { label: 'Trailhead', value: 'Just outside the village, ~840 m' }
          ],
          legend:
            'According to local tradition the springs are named after "Rigena" — the Queen — a ' +
            'figure who recurs across Cypriot folklore and is attached to old sites all over the ' +
            'island. Tradition says she bathed in these waters. There is no historical evidence ' +
            'for any particular queen here, and "Rigena" is best understood as a folk name rather ' +
            'than a record of a real person.',
          facts: [
            'The springs are sulphurous and naturally warm, hence the name Chlio (tepid).',
            'The same geology produces the better-known sulphur springs 3 km downstream at Kalopanayiotis.',
            'The trail is a genuine, signposted nature trail, not an informal path.'
          ],
          whyItMatters:
            'It explains the valley. Marathasa exists where it does because of water — springs, ' +
            'the Setrachos, and the irrigation that made the orchards possible.'
        }
      ]
    },

    /* ============================================================ DRIVE 2 */
    {
      id: 'drive-moutoullas-kalo',
      kind: 'drive',
      num: null,
      name: 'Moutoullas → Kalopanayiotis',
      arrive: '12:55',
      duration: '~10 min',
      summary: 'Three kilometres down the valley on the main Marathasa road.',
      driveFacts: [
        { label: 'Distance', value: '~3 km' },
        { label: 'Time', value: '8–10 min' },
        { label: 'Descent', value: '800 m → 730 m' },
        { label: 'Surface', value: 'Surfaced main road' }
      ],
      body:
        'A short, easy run downhill. Kalopanayiotis appears on the left, spread across the ' +
        'slope above the river with the monastery below it on the far bank.'
    },

    /* ============================================================== STOP 2 */
    {
      id: 'kalopanayiotis',
      kind: 'stop',
      num: 2,
      name: 'Kalopanayiotis',
      subtitle: 'Monastery, medieval bridge, sulphur springs and the Setrachos gorge',
      arrive: '13:05',
      depart: '16:15',
      duration: '~3 hours including lunch',
      coords: [34.99194, 32.82917],
      elevation: '732 m',
      summary:
        'The richest part of the day. A UNESCO monastery of three churches under one roof, a ' +
        '16th-century stone bridge, sulphur springs that have drawn people here since ' +
        'antiquity, and a shaded river walk down the Setrachos to an abandoned watermill that ' +
        'belonged to Kykkos.',
      notice: {
        tone: 'warn',
        title: 'The monastery closes 13:00–14:00',
        body:
          'Summer hours (16 April – 15 September) are Mon–Sat 09:00–13:00 and 14:00–18:00; ' +
          'Sunday 10:30–13:30 and 14:30–18:00. You arrive inside the lunch break — which is ' +
          'why this plan eats first and visits at 14:10. Hours can vary in practice.'
      },
      sights: [
        {
          id: 'kalo-parking',
          name: 'Parking — upper village',
          category: 'parking',
          coords: [34.99194, 32.82917],
          coordsApprox: true,
          navQuery: 'Kalopanayiotis village car park, Cyprus',
          navVerb: 'Drive here',
          duration: '—',
          quick:
            'Park in the upper village, off the main road near the village centre, and walk ' +
            'down. Everything you want to see — monastery, bridge, springs, river — is below ' +
            'you on and around the riverbank. Do not try to drive down to the monastery: the ' +
            'lanes are extremely narrow and turning is difficult.',
          lookFor: [
            'Signed parking areas along the main road through the upper village',
            'The footpath and stepped lanes leading down towards the monastery roof, visible below'
          ],
          practical: [
            { label: 'Type', value: 'Village parking areas / roadside' },
            { label: 'Descent to monastery', value: '5–10 min, downhill' },
            { label: 'Return', value: 'Uphill — allow 10–15 min and take water' }
          ],
          warn:
            'Everything at this stop is downhill from the car, which means the walk back at ' +
            'the end is uphill in the afternoon heat. Keep water with you rather than in the car.'
        },
        {
          id: 'lampadistis',
          name: 'Monastery of Agios Ioannis Lampadistis',
          category: 'church',
          essential: true,
          doNotMiss: true,
          coords: [34.99194, 32.82917],
          coordsApprox: true,
          navQuery: 'Agios Ioannis Lampadistis Monastery, Kalopanayiotis, Cyprus',
          navVerb: 'Walk here',
          duration: '40–50 min',
          quick:
            'A UNESCO World Heritage monastery on the east bank of the Setrachos: three ' +
            'churches of different dates and even different confessions, joined together and ' +
            'sheltered under one enormous timber roof. It grew up around the tomb of a local ' +
            'saint and became one of the most important pilgrimage sites in Cyprus.',
          lookFor: [
            'The <strong>single vast timber roof</strong> covering the whole complex — walk round the outside first to see how three buildings became one',
            'The <strong>domed church of Agios Irakleidios</strong>, the oldest part, with 13th-century painting',
            'The <strong>Holy Handkerchief</strong> (Mandylion) on the north pier supporting the dome — a rare subject',
            'The <strong>tomb of St John Lampadistis</strong> under the narrow north-eastern arch, with the saint\'s skull in a niche',
            'The <strong>"Latin" chapel</strong> on the north side and its painting of around 1500 — the most complete Italo-Byzantine cycle in Cyprus',
            'The join lines: where one building stops and the next begins, inside and out',
            'The iconostasis and icons in the churches, and the Byzantine Museum on the west side'
          ],
          story:
            '<p>The complex grew in stages over roughly five centuries, and reading those ' +
            'stages is the whole pleasure of the visit.</p>' +
            '<p>The oldest element is the church of <strong>Agios Irakleidios</strong>, ' +
            'originally an 11th-century foundation, domed and cross-shaped. Around it a ' +
            'monastery formed, built on the site associated with a local holy man, John, who ' +
            'died young and whose tomb attracted pilgrims. The cult of St John Lampadistis ' +
            'emerged in the 12th century, and a second church was raised over his tomb, ' +
            'immediately alongside the first.</p>' +
            '<p>In the second half of the 15th century a further chapel went up on the northern ' +
            'side. It is universally called the <strong>"Latin" chapel</strong>, and its ' +
            'paintings — dated to around 1500 — are in the Italo-Byzantine style, fusing ' +
            'Byzantine composition with Italian Renaissance modelling and detail. It is the ' +
            'most complete surviving set of that style anywhere in Cyprus, and it is the reason ' +
            'the monastery is on the UNESCO list as much as the earlier work.</p>' +
            '<p>Finally the whole assembly — three churches, plus the antechamber joining them — ' +
            'was roofed over with one continuous steep timber roof, the standard Troodos ' +
            'solution, which is why from outside it reads as a single long barn-like building ' +
            'rather than as three churches.</p>' +
            '<p>The painting inside therefore spans the 12th to the 16th centuries. Agios ' +
            'Irakleidios carries 13th-century work; other areas were painted in the 13th and ' +
            '14th; the antechamber and the Latin chapel are 15th and 16th. You are looking at ' +
            'roughly four hundred years of continuous decoration in one enclosure — Orthodox ' +
            'and Latin Cyprus side by side under the same roof.</p>',
          facts: [
            'Three churches — Agios Irakleidios, Agios Ioannis Lampadistis and the "Latin" chapel — sit under one continuous timber roof.',
            'The Latin chapel\'s frescoes of about 1500 are the most complete Italo-Byzantine cycle surviving in Cyprus.',
            'The saint\'s skull is kept in a niche by his tomb and is still a focus of veneration.',
            'The depiction of the Holy Handkerchief on the north dome pier is an unusual subject in Cypriot churches.',
            'It was inscribed by UNESCO in 1985 as one of the Painted Churches in the Troodos Region.',
            'A Byzantine Museum on the west side of the complex holds icons and liturgical objects from the monastery.'
          ],
          people: [
            {
              name: 'Saint John Lampadistis',
              text:
                'Born in the village of Lampadou late in the 11th century, during the reign of ' +
                'the Byzantine emperor Nikephoros III Botaneiates (1078–81), to a priest named ' +
                'Kyriakos and his wife Anna. According to his life, when his parents arranged ' +
                'his marriage his prospective in-laws served him poisoned fish and he lost his ' +
                'sight; the marriage never happened. He is said to have forgiven those who ' +
                'blinded him, consoled his parents and given his life to God. Led by a servant ' +
                'also called John, he left Lampadou for the Marathasa valley and settled as a ' +
                'hermit at the monastery of Agios Irakleidios, where he died young. Veneration ' +
                'began locally and by the 12th century had grown into a formal cult, with the ' +
                'tomb, the relics and painted vita-icons of his life at its centre. The ' +
                'monastery is named for him because it is, in origin, his shrine.'
            }
          ],
          didYouKnow:
            'The name Lampadistis means roughly "the light-bearer" — given to a saint whose ' +
            'story turns on the loss of his sight.',
          legend:
            'According to tradition the saint healed the sick — and particularly the blind — ' +
            'after his death, which is what drew pilgrims to the tomb and built the monastery ' +
            'around it. The details of his life come from his written vita rather than from ' +
            'independent record, and should be read as hagiography rather than biography.',
          whyItMatters:
            'It is the fullest surviving picture of religious life in medieval Cyprus in one ' +
            'place: an Orthodox pilgrimage shrine that kept working through Frankish and ' +
            'Venetian rule and ended up with a Latin-influenced chapel bolted onto its side. ' +
            'Where Moutoullas is a single dated moment, Lampadistis is four centuries of ' +
            'continuous use.',
          access: {
            title: 'Opening hours',
            body:
              'Summer (16 Apr – 15 Sep): Mon–Sat <strong>09:00–13:00, 14:00–18:00</strong>; ' +
              'Sun 10:30–13:30, 14:30–18:00. The Byzantine Museum keeps its own hours ' +
              '(roughly 09:30–18:00 Mon–Sat in June–August). Hours fluctuate in practice; if ' +
              'the church is shut, the keyholder can often be found at the nearby coffee shop.',
            tone: 'info'
          },
          etiquette: [
            'Shoulders and knees covered — this is enforced more consistently here than at Moutoullas.',
            'No flash photography; check whether photography is allowed at all before shooting.',
            'Keep your voice down: it is an active pilgrimage site.'
          ]
        },
        {
          id: 'venetian-bridge',
          name: 'The stone ("Venetian") bridge',
          category: 'historic',
          essential: true,
          coords: [34.99194, 32.82917],
          coordsApprox: true,
          navQuery: 'Venetian Bridge Kalopanayiotis, Cyprus',
          navVerb: 'Walk here',
          duration: '10 min',
          quick:
            'A single-arch stone bridge over the Setrachos, built in traditional local masonry ' +
            'and dated to the 16th century — the Venetian period. Until recently it was the ' +
            'only way across the river between the village and the monastery, which is exactly ' +
            'why it is where it is.',
          lookFor: [
            'The <strong>single span arch</strong> — one clean semicircle, no piers in the water',
            'Local stone laid without mortar facing, shaped to the curve',
            'How narrow it is: built for people and pack animals, not carts',
            'The sulphur springs immediately beside it on the riverbank',
            'The line of the old path continuing on both banks — this is a fragment of a route, not a monument'
          ],
          story:
            '<p>Cyprus passed from the Venetians\' hands to the Ottomans in 1571, and the ' +
            'Venetian period proper runs from 1489. A "16th-century" date therefore places this ' +
            'bridge in or around Venetian rule, which is where the popular name comes from.</p>' +
            '<p>The label deserves a caveat. "Venetian bridge" is applied across Cyprus to a ' +
            'whole family of single-arch stone bridges — most famously the packhorse bridges of ' +
            'the Troodos foothills — and it functions more as a style-and-period shorthand than ' +
            'as a claim about who commissioned the structure. These bridges were built by local ' +
            'masons in a vernacular tradition that carried on largely unchanged through Venetian ' +
            'and Ottoman rule, which makes individual examples genuinely hard to date. Historians ' +
            'are generally more comfortable describing them as medieval or Venetian-period stone ' +
            'bridges than as Venetian public works.</p>' +
            '<p>What is not in doubt is its function. The monastery sits on the east bank; the ' +
            'village climbs the west slope. Pilgrims, monks, villagers and animals all had to ' +
            'cross, and for centuries they crossed here. Standing on it you are standing on the ' +
            'hinge of the whole settlement.</p>',
          facts: [
            'Single-span arch construction in traditional stone masonry, dated to the 16th century.',
            'Until recent decades it was the only access between the village and the monastery.',
            'The sulphur springs rise on the bank right next to it — the two sights are one stop.',
            '"Venetian bridge" is a common Cypriot label for this bridge type rather than a documented commission.'
          ],
          whyItMatters:
            'It is the physical explanation of the site. The monastery, the springs, the bridge ' +
            'and the village form a single system built around one crossing point of the ' +
            'Setrachos.'
        },
        {
          id: 'sulphur-springs',
          name: 'Sulphur springs',
          category: 'water',
          essential: false,
          coords: [34.99194, 32.82917],
          coordsApprox: true,
          navQuery: 'Sulphur Springs Kalopanayiotis, Cyprus',
          navVerb: 'Walk here',
          duration: '10 min',
          quick:
            'Mineral springs rising on the bank of the Setrachos beside the old bridge. Their ' +
            'reputation for healing goes back to antiquity and is the reason a settlement, and ' +
            'later a monastery, grew here at all. You will smell them before you see them.',
          lookFor: [
            'Discoloured, mineral-stained rock around the outflow',
            'The characteristic rotten-egg smell of hydrogen sulphide',
            'Water emerging directly from the bank rather than from a built structure',
            'How close the springs, the bridge and the monastery are to one another'
          ],
          story:
            '<p>The Troodos massif is geologically extraordinary — an ophiolite, a slice of ' +
            'oceanic crust and upper mantle thrust up above sea level, which is why Cyprus has ' +
            'copper (and gave the metal its name). Water percolating through that fractured, ' +
            'mineral-rich rock picks up dissolved sulphur compounds and re-emerges at springs ' +
            'like these along the Setrachos, both here and 3 km upstream at Moutoullas.</p>' +
            '<p>People have used them for a very long time. The healing properties of the ' +
            'Kalopanayiotis waters were known in antiquity, and the site carried on as a ' +
            'bathing and hydrotherapy place through the Byzantine and later periods; a ' +
            'hydrotherapy centre stood near what is now the monastery. That continuity — pagan ' +
            'healing spring, then Christian healing shrine around a saint\'s tomb, on the same ' +
            'spot — is a pattern repeated across the Mediterranean.</p>' +
            '<p>The springs are still the village\'s identity. Kalopanayiotis rebuilt itself ' +
            'over the last two decades as a spa and mountain-tourism village on the strength of ' +
            'them, after decades of depopulation.</p>',
          facts: [
            'The waters have been credited with healing properties since antiquity.',
            'The same geology feeds the four "Baths of Rigena" springs upstream at Moutoullas.',
            'A hydrotherapy centre historically stood near the present monastery site.',
            'The springs are the reason the modern village has a spa economy.'
          ],
          legend:
            'Traditional claims that the water cures skin conditions, rheumatism and digestive ' +
            'complaints are long-standing local beliefs and part of the site\'s history. They ' +
            'are presented here as history, not as medical advice.',
          warn:
            'You can reach the water at the riverbank, but do not drink it. The rocks around ' +
            'the springs are wet and slippery.',
          whyItMatters:
            'The springs are the origin point of everything else at Kalopanayiotis — the ' +
            'settlement, the pilgrimage, and the village\'s modern revival.'
        },
        {
          id: 'setrachos',
          name: 'Setrachos river walk',
          category: 'water',
          essential: true,
          coords: [34.99194, 32.82917],
          coordsApprox: true,
          navQuery: 'Setrachos River, Kalopanayiotis, Cyprus',
          navVerb: 'Walk here',
          duration: '30–70 min depending on route',
          quick:
            'A shaded riverside path along the Setrachos below the monastery — the most ' +
            'pleasant walking of the day, and the coolest place you will be all afternoon. An ' +
            'easy, mostly level trail follows the bank past vineyards and orchards, with the ' +
            'watermill downstream as a natural turnaround.',
          lookFor: [
            'Plane trees and alders shading the water — the classic Cypriot riparian gallery',
            'Terraced orchards on both banks: walnut, cherry, apple, fig',
            'Stone-built irrigation channels tapping the river to feed the terraces',
            'Low cascades and pools where the river drops over bedrock',
            'Dragonflies over the pools; if you are lucky, a grey wagtail working the stones'
          ],
          story:
            '<p>The Setrachos rises on the north-western slopes of Troodos and runs down ' +
            'through Marathasa, past Pedoulas, Moutoullas and Kalopanayiotis, before continuing ' +
            'north towards the Morphou plain. It is the reason the valley is inhabited.</p>' +
            '<p>Everything in Marathasa is organised around getting water onto terraces. ' +
            'Channels tapped off the river fed orchards on both banks; the same flow turned ' +
            'watermills for grinding grain. The valley\'s cherries, apples and walnuts — still ' +
            'its main crop — depend on it, and the villages sit where they do because of it.</p>' +
            '<p>Flow is strongly seasonal. In spring the river runs hard with snowmelt off the ' +
            'high Troodos. By <strong>August it is low</strong>, in places little more than ' +
            'linked pools. That does not spoil the walk — the shade and the sound of water are ' +
            'the point — but set your expectations accordingly.</p>',
          nature: {
            title: 'What you are walking through',
            items: [
              'Oriental plane and alder along the water, giving near-continuous shade',
              'Cultivated terraces: walnut, cherry, apple, fig, and vines',
              'Pine on the drier slopes above the valley floor',
              'Birds: wagtails and warblers along the river; jays and crossbills in the pines higher up',
              'Butterflies and dragonflies concentrate around the remaining pools in late summer'
            ]
          },
          facts: [
            'The Setrachos drains the north-west flank of Troodos and flows on towards Morphou bay.',
            'The river powered a series of watermills, of which the Kykkos mill downstream is the best known survivor.',
            'Irrigation from the river underpins Marathasa\'s cherry, apple and walnut orchards.',
            'Flow peaks with spring snowmelt and drops sharply by late summer.'
          ],
          whyItMatters:
            'The river is the valley\'s reason for existing: water for orchards, power for ' +
            'mills, and the corridor along which the villages and the monastery grew.'
        },
        {
          id: 'cascades',
          name: 'Cascades on the Setrachos — a note',
          category: 'water',
          isNote: true,
          quick:
            'There is <strong>no named waterfall</strong> on this route. If you are hoping for ' +
            'something like Millomeri, that is a different river system on the south side of ' +
            'Troodos, near Platres. The Setrachos here forms small cascades and pools where it ' +
            'drops over bedrock, and in a shaded gorge in August that is genuinely lovely — but ' +
            'it is not a waterfall walk, and by early August the flow is at its lowest. Set ' +
            'expectations on shade, sound and greenery rather than on falling water.',
          whyItMatters: null
        },
        {
          id: 'kykkos-watermill',
          name: 'Kykkos Watermill',
          category: 'historic',
          optional: true,
          coords: [34.99194, 32.82917],
          coordsApprox: true,
          navQuery: 'Kykkos Watermill, Kalopanayiotis, Cyprus',
          navVerb: 'Walk here',
          duration: '10–15 min',
          quick:
            'An abandoned stone watermill on the riverbank downstream of the village, ' +
            'historically owned by Kykkos Monastery. It is the natural turnaround point for the ' +
            'longer river walk and a good, quiet illustration of how the valley actually worked ' +
            'before electricity.',
          lookFor: [
            'The stone shell of the mill building and its surviving openings',
            'The <strong>leat</strong> — the channel that carried water off the river to the mill',
            'Where the water dropped: traditional Cypriot mills used a vertical fall down a chute onto a horizontal wheel below the floor',
            'The relationship between mill, channel and river — the whole machine is the landscape'
          ],
          story:
            '<p>Kykkos Monastery was one of the great landowners of Cyprus, and its holdings ' +
            'were not confined to the mountain around it. Estates, orchards and mills scattered ' +
            'across the island generated the income that built and rebuilt the monastery. A mill ' +
            'on the Setrachos at Kalopanayiotis, within a day\'s walk of Kykkos, is exactly the ' +
            'kind of asset that portfolio contained.</p>' +
            '<p>Traditional Cypriot watermills were horizontal-wheel mills. Water was diverted ' +
            'from the river along a channel, held, then dropped down a steep stone chute so ' +
            'that the jet struck the paddles of a horizontal wheel set below the mill floor. A ' +
            'vertical shaft ran straight up from that wheel to the upper millstone — no gearing ' +
            'at all. Simple, robust, and well suited to streams with a good fall but modest ' +
            'volume, which describes the Setrachos precisely.</p>' +
            '<p>What survives today is a ruin: walls, openings and traces of the water system, ' +
            'rather than working machinery. Read it as an archaeological site.</p>',
          facts: [
            'The mill is associated with Kykkos Monastery, one of the largest landowners in Cyprus.',
            'Traditional Cypriot mills used a horizontal wheel driven by a jet of water down a chute — no gears.',
            'The Setrachos powered a series of such mills along the valley.',
            'The building is unrestored and roofless; the interest is in the water system as much as the walls.'
          ],
          whyItMatters:
            'It links the two halves of the day: the village in the valley and the monastery on ' +
            'the mountain were parts of the same economy, and this is the physical evidence.'
        },
        {
          id: 'lunch',
          name: 'Lunch in Kalopanayiotis',
          category: 'food',
          coords: [34.99194, 32.82917],
          coordsApprox: true,
          navQuery: 'Byzantino Restaurant Kalopanayiotis, Cyprus',
          navVerb: 'Open in Google Maps',
          duration: '45–60 min',
          quick:
            'Eat here rather than at Kykkos — the choice is far better and it fills the ' +
            'monastery\'s 13:00–14:00 closure neatly. Three good options below; the first is ' +
            'the recommended default.',
          options: [
            {
              name: 'Byzantino',
              recommended: true,
              price: '€€',
              desc:
                'Part of the Casale Panayiotis group, in the old village. Cypriot cooking and ' +
                'meze built on local mountain produce, much of it from their own orchards. ' +
                'Reliably open daily from midday, comfortable, and the most dependable choice ' +
                'if you want a proper sit-down lunch without a long wait.',
              navQuery: 'Byzantino Restaurant Kalopanayiotis, Cyprus'
            },
            {
              name: 'Pantheon',
              price: '€',
              desc:
                'On the main road through the village with a wide view down the valley. ' +
                'Simpler and quicker — homemade burgers, salads, desserts. The right call if ' +
                'you are running late and want to be back on the trail in 40 minutes.',
              navQuery: 'Pantheon Kalopanayiotis, Cyprus'
            },
            {
              name: 'Loutraki',
              price: '€€€',
              desc:
                'Also Casale Panayiotis. More ambitious cooking, Cypriot with international ' +
                'influence, in an intimate room with valley views and décor nodding to the ' +
                'area\'s copper-mining past. The best food of the three, and the slowest — ' +
                'treat it as a long lunch, not a refuelling stop.',
              navQuery: 'Loutraki Restaurant Kalopanayiotis, Cyprus'
            }
          ],
          warn:
            'Opening days and hours in mountain villages change with the season and without ' +
            'notice. On a Saturday in August all three should be operating, but it is worth ' +
            'phoning ahead if you have your heart set on one.',
          whyItMatters: null
        }
      ],
      walkRoute: {
        title: 'The Kalopanayiotis walking route',
        intro:
          'Follow this in order. Everything is below the car park, so the pattern is downhill ' +
          'out and uphill back. Normal trainers are fine throughout.',
        modes: [
          {
            id: 'short',
            name: 'Short scenic walk',
            time: '30–45 min',
            distance: '~1.5 km',
            desc: 'Monastery → bridge → springs → riverside → back up. Covers every essential.'
          },
          {
            id: 'full',
            name: 'Full scenic walk',
            time: '60–90 min',
            distance: '~3–4 km',
            desc: 'As above, then continue downstream to the Kykkos watermill and return.'
          }
        ],
        steps: [
          {
            n: 1,
            name: 'Old Kalopanayiotis',
            sightId: null,
            distance: '300 m',
            time: '5–8 min',
            grade: 'Downhill, steep in places',
            shade: 'Partial',
            surface: 'Paved lanes and steps',
            note: 'From the car, drop through the old village lanes towards the river. The monastery roof is your landmark.'
          },
          {
            n: 2,
            name: 'Agios Ioannis Lampadistis',
            sightId: 'lampadistis',
            distance: '—',
            time: '40–50 min',
            grade: 'Level once there',
            shade: 'Indoors',
            surface: 'Stone courtyard',
            note: 'The main event. Allow the full time; there is a lot to look at.',
            inBoth: true
          },
          {
            n: 3,
            name: 'Stone ("Venetian") bridge',
            sightId: 'venetian-bridge',
            distance: '150 m',
            time: '3 min',
            grade: 'Level',
            shade: 'Good — trees along the river',
            surface: 'Path and stone',
            note: 'Immediately below the monastery on the Setrachos.',
            inBoth: true
          },
          {
            n: 4,
            name: 'Sulphur springs',
            sightId: 'sulphur-springs',
            distance: '50 m',
            time: '2 min',
            grade: 'Level, short scramble to the bank',
            shade: 'Good',
            surface: 'Rock — slippery when wet',
            note: 'Right beside the bridge. Smell them first.',
            inBoth: true
          },
          {
            n: 5,
            name: 'Setrachos riverside path',
            sightId: 'setrachos',
            distance: '400 m+',
            time: '10–15 min',
            grade: 'Gently downhill',
            shade: 'Very good — the coolest part of the day',
            surface: 'Compacted earth path',
            note: 'Follow the bank downstream past orchards and vineyards.',
            inBoth: true
          },
          {
            n: 6,
            name: 'Kykkos Watermill',
            sightId: 'kykkos-watermill',
            distance: '~1 km further',
            time: '15–20 min each way',
            grade: 'Gently downhill out, uphill back',
            shade: 'Good',
            surface: 'Earth path, uneven in places',
            note: 'Full walk only. Turn around here.',
            fullOnly: true
          },
          {
            n: 7,
            name: 'Return to the village',
            sightId: null,
            distance: '600 m – 1.5 km',
            time: '15–25 min',
            grade: 'Uphill throughout',
            shade: 'Partial',
            surface: 'Path, then stepped lanes',
            note: 'The one genuinely tiring stretch of the day. Take it slowly and drink.'
          },
          {
            n: 8,
            name: 'Lunch',
            sightId: 'lunch',
            distance: '—',
            time: '45–60 min',
            grade: '—',
            shade: 'Indoors / terrace',
            surface: '—',
            note: 'In this plan lunch comes first, at 13:10, to cover the monastery\'s closure.'
          }
        ]
      }
    },

    /* ============================================================ DRIVE 3 */
    {
      id: 'drive-kalo-kykkos',
      kind: 'drive',
      num: null,
      name: 'Kalopanayiotis → Kykkos',
      arrive: '16:15',
      duration: '~35 min',
      summary: 'Back up through Moutoullas and Pedoulas, then west over the ridge to Kykkos.',
      driveFacts: [
        { label: 'Distance', value: '~20 km' },
        { label: 'Time', value: '30–40 min' },
        { label: 'Climb', value: '730 m → ~1,300 m' },
        { label: 'Surface', value: 'Surfaced, winding' }
      ],
      body:
        'A steady climb of nearly 600 m on a well-surfaced but continuously twisting mountain ' +
        'road. Above Pedoulas the orchards give way to pine forest and the views open out ' +
        'north across Marathasa. This is one of the best stretches of driving on the island — ' +
        'and one where you should not be in a hurry.',
      tips: [
        'Pedoulas is the last village with shops and fuel before Kykkos.',
        'Sound your horn on blind hairpins; buses and vans use this road.'
      ]
    },

    /* ============================================================== STOP 3 */
    {
      id: 'kykkos',
      kind: 'stop',
      num: 3,
      name: 'Kykkos Monastery',
      subtitle: 'The wealthiest and most influential monastery in Cyprus',
      arrive: '16:50',
      depart: '18:05',
      duration: '60–75 min',
      coords: [34.9839, 32.7411],
      elevation: '~1,300 m',
      summary:
        'Founded at the end of the 11th century under the Byzantine emperor Alexios I ' +
        'Komnenos, burned and rebuilt repeatedly, and home to an icon of the Virgin that ' +
        'tradition attributes to Saint Luke and that nobody is permitted to look at. Kykkos ' +
        'has been a centre of wealth, learning and political power in Cyprus for nine hundred ' +
        'years.',
      sights: [
        {
          id: 'kykkos-parking',
          name: 'Kykkos visitor parking',
          category: 'parking',
          coords: [34.9839, 32.7411],
          coordsApprox: true,
          navQuery: 'Kykkos Monastery parking, Cyprus',
          navVerb: 'Drive here',
          duration: '—',
          quick:
            'Large free parking areas serve the monastery, below and beside the complex. Coach ' +
            'traffic is heavy in the middle of the day and much lighter by late afternoon, so ' +
            'arriving around 16:50 you should find space easily.',
          practical: [
            { label: 'Type', value: 'Dedicated visitor car parks, free' },
            { label: 'Walk to entrance', value: '3–5 min' },
            { label: 'Gradient', value: 'Gently uphill from the lower car park' }
          ],
          lookFor: ['Signed car parks on the approach road', 'Shaded spaces under the pines fill first']
        },
        {
          id: 'kykkos-monastery',
          name: 'Kykkos Monastery',
          category: 'church',
          essential: true,
          doNotMiss: true,
          coords: [34.9839, 32.7411],
          navQuery: 'Kykkos Monastery, Cyprus',
          navVerb: 'Drive here',
          duration: '60–75 min',
          quick:
            'Officially the Holy Royal Monastery of the Virgin of Kykkos, founded around the ' +
            'end of the 11th century and sited high on the north-western Troodos at about ' +
            '1,300 m. Its imperial foundation, its miraculous icon and centuries of accumulated ' +
            'endowments made it the richest religious institution on the island and a political ' +
            'force well beyond the church.',
          lookFor: [
            'The <strong>katholikon</strong> (main church) and its carved, gilded <strong>iconostasis</strong>',
            'The <strong>icon of the Virgin</strong> on the iconostasis — covered, and not to be looked at',
            'The <strong>courtyards and roofed galleries</strong> wrapping the complex, and the mosaics along them',
            'The <strong>bell tower</strong> and the view out from the terraces',
            'Silver votive offerings — small metal plaques left in thanks for prayers answered',
            'The museum entrance off the courtyard',
            'How little of what you see is medieval: read the building as an 18th–20th-century envelope around a much older institution'
          ],
          story:
            '<p>The foundation story runs like this. A hermit named Isaias, living on this ' +
            'mountain, encountered Manuel Boutoumites, the Byzantine governor of Cyprus, who ' +
            'had lost his way in the forest — and who treated him badly. Boutoumites later fell ' +
            'ill, remembered the hermit, and sought him out. Isaias told him that his recovery ' +
            'was tied to a task: bringing to Cyprus an icon of the Virgin, painted by Saint ' +
            'Luke, then held in the imperial palace in Constantinople. In Constantinople the ' +
            'daughter of the emperor <strong>Alexios I Komnenos</strong> (r. 1081–1118) fell ' +
            'ill with the same complaint, and the emperor consented to give up the icon. It ' +
            'travelled to Cyprus and a monastery was built to house it, endowed by the emperor. ' +
            'This is the monastery\'s own tradition, and it is how Kykkos explains its imperial ' +
            'status and its "Royal" title.</p>' +
            '<p>What is historically solid is that the monastery dates from the late 11th ' +
            'century, in the reign of Alexios I, and that it enjoyed imperial patronage from ' +
            'early on. What followed was nine centuries of accumulation: land, orchards, mills ' +
            '(including the one you saw at Kalopanayiotis), dependencies across Cyprus and ' +
            'abroad, and the offerings of pilgrims drawn by the icon.</p>' +
            '<p>The monastery has burned down repeatedly — the church was destroyed three ' +
            'separate times — and each fire consumed archives and libraries along with the ' +
            'buildings, which is why so much of its early written history is lost. The present ' +
            'church dates from the mid-18th century, and the decoration you see is later still. ' +
            'The institution is ancient; almost none of the fabric is.</p>' +
            '<p>Kykkos was never only religious. It educated Cypriots, held enormous wealth, ' +
            'and became closely bound up with Greek Cypriot national identity. In the 20th ' +
            'century it backed the campaign against British rule, and it produced the man who ' +
            'led the island to independence and became its first president. That is not ' +
            'incidental to the place — it is central to why Cypriots come here.</p>',
          facts: [
            'The full name is the Holy Royal Monastery of the Virgin of Kykkos — "royal" for its imperial foundation.',
            'It sits at roughly 1,300 m on the north-west face of Troodos.',
            'The church has been destroyed by fire three times; the present one dates from the mid-18th century.',
            'The library holds around 15,000 printed books and about a hundred Greek manuscripts, including parchment fragments from the 10th century.',
            'Kykkos owns one of only three icons traditionally attributed to Saint Luke.',
            'Archbishop Makarios III entered as a novice here in 1926, aged 13.'
          ],
          didYouKnow:
            'Every fire that destroyed the monastery also destroyed its records. Kykkos is one ' +
            'of the oldest continuously functioning institutions in Cyprus, and one of the ' +
            'worst documented in its early centuries — the two facts are directly connected.',
          whyItMatters:
            'Kykkos is where Cypriot Orthodoxy, wealth and national politics meet. For nine ' +
            'centuries it has been the island\'s most important monastery, and in the 20th ' +
            'century it was a nursery of the independence movement. Understanding Kykkos is a ' +
            'large part of understanding modern Cyprus.',
          access: {
            title: 'Practicalities',
            body:
              'The monastery is generally open daily through the day into the early evening ' +
              '(commonly quoted as roughly 10:00–18:00, with wider hours in summer). Entry to ' +
              'the monastery itself is free; the <strong>museum charges about €5</strong>. ' +
              'Published hours vary between sources — if the museum is essential to you, arrive ' +
              'by 16:30 rather than 17:00.',
            tone: 'info'
          },
          etiquette: [
            'Strictly no bare shoulders or knees, for men and women.',
            'No photography inside the church.',
            'Silence in the katholikon; services may be in progress.'
          ]
        },
        {
          id: 'kykkos-icon',
          name: 'The Icon of the Virgin',
          category: 'historic',
          essential: true,
          coords: [34.9839, 32.7411],
          coordsApprox: true,
          navQuery: 'Kykkos Monastery, Cyprus',
          navVerb: 'Open in Google Maps',
          duration: '10 min',
          quick:
            'The reason the monastery exists. An icon of the Virgin and Child, traditionally ' +
            'held to be one of three painted by Saint Luke the Evangelist, encased in silver ' +
            'gilt and covered so that the painted faces cannot be seen. It sits on the ' +
            'iconostasis of the main church, and it has not been looked upon in living memory.',
          lookFor: [
            'The icon\'s position on the <strong>iconostasis</strong> of the katholikon',
            'The <strong>silver-gilt revetment</strong> and the cover over the upper portion',
            'Votive offerings hung around it — silver plaques, jewellery, models of body parts',
            'The wear on the surrounding woodwork from centuries of veneration'
          ],
          story:
            '<p>Three strands need separating here.</p>' +
            '<p><strong>Tradition.</strong> Orthodox tradition holds that Saint Luke painted ' +
            'several icons of the Virgin from life, and that this is one of three surviving. ' +
            'The monastery\'s account has it brought from the imperial palace in Constantinople ' +
            'to Cyprus under Alexios I Komnenos, as the price of the emperor\'s daughter\'s ' +
            'recovery.</p>' +
            '<p><strong>History.</strong> No art historian dates the icon to the 1st century. ' +
            'Attribution to Saint Luke attaches to a number of celebrated Byzantine icons and ' +
            'functions as a statement of supreme authority and antiquity rather than as a ' +
            'record of authorship. Because the icon has been covered for centuries it has not ' +
            'been examined, so its actual date is not established.</p>' +
            '<p><strong>Legend.</strong> The covering itself has generated a body of ' +
            'tradition. It is widely said that whoever looks upon the face of the icon will be ' +
            'struck blind, and stories are told of those who tried. Whatever the origin of the ' +
            'practice, the effect is that the most venerated object in Cyprus is one that ' +
            'nobody sees — its power resides precisely in its concealment.</p>' +
            '<p>The icon is credited above all with bringing rain, and it was carried in ' +
            'procession up the mountain in times of drought. That practice is the direct origin ' +
            'of Throni, your next stop.</p>',
          facts: [
            'One of only three icons traditionally attributed to Saint Luke.',
            'Encased in silver gilt, with the upper portion covered from view.',
            'Associated above all with prayers for rain.',
            'Under Venetian rule the Virgin of Kykkos was known as the Virgin of the Rain.',
            'Its concealment means it has never been examined and dated.'
          ],
          legend:
            'Legend says that anyone who looks directly at the face of the icon will be ' +
            'blinded. This is tradition, not documented history — but it is taken seriously ' +
            'here, and the cover has not been lifted for public view in modern times.',
          whyItMatters:
            'The icon is arguably the single most venerated object in Cyprus, and the engine of ' +
            'the monastery\'s wealth and status. The rain processions attached to it created ' +
            'Throni, which in turn is why the first president of Cyprus is buried on the ' +
            'mountain above.'
        },
        {
          id: 'kykkos-mosaics',
          name: 'The mosaics',
          category: 'historic',
          essential: true,
          coords: [34.9839, 32.7411],
          coordsApprox: true,
          navQuery: 'Kykkos Monastery, Cyprus',
          navVerb: 'Open in Google Maps',
          duration: '15–20 min',
          quick:
            'The galleries and courtyard walls are covered in dense, glittering mosaic and wall ' +
            'painting. They are magnificent, and they are <strong>modern</strong> — largely the ' +
            'work of the Cypriot artist Philippos Kepolas in the 20th century. Enjoy them for ' +
            'what they are, and do not mistake them for Byzantine work.',
          lookFor: [
            'Gold-ground tesserae set at angles to catch the light as you move',
            'Scenes from the life of the Virgin and from the monastery\'s own foundation legend',
            'The story of Isaias and Boutoumites depicted on the walls — the monastery telling its own origin story',
            'Byzantine <strong>style</strong> deliberately revived: flat gold, frontal figures, Greek inscriptions',
            'Sharp edges and unweathered surfaces — the tell that this is recent work'
          ],
          story:
            '<p>Because Kykkos burned repeatedly, essentially nothing of its medieval decoration ' +
            'survives. What covers the walls now is a deliberate 20th-century programme in a ' +
            'revived Byzantine idiom, carried out mainly by Philippos Kepolas.</p>' +
            '<p>This is worth understanding rather than being disappointed by. The mosaics are ' +
            'not imitation for its own sake: they are a modern Orthodox institution asserting ' +
            'continuity with a Byzantine past, at a moment — the mid-to-late 20th century — ' +
            'when Greek Cypriot identity was an intensely live political question. The choice ' +
            'to decorate in this style says something about what Kykkos understood itself to ' +
            'be.</p>' +
            '<p>The contrast with the morning is the real lesson of the day. At Moutoullas you ' +
            'stood in front of paint applied in 1280 by an artist working in a living Byzantine ' +
            'tradition. Here you are looking at that tradition consciously reconstructed eight ' +
            'centuries later. Both are authentic; they are authentic to different things.</p>',
          facts: [
            'The mosaics are chiefly the work of the Cypriot artist Philippos Kepolas.',
            'They are 20th-century, not medieval.',
            'Fires destroyed the monastery\'s earlier decoration along with its libraries.',
            'The foundation legend of Isaias and Boutoumites is depicted on the walls.'
          ],
          didYouKnow:
            'The oldest paint you will see today is in the smallest building — the tiny church ' +
            'at Moutoullas. The grandest decoration is the newest.',
          whyItMatters:
            'They show a living tradition reasserting itself. Cyprus\'s Byzantine inheritance is ' +
            'not only preserved here, it is actively continued — and that continuation is ' +
            'itself a political statement.'
        },
        {
          id: 'kykkos-museum',
          name: 'Kykkos Museum',
          category: 'historic',
          optional: true,
          skipIfLate: true,
          coords: [34.9839, 32.7411],
          coordsApprox: true,
          navQuery: 'Museum of Kykkos Monastery, Cyprus',
          navVerb: 'Open in Google Maps',
          duration: '20–40 min',
          quick:
            'A genuinely good museum — well lit, well presented, and holding icons, ' +
            'manuscripts, church silver, vestments and Cypriot antiquities drawn from the ' +
            'monastery\'s own collections. Worth it if you have the time and energy; the first ' +
            'thing to drop if you do not.',
          museumIn20: {
            title: 'The museum in 20 minutes',
            items: [
              'The icon rooms — the core of the collection, and the direct continuation of what you saw at Moutoullas and Lampadistis',
              'The manuscripts, including parchment fragments going back to the 10th century',
              'Church silver and liturgical vessels — the visible form of the monastery\'s wealth',
              'Embroidered vestments, technically extraordinary at close range',
              'Skip the general antiquities section unless you have time to spare'
            ]
          },
          practical: [
            { label: 'Entry', value: '~€5; groups €3; children and students free' },
            { label: 'Time needed', value: '20 min minimum, 40 for a proper look' },
            { label: 'Note', value: 'Closes earlier than the monastery — arrive by 16:30 to be safe' }
          ],
          facts: [
            'Holds icons, consecrated vessels, manuscripts and Cypriot antiquities.',
            'The library runs to some 15,000 printed books and around a hundred manuscripts.',
            'There is an on-site conservation workshop for manuscripts and icons.'
          ],
          whyItMatters:
            'It is the best single collection of Cypriot ecclesiastical art outside Nicosia, ' +
            'and it puts the day\'s churches into one sequence.'
        },
        {
          id: 'makarios-kykkos',
          name: 'Makarios III and Kykkos',
          category: 'historic',
          isNote: true,
          quick:
            'Before you drive up to Throni, it is worth knowing why the first president of ' +
            'Cyprus is buried on the mountain above this monastery. <strong>Michail ' +
            'Christodoulou Mouskos</strong> was born on 13 August 1913 in Panagia, a village ' +
            'near Paphos, the son of a goatherd. At thirteen, in 1926, he was accepted as a ' +
            'novice at Kykkos, and he stayed until 1933. The monastery educated him and set the ' +
            'course of his life. He went on to study theology in Athens and then in Boston, was ' +
            'elected Bishop of Kition in 1948 while still in the United States, and in September ' +
            '1950, aged 37, was elected Archbishop and Ethnarch of Cyprus as Makarios III — a ' +
            'title that made him leader of the Greek Cypriot community as well as its church. ' +
            'Kykkos remained his institutional base and his emotional home, which is why he ' +
            'chose to be buried within sight of it.',
          whyItMatters: null
        }
      ]
    },

    /* ============================================================ DRIVE 4 */
    {
      id: 'drive-kykkos-throni',
      kind: 'drive',
      num: null,
      name: 'Kykkos → Throni',
      arrive: '18:05',
      duration: '~10 min',
      summary: 'Three kilometres north-west, climbing to the summit above the monastery.',
      driveFacts: [
        { label: 'Distance', value: '~3 km' },
        { label: 'Time', value: '8–10 min' },
        { label: 'Climb', value: 'Short but steep' },
        { label: 'Surface', value: 'Surfaced' }
      ],
      body:
        'A short, well-signed road climbing north-west from the monastery through pines to the ' +
        'summit. There is parking at the top.'
    },

    /* ============================================================== STOP 4 */
    {
      id: 'throni',
      kind: 'stop',
      num: 4,
      name: 'Throni & the Tomb of Makarios III',
      subtitle: 'The summit shrine, the mausoleum, and the whole of western Cyprus below',
      arrive: '18:15',
      depart: '18:55',
      duration: '35–45 min',
      coords: [34.9905, 32.7115],
      coordsApprox: true,
      navQuery: 'Throni tis Panagias, Kykkos, Cyprus',
      elevation: '~1,300–1,400 m',
      summary:
        'The finale. A summit shrine to the Virgin, the tomb of the first president of Cyprus ' +
        'under a permanent military guard, and a view west across the Paphos Forest that is ' +
        'worth the whole drive. Come here in the late afternoon: the light is at its best and ' +
        'the coaches have gone.',
      notice: {
        tone: 'info',
        title: 'Approximate map position',
        body:
          'Throni sits about 3 km north-west of Kykkos. The pin on the map is indicative; the ' +
          'Navigate button uses a Google Maps place search on the official name, which will ' +
          'take you there correctly. It is also clearly signposted from the monastery.'
      },
      sights: [
        {
          id: 'throni-parking',
          name: 'Throni parking',
          category: 'parking',
          coords: [34.9905, 32.7115],
          coordsApprox: true,
          navQuery: 'Throni tis Panagias, Kykkos, Cyprus',
          navVerb: 'Drive here',
          duration: '—',
          quick:
            'Parking at the top of the access road, below the monuments. From there everything ' +
            'is on foot along a linked pedestrian walkway.',
          practical: [
            { label: 'Type', value: 'Car park at the summit road head' },
            { label: 'Walk to tomb', value: '2–3 min' },
            { label: 'Walk to shrine', value: '5–8 min, uphill' }
          ]
        },
        {
          id: 'makarios-tomb',
          name: 'Tomb of Archbishop Makarios III',
          category: 'historic',
          essential: true,
          doNotMiss: true,
          coords: [34.9905, 32.7115],
          coordsApprox: true,
          navQuery: 'Tomb of Archbishop Makarios III, Throni, Cyprus',
          navVerb: 'Walk here',
          duration: '15–20 min',
          quick:
            'Makarios III asked to be buried on the summit of Throni, near the monastery that ' +
            'raised him. He was entombed here after his death on 3 August 1977. The grave is ' +
            'covered by a black marble slab in a semi-basement vaulted chamber built in 1977 to ' +
            'a design by the architect Andreas Filippou, and it is watched by a permanent ' +
            'guard of honour.',
          lookFor: [
            'The <strong>black marble slab</strong> over the grave in the vaulted, paved chamber',
            'The <strong>military guard of honour</strong> — a state honour, not a ceremonial re-enactment',
            'The <strong>bronze statue of Makarios</strong>, some 10 m high, on the approach',
            'Wreaths and offerings left by visiting Cypriots — this is an active place of national mourning',
            'How deliberately the tomb is placed: below the shrine, above the forest, in sight of Kykkos'
          ],
          story:
            '<p>Makarios III is the central figure of modern Cypriot history, and a genuinely ' +
            'contested one. A short and factual account:</p>' +
            '<p>Born Michail Christodoulou Mouskos in 1913 in Panagia near Paphos; novice at ' +
            'Kykkos from 1926; theology at the University of Athens, graduating in 1942; ' +
            'ordained 1946; further study in theology and sociology in Boston on a World Council ' +
            'of Churches scholarship. Elected Bishop of Kition in 1948, and Archbishop of Cyprus ' +
            'in September 1950 at the age of 37. The archbishopric of Cyprus carries the ' +
            'historic role of <em>ethnarch</em> — political leader of the Greek Cypriot ' +
            'community — so his election made him a national as well as a religious leader.</p>' +
            '<p>Through the 1950s he led the political campaign against British colonial rule ' +
            'and for <em>enosis</em>, union with Greece, alongside the armed EOKA campaign. The ' +
            'British deported him to the Seychelles in 1956. The settlement that followed ' +
            'produced not union with Greece but an independent Republic of Cyprus, with power ' +
            'shared between Greek and Turkish Cypriots. Makarios became its first president on ' +
            '16 August 1960.</p>' +
            '<p>The constitutional settlement broke down within three years, and intercommunal ' +
            'violence followed from 1963. Makarios moved away from enosis towards an independent, ' +
            'non-aligned Cyprus — a shift that put him in direct conflict with the military ' +
            'junta then ruling Greece and with hardline enosis supporters at home.</p>' +
            '<p>On 15 July 1974 the Greek-officered Cypriot National Guard mounted a coup ' +
            'against him. He escaped the island. Five days later Turkey invaded, ultimately ' +
            'occupying the northern third of Cyprus and displacing very large numbers of people ' +
            'in both directions. The junta in Athens fell; the coup regime in Cyprus collapsed. ' +
            'Makarios returned in December 1974 and resumed the presidency, opposed to ' +
            'partition, and held office until he died of a heart attack on 3 August 1977, ' +
            'aged 63.</p>' +
            '<p>He is judged very differently by different people — as the father of Cypriot ' +
            'independence, and as a leader whose choices contributed to the island\'s division. ' +
            'Both readings are seriously held. What is not in dispute is that no other ' +
            'individual shaped 20th-century Cyprus as much.</p>',
          facts: [
            'Born 13 August 1913 in Panagia, near Paphos, the son of a goatherd.',
            'A novice at Kykkos from 1926 to 1933, from the age of thirteen.',
            'Elected Archbishop and Ethnarch of Cyprus in September 1950, aged 37.',
            'Deported by the British to the Seychelles in 1956.',
            'First President of the Republic of Cyprus from 16 August 1960.',
            'Died 3 August 1977 and was buried here at his own request.'
          ],
          people: [
            {
              name: 'Archbishop Makarios III (1913–1977)',
              text:
                'Archbishop of Cyprus from 1950 and first President of the Republic from 1960. ' +
                'Both head of the Orthodox Church of Cyprus and head of state — a combination ' +
                'that rested on the ancient ethnarch role of the Cypriot archbishop. Led the ' +
                'anti-colonial campaign, was exiled by the British, negotiated independence, ' +
                'survived a coup, and returned to govern a divided island. Buried on this ' +
                'summit within sight of the monastery that took him in at thirteen.'
            },
            {
              name: 'Andreas Filippou',
              text: 'The architect of the 1977 tomb structure — the vaulted, paved semi-basement chamber that houses the grave.'
            }
          ],
          didYouKnow:
            'Makarios was buried on 8 August 1977, and the guard of honour has been maintained ' +
            'at the tomb ever since — one of very few permanently guarded graves anywhere in ' +
            'the eastern Mediterranean.',
          whyItMatters:
            'This is the closest thing the Republic of Cyprus has to a national shrine. For ' +
            'many Greek Cypriots a visit here is an act of remembrance, tied directly to 1974 ' +
            'and to a division that has never been resolved. Treat it as you would a war ' +
            'memorial.',
          etiquette: [
            'Quiet and unhurried behaviour; do not photograph the guard at close range.',
            'Cover shoulders and knees — the shrine above is a working chapel.',
            'Cypriot visitors may be here for personal reasons. Give them space.'
          ]
        },
        {
          id: 'throni-shrine',
          name: 'Throni tis Panagias — the shrine',
          category: 'church',
          essential: true,
          coords: [34.9905, 32.7115],
          coordsApprox: true,
          navQuery: 'Throni tis Panagias, Kykkos, Cyprus',
          navVerb: 'Walk here',
          duration: '10–15 min',
          quick:
            'At the very top, an octagonal open shrine dedicated to the Virgin — a canopy on ' +
            'four pillars, covered inside with mosaic, standing where the monks of Kykkos once ' +
            'carried the icon to pray for rain. "Throni" means throne: the name records the ' +
            'wooden throne on which the icon was set.',
          lookFor: [
            'The <strong>octagonal plan</strong> and the four-pillar canopy — Byzantine forms handled in a modern idiom, by the architect Philip Loizou',
            '<strong>Mosaic</strong> covering the interior surfaces',
            'The <strong>throne</strong> itself — the point of the whole structure',
            'The <strong>mosaic panels along the walkway</strong> linking shrine, statue and tomb',
            'Ex-voto offerings and ribbons left by pilgrims'
          ],
          story:
            '<p>During Venetian rule the Kykkos icon was known as the Virgin of the Rain. In ' +
            'drought — and drought is the recurring crisis of Cypriot agriculture — the monks ' +
            'would carry the icon up the path to the top of this mountain, set it on a wooden ' +
            'throne, and pray for the rains to come. The place took its name from that throne: ' +
            '<em>Throni</em>.</p>' +
            '<p>The wooden throne was eventually replaced by the present structure, designed by ' +
            'Philip Loizou, which combines Byzantine elements with modern architecture: an ' +
            'octagonal shrine under a canopy carried on four pillars, its interior surfaced in ' +
            'mosaic. Shrine, statue and tomb were then linked by pedestrian walkways, with ' +
            'mosaic compositions set along the route between the three monuments.</p>' +
            '<p>The result is a processional landscape. You are meant to walk it in sequence, ' +
            'and the sequence is not accidental — the tomb of the first president sits on the ' +
            'mountain of the rain-bringing Virgin, below her shrine. Religious and national ' +
            'meaning are deliberately layered on one summit.</p>',
          facts: [
            'The name means "throne", from the wooden throne on which the icon was placed.',
            'Under Venetian rule the Kykkos icon was called the Virgin of the Rain.',
            'The present shrine is the work of the architect Philip Loizou.',
            'Mosaic compositions line the walkways connecting shrine, statue and tomb.',
            'It stands roughly 3 km north-west of Kykkos Monastery.'
          ],
          legend:
            'According to tradition, rain followed when the icon was enthroned here. The rain ' +
            'processions are documented practice; whether they worked is a matter of faith.',
          whyItMatters:
            'Throni explains the geography of belief in this landscape. The mountain was sacred ' +
            'before the mausoleum existed, and that is precisely why the mausoleum is here.'
        },
        {
          id: 'throni-views',
          name: 'Look around you — the view from Throni',
          category: 'viewpoint',
          essential: true,
          coords: [34.9905, 32.7115],
          coordsApprox: true,
          navQuery: 'Throni tis Panagias, Kykkos, Cyprus',
          navVerb: 'Walk here',
          duration: '10 min',
          quick:
            'One of the great viewpoints in Cyprus, and at its best in the last hours of the ' +
            'day. Take a slow 360° turn and work out what you are looking at.',
          viewGuide: [
            {
              dir: 'West and south-west',
              text:
                'The <strong>Paphos Forest</strong> — ridge after ridge of pine running away ' +
                'towards the Tripylos massif. This is the largest area of forest in Cyprus and ' +
                'the home range of the Cyprus mouflon. Your route home runs through it.'
            },
            {
              dir: 'East and south-east',
              text:
                'The main <strong>Troodos massif</strong> rising towards Mount Olympus at ' +
                '1,952 m, the highest point on the island. The radar dome on the summit is ' +
                'usually the giveaway.'
            },
            {
              dir: 'Below and east',
              text:
                'The head of the <strong>Marathasa valley</strong>, where you spent the ' +
                'morning — the Setrachos cutting north between the ridges towards Pedoulas and ' +
                'Kalopanayiotis.'
            },
            {
              dir: 'North',
              text:
                'On a clear day the land falls away towards the <strong>Morphou plain</strong> ' +
                'and the north coast. Haze in August often closes this off — do not be ' +
                'disappointed if the far distance is milky.'
            }
          ],
          warn:
            'August afternoons are usually hazy. The near and middle distance are reliable; the ' +
            'far north often is not.',
          facts: [
            'The Paphos Forest is the largest continuous forest in Cyprus.',
            'Mount Olympus, at 1,952 m, is the highest point on the island.',
            'The Setrachos drains north from here towards Morphou bay.'
          ],
          whyItMatters:
            'From one spot you can see the shape of the whole day: the valley you walked, the ' +
            'massif you crossed, and the forest you are about to drive home through.'
        }
      ]
    },

    /* ================================================= OPTIONAL: STAVROS */
    {
      id: 'stavros',
      kind: 'stop',
      num: 5,
      optional: true,
      name: 'Stavros tis Psokas',
      subtitle: 'Forest station in the heart of the Paphos Forest — optional',
      arrive: '19:35',
      depart: '19:55',
      duration: '20–30 min',
      coords: [35.02461, 32.63064],
      elevation: '~560 m',
      summary:
        'The main forestry station of the Paphos Forest, set in a wooded hollow with a picnic ' +
        'site, a campsite and the mouflon enclosure. It sits directly on the road home. ' +
        'Whether you stop depends entirely on the time.',
      notice: {
        tone: 'warn',
        title: 'Decision point — check your watch at Throni',
        body:
          'Sunset is around <strong>19:45</strong> in early August. If you leave Throni after ' +
          '<strong>18:15</strong>, skip this stop and drive straight home: you do not want to ' +
          'be starting a forest walk at dusk, and the last section to Polis is better done in ' +
          'daylight. It also works very well as a 20-minute leg-stretch on the way <em>out</em> ' +
          'in the morning, when time pressure is off.'
      },
      sights: [
        {
          id: 'stavros-station',
          name: 'Stavros tis Psokas Forest Station',
          category: 'optional',
          optional: true,
          coords: [35.02461, 32.63064],
          navQuery: 'Stavros tis Psokas Forest Station, Cyprus',
          navVerb: 'Drive here',
          duration: '20–30 min',
          quick:
            'A Forestry Department station established as the centre of mouflon conservation, ' +
            'in a green hollow of tall pines and plane trees. There is a picnic site, a ' +
            'campsite, toilets, drinking water, a small shop and two waymarked nature trails. ' +
            'It is a good place to stretch your legs and stand under big trees.',
          lookFor: [
            'The forest station buildings, some dating from the British colonial period',
            'The picnic ground under the plane trees',
            'Trailheads for the <strong>Chorteri</strong> and <strong>Selladi tou Stavrou</strong> nature trails',
            'The mouflon enclosure fence line'
          ],
          practical: [
            { label: 'Facilities', value: 'Toilets, water, picnic tables, small shop' },
            { label: 'Food', value: 'No restaurant — a shop with basic food and hot sandwiches' },
            { label: 'Trails', value: 'Chorteri and Selladi tou Stavrou nature trails' },
            { label: 'Leg-stretch', value: '10–15 min is enough to feel the forest' }
          ],
          warn:
            'The <strong>mouflon viewing enclosures</strong> at Stavros tis Psokas and Platania ' +
            'were closed to visitors in March 2026 as a precaution against foot-and-mouth ' +
            'disease. Reporting since has been inconsistent about whether Stavros has reopened. ' +
            '<strong>Do not plan the stop around seeing mouflon</strong> — treat any sighting ' +
            'as a bonus.',
          facts: [
            'The main forestry station of the Paphos Forest.',
            'The fenced mouflon enclosure dates back to the 1930s, under British administration.',
            'The station was developed from the 1960s as the centre of mouflon conservation.',
            'Two waymarked nature trails start here.',
            'The Paphos Forest is an important biotope for endemic and wild birds.'
          ],
          whyItMatters:
            'It is the operational heart of the largest forest in Cyprus, and the base from ' +
            'which the mouflon was brought back from near-extinction.'
        },
        {
          id: 'mouflon',
          name: 'The Cyprus mouflon',
          category: 'optional',
          isNote: true,
          optional: true,
          quick:
            'The <em>agrino</em> — the Cyprus mouflon, <em>Ovis gmelini ophion</em> — is a wild ' +
            'sheep found nowhere else on earth. Rams carry heavy backswept horns; the coat is ' +
            'reddish-brown with a pale saddle patch. It is the emblem of Cypriot wildlife, ' +
            'appears on the country\'s coinage and once flew on the tail of Cyprus Airways ' +
            'aircraft.',
          story:
            '<p>Mouflon have been on Cyprus for thousands of years, probably introduced by the ' +
            'island\'s earliest inhabitants and then running wild — which makes the population ' +
            'genetically distinctive and, after millennia of isolation, unique to the island.</p>' +
            '<p>By the early 20th century hunting and habitat loss had driven numbers down ' +
            'catastrophically; estimates put the population as low as a few dozen animals. The ' +
            'response began under British administration in the 1930s, when the Department of ' +
            'Forests recorded the decline and established a fenced enclosure at Stavros tis ' +
            'Psokas. The Paphos Forest was closed to hunting and protected, and from the 1960s ' +
            'Stavros became the centre of a sustained conservation and breeding programme.</p>' +
            '<p>It worked. The mouflon is no longer on the brink, and the Paphos Forest holds ' +
            'the bulk of the wild population — which is precisely why this forest, rather than ' +
            'any other, matters so much.</p>',
          facts: [
            'Found in the wild nowhere else in the world.',
            'Protected in the Paphos Forest, which holds the main wild population.',
            'The enclosure at Stavros tis Psokas dates to the 1930s.',
            'A national symbol: it appears on Cypriot coins and formerly on Cyprus Airways aircraft.',
            'Wild mouflon are shy, largely crepuscular, and very hard to see.'
          ],
          didYouKnow:
            'The mouflon was reduced to a few dozen animals before protection began. Almost ' +
            'every Cyprus mouflon alive today descends from that remnant in this forest.',
          responsible: {
            title: 'If you do see one',
            items: [
              'Stay in or beside the car and watch from a distance.',
              'Never approach, follow, or try to attract an animal.',
              'Do not feed them — habituated wild animals fare badly.',
              'Keep noise down and do not slam doors.',
              'Drive slowly at dawn and dusk: this is when animals cross forest roads.'
            ]
          },
          whyItMatters:
            'The mouflon is the strongest argument for the Paphos Forest\'s protection, and one ' +
            'of the more successful conservation stories in the Mediterranean.'
        }
      ]
    },

    /* ============================================================= RETURN */
    {
      id: 'return',
      kind: 'drive',
      num: null,
      name: 'Return to Polis',
      arrive: '18:55',
      duration: '~1 h 30 m',
      summary:
        'Back down the forest road through Stavros tis Psokas and Lysos to Goudi, then the ' +
        'short run into Polis.',
      driveFacts: [
        { label: 'Distance', value: '~60 km' },
        { label: 'Time', value: '1 h 20 m – 1 h 45 m' },
        { label: 'Descent', value: '~1,300 m → sea level' },
        { label: 'Arrival', value: '~20:15–20:30' }
      ],
      notice: {
        tone: 'warn',
        title: 'Daylight',
        body:
          'Sunset is about <strong>19:45</strong>. Leaving Throni at 18:55 you will be driving ' +
          'the last part in dusk or dark. That is manageable on this road, but if you would ' +
          'rather not: leave Throni by 18:00, or accept a shorter Kykkos visit. Mountain roads ' +
          'here have no lighting, no barriers in places, and occasional loose stone.'
      },
      body:
        'Retrace the outward route: west from Kykkos, following signs for Stavros tis Psokas, ' +
        'then down through Lysos to Goudi and left into Polis. The descent is long and ' +
        'continuous — use a low gear rather than riding the brakes.',
      tips: [
        'Full beam between villages, but dip early: the bends are tight and oncoming traffic appears late.',
        'Animals — goats, foxes, occasionally mouflon — are most active on forest roads at dusk.',
        'There is no fuel between Kykkos and Polis. If you are below a quarter tank, fill up in Pedoulas before you leave Marathasa.',
        'If the forest road is closed or you would rather avoid it after dark, the alternative is Kykkos → Pano Panagia → Kannaviou → Stroumbi → Polis: fully surfaced main roads, roughly 30–40 minutes longer.'
      ]
    }
  ],

  /* ---------------------------------------------------------- ESSENTIALS */
  essentials: [
    'panagia-tou-moutoulla',
    'lampadistis',
    'venetian-bridge',
    'setrachos',
    'kykkos-monastery',
    'kykkos-mosaics',
    'kykkos-icon',
    'throni-shrine',
    'makarios-tomb',
    'throni-views'
  ],

  /* ---------------------------------------------------------- CHECKLIST */
  checklist: [
    { id: 'panagia-tou-moutoulla', label: 'Panagia tou Moutoulla', stop: 'Moutoullas', essential: true },
    { id: 'moutoullas-donors', label: 'The donor portraits of Ioannis & Irene', stop: 'Moutoullas', essential: true },
    { id: 'old-moutoullas', label: 'Old Moutoullas lanes', stop: 'Moutoullas', essential: false },
    { id: 'rigena-chlio', label: 'Baths of Rigena & Chlio trail', stop: 'Moutoullas', essential: false },
    { id: 'lampadistis', label: 'Agios Ioannis Lampadistis', stop: 'Kalopanayiotis', essential: true },
    { id: 'latin-chapel', label: 'The "Latin" chapel frescoes', stop: 'Kalopanayiotis', essential: true },
    { id: 'saint-tomb', label: 'Tomb of St John Lampadistis', stop: 'Kalopanayiotis', essential: true },
    { id: 'venetian-bridge', label: 'The stone ("Venetian") bridge', stop: 'Kalopanayiotis', essential: true },
    { id: 'sulphur-springs', label: 'Sulphur springs', stop: 'Kalopanayiotis', essential: true },
    { id: 'setrachos', label: 'Setrachos riverside walk', stop: 'Kalopanayiotis', essential: true },
    { id: 'kykkos-watermill', label: 'Kykkos Watermill', stop: 'Kalopanayiotis', essential: false },
    { id: 'lunch', label: 'Lunch', stop: 'Kalopanayiotis', essential: false },
    { id: 'kykkos-monastery', label: 'Kykkos main church & iconostasis', stop: 'Kykkos', essential: true },
    { id: 'kykkos-icon', label: 'The covered Icon of the Virgin', stop: 'Kykkos', essential: true },
    { id: 'kykkos-mosaics', label: 'Kykkos mosaics & galleries', stop: 'Kykkos', essential: true },
    { id: 'kykkos-museum', label: 'Kykkos Museum', stop: 'Kykkos', essential: false },
    { id: 'makarios-tomb', label: 'Tomb of Makarios III', stop: 'Throni', essential: true },
    { id: 'throni-shrine', label: 'Throni tis Panagias shrine', stop: 'Throni', essential: true },
    { id: 'throni-views', label: 'The view west over Paphos Forest', stop: 'Throni', essential: true },
    { id: 'stavros-station', label: 'Stavros tis Psokas', stop: 'Paphos Forest', essential: false }
  ],

  /* ---------------------------------------------------------- PRACTICAL */
  practical: [
    {
      icon: 'sun',
      title: 'August heat',
      items: [
        'Marathasa at 730–800 m is several degrees cooler than the coast, and Kykkos at 1,300 m cooler again — but midday is still hot.',
        'The river gorge at Kalopanayiotis is the coolest place you will be. That is where the plan puts you in the early afternoon.',
        'Hats and sunscreen for the exposed walk back up from the river, and at Throni, which has no shade.'
      ]
    },
    {
      icon: 'water',
      title: 'Water',
      items: [
        'Carry at least 1.5–2 litres per person. Refill in Kalopanayiotis before the walk.',
        'Take water with you on the river walk — the return is uphill and there is nothing to buy at the bottom.',
        'Do not drink from the sulphur springs.'
      ]
    },
    {
      icon: 'walk',
      title: 'Footwear & paths',
      items: [
        'Normal trainers are fine for everything in this itinerary.',
        'Village lanes are steep, uneven and sometimes stepped.',
        'Rocks near the springs and at the river edge are slippery. Watch your footing rather than your phone.'
      ]
    },
    {
      icon: 'church',
      title: 'Churches & monasteries',
      items: [
        'Shoulders and knees covered at all three sites. Kykkos enforces this strictly, for men as well as women.',
        'Panagia tou Moutoulla is normally locked — ask at the café for the keyholder.',
        'Agios Ioannis Lampadistis closes 13:00–14:00 in summer.',
        'Photography inside churches is often prohibited and flash always is. Ask first.',
        'Speak quietly. These are working places of worship, not exhibits.'
      ]
    },
    {
      icon: 'car',
      title: 'Roads & fuel',
      items: [
        'Fill up in Polis before leaving. There is no fuel between Lysos and Pedoulas.',
        'The Polis–Lysos–Stavros–Kykkos forest road is the shortest link and mostly surfaced, but narrow and slow. Follow physical road signs, not only your phone.',
        'Avoid the unsurfaced Cedar Valley track — it is a slow gravel road and not what you want at the end of a long day.',
        'Mountain roads have no lighting and few barriers. Descend in a low gear.'
      ]
    },
    {
      icon: 'phone',
      title: 'Signal & this page',
      items: [
        'Coverage is patchy across the Paphos Forest and in the Setrachos gorge.',
        'This guide caches itself after the first load: itinerary, history, coordinates and your checklist stay available offline.',
        'Map tiles and Google Maps will not work without signal — check your next destination while you still have bars.'
      ]
    },
    {
      icon: 'clock',
      title: 'Daylight',
      items: [
        'Sunset in early August is around 19:45.',
        'Throni is at its best in the last two hours of light.',
        'Be past Stavros tis Psokas by about 19:00 if you want the forest section in daylight.'
      ]
    }
  ],

  /* ------------------------------------------------------------ SOURCES */
  sourcesNote:
    'Facts, dates and opening hours below were checked against published sources in August ' +
    '2026. Opening hours at all three sites are known to vary in practice, and the keyholder ' +
    'arrangement at Moutoullas means access is never guaranteed. Where sources disagreed — ' +
    'notably on elevations at Kykkos and Throni, and on the surface of the Kykkos–Stavros ' +
    'road — the text says so rather than picking a number silently.',
  sources: [
    { name: 'Deputy Ministry of Tourism — Visit Cyprus', url: 'https://www.visitcyprus.com/', note: 'Site descriptions, opening hours, monument records' },
    { name: 'UNESCO World Heritage Centre — Painted Churches in the Troodos Region', url: 'https://whc.unesco.org/en/list/351/', note: 'Inscription 1985; scope of the ten churches' },
    { name: 'Department of Forests, Cyprus', url: 'https://www.moa.gov.cy/moa/fd/fd.nsf/home_en/home_en', note: 'Paphos Forest, Stavros tis Psokas, mouflon conservation' },
    { name: 'Cyprus Mail', url: 'https://cyprus-mail.com/', note: 'Mouflon enclosure closures, March 2026' },
    { name: 'Kykkos Monastery / Museum of Kykkos Monastery', url: 'https://www.kykkos-museum.cy/', note: 'Foundation, icon, collections' },
    { name: 'Kalopanayiotis community', url: 'https://kalopanayiotis.com.cy/', note: 'Springs, monastery, village sights' },
    { name: 'Visit Solea', url: 'https://www.visitsolea.com/', note: 'Baths of Rigena & Chlio trail; Marathasa sites' },
    { name: 'Cyprus Island — heritage gazetteer', url: 'https://www.cyprusisland.net/', note: 'Monastery complex, bridge, village records' },
    { name: 'Britannica / OrthodoxWiki — Makarios III', url: 'https://www.britannica.com/biography/Makarios-III', note: 'Biography and dates' },
    { name: 'OpenStreetMap contributors', url: 'https://www.openstreetmap.org/copyright', note: 'Map tiles and base geography' }
  ]
};

if (typeof module !== 'undefined') { module.exports = GUIDE; }
