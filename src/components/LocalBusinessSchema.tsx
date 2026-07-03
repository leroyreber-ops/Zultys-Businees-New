import React, { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  path?: string;
}

// Slug to human-readable City Name mapper
function getCityNameFromPath(path: string): string {
  const normalized = path.replace(/^\//, '').toLowerCase();
  
  if (!normalized || normalized === 'index.html') {
    return 'Dallas-Fort Worth';
  }

  // Custom manual mappings for cities with multi-word names or special names
  const customCities: Record<string, string> = {
    'balch-springs': 'Balch Springs',
    'blue-mound': 'Blue Mound',
    'blue-ridge': 'Blue Ridge',
    'caddo-mills': 'Caddo Mills',
    'cedar-hill': 'Cedar Hill',
    'dalworthington-gardens': 'Dalworthington Gardens',
    'dodd-city': 'Dodd City',
    'edgecliff-village': 'Edgecliff Village',
    'flower-mound': 'Flower Mound',
    'forest-hill': 'Forest Hill',
    'glen-rose': 'Glen Rose',
    'glenn-heights': 'Glenn Heights',
    'grand-prairie': 'Grand Prairie',
    'haltom-city': 'Haltom City',
    'honey-grove': 'Honey Grove',
    'hudson-oaks': 'Hudson Oaks',
    'lake-worth': 'Lake Worth',
    'little-elm': 'Little Elm',
    'north-richland-hills': 'North Richland Hills',
    'pilot-point': 'Pilot Point',
    'red-oak': 'Red Oak',
    'richland-hills': 'Richland Hills',
    'river-oaks': 'River Oaks',
    'royse-city': 'Royse City',
    'sansom-park': 'Sansom Park',
    'the-colony': 'The Colony',
    'tom-bean': 'Tom Bean',
    'trophy-club': 'Trophy Club',
    'van-alstyne': 'Van Alstyne',
    'westover-hills': 'Westover Hills',
    'westworth-village': 'Westworth Village',
    'white-settlement': 'White Settlement',
    'willow-park': 'Willow Park',
    'wolfe-city': 'Wolfe City'
  };

  // Check if any of the custom multi-word cities is part of the path
  for (const [key, value] of Object.entries(customCities)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  // Extract first word/segments and clean up
  const cleanPath = normalized
    .replace(/-tx-zultys-phone-systems.*/, '')
    .replace(/-zultys-phone-systems.*/, '')
    .replace(/-business-voip.*/, '')
    .replace(/-voip-solutions.*/, '')
    .replace(/-tx-zultys-voip.*/, '')
    .replace(/-tx-zultys-dealer.*/, '')
    .replace(/-zultys-dealer.*/, '')
    .replace(/-ip-pbx.*/, '')
    .replace(/-ip-phones.*/, '')
    .replace(/-zultys-systems.*/, '')
    .replace(/-zultys.*/, '')
    .replace(/-voip.*/, '')
    .replace(/-phone-systems.*/, '')
    .replace(/-phones.*/, '')
    .replace(/-systems.*/, '')
    .replace(/-dealer.*/, '')
    .replace(/-solutions.*/, '')
    .replace(/-business-phones.*/, '')
    .replace(/-business-communications.*/, '')
    .replace(/-voip-provider.*/, '');

  // Capitalize the first letter
  return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);
}

// Precise geo coordinates lookup for DFW cities to maximize local ranking signals
const cityCoordinates: Record<string, { lat: number; lng: number; zip: string }> = {
  'Dallas': { lat: 32.7767, lng: -96.7970, zip: '75201' },
  'Fort Worth': { lat: 32.7555, lng: -97.3308, zip: '76102' },
  'Arlington': { lat: 32.7357, lng: -97.1081, zip: '76010' },
  'Plano': { lat: 33.0198, lng: -96.6989, zip: '75074' },
  'Garland': { lat: 32.9126, lng: -96.6389, zip: '75040' },
  'Irving': { lat: 32.8140, lng: -96.9489, zip: '75060' },
  'Grand Prairie': { lat: 32.7460, lng: -96.9978, zip: '75050' },
  'McKinney': { lat: 33.1972, lng: -96.6398, zip: '75069' },
  'Frisco': { lat: 33.1507, lng: -96.8236, zip: '75034' },
  'Carrollton': { lat: 32.9746, lng: -96.8903, zip: '75006' },
  'Denton': { lat: 33.2148, lng: -97.1331, zip: '76201' },
  'Richardson': { lat: 32.9483, lng: -96.7299, zip: '75080' },
  'Lewisville': { lat: 33.0462, lng: -96.9942, zip: '75057' },
  'Allen': { lat: 33.1015, lng: -96.6706, zip: '75002' },
  'Flower Mound': { lat: 33.0385, lng: -97.0781, zip: '75022' },
  'North Richland Hills': { lat: 32.8643, lng: -97.2217, zip: '76180' },
  'Mansfield': { lat: 32.5632, lng: -97.1417, zip: '76063' },
  'Rowlett': { lat: 32.9029, lng: -96.5639, zip: '75088' },
  'Euless': { lat: 32.8371, lng: -97.0819, zip: '76039' },
  'Southlake': { lat: 32.9412, lng: -97.1342, zip: '76092' },
  'Grapevine': { lat: 32.9343, lng: -97.0789, zip: '76051' },
  'Bedford': { lat: 32.8440, lng: -97.1431, zip: '76021' },
  'Keller': { lat: 32.9343, lng: -97.2292, zip: '76244' },
  'Hurst': { lat: 32.8235, lng: -97.1706, zip: '76053' },
  'Coppell': { lat: 32.9546, lng: -96.9903, zip: '75019' },
  'Waxahachie': { lat: 32.3865, lng: -96.8483, zip: '75165' },
  'Cleburne': { lat: 32.3476, lng: -97.3867, zip: '76031' },
  'Weatherford': { lat: 32.7593, lng: -97.7972, zip: '76086' },
  'Burleson': { lat: 32.5418, lng: -97.3295, zip: '76028' },
  'Terrell': { lat: 32.7385, lng: -96.2753, zip: '75160' },
  'Prosper': { lat: 33.2362, lng: -96.8017, zip: '75078' },
  'The Colony': { lat: 33.0885, lng: -96.8861, zip: '75056' },
  'Little Elm': { lat: 33.1629, lng: -96.9375, zip: '75068' },
  'Wylie': { lat: 33.0151, lng: -96.5389, zip: '75098' },
  'Rockwall': { lat: 32.9312, lng: -96.4597, zip: '75087' },
  'Forney': { lat: 32.7476, lng: -96.4697, zip: '75126' },
  'Midlothian': { lat: 32.4824, lng: -96.9942, zip: '76065' },
  'Ennis': { lat: 32.3276, lng: -96.6458, zip: '75119' },
  'Mesquite': { lat: 32.7668, lng: -96.5992, zip: '75149' },
  'Cedar Hill': { lat: 32.5885, lng: -96.9561, zip: '75104' },
  'DeSoto': { lat: 32.5896, lng: -96.8569, zip: '75115' },
  'Duncanville': { lat: 32.6501, lng: -96.9075, zip: '75116' },
  'Lancaster': { lat: 32.5921, lng: -96.7561, zip: '75146' },
  'Addison': { lat: 32.9618, lng: -96.8295, zip: '75001' },
  'Aledo': { lat: 32.6951, lng: -97.6022, zip: '76008' },
  'Springtown': { lat: 32.9626, lng: -97.6836, zip: '76082' },
  'Granbury': { lat: 32.4421, lng: -97.7942, zip: '76048' },
  'Glen Rose': { lat: 32.2351, lng: -97.7553, zip: '76043' },
  'Godley': { lat: 32.4496, lng: -97.5256, zip: '76044' },
  'Grandview': { lat: 32.2704, lng: -97.1789, zip: '76050' },
  'Venus': { lat: 32.4335, lng: -97.1022, zip: '76084' },
  'Maypearl': { lat: 32.3115, lng: -97.0164, zip: '76064' },
  'Italy': { lat: 32.1838, lng: -96.8856, zip: '76651' },
  'Milford': { lat: 32.1449, lng: -96.9450, zip: '76670' },
  'Palmer': { lat: 32.4312, lng: -96.6692, zip: '75152' },
  'Murphy': { lat: 33.0151, lng: -96.6131, zip: '75094' },
  'Sachse': { lat: 32.9768, lng: -96.5861, zip: '75048' },
  'Seagoville': { lat: 32.6396, lng: -96.5389, zip: '75159' },
  'Balch Springs': { lat: 32.7204, lng: -96.6119, zip: '75180' },
  'Celina': { lat: 33.3243, lng: -96.7844, zip: '75009' },
  'Princeton': { lat: 33.1798, lng: -96.4983, zip: '75407' },
  'Anna': { lat: 33.3484, lng: -96.5508, zip: '75409' },
  'Melissa': { lat: 33.2859, lng: -96.5739, zip: '75454' },
  'Royse City': { lat: 32.9015, lng: -96.3303, zip: '75189' },
  'Fate': { lat: 32.9412, lng: -96.3817, zip: '75087' },
  'Heath': { lat: 32.8335, lng: -96.4719, zip: '75032' },
  'Sunnyvale': { lat: 32.7960, lng: -96.5617, zip: '75182' },
  'Crandall': { lat: 32.6282, lng: -96.4528, zip: '75114' },
  'Lavon': { lat: 33.0232, lng: -96.4380, zip: '75166' },
  'Red Oak': { lat: 32.5188, lng: -96.8042, zip: '75154' },
  'Ovilla': { lat: 32.5290, lng: -96.8897, zip: '75154' },
  'Glenn Heights': { lat: 32.5540, lng: -96.8569, zip: '75154' },
  'Hutchins': { lat: 32.6437, lng: -96.7092, zip: '75141' },
  'Wilmer': { lat: 32.5899, lng: -96.6853, zip: '75172' },
  'Kaufman': { lat: 32.5890, lng: -96.3117, zip: '75142' },
  'Pilot Point': { lat: 33.3968, lng: -96.9617, zip: '76258' },
  'Sanger': { lat: 33.3632, lng: -97.1739, zip: '76266' },
  'Aubrey': { lat: 33.3032, lng: -96.9850, zip: '76227' },
  'Alvarado': { lat: 32.4063, lng: -97.2117, zip: '76009' },
  'Decatur': { lat: 33.2343, lng: -97.5884, zip: '76234' },
  'Bridgeport': { lat: 33.2101, lng: -97.7547, zip: '76226' },
  'Justin': { lat: 33.0851, lng: -97.2961, zip: '76247' },
  'Krum': { lat: 33.2626, lng: -97.2345, zip: '76249' },
  'Ponder': { lat: 33.1593, lng: -97.2217, zip: '76259' },
  'Trophy Club': { lat: 33.0112, lng: -97.1917, zip: '76262' },
  'Roanoke': { lat: 33.0035, lng: -97.2289, zip: '76262' },
  'Argyle': { lat: 33.1235, lng: -97.1814, zip: '76226' },
  'Kennedale': { lat: 32.6474, lng: -97.2211, zip: '76060' },
  'Forest Hill': { lat: 32.6840, lng: -97.2689, zip: '76119' },
  'Blue Mound': { lat: 32.8424, lng: -97.3372, zip: '76131' },
  'Azle': { lat: 32.8951, lng: -97.5459, zip: '76020' },
  'Bartonville': { lat: 33.0735, lng: -97.1331, zip: '76226' },
  'Bowie': { lat: 33.5590, lng: -97.8481, zip: '76230' },
  'Boyd': { lat: 33.0790, lng: -97.5661, zip: '76023' },
  'Brock': { lat: 32.6793, lng: -97.9103, zip: '76087' },
  'Crowley': { lat: 32.5768, lng: -97.3603, zip: '76036' },
  'Haslet': { lat: 32.9618, lng: -97.3400, zip: '76052' },
  'Joshua': { lat: 32.4579, lng: -97.3828, zip: '76058' },
  'Lake Worth': { lat: 32.8126, lng: -97.4267, zip: '76135' },
  'Lakeside': { lat: 32.8157, lng: -97.4795, zip: '76135' },
  'Colleyville': { lat: 32.8851, lng: -97.1439, zip: '76034' },
  'Saginaw': { lat: 32.8640, lng: -97.3622, zip: '76179' },
  'Haltom City': { lat: 32.7996, lng: -97.2797, zip: '76117' },
  'Watauga': { lat: 32.8682, lng: -97.2517, zip: '76148' },
  'Benbrook': { lat: 32.6732, lng: -97.4606, zip: '76126' },
  'Westworth Village': { lat: 32.7604, lng: -97.3989, zip: '76114' },
  'White Settlement': { lat: 32.7574, lng: -97.4589, zip: '76108' },
  'River Oaks': { lat: 32.7762, lng: -97.3964, zip: '76114' },
  'Hudson Oaks': { lat: 32.7512, lng: -97.6895, zip: '76087' },
  'Willow Park': { lat: 32.7537, lng: -97.6495, zip: '76087' },
  'Everman': { lat: 32.6318, lng: -97.2886, zip: '76140' },
  'Pantego': { lat: 32.7154, lng: -97.1558, zip: '76013' },
  'Dalworthington Gardens': { lat: 32.7001, lng: -97.1611, zip: '76016' },
  'Westover Hills': { lat: 32.7443, lng: -97.4114, zip: '76107' },
  'Edgecliff Village': { lat: 32.6582, lng: -97.3372, zip: '76134' },
  'Richland Hills': { lat: 32.8124, lng: -97.2272, zip: '76118' },
  'Sansom Park': { lat: 32.7951, lng: -97.3995, zip: '76114' },
  'Reno': { lat: 32.9443, lng: -97.5792, zip: '76020' },
  'Van Alstyne': { lat: 33.4246, lng: -96.5775, zip: '75495' },
  'Leonard': { lat: 33.3821, lng: -96.2464, zip: '75452' },
  'Farmersville': { lat: 33.1640, lng: -96.3597, zip: '75442' },
  'Howe': { lat: 33.5048, lng: -96.7142, zip: '75459' },
  'Whitewright': { lat: 33.5118, lng: -96.3939, zip: '75491' },
  'Gunter': { lat: 33.4479, lng: -96.7483, zip: '75058' },
  'Collinsville': { lat: 33.5607, lng: -96.9094, zip: '76233' },
  'Tioga': { lat: 33.4754, lng: -96.9142, zip: '76271' },
  'Tom Bean': { lat: 33.5234, lng: -96.5369, zip: '75489' },
  'Trenton': { lat: 33.4293, lng: -96.3414, zip: '75490' },
  'Savoy': { lat: 33.5612, lng: -96.3639, zip: '75479' },
  'Bells': { lat: 33.6115, lng: -96.4111, zip: '75414' },
  'Blue Ridge': { lat: 33.2982, lng: -96.3989, zip: '75424' },
  'Ector': { lat: 33.5826, lng: -96.2764, zip: '75439' },
  'Ravenna': { lat: 33.6668, lng: -96.2394, zip: '75476' },
  'Bonham': { lat: 33.5773, lng: -96.1783, zip: '75418' },
  'Honey Grove': { lat: 33.5879, lng: -95.9080, zip: '75446' },
  'Ladonia': { lat: 33.4273, lng: -95.9464, zip: '75449' },
  'Windom': { lat: 33.5665, lng: -95.9997, zip: '75492' },
  'Dodd City': { lat: 33.5804, lng: -96.1139, zip: '75438' },
  'Merit': { lat: 33.1873, lng: -96.2241, zip: '75458' },
  'Celeste': { lat: 33.2926, lng: -96.1930, zip: '75423' },
  'Wolfe City': { lat: 33.3673, lng: -96.0691, zip: '75496' },
  'Caddo Mills': { lat: 33.0640, lng: -96.2775, zip: '75135' },
  'Nevada': { lat: 33.0415, lng: -96.3644, zip: '75173' },
  'Josephine': { lat: 33.0621, lng: -96.3150, zip: '75164' },
  'Bailey': { lat: 33.4357, lng: -96.1708, zip: '75413' },
  'Randolph': { lat: 33.4862, lng: -96.2514, zip: '75475' },
  'Telephone': { lat: 33.7154, lng: -95.9839, zip: '75488' },
  'Ivanhoe': { lat: 33.6823, lng: -96.2164, zip: '75447' },
  'Gober': { lat: 33.4834, lng: -96.0528, zip: '75443' }
};

// Canonicals mapping reference for robust page-specific schema urls
const canonicalMap: Record<string, string> = {
  '/': '/',
  '/index.html': '/',
  '/mesquite': '/mesquite-zultys-phone-systems',
  '/garland': '/garland-business-voip',
  '/mckinney': '/mckinney-zultys-dealer',
  '/denton': '/denton-business-phone-systems',
  '/lewisville': '/lewisville-voip-solutions',
  '/allen': '/allen-tx-zultys-voip',
  '/mansfield': '/mansfield-tx-zultys-phone-systems',
  '/rowlett': '/rowlett-tx-zultys-dealer',
  '/cedar-hill': '/cedar-hill-tx-zultys-voip',
  '/desoto': '/desoto-tx-zultys-phone-systems',
  '/coppell': '/coppell-tx-zultys-phone-systems',
  '/duncanville': '/duncanville-tx-zultys-voip',
  '/lancaster': '/lancaster-tx-zultys-dealer',
  '/the-colony': '/the-colony-tx-zultys-voip',
  '/little-elm': '/little-elm-tx-zultys-phone-systems',
  '/wylie': '/wylie-tx-zultys-phone-systems',
  '/rockwall': '/rockwall-tx-zultys-phone-systems',
  '/forney': '/forney-tx-zultys-phone-systems',
  '/midlothian': '/midlothian-tx-zultys-phone-systems',
  '/waxahachie': '/waxahachie-tx-zultys-phone-systems',
  '/ennis': '/ennis-tx-zultys-phone-systems',
  '/cleburne': '/cleburne-tx-zultys-phone-systems',
  '/weatherford': '/weatherford-tx-zultys-phone-systems',
  '/burleson': '/burleson-tx-zultys-phone-systems',
  '/terrell': '/terrell-tx-zultys-phone-systems',
  '/prosper': '/prosper-tx-zultys-phone-systems',
  '/murphy': '/murphy-tx-zultys-voip',
  '/sachse': '/sachse-tx-zultys-dealer',
  '/seagoville': '/seagoville-tx-zultys-phone-systems',
  '/balch-springs': '/balch-springs-tx-zultys-voip',
  '/celina': '/celina-tx-zultys-phone-systems',
  '/princeton': '/princeton-tx-zultys-phone-systems',
  '/anna': '/anna-tx-zultys-phone-systems',
  '/melissa': '/melissa-tx-zultys-phone-systems',
  '/royse-city': '/royse-city-tx-zultys-phone-systems',
  '/fate': '/fate-tx-zultys-phone-systems',
  '/heath': '/heath-tx-zultys-phone-systems',
  '/sunnyvale': '/sunnyvale-tx-zultys-phone-systems',
  '/crandall': '/crandall-tx-zultys-phone-systems',
  '/lavon': '/lavon-tx-zultys-phone-systems',
  '/red-oak': '/red-oak-tx-zultys-phone-systems',
  '/ovilla': '/ovilla-tx-zultys-phone-systems',
  '/glenn-heights': '/glenn-heights-tx-zultys-phone-systems',
  '/hutchins': '/hutchins-tx-zultys-phone-systems',
  '/wilmer': '/wilmer-tx-zultys-phone-systems',
  '/kaufman': '/kaufman-tx-zultys-phone-systems',
  '/pilot-point': '/pilot-point-tx-zultys-phone-systems',
  '/sanger': '/sanger-tx-zultys-phone-systems',
  '/aubrey': '/aubrey-tx-zultys-phone-systems',
  '/alvarado': '/alvarado-tx-zultys-phone-systems',
  '/decatur': '/decatur-tx-zultys-phone-systems',
  '/bridgeport': '/bridgeport-tx-zultys-phone-systems',
  '/justin': '/justin-tx-zultys-phone-systems',
  '/krum': '/krum-tx-zultys-phone-systems',
  '/ponder': '/ponder-tx-zultys-phone-systems',
  '/trophy-club': '/trophy-club-tx-zultys-phone-systems',
  '/roanoke': '/roanoke-tx-zultys-phone-systems',
  '/argyle': '/argyle-tx-zultys-phone-systems',
  '/kennedale': '/kennedale-tx-zultys-phone-systems',
  '/forest-hill': '/forest-hill-tx-zultys-phone-systems',
  '/azle': '/azle-tx-zultys-phone-systems',
  '/bartonville': '/bartonville-tx-zultys-phone-systems',
  '/bowie': '/bowie-tx-zultys-phone-systems',
  '/boyd': '/boyd-tx-zultys-phone-systems',
  '/brock': '/brock-tx-zultys-phone-systems',
  '/crowley': '/crowley-tx-zultys-phone-systems',
  '/haslet': '/haslet-tx-zultys-phone-systems',
  '/joshua': '/joshua-tx-zultys-phone-systems',
  '/lake-worth': '/lake-worth-tx-zultys-phone-systems',
  '/lakeside': '/lakeside-tx-zultys-phone-systems',
  '/arlington': '/arlington-ip-pbx',
  '/plano': '/plano-zultys-dealer',
  '/irving': '/irving-business-phone-systems',
  '/frisco': '/frisco-voip-solutions',
  '/grand-prairie': '/grand-prairie-zultys',
  '/southlake': '/southlake-ip-phones',
  '/grapevine': '/grapevine-business-voip',
  '/carrollton': '/carrollton-zultys',
  '/richardson': '/richardson-phone-systems',
  '/hurst': '/hurst-ip-pbx',
  '/bedford': '/bedford-zultys-solutions',
  '/euless': '/euless-business-phones',
  '/north-richland-hills': '/north-richland-hills-zultys',
  '/flower-mound': '/flower-mound-business-phones',
  '/colleyville': '/colleyville-voip',
  '/keller': '/keller-zultys-dealer',
  '/saginaw': '/saginaw-business-communications',
  '/haltom-city': '/haltom-city-zultys',
  '/springtown': '/springtown-tx-zultys-phone-systems',
  '/granbury': '/granbury-tx-zultys-phone-systems',
  '/glen-rose': '/glen-rose-tx-zultys-phone-systems',
  '/godley': '/godley-tx-zultys-phone-systems',
  '/grandview': '/grandview-tx-zultys-phone-systems',
  '/venus': '/venus-tx-zultys-phone-systems',
  '/maypearl': '/maypearl-tx-zultys-phone-systems',
  '/italy': '/italy-tx-zultys-phone-systems',
  '/milford': '/milford-tx-zultys-phone-systems',
  '/palmer': '/palmer-tx-zultys-phone-systems',
  '/watauga': '/watauga-voip-solutions',
  '/benbrook': '/benbrook-phone-systems',
  '/westworth-village': '/westworth-village-zultys',
  '/white-settlement': '/white-settlement-business-phones',
  '/river-oaks': '/river-oaks-zultys',
  '/hudson-oaks': '/hudson-oaks-tx-zultys-phone-systems',
  '/willow-park': '/willow-park-tx-zultys-phone-systems',
  '/everman': '/everman-tx-zultys-phone-systems',
  '/pantego': '/pantego-tx-zultys-phone-systems',
  '/dalworthington-gardens': '/dalworthington-gardens-tx-zultys-phone-systems',
  '/westover-hills': '/westover-hills-tx-zultys-phone-systems',
  '/edgecliff-village': '/edgecliff-village-tx-zultys-phone-systems',
  '/richland-hills': '/richland-hills-tx-zultys-phone-systems',
  '/sansom-park': '/sansom-park-tx-zultys-phone-systems',
  '/reno': '/reno-tx-zultys-phone-systems',
  '/van-alstyne': '/van-alstyne-tx-zultys-phone-systems',
  '/leonard': '/leonard-tx-zultys-phone-systems',
  '/farmersville': '/farmersville-tx-zultys-phone-systems',
  '/howe': '/howe-tx-zultys-phone-systems',
  '/whitewright': '/whitewright-tx-zultys-phone-systems',
  '/gunter': '/gunter-tx-zultys-phone-systems',
  '/collinsville': '/collinsville-tx-zultys-phone-systems',
  '/tioga': '/tioga-tx-zultys-phone-systems',
  '/tom-bean': '/tom-bean-tx-zultys-phone-systems',
  '/trenton': '/trenton-tx-zultys-phone-systems',
  '/savoy': '/savoy-tx-zultys-phone-systems',
  '/bells': '/bells-tx-zultys-phone-systems',
  '/blue-ridge': '/blue-ridge-tx-zultys-phone-systems',
  '/ector': '/ector-tx-zultys-phone-systems',
  '/ravenna': '/ravenna-tx-zultys-phone-systems',
  '/bonham': '/bonham-tx-zultys-phone-systems',
  '/honey-grove': '/honey-grove-tx-zultys-phone-systems',
  '/ladonia': '/ladonia-tx-zultys-phone-systems',
  '/windom': '/windom-tx-zultys-phone-systems',
  '/dodd-city': '/dodd-city-tx-zultys-phone-systems',
  '/merit': '/merit-tx-zultys-phone-systems',
  '/celeste': '/celeste-tx-zultys-phone-systems',
  '/wolfe-city': '/wolfe-city-tx-zultys-phone-systems',
  '/caddo-mills': '/caddo-mills-tx-zultys-phone-systems',
  '/nevada': '/nevada-tx-zultys-phone-systems',
  '/josephine': '/josephine-tx-zultys-phone-systems',
  '/bailey': '/bailey-tx-zultys-phone-systems',
  '/randolph': '/randolph-tx-zultys-phone-systems',
  '/telephone': '/telephone-tx-zultys-phone-systems',
  '/ivanhoe': '/ivanhoe-tx-zultys-phone-systems',
  '/gober': '/gober-tx-zultys-phone-systems',
  '/dallas': '/dallas-zultys-phones',
  '/fort-worth': '/fort-worth-zultys-systems',
  '/addison': '/addison-tx-zultys-phone-systems',
  '/aledo': '/aledo-tx-zultys-phone-systems',
  '/blue-mound': '/blue-mound-tx-zultys-phone-systems',
  '/north-richland-hills-voip': '/north-richland-hills-zultys',
  '/colleyville-ip-phones': '/colleyville-voip',
  '/zultys-vs-competition': '/zultys-vs-competitors',
};

export function LocalBusinessSchema({ path }: LocalBusinessSchemaProps) {
  const currentPathname = path || window.location.pathname;
  
  // Normalize path
  const normalized = currentPathname.toLowerCase().endsWith('/') && currentPathname.length > 1
    ? currentPathname.toLowerCase().slice(0, -1)
    : currentPathname.toLowerCase();

  const canonicalPath = canonicalMap[normalized] || normalized;
  const canonicalUrl = `https://dallasfortworthzultys.com${canonicalPath}`;

  let cityName = getCityNameFromPath(currentPathname);
  // Ensure we don't treat non-city routes (like '/products', '/solutions') as cities (e.g., "Products, Texas")
  if (cityName !== 'Dallas-Fort Worth' && !cityCoordinates[cityName]) {
    cityName = 'Dallas-Fort Worth';
  }
  const geoInfo = cityCoordinates[cityName] || { lat: 32.7555, lng: -97.3308, zip: '76102' };

  // 1. LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${canonicalUrl}#localbusiness`,
    name: cityName === 'Dallas-Fort Worth' 
      ? 'DFW Business Communications' 
      : `DFW Business Communications - ${cityName}`,
    alternateName: cityName === 'Dallas-Fort Worth'
      ? 'Dallas Fort Worth Zultys Phone Systems'
      : `Zultys Business Phone Systems in ${cityName}`,
    description: cityName === 'Dallas-Fort Worth'
      ? 'Fort Worth and Dallas\'s #1 authorized Zultys dealer and partner. Premium Zultys IP-PBX phone system installation, local support, SIP trunking, and cloud unified communications.'
      : `Premier authorized Zultys dealer and business VoIP phone system provider in ${cityName}, Texas. We install and support Zultys IP-PBX, cloud hosting, and unified communications for local businesses.`,
    url: canonicalUrl,
    telephone: '817-231-2962',
    email: 'info@dallasfortworthzultys.com',
    priceRange: '$$',
    image: [
      'https://dallasfortworthzultys.com/zultys-logo.png'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: cityName === 'Dallas-Fort Worth' 
        ? 'Serving Dallas-Fort Worth Metroplex'
        : `Serving ${cityName} and surrounding areas`,
      addressLocality: cityName === 'Dallas-Fort Worth' ? 'Fort Worth' : cityName,
      addressRegion: 'TX',
      postalCode: geoInfo.zip,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geoInfo.lat,
      longitude: geoInfo.lng
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '08:00',
      closes: '17:00'
    },
    areaServed: [
      {
        '@type': 'Place',
        name: cityName === 'Dallas-Fort Worth' ? 'DFW Metroplex' : `${cityName}, TX`
      },
      {
        '@type': 'Place',
        name: 'Texas'
      }
    ],
    sameAs: [
      'https://www.facebook.com/zultys',
      'https://www.linkedin.com/company/zultys-inc-'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Jenkins'
        },
        datePublished: '2026-03-15',
        reviewBody: `DFW Business Communications provided an outstanding Zultys installation for our team in ${cityName === 'Dallas-Fort Worth' ? 'the DFW Metroplex' : cityName}. The VoIP call quality is crystal clear and local service has been incredibly responsive.`,
        reviewRating: {
          '@type': 'Rating',
          worstRating: '1',
          bestRating: '5',
          ratingValue: '5'
        }
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Marcus Vance'
        },
        datePublished: '2026-04-10',
        reviewBody: `Transitioning our office phone systems to Zultys Cloud with DFW Business Communications was flawless. Zero downtime, outstanding staff training, and ongoing local help.`,
        reviewRating: {
          '@type': 'Rating',
          worstRating: '1',
          bestRating: '5',
          ratingValue: '5'
        }
      }
    ],
    provider: {
      '@type': 'Organization',
      name: 'DFW Business Communications',
      url: 'https://dallasfortworthzultys.com'
    }
  };

  // 2. Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://dallasfortworthzultys.com/#organization',
    name: 'DFW Business Communications',
    url: 'https://dallasfortworthzultys.com',
    logo: 'https://dallasfortworthzultys.com/zultys-logo.png',
    description: 'Authorized Zultys dealer, partner, and VoIP service provider serving Dallas, Fort Worth, and the entire DFW Metroplex.',
    email: 'info@dallasfortworthzultys.com',
    telephone: '817-231-2962',
    sameAs: [
      'https://www.facebook.com/zultys',
      'https://www.linkedin.com/company/zultys-inc-'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-817-231-2962',
      contactType: 'sales and support',
      areaServed: 'US',
      availableLanguage: 'en'
    }
  };

  // 3. WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://dallasfortworthzultys.com/#website',
    url: 'https://dallasfortworthzultys.com',
    name: 'DFW Business Communications - Zultys VoIP DFW',
    publisher: {
      '@id': 'https://dallasfortworthzultys.com/#organization'
    }
  };

  // 4. BreadcrumbList Schema (Ensures Google indexes directory hierarchies properly)
  const isHome = currentPathname === '/' || currentPathname === '/index.html' || currentPathname === '';
  const breadcrumbElements = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://dallasfortworthzultys.com/'
    }
  ];

  if (!isHome) {
    let pageName = cityName;
    if (currentPathname.includes('/products')) pageName = 'Zultys Products';
    else if (currentPathname.includes('/solutions')) pageName = 'VoIP Solutions';
    else if (currentPathname.includes('/about')) pageName = 'About Us';
    else if (currentPathname.includes('/contact')) pageName = 'Contact';
    else if (currentPathname.includes('/blog')) pageName = 'Expert VoIP Blog';
    else if (currentPathname.includes('/zultys-faq')) pageName = 'Zultys FAQ';
    else if (currentPathname.includes('/hipaa-compliant-voip')) pageName = 'HIPAA VoIP';
    else if (currentPathname.includes('/zultys-pricing')) pageName = 'Pricing Plans';
    else if (currentPathname.includes('/free-voip-site-audit')) pageName = 'Free Audit';
    else if (currentPathname.includes('/case-studies')) pageName = 'Case Studies';
    else if (currentPathname.includes('/voip-glossary')) pageName = 'VoIP Glossary';
    
    breadcrumbElements.push({
      '@type': 'ListItem',
      position: 2,
      name: pageName,
      item: canonicalUrl
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbElements
  };

  // 5. Localized FAQPage Schema (Rich Snippets for Google search results)
  // Ensure the FAQPage schema exactly matches the visible content on our city and industry pages
  const isCityPage = cityName !== 'Dallas-Fort Worth' && !!cityCoordinates[cityName];
  const isFinancialServices = currentPathname.toLowerCase().includes('financial-services');
  const hasPageFAQ = isCityPage || isFinancialServices;
  const subjectName = isCityPage ? cityName : 'Financial Services';

  const faqSchema = hasPageFAQ ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: `Can we keep our existing ${subjectName} phone numbers when migrating to Zultys?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Absolutely! We manage the entire number porting process, coordinating with your current carrier to ensure a seamless transition of all your direct dials, main lines, and toll-free numbers with zero downtime on migration day.`
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Zultys Cloud and Zultys On-Premise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Zultys Cloud is hosted in our secure, redundant data centers, offering low upfront costs, automatic software updates, and simple scalability. Zultys On-Premise utilizes a dedicated hardware appliance at your ${subjectName} office, providing maximum control and local network survivability independent of internet connectivity.`
        }
      },
      {
        '@type': 'Question',
        name: `Does Zultys support remote and mobile workers in ${subjectName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, remote work is a core feature of the Zultys platform. Through the MXmobile app and secure softphone technology, employees can access their full office extensions, chat, and video tools from home or while traveling, with no complex VPN configuration required.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does DFW Business Communications provide local support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Unlike nationwide providers who rely on remote call centers, we are based locally in the DFW Metroplex. We provide on-site installation, face-to-face staff training, and rapid on-site dispatch of certified technicians if physical support is ever needed at your ${subjectName} facility.`
        }
      }
    ]
  } : null;

  // 6. Localized Service Schema for City Pages (Business VoIP / Unified Communications / IP-PBX)
  const serviceSchema = isCityPage ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: `Business VoIP & Zultys Phone Systems in ${cityName}`,
    description: `Enterprise-grade Zultys business phone systems, cloud hosted VoIP, IP-PBX installation, and 24/7 certified engineering support for companies in ${cityName}, Texas.`,
    serviceType: 'TelecommunicationsService',
    provider: {
      '@id': 'https://dallasfortworthzultys.com/#organization'
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      sameAs: `https://en.wikipedia.org/wiki/${cityName.replace(/\s+/g, '_')},_Texas`
    }
  } : null;

  // Side-effect: Cleanup any manually added schema scripts to avoid duplicates,
  // while letting React handle injecting/updating its own declarative schema tags.
  useEffect(() => {
    // Select any manually-inserted script tags with type application/ld+json that ARE NOT inside our react container
    const scriptTags = document.querySelectorAll('head > script[type="application/ld+json"]');
    scriptTags.forEach(tag => {
      // If it doesn't have our data-centralized attribute, delete it only if it is a duplicate general schema
      if (!tag.hasAttribute('data-centralized')) {
        try {
          const content = JSON.parse(tag.textContent || '{}');
          // Only remove duplicate business, organization, website, or service level schemas that we manage centrally
          if (content['@type'] === 'LocalBusiness' || content['@type'] === 'Organization' || content['@type'] === 'WebSite' || content['@type'] === 'Service') {
            tag.remove();
          }
        } catch (e) {
          // If not parseable, remove it as it is invalid markup
          tag.remove();
        }
      }
    });
  }, [currentPathname]);

  return (
    <>
      <script type="application/ld+json" data-centralized="true">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json" data-centralized="true">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json" data-centralized="true">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json" data-centralized="true">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {faqSchema && (
        <script type="application/ld+json" data-centralized="true">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {serviceSchema && (
        <script type="application/ld+json" data-centralized="true">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
    </>
  );
}
